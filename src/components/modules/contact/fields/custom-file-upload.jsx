"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Lock, FileCheck } from "lucide-react";
import toast from "react-hot-toast";

export function CustomFileUpload({
  label = "Skin Photo for Preliminary Assessment (Optional)",
  helperText = "Clear photo without makeup under natural lighting",
  onFileSelect,
  className = "",
  maxSizeMb = 5,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, or WebP).");
      return;
    }

    const sizeInMb = selectedFile.size / (1024 * 1024);
    if (sizeInMb > maxSizeMb) {
      toast.error(`Image size must be under ${maxSizeMb}MB. Current: ${sizeInMb.toFixed(1)}MB`);
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
    toast.success("Photo attached for consultation review", { icon: "📸" });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (e) => {
    e.stopPropagation();
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm font-semibold text-[#1C1917]">
        <div className="flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-[#EC9C9D]" />
          <span>{label}</span>
        </div>
        {helperText && (
          <span className="text-[11px] sm:text-xs font-normal text-[#78716C]">{helperText}</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
      />

      {file && preview ? (
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#EAA59E]/60 bg-white shadow-xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#E8DFD5] bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Uploaded consultation preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#EC9C9D]" />
                <p className="text-xs sm:text-sm font-semibold text-[#1C1917] truncate max-w-[180px] sm:max-w-md">
                  {file.name}
                </p>
              </div>
              <p className="text-[11px] sm:text-xs text-[#78716C] mt-0.5">
                {formatFileSize(file.size)} • Ready for clinician review
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title="Remove photo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center
            ${
              isDragging
                ? "border-[#EC9C9D] bg-[#EC9C9D]/5 scale-[0.99]"
                : "border-[#E8DFD5] bg-[#FAF8F5]/90 hover:bg-white hover:border-[#EAA59E]"
            }
          `}
        >
          <div className="w-10 h-10 rounded-full bg-[#EC9C9D]/10 flex items-center justify-center text-[#EC9C9D] mb-2.5">
            <UploadCloud className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#1C1917]">
            <span className="text-[#EC9C9D] font-semibold underline underline-offset-4">
              Click to upload
            </span>{" "}
            or drag and drop skin photo
          </p>
          <p className="text-[11px] text-[#78716C] mt-0.5">
            PNG, JPG, or WebP (up to {maxSizeMb}MB)
          </p>
        </div>
      )}

      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#78716C] pt-0.5">
        <Lock className="w-3.5 h-3.5 text-[#EC9C9D] shrink-0" />
        <span>Strict clinical privacy: Viewed exclusively by your practitioner.</span>
      </div>
    </div>
  );
}
