import { IconStar } from './Icons';

const INITIALS = ['CD', 'AR', 'MK', 'LB', 'TS'];
const COLORS = ['#2AA2FF', '#2AA2FF', '#1E90FF', '#10b981', '#f59e0b'];

export default function AvatarCluster({ cluster, variant = 'dark' }) {
  const isDark = variant === 'dark';
  const txt = isDark ? '#ffffff' : '#0a0a0a';
  const mute = isDark ? 'rgba(255,255,255,0.6)' : '#6b6b6b';
  const ringColor = isDark ? '#071019' : '#fafaf9';
  return (
    <div className="avatar-cluster">
      <div className="avatar-cluster__avatars">
        {INITIALS.map((i, idx) => (
          <div
            key={idx}
            className="avatar-cluster__avatar"
            style={{
              background: `linear-gradient(135deg, ${COLORS[idx]}, ${COLORS[(idx + 2) % 5]})`,
              border: `2px solid ${ringColor}`,
              marginLeft: idx === 0 ? 0 : -10,
              zIndex: 5 - idx,
            }}
          >
            {i}
          </div>
        ))}
      </div>
      <div className="avatar-cluster__rating">
        <div className="avatar-cluster__row">
          <div className="avatar-cluster__stars">
            {[...Array(5)].map((_, i) => (
              <IconStar key={i} size={13} />
            ))}
          </div>
          <span className="avatar-cluster__value" style={{ color: txt }}>
            {cluster.rating}
          </span>
        </div>
        <span className="avatar-cluster__label" style={{ color: mute }}>
          {cluster.label}
        </span>
      </div>
    </div>
  );
}
