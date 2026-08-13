'use client';

import { useEffect, useRef, useState } from 'react';

export default function SkillRadar({
  skills,
  color = '#2AA2FF',
  textColor = '#f5f5f7',
  lineColor = 'rgba(255,255,255,0.12)',
  strokeColor,
}) {
  const svgRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = svgRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            let start;
            const animate = (ts) => {
              if (!start) start = ts;
              const p = Math.min(1, (ts - start) / 1500);
              const eased = 1 - Math.pow(1 - p, 3);
              setProgress(eased);
              if (p < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const cx = 200, cy = 200, R = 140;
  const n = skills.length;
  const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const ring = (r) =>
    skills
      .map((_, i) => {
        const a = angleFor(i);
        return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
      })
      .join(' ');
  const dataPoints = skills
    .map((s, i) => {
      const a = angleFor(i);
      const r = R * s.value * progress;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    })
    .join(' ');
  const stroke = strokeColor || color;

  return (
    <svg ref={svgRef} viewBox="0 0 400 400" role="img" aria-label="Compétences techniques">
      <defs>
        <radialGradient id="radarFill">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </radialGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <polygon key={i} points={ring(R * f)} fill="none" stroke={lineColor} strokeWidth="1" />
      ))}
      {skills.map((_, i) => {
        const a = angleFor(i);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(a) * R}
            y2={cy + Math.sin(a) * R}
            stroke={lineColor}
            strokeWidth="1"
          />
        );
      })}
      <polygon points={dataPoints} fill="url(#radarFill)" stroke={stroke} strokeWidth="2" />
      {skills.map((s, i) => {
        const a = angleFor(i);
        const r = R * s.value * progress;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return <circle key={i} cx={x} cy={y} r="4" fill={stroke} />;
      })}
      {skills.map((s, i) => {
        const a = angleFor(i);
        const lr = R + 28;
        const x = cx + Math.cos(a) * lr;
        const y = cy + Math.sin(a) * lr;
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={textColor}
            fontSize="13"
            fontWeight="500"
            fontFamily="Geist, sans-serif"
          >
            {s.name}
          </text>
        );
      })}
    </svg>
  );
}
