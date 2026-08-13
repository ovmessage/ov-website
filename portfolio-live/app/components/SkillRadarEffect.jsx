'use client';

import { STACK_LOGOS } from './SkillStackLogos';

const CIRCLE_COUNT = 8;

function IconContainer({ skill }) {
  const Logo = STACK_LOGOS[skill.name];
  return (
    <div className="skill-radar__icon-container">
      <div className="skill-radar__icon-logo">{Logo ? <Logo /> : null}</div>
      <div className="skill-radar__icon-label">{skill.name}</div>
    </div>
  );
}

function Radar() {
  return (
    <div className="skill-radar__radar" aria-hidden="true">
      <div className="skill-radar__sweep">
        <div className="skill-radar__sweep-line" />
      </div>
      {Array.from({ length: CIRCLE_COUNT }).map((_, idx) => (
        <div
          key={idx}
          className="skill-radar__circle"
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            borderColor: `rgba(148, 163, 184, ${Math.max(0.05, 1 - (idx + 1) * 0.11)})`,
            animationDelay: `${idx * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function SkillRadarEffect({ skills }) {
  // Deux rangées aussi équilibrées que possible (ex. 7 items -> 4 + 3).
  const cut = Math.ceil(skills.length / 2);
  const top = skills.slice(0, cut);
  const bottom = skills.slice(cut);

  return (
    <div className="skill-radar" role="list" aria-label="Stack moderne">
      <div className="skill-radar__icons">
        <div className="skill-radar__row">
          {top.map((s) => (
            <IconContainer key={s.name} skill={s} />
          ))}
        </div>
        {bottom.length > 0 && (
          <div className="skill-radar__row skill-radar__row--2">
            {bottom.map((s) => (
              <IconContainer key={s.name} skill={s} />
            ))}
          </div>
        )}
      </div>
      <Radar />
      <div className="skill-radar__bottom-line" aria-hidden="true" />
    </div>
  );
}
