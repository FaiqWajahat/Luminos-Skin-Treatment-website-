"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export function ConfirmDialog({
  isOpen,
  title = "Confirm Deletion",
  message = "Are you sure you want to proceed with this deletion? This action cannot be reversed.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger", // "danger" | "warning"
  loading = false,
  onConfirm,
  onClose,
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!loading) onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[#161412] border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 overflow-hidden"
          >
            {/* Ambient luxury danger glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header row with Icon & Close */}
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-white tracking-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800/80">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white border border-neutral-700/80 hover:bg-neutral-800/50 transition-colors cursor-pointer"
              >
                {cancelText}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={onConfirm}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-red-600 via-[#E04F52] to-[#D97E80] hover:brightness-110 shadow-lg shadow-red-950/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{confirmText}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDialog;
