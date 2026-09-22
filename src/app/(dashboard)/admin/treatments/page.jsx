"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Sparkles, Upload, Clock, DollarSign, Search } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Pagination } from "@/components/shared/pagination";

const CATEGORIES = ["All Clinic Facials", "Facial Skin Treatments", "Massage Therapy"];

const emptyForm = {
  title: "", slug: "", category: "All Clinic Facials", price: "", duration: "",
  tagline: "", shortDescription: "", fullDescription: "", benefits: "",
  idealFor: "", image: "", popular: false, active: true,
};

const ITEMS_PER_PAGE = 9;

const formatImageSrc = (src) => {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }
  return `data:image/jpeg;base64,${src}`;
};

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, id: null, title: "", loading: false });

  const fetchTreatments = () => {
    fetch("/api/treatments")
      .then((r) => r.json())
      .then((d) => { setTreatments(d.treatments || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchTreatments(); }, []);

  const filteredTreatments = treatments.filter((t) => {
    const matchesSearch =
      !search.trim() ||
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.category?.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDescription?.toLowerCase().includes(search.toLowerCase()) ||
      t.tagline?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (t.category || "").trim().toLowerCase() === selectedCategory.trim().toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditing(t._id);
    setForm({
      ...t,
      benefits: Array.isArray(t.benefits) ? t.benefits.join("\n") : t.benefits || "",
      price: String(t.price || ""),
      duration: String(t.duration || ""),
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || `Upload failed with status ${res.status}`);
      }
      setForm((prev) => ({ ...prev, image: json.url }));
    } catch (err) {
      alert("Upload error: " + (err.message || "Failed to reach server"));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    let benefitsArray = [];
    if (form.benefits) {
      if (typeof form.benefits === "string") {
        benefitsArray = form.benefits.includes("\n")
          ? form.benefits.split("\n").map((b) => b.trim()).filter(Boolean)
          : [form.benefits.trim()];
      } else if (Array.isArray(form.benefits)) {
        benefitsArray = form.benefits;
      }
    }

    const payload = {
      ...form,
      price: Number(form.price) || 0,
      duration: Number(form.duration) || 0,
      benefits: benefitsArray,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    };

    try {
      let res;
      if (editing) {
        res = await fetch(`/api/treatments/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/treatments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to save treatment to database.");
      }
      alert(editing ? "Treatment updated successfully in database!" : "New treatment saved successfully in database!");
      setShowForm(false);
      fetchTreatments();
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving treatment: " + (err.message || "Failed to reach server"));
    } finally {
      setSaving(false);
    }
  };

  const promptDelete = (t) => {
    setDeleteDialog({
      isOpen: true,
      id: t._id,
      title: t.title,
      loading: false,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.id) return;
    setDeleteDialog((prev) => ({ ...prev, loading: true }));
    try {
      await fetch(`/api/treatments/${deleteDialog.id}`, { method: "DELETE" });
      fetchTreatments();
    } finally {
      setDeleteDialog({ isOpen: false, id: null, title: "", loading: false });
    }
  };

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-6">
      {/* Header & Actions Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Treatment Catalog
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">Search catalog, edit pricing, and upload images to Cloudinary</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search treatments..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#161412] border border-neutral-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#EC9C9D]/60 w-44 sm:w-56 transition-colors"
            />
          </div>

          {/* Category Filter Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#161412] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#EC9C9D]/60 appearance-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EC9C9D] via-[#F0A5A2] to-[#D97E80] text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-md shadow-[#EC9C9D]/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Treatment</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-16 text-center text-xs text-neutral-500">Loading catalog...</div>
      ) : filteredTreatments.length === 0 ? (
        <div className="py-16 text-center text-xs text-neutral-500">
          {search ? `No treatments found matching "${search}".` : "No treatments in catalog yet. Click above to add."}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTreatments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((t) => (
              <div
                key={t._id || t.id}
                className="bg-[#161412] border border-neutral-800/80 rounded-3xl p-5 space-y-3 hover:border-[#EC9C9D]/30 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {t.image && (
                    <div className="h-40 rounded-2xl overflow-hidden bg-neutral-900 relative">
                      <img
                        src={formatImageSrc(t.image)}
                        alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        {t.image.startsWith("http") ? (
                          <span className="text-[9px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full backdrop-blur-xs">
                            ☁️ Cloudinary
                          </span>
                        ) : (
                          <span className="text-[9px] font-medium bg-amber-950/80 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full backdrop-blur-xs">
                            Local / Base64
                          </span>
                        )}
                      </div>
                      {t.popular && (
                        <span className="absolute top-2 right-2 text-[9px] font-medium bg-[#EC9C9D] text-white px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base font-serif font-semibold text-white truncate">{t.title}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-[#EC9C9D] font-medium">{t.category}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-neutral-400 hover:text-[#EC9C9D] hover:bg-[#EC9C9D]/10 transition-colors" title="Edit Treatment">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => promptDelete(t)} className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete Treatment">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-2">{t.shortDescription || t.tagline}</p>
                </div>

                <div className="pt-3 border-t border-neutral-800/70 flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-1 text-[#F0A5A2] font-semibold">
                    <span>£{t.price?.toLocaleString()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEdit(t)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-white bg-[#221F1C] hover:bg-[#EC9C9D] hover:text-white border border-[#EC9C9D]/30 transition-all shrink-0 cursor-pointer shadow-xs"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE) || 1}
            totalItems={filteredTreatments.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
            theme="dark"
          />
        </div>
      )}

      {/* Custom Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Treatment?"
        message={`Are you sure you want to remove "${deleteDialog.title}" from the clinic catalog? This action cannot be undone.`}
        confirmText="Delete Treatment"
        loading={deleteDialog.loading}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteDialog({ isOpen: false, id: null, title: "", loading: false })}
      />

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-[#161412] border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-7 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-white">{editing ? "Edit Treatment" : "Add Treatment"}</h3>
              <button onClick={() => setShowForm(false)} className="text-neutral-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Title *</label>
                  <input value={form.title} onChange={(e) => update("title", e.target.value)} required
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Category *</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)}
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D] appearance-none">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Price (£) *</label>
                  <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} required
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Duration (minutes)</label>
                  <input type="number" value={form.duration} onChange={(e) => update("duration", e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
              </div>

              {/* Cloudinary Image Upload */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Treatment Image (Cloudinary)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#EC9C9D]/50 text-xs text-[#F0A5A2] hover:bg-[#EC9C9D]/10 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading to Cloudinary..." : "Upload Image"}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {form.image && (
                    <div className="relative">
                      <img src={formatImageSrc(form.image)} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-neutral-700" />
                      {form.image.startsWith("http") && (
                        <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-emerald-900/90 text-emerald-300 px-1 py-0.2 rounded border border-emerald-600/50">
                          Cloud
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Short Description *</label>
                <textarea value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} required rows={2}
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-none" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                    Treatment Details & Aftercare
                  </label>
                  <span className="text-[9px] text-neutral-500">Includes, protocol steps, aftercare instructions, etc.</span>
                </div>
                <textarea
                  value={form.benefits}
                  onChange={(e) => update("benefits", e.target.value)}
                  rows={6}
                  placeholder={`🍂 Treatment Includes:
1. Personal Consultation & Skin Analysis
2. Double Cleanse Ritual
3. Treatment Steps

✨ Aftercare:
• Wear SPF 50 daily
• Avoid direct sun exposure for 48 hours`}
                  className="w-full bg-[#0F0E0D] border border-neutral-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-y"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.popular} onChange={(e) => update("popular", e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-600 bg-[#0F0E0D] text-[#EC9C9D]" />
                  <span className="text-xs text-neutral-300">Highlight as Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={(e) => update("active", e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-600 bg-[#0F0E0D] text-[#EC9C9D]" />
                  <span className="text-xs text-neutral-300">Active</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl text-xs text-neutral-400 hover:text-white border border-neutral-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploading}
                  className="px-6 py-2.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] hover:opacity-95 disabled:opacity-50 transition-all">
                  {saving ? "Saving..." : editing ? "Update Treatment" : "Save Treatment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
