"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Images, Upload, Camera } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Pagination } from "@/components/shared/pagination";

function formatImageSrc(src) {
  if (!src) return "";
  const s = src.trim();
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/") || s.startsWith("data:image/")) {
    return s;
  }
  if (s.startsWith("/9j/") || s.startsWith("iVBORw") || s.length > 80) {
    return `data:image/jpeg;base64,${s}`;
  }
  return s;
}

const emptyForm = {
  title: "", treatment: "", concern: "",
  outcome: "", imageBefore: "", imageAfter: "", featured: true,
};

const ITEMS_PER_PAGE = 6;

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, title: "", loading: false });

  const fetchResults = () => {
    fetch("/api/results")
      .then((r) => r.json())
      .then((d) => { setResults(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchResults(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (r) => {
    const id = r._id || r.id;
    setEditingId(id);
    setForm({
      title: r.title || "",
      treatment: r.treatment || "",
      concern: r.concern || "",
      outcome: r.outcome || "",
      imageBefore: r.imageBefore || "",
      imageAfter: r.imageAfter || "",
      featured: r.featured !== undefined ? r.featured : true,
    });
    setShowForm(true);
  };

  const handleFileUpload = async (file, targetKey) => {
    if (!file) return;
    if (targetKey === "imageBefore") setUploadingBefore(true);
    else setUploadingAfter(true);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        setForm((prev) => ({ ...prev, [targetKey]: json.url }));
      } else {
        alert(json.error || "Failed to upload to Cloudinary. Please verify your Cloudinary API keys and permissions.");
      }
    } catch (err) {
      alert("Upload error: " + (err.message || "Failed to reach server"));
    } finally {
      if (targetKey === "imageBefore") setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/results/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to save to database");
      }
      alert(editingId ? "Result updated successfully in database!" : "New case study saved successfully in database!");
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchResults();
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving to database: " + (err.message || "Failed to reach server"));
    } finally {
      setSaving(false);
    }
  };

  const promptDeleteResult = (r) => {
    setDeleteDialog({
      isOpen: true,
      id: r._id || r.id,
      title: r.title,
      loading: false,
    });
  };

  const handleConfirmDeleteResult = async () => {
    if (!deleteDialog.id) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      await fetch(`/api/results/${deleteDialog.id}`, { method: "DELETE" });
      fetchResults();
    } finally {
      setDeleteDialog({ isOpen: false, id: null, title: "", loading: false });
    }
  };

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Client Results & Case Studies
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">Upload before & after images to Cloudinary with clinical outcome details</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-md shadow-[#EC9C9D]/20 hover:opacity-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload New Result</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-neutral-500">Loading case studies...</div>
      ) : results.length === 0 ? (
        <div className="py-16 text-center text-xs text-neutral-500">No results uploaded yet. Use button above to upload before/after photos.</div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((r) => (
              <div
                key={r._id || r.id}
                className="bg-[#161412] border border-neutral-800/80 rounded-3xl overflow-hidden hover:border-[#EC9C9D]/40 transition-all group flex flex-col justify-between"
              >
                {/* Images Preview */}
                <div className="grid grid-cols-2 h-44 bg-neutral-900 border-b border-neutral-800">
                  <div className="relative border-r border-neutral-800 overflow-hidden flex items-center justify-center">
                    {r.imageBefore ? (
                      <img
                        src={formatImageSrc(r.imageBefore)}
                        alt="Before"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">Before</span>
                    )}
                    <span className="absolute bottom-2 left-2 text-[9px] font-medium bg-black/70 text-neutral-200 px-2 py-0.5 rounded-md">
                      Before
                    </span>
                  </div>
                  <div className="relative overflow-hidden flex items-center justify-center">
                    {r.imageAfter ? (
                      <img
                        src={formatImageSrc(r.imageAfter)}
                        alt="After"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">After</span>
                    )}
                    <span className="absolute bottom-2 right-2 text-[9px] font-medium bg-[#EC9C9D]/80 text-white px-2 py-0.5 rounded-md">
                      After
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-serif font-semibold text-white truncate">{r.title}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openEdit(r)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#EC9C9D] hover:bg-[#EC9C9D]/10 transition-colors"
                          title="Edit Result"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => promptDeleteResult(r)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Result"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#EC9C9D] font-medium block mt-0.5">
                      {r.treatment}
                    </span>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{r.outcome}</p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800/70 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-500 truncate">
                      Concern: <strong className="text-neutral-300">{r.concern}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#221F1C] hover:bg-[#EC9C9D] hover:text-white border border-[#EC9C9D]/30 transition-all shrink-0 shadow-xs cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(results.length / ITEMS_PER_PAGE) || 1}
            totalItems={results.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            theme="dark"
          />
        </div>
      )}

      {/* Upload / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditingId(null); }} />
          <div className="relative bg-[#161412] border border-neutral-800 rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {editingId ? "Edit Patient Result" : "Upload Patient Result"}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {editingId ? "Modify clinical outcome details and photos" : "Upload before & after images to Cloudinary with clinical outcome details"}
                </p>
              </div>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-neutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Case Title *</label>
                <input value={form.title} onChange={(e) => update("title", e.target.value)} required placeholder="e.g. Severe Acne Clarifying Journey"
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Treatment *</label>
                  <input value={form.treatment} onChange={(e) => update("treatment", e.target.value)} required placeholder="HydraFacial Elite"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Skin Concern *</label>
                  <input value={form.concern} onChange={(e) => update("concern", e.target.value)} required placeholder="Hyperpigmentation & Texture"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
              </div>

              {/* Cloudinary File Uploads */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Before Photo</label>
                    {form.imageBefore?.includes("cloudinary") && (
                      <span className="text-[9px] text-emerald-400 font-mono">☁️ Cloudinary</span>
                    )}
                  </div>
                  {form.imageBefore ? (
                    <div className="relative h-28 rounded-xl overflow-hidden border border-neutral-700 group bg-neutral-900">
                      <img
                        src={formatImageSrc(form.imageBefore)}
                        alt="Before"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="p-1.5 rounded-lg bg-neutral-800 text-white hover:text-[#EC9C9D] cursor-pointer text-xs flex items-center gap-1 shadow">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change</span>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files?.[0], "imageBefore")} className="hidden" disabled={uploadingBefore} />
                        </label>
                        <button
                          type="button"
                          onClick={() => update("imageBefore", "")}
                          className="p-1.5 rounded-lg bg-red-900/80 text-white hover:bg-red-800 text-xs shadow cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border border-dashed border-[#EC9C9D]/40 rounded-xl cursor-pointer hover:bg-[#EC9C9D]/5 transition-colors p-2 text-center">
                      <Upload className="w-4 h-4 text-[#EC9C9D] mb-1" />
                      <span className="text-[10px] text-neutral-400">{uploadingBefore ? "Uploading to Cloudinary..." : "Upload Before Photo"}</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files?.[0], "imageBefore")} className="hidden" disabled={uploadingBefore} />
                    </label>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">After Photo</label>
                    {form.imageAfter?.includes("cloudinary") && (
                      <span className="text-[9px] text-emerald-400 font-mono">☁️ Cloudinary</span>
                    )}
                  </div>
                  {form.imageAfter ? (
                    <div className="relative h-28 rounded-xl overflow-hidden border border-neutral-700 group bg-neutral-900">
                      <img
                        src={formatImageSrc(form.imageAfter)}
                        alt="After"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="p-1.5 rounded-lg bg-neutral-800 text-white hover:text-[#EC9C9D] cursor-pointer text-xs flex items-center gap-1 shadow">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change</span>
                          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files?.[0], "imageAfter")} className="hidden" disabled={uploadingAfter} />
                        </label>
                        <button
                          type="button"
                          onClick={() => update("imageAfter", "")}
                          className="p-1.5 rounded-lg bg-red-900/80 text-white hover:bg-red-800 text-xs shadow cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-28 border border-dashed border-[#EC9C9D]/40 rounded-xl cursor-pointer hover:bg-[#EC9C9D]/5 transition-colors p-2 text-center">
                      <Upload className="w-4 h-4 text-[#EC9C9D] mb-1" />
                      <span className="text-[10px] text-neutral-400">{uploadingAfter ? "Uploading to Cloudinary..." : "Upload After Photo"}</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files?.[0], "imageAfter")} className="hidden" disabled={uploadingAfter} />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Outcome Description *</label>
                <textarea value={form.outcome} onChange={(e) => update("outcome", e.target.value)} required rows={3} placeholder="Patient reported 85% clearer complexion..."
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                  className="px-5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white border border-neutral-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploadingBefore || uploadingAfter}
                  className="px-6 py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] hover:opacity-95 disabled:opacity-50 transition-all">
                  {saving ? "Saving..." : (editingId ? "Update Result" : "Save Case Result")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Case Result?"
        message={`Are you sure you want to delete the result "${deleteDialog.title || "Selected Case"}"? This will remove the case study and its before/after images.`}
        confirmText="Delete Result"
        loading={deleteDialog.loading}
        onConfirm={handleConfirmDeleteResult}
        onClose={() => setDeleteDialog({ isOpen: false, id: null, title: "", loading: false })}
      />
    </div>
  );
}
