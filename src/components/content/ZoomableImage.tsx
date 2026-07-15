/* 콘텐츠 이미지 + 클릭 시 확대(라이트박스). 키보드(Esc)·배경 클릭으로 닫힘. */
import { useEffect, useState } from "react";
import type { ContentImage } from "@/types/content";

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="닫기">
        ✕
      </button>
      <img
        className="lightbox__img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export function ZoomableImage({ image }: { image: ContentImage }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="content-figure">
      <button
        type="button"
        className="content-figure__btn"
        onClick={() => setOpen(true)}
        aria-label={`${image.alt} — 클릭하면 확대해서 볼 수 있습니다`}
      >
        <img src={image.src} alt={image.alt} loading="lazy" />
        <span className="content-figure__zoom" aria-hidden="true">
          🔍 확대
        </span>
      </button>
      {image.caption && (
        <figcaption className="content-figure__caption">{image.caption}</figcaption>
      )}
      {open && <Lightbox src={image.src} alt={image.alt} onClose={() => setOpen(false)} />}
    </figure>
  );
}
