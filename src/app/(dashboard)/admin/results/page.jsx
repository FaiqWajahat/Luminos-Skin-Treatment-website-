"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X, Images, Upload, Camera } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

const emptyForm = {
  title: "", treatment: "", duration: "", concern: "",
  outcome: "", imageBefore: "", imageAfter: "", featured: true,
};

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
      if (json.url) {
        setForm((prev) => ({ ...prev, [targetKey]: json.url }));
      }
    } catch {
      alert("Failed to upload image to Cloudinary");
    } finally {
      if (targetKey === "imageBefore") setUploadingBefore(false);
      else setUploadingAfter(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setForm(emptyForm);
    fetchResults();
  };

  const promptDeleteResult = (r) => {
    setDeleteDialog({
      isOpen: true,
      id: r._id,
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
          onClick={() => { setForm(emptyForm); setShowForm(true); }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-md shadow-[#EC9C9D]/20 hover:opacity-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload New Result</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs text-neutral-500">Loading case studies...</div>
        ) : results.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-neutral-500">No results uploaded yet. Use button above to upload before/after photos.</div>
        ) : (
          results.map((r) => (
            <div
              key={r._id}
              className="bg-[#161412] border border-neutral-800/80 rounded-3xl overflow-hidden hover:border-[#EC9C9D]/40 transition-all group flex flex-col justify-between"
            >
              {/* Images Preview */}
              <div className="grid grid-cols-2 h-44 bg-neutral-900 border-b border-neutral-800">
                <div className="relative border-r border-neutral-800 overflow-hidden flex items-center justify-center">
                  {r.imageBefore ? (
                    <img src={r.imageBefore} alt="Before" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono">Before</span>
                  )}
                  <span className="absolute bottom-2 left-2 text-[9px] font-medium bg-black/70 text-neutral-200 px-2 py-0.5 rounded-md">
                    Before
                  </span>
                </div>
                <div className="relative overflow-hidden flex items-center justify-center">
                  {r.imageAfter ? (
                    <img src={r.imageAfter} alt="After" className="w-full h-full object-cover" />
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
                    <button
                      onClick={() => promptDeleteResult(r)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#EC9C9D] font-medium block mt-0.5">
                    {r.treatment} &bull; {r.duration}
                  </span>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{r.outcome}</p>
                </div>
                <div className="pt-3 border-t border-neutral-800/70 text-[11px] text-neutral-500">
                  <span>Target Concern: <strong className="text-neutral-300">{r.concern}</strong></span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-[#161412] border border-neutral-800 rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-white">Upload Patient Result</h3>
              <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Case Title *</label>
                <input value={form.title} onChange={(e) => update("title", e.target.value)} required placeholder="e.g. Severe Acne Clarifying Journey"
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Treatment *</label>
                  <input value={form.treatment} onChange={(e) => update("treatment", e.target.value)} required placeholder="HydraFacial Elite"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Timeline *</label>
                  <input value={form.duration} onChange={(e) => update("duration", e.target.value)} required placeholder="6 Weeks (3 Sessions)"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Skin Concern *</label>
                <input value={form.concern} onChange={(e) => update("concern", e.target.value)} required placeholder="Hyperpigmentation & Texture"
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
              </div>

              {/* Cloudinary File Uploads */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Before Photo</label>
                  <label className="flex flex-col items-center justify-center h-24 border border-dashed border-[#EC9C9D]/40 rounded-xl cursor-pointer hover:bg-[#EC9C9D]/5 transition-colors p-2 text-center">
                    {form.imageBefore ? (
                      <img src={form.imageBefore} alt="Before" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#EC9C9D] mb-1" />
                        <span className="text-[10px] text-neutral-400">{uploadingBefore ? "Uploading..." : "Upload to Cloudinary"}</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files?.[0], "imageBefore")} className="hidden" disabled={uploadingBefore} />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">After Photo</label>
                  <label className="flex flex-col items-center justify-center h-24 border border-dashed border-[#EC9C9D]/40 rounded-xl cursor-pointer hover:bg-[#EC9C9D]/5 transition-colors p-2 text-center">
                    {form.imageAfter ? (
                      <img src={form.imageAfter} alt="After" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#EC9C9D] mb-1" />
                        <span className="text-[10px] text-neutral-400">{uploadingAfter ? "Uploading..." : "Upload to Cloudinary"}</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e.target.files?.[0], "imageAfter")} className="hidden" disabled={uploadingAfter} />
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Outcome Description *</label>
                <textarea value={form.outcome} onChange={(e) => update("outcome", e.target.value)} required rows={3} placeholder="Patient reported 85% clearer complexion..."
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white border border-neutral-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploadingBefore || uploadingAfter}
                  className="px-6 py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] hover:opacity-95 disabled:opacity-50 transition-all">
                  {saving ? "Saving..." : "Save Case Result"}
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
