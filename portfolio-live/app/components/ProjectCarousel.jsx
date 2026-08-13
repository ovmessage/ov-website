'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { IconArrow } from './Icons';

const ChevronLeft = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function ProjectCarousel({
  items,
  visualLabel,
  prevLabel = 'Précédent',
  nextLabel = 'Suivant',
  autoPlayMs = 4500,
}) {
  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(Math.floor(total / 2));

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (autoPlayMs <= 0 || total <= 1) return;
    const id = setInterval(handleNext, autoPlayMs);
    return () => clearInterval(id);
  }, [handleNext, autoPlayMs, total, currentIndex]);

  return (
    <div className="v3-projects-carousel" role="region" aria-roledescription="carousel">
      <div className="v3-projects-carousel__viewport">
        {items.map((p, index) => {
          const offset = index - currentIndex;
          let pos = (offset + total) % total;
          if (pos > Math.floor(total / 2)) pos -= total;

          const isCenter = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;
          const visible = Math.abs(pos) <= 1;

          const style = {
            transform: `translateX(${pos * 60}%) scale(${
              isCenter ? 1 : isAdjacent ? 0.85 : 0.7
            }) rotateY(${pos * -10}deg)`,
            zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
            opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
            filter: isCenter ? 'blur(0px)' : 'blur(4px)',
            visibility: visible ? 'visible' : 'hidden',
            pointerEvents: isCenter ? 'auto' : 'none',
          };

          return (
            <div
              key={index}
              className="v3-projects-carousel__slot"
              style={style}
              aria-hidden={!isCenter}
            >
              {p.href ? (
                <Link
                  href={p.href}
                  className="v3-project v3-project--link"
                  tabIndex={isCenter ? 0 : -1}
                >
                  <div className="v3-project-img">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      `[ ${visualLabel} ]`
                    )}
                  </div>
                  <div className="v3-project-body">
                    <h3 className="v3-project-title">
                      {p.title} <IconArrow />
                    </h3>
                    <p className="v3-project-desc">{p.desc}</p>
                    <div className="v3-project-tags">
                      <span className="v3-tag">{p.year}</span>
                      <span className="v3-tag">{p.type}</span>
                      {p.tags.map((tg, j) => (
                        <span className="v3-tag" key={j}>
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ) : (
                <article className="v3-project">
                  <div className="v3-project-img">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      `[ ${visualLabel} ]`
                    )}
                  </div>
                  <div className="v3-project-body">
                    <h3 className="v3-project-title">
                      {p.title} <IconArrow />
                    </h3>
                    <p className="v3-project-desc">{p.desc}</p>
                    <div className="v3-project-tags">
                      <span className="v3-tag">{p.year}</span>
                      <span className="v3-tag">{p.type}</span>
                      {p.tags.map((tg, j) => (
                        <span className="v3-tag" key={j}>
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="v3-projects-carousel__nav prev"
        onClick={handlePrev}
        aria-label={prevLabel}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className="v3-projects-carousel__nav next"
        onClick={handleNext}
        aria-label={nextLabel}
      >
        <ChevronRight />
      </button>

      <div className="v3-projects-carousel__dots" role="tablist" aria-label="Slides">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Slide ${i + 1}`}
            className={`v3-projects-carousel__dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
