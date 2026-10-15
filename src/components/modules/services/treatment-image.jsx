import Image from "next/image";

const FALLBACK = "/home-treatment-1.png";

/** Fills its (relative) parent. Handles Cloudinary, local and admin-uploaded base64 images. */
export function TreatmentImage({ src, alt, sizes, priority = false, className = "" }) {
  const image = src && src.trim() ? src : FALLBACK;

  if (image.startsWith("data:") || !(image.startsWith("/") || image.startsWith("http"))) {
    const dataSrc = image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;
    return <img src={dataSrc} alt={alt} className={`absolute inset-0 w-full h-full object-cover ${className}`} />;
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
