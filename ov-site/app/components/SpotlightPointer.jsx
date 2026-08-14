'use client';

import { useEffect } from 'react';

export default function SpotlightPointer() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    let lastX = 0;
    let lastY = 0;
    let pending = false;
    let rafId = 0;

    const apply = () => {
      pending = false;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const root = document.documentElement.style;
      root.setProperty('--x', lastX.toFixed(2));
      root.setProperty('--y', lastY.toFixed(2));
      root.setProperty('--xp', (lastX / w).toFixed(3));
      root.setProperty('--yp', (lastY / h).toFixed(3));
    };

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!pending) {
        pending = true;
        rafId = requestAnimationFrame(apply);
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
