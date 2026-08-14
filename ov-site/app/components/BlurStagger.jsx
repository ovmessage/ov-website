'use client';

export default function BlurStagger({
  text,
  className = '',
  delay = 0,
  perChar = 0.015,
  duration = 0.3,
  as = 'span',
  block = false,
}) {
  const Tag = as;

  if (block) {
    return (
      <Tag
        className={`blur-stagger-block ${className}`}
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag className={`blur-stagger ${className}`} aria-label={text}>
      {text.split('').map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            animationDelay: `${delay + i * perChar}s`,
            animationDuration: `${duration}s`,
          }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </Tag>
  );
}
