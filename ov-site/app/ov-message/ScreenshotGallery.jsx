'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getLenisInstance } from '../lib/lenis';

export default function ScreenshotGallery({ shots }) {
  const [index, setIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const open = index >= 0;

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setIndex(-1), []);
  const prev = useCallback(
    (e) => { if (e) e.stopPropagation(); setIndex((i) => (i - 1 + shots.length) % shots.length); },
    [shots.length]
  );
  const next = useCallback(
    (e) => { if (e) e.stopPropagation(); setIndex((i) => (i + 1) % shots.length); },
    [shots.length]
  );

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Lenis (smoothWheel) ignore overflow:hidden et continuerait a
    // scroller la page derriere la lightbox : il faut l'arreter.
    const lenis = getLenisInstance();
    lenis?.stop();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="ovm-shots">
        {shots.map((s, i) => (
          <button
            type="button"
            className="ovm-shot-btn"
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Agrandir : ${s.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ovm-shot" src={s.src} alt={s.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {mounted && open && createPortal(
        <div className="ovm-lightbox" onClick={close} role="dialog" aria-modal="true" aria-label="Capture d'écran">
          <button type="button" className="ovm-lb-close" onClick={close} aria-label="Fermer">×</button>
          {shots.length > 1 && (
            <button type="button" className="ovm-lb-nav ovm-lb-prev" onClick={prev} aria-label="Précédent">‹</button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="ovm-lb-img"
            src={shots[index].src}
            alt={shots[index].alt}
            onClick={(e) => e.stopPropagation()}
          />
          {shots.length > 1 && (
            <button type="button" className="ovm-lb-nav ovm-lb-next" onClick={next} aria-label="Suivant">›</button>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
