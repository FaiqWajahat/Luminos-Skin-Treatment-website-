"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

export default function PagesContentAdmin() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null); // 'hero', 'founder'
  
  const [homeData, setHomeData] = useState({ faqs: [], consultantLoungeImage: "" });
  const [aboutData, setAboutData] = useState({ founderName: "", founderTitle: "", founderBio: "", founderImage: "" });

  useEffect(() => {
    fetchContent("homepage");
    fetchContent("aboutpage");
  }, []);

  const fetchContent = async (type) => {
    try {
      const res = await fetch(`/api/content?type=${type}`);
      const data = await res.json();
      if (data.content?.data) {
        if (type === "homepage") setHomeData(data.content.data);
        if (type === "aboutpage") setAboutData(data.content.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const type = activeTab;
      const data = activeTab === "homepage" ? homeData : aboutData;

      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });

      if (!res.ok) throw new Error("Failed to save content");
      alert("Changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ── FAQ Handlers ──
  const addFaq = () => {
    setHomeData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { id: Date.now().toString(), question: "", answer: "" }],
    }));
  };

  const updateFaq = (index, field, value) => {
    setHomeData((prev) => {
      const newFaqs = [...prev.faqs];
      newFaqs[index][field] = value;
      return { ...prev, faqs: newFaqs };
    });
  };

  const removeFaq = (index) => {
    setHomeData((prev) => {
      const newFaqs = [...prev.faqs];
      newFaqs.splice(index, 1);
      return { ...prev, faqs: newFaqs };
    });
  };

  // ── Image Uploads ──
  const handleImageUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(field);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");
      const { url } = await res.json();

      if (field === "consultantLoungeImage") {
        setHomeData((prev) => ({ ...prev, [field]: url }));
      } else if (field === "founderImage") {
        setAboutData((prev) => ({ ...prev, [field]: url }));
      } else if (field === "heroImage") {
        if (activeTab === "homepage") {
          setHomeData((prev) => ({ ...prev, [field]: url }));
        } else {
          setAboutData((prev) => ({ ...prev, [field]: url }));
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(null);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-neutral-400 animate-pulse">Loading content...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-white">Pages Content</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage public website pages and dynamic content.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#EC9C9D] text-[#1C1917] font-semibold hover:bg-white transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800">
        <button
          onClick={() => setActiveTab("homepage")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "homepage" ? "border-[#EC9C9D] text-[#EC9C9D]" : "border-transparent text-neutral-400 hover:text-white"
          }`}
        >
          Homepage
        </button>
        <button
          onClick={() => setActiveTab("aboutpage")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "aboutpage" ? "border-[#EC9C9D] text-[#EC9C9D]" : "border-transparent text-neutral-400 hover:text-white"
          }`}
        >
          About Page
        </button>
      </div>

      {/* ── HOMEPAGE CONFIG ── */}
      {activeTab === "homepage" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Hero Section Config */}
          <div className="bg-[#161412] border border-neutral-800/80 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-6">Hero Section Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 lg:col-span-4">
                <label className="block text-xs font-medium text-neutral-500 mb-3">Hero Background Image</label>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 shadow-sm group w-full max-w-[240px]">
                  {homeData.heroImage ? (
                    <Image src={homeData.heroImage} alt="Hero Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600"><ImageIcon className="w-8 h-8" /></div>
                  )}
                  {uploadingImage === "heroImage" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-[#1C1917] text-xs font-bold shadow-md hover:scale-105 transition-transform">
                      Change Photo
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "heroImage")} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Eyebrow Highlight</label>
                  <input type="text" value={homeData.heroHighlight || ""} onChange={(e) => setHomeData(p => ({ ...p, heroHighlight: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Main Heading</label>
                  <input type="text" value={homeData.heroTitle || ""} onChange={(e) => setHomeData(p => ({ ...p, heroTitle: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Highlighted Heading (Italicized)</label>
                  <input type="text" value={homeData.heroTitleHighlight || ""} onChange={(e) => setHomeData(p => ({ ...p, heroTitleHighlight: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Subtitle / Description</label>
                  <textarea rows={4} value={homeData.heroSubtitle || ""} onChange={(e) => setHomeData(p => ({ ...p, heroSubtitle: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-y" />
                </div>
              </div>
            </div>
          </div>

          {/* Hero / Lounge Image */}
          <div className="bg-[#161412] border border-neutral-800/80 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4">Consultation Lounge Image</h2>
            <div className="flex items-start gap-6">
              <div className="relative w-48 aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0">
                {homeData.consultantLoungeImage ? (
                  <Image src={homeData.consultantLoungeImage} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-600"><ImageIcon className="w-8 h-8" /></div>
                )}
                {uploadingImage === "consultantLoungeImage" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="space-y-3 flex-1">
                <p className="text-sm text-neutral-400">
                  This image appears next to the FAQs on the homepage. Recommended aspect ratio is 4:5 (portrait).
                </p>
                <label className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-white transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  Upload New Image
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "consultantLoungeImage")} disabled={uploadingImage} />
                </label>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-[#161412] border border-neutral-800/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Homepage FAQs</h2>
              <button
                onClick={addFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-sm font-medium text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add FAQ
              </button>
            </div>
            
            <div className="space-y-4">
              {(homeData.faqs || []).map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-800 bg-[#0E0D0C] relative group">
                  <button
                    onClick={() => removeFaq(idx)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    title="Remove FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="space-y-4 pr-12">
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#EC9C9D]"
                        placeholder="e.g. Do consultations cost money?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1">Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        rows={3}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-y"
                        placeholder="Provide a detailed answer..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!homeData.faqs || homeData.faqs.length === 0) && (
                <div className="text-center py-8 text-neutral-500 text-sm border border-dashed border-neutral-800 rounded-xl">
                  No FAQs found. Add your first FAQ.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── ABOUT PAGE CONFIG ── */}
      {activeTab === "aboutpage" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* About Hero Section Config */}
          <div className="bg-[#161412] border border-neutral-800/80 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-6">Hero Section Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 lg:col-span-4">
                <label className="block text-xs font-medium text-neutral-500 mb-3">Hero Background Image</label>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 shadow-sm group w-full">
                  {aboutData.heroImage ? (
                    <Image src={aboutData.heroImage} alt="Hero Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-600"><ImageIcon className="w-8 h-8" /></div>
                  )}
                  {uploadingImage === "heroImage" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-[#1C1917] text-xs font-bold shadow-md hover:scale-105 transition-transform">
                      Change Photo
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "heroImage")} disabled={uploadingImage} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Eyebrow Highlight</label>
                  <input type="text" value={aboutData.heroHighlight || ""} onChange={(e) => setAboutData(p => ({ ...p, heroHighlight: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Main Heading</label>
                  <input type="text" value={aboutData.heroTitle || ""} onChange={(e) => setAboutData(p => ({ ...p, heroTitle: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Highlighted Heading (Italicized)</label>
                  <input type="text" value={aboutData.heroTitleHighlight || ""} onChange={(e) => setAboutData(p => ({ ...p, heroTitleHighlight: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">Subtitle / Description</label>
                  <textarea rows={3} value={aboutData.heroSubtitle || ""} onChange={(e) => setAboutData(p => ({ ...p, heroSubtitle: e.target.value }))} className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-y" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161412] border border-neutral-800/80 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-6">Founder Section Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 lg:col-span-3">
              <label className="block text-xs font-medium text-neutral-500 mb-3">Founder Portrait Image</label>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 mb-4 shadow-sm group">
                {aboutData.founderImage ? (
                  <Image src={aboutData.founderImage} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-600"><ImageIcon className="w-10 h-10" /></div>
                )}
                {uploadingImage === "founderImage" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-[#1C1917] text-xs font-bold shadow-md hover:scale-105 transition-transform">
                    Change Photo
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "founderImage")} disabled={uploadingImage} />
                  </label>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-9 space-y-5">
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">Founder Name</label>
                <input
                  type="text"
                  value={aboutData.founderName}
                  onChange={(e) => setAboutData((prev) => ({ ...prev, founderName: e.target.value }))}
                  className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">Job Title / Credentials</label>
                <input
                  type="text"
                  value={aboutData.founderTitle}
                  onChange={(e) => setAboutData((prev) => ({ ...prev, founderTitle: e.target.value }))}
                  className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#EC9C9D]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1">Biography</label>
                <textarea
                  value={aboutData.founderBio}
                  onChange={(e) => setAboutData((prev) => ({ ...prev, founderBio: e.target.value }))}
                  rows={8}
                  className="w-full bg-[#0E0D0C] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EC9C9D] resize-y"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

    </div>
  );
}
