import Link from 'next/link';
import { IconGooglePlay, IconAppStore } from '../components/Icons';
import ScreenshotGallery from './ScreenshotGallery';
import './ovjungle.scss';

export const metadata = {
  title: 'OV Jungle : Jeu de cartes multijoueur en temps réel',
  description:
    "Jeu de cartes multijoueur en temps réel : 2 à 4 joueurs en ligne, serveur autoritaire, économie de jeu. Client mobile et backend développés de bout en bout.",
};

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.ov.jungle';
// À renseigner le jour de la publication iOS (le bouton est masqué en attendant).
const APP_STORE_URL = '#';

const FEATURES = [
  { icon: 'multiplayer', title: 'Multijoueur en temps réel', text: "2 à 4 joueurs s'affrontent en ligne, chaque coup synchronisé instantanément." },
  { icon: 'server', title: 'Protégé contre la triche', text: "Toute la partie est gérée par nos serveurs : la triche est déjouée, même avec une application modifiée." },
  { icon: 'coins', title: 'Économie de jeu', text: "Des OV Coins gagnés en regardant des pubs récompensées, misés en partie. Aucun retrait, aucune valeur réelle." },
  { icon: 'friends', title: 'Système d’amis', text: "Ajoutez des amis et invitez-les à jouer. L'invitation arrive même quand leur application est fermée." },
  { icon: 'spectator', title: 'Mode spectateur', text: "Regardez une partie se dérouler en temps réel, même après avoir été éliminé." },
  { icon: 'ai', title: 'IA à trois niveaux', text: "Jouez hors ligne contre des bots : facile, normal ou difficile, chacun avec sa stratégie." },
  { icon: 'lang', title: 'Multilingue', text: "Disponible en plusieurs langues, détectées automatiquement selon le téléphone." },
  { icon: 'platforms', title: 'iPhone & Android', text: "Une seule application, fluide et rapide, aussi bien sur iPhone que sur Android." },
];

const STACK = ['React Native', 'Expo', 'Node.js', 'WebSocket', 'PostgreSQL'];

const SHOTS = [
  { src: '/ovj/1.jpg', alt: 'OV Jungle, capture 1' },
  { src: '/ovj/2.jpg', alt: 'OV Jungle, capture 2' },
  { src: '/ovj/3.jpg', alt: 'OV Jungle, capture 3' },
  { src: '/ovj/4.jpg', alt: 'OV Jungle, capture 4' },
  { src: '/ovj/5.jpg', alt: 'OV Jungle, capture 5' },
  { src: '/ovj/6.jpg', alt: 'OV Jungle, capture 6' },
  { src: '/ovj/7.jpg', alt: 'OV Jungle, capture 7' },
  { src: '/ovj/8.jpg', alt: 'OV Jungle, capture 8' },
];

const STEPS = [
  { n: '01', title: 'Rejoindre', text: "Créez une table ou rejoignez-en une, de deux à quatre joueurs." },
  { n: '02', title: 'Jouer', text: "Posez vos cartes, suivez la couleur, videz votre main avant les autres." },
  { n: '03', title: "L'emporter", text: "Élimination manche par manche : le dernier joueur en lice remporte la partie." },
];

const MORE = [
  'Notifications',
  'Revanche instantanée',
  'Mode hors ligne',
];

function FeatureIcon({ kind }) {
  const p = {
    width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
  };
  switch (kind) {
    case 'multiplayer':
      return <svg {...p}><circle cx="8" cy="9" r="3" /><circle cx="17" cy="8" r="2.5" /><path d="M3 20v-1a5 5 0 0 1 10 0v1M15 20v-.5a4 4 0 0 1 6-3.3" /></svg>;
    case 'server':
      return <svg {...p}><rect x="4" y="4" width="16" height="7" rx="2" /><rect x="4" y="13" width="16" height="7" rx="2" /><path d="M8 7.5h.01M8 16.5h.01" /></svg>;
    case 'coins':
      return <svg {...p}><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></svg>;
    case 'friends':
      return <svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M3 20v-1a5.5 5.5 0 0 1 11 0v1M17 7v6M14 10h6" /></svg>;
    case 'spectator':
      return <svg {...p}><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="2.6" /></svg>;
    case 'ai':
      return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none" /><path d="M8 15h8" /></svg>;
    case 'lang':
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" /></svg>;
    case 'platforms':
      return <svg {...p}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>;
    default:
      return null;
  }
}

export default function OvJunglePage() {
  return (
    <main className="ovj">
      <div className="ovj-grid" aria-hidden="true" />
      <div className="ovj-bg" aria-hidden="true" />

      <div className="ovj-topbar">
        <Link href="/" className="ovj-back">← Retour à l'accueil</Link>
      </div>

      <header className="ovj-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ovj-hero-banner" src="/ovj/icon.png" alt="OV Jungle" width={1024} height={1024} />
        <div className="ovj-kicker">Produit</div>
        <h1 className="ovj-title">OV Jungle</h1>
        <p className="ovj-tagline">Jeu de cartes multijoueur, en temps réel.</p>
        <p className="ovj-sub">
          Un jeu de cartes rapide où deux à quatre joueurs s'affrontent en ligne. Client mobile,
          serveur temps réel et économie de jeu, développés de bout en bout.
        </p>
        <div className="ovj-ctas">
          {/* Google Play : masqué tant qu'OV Jungle n'est pas publié.
              Retirer la classe `ovj-cta-hidden` le jour de la mise en ligne. */}
          <a className="ovj-cta ovj-cta-hidden" href={PLAY_URL} target="_blank" rel="noreferrer noopener">
            <IconGooglePlay size={18} />
            Disponible sur Google Play
          </a>
          {/* App Store : masqué tant qu'OV Jungle n'est pas publié sur iOS.
              Retirer la classe `ovj-cta-hidden` et mettre le vrai lien le jour du lancement. */}
          <a className="ovj-cta ovj-cta-hidden" href={APP_STORE_URL} target="_blank" rel="noreferrer noopener">
            <IconAppStore size={18} />
            Disponible sur l'App Store
          </a>
        </div>
      </header>

      <section className="ovj-section">
        <div className="ovj-section-tag">Ce qui le distingue</div>
        <h2 className="ovj-section-title">Un vrai jeu en ligne, pas une démo</h2>
        <p className="ovj-section-sub">
          Multijoueur en temps réel, parties protégées de la triche, économie de jeu : toute la
          mécanique d'un jeu en ligne moderne, construite à la main.
        </p>
        <div className="ovj-features">
          {FEATURES.map((f) => (
            <article className="ovj-feature" key={f.title}>
              <div className="ovj-feature-icon"><FeatureIcon kind={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ovj-section">
        <div className="ovj-section-tag">Sous le capot</div>
        <h2 className="ovj-section-title">La stack</h2>
        <p className="ovj-section-sub">Développé de bout en bout : client mobile, serveur temps réel, base de données.</p>
        <div className="ovj-specs">
          {STACK.map((s) => (
            <span className="ovj-spec" key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section className="ovj-section">
        <div className="ovj-section-tag">Captures d'écran</div>
        <h2 className="ovj-section-title">En jeu</h2>
        <p className="ovj-section-sub">Un aperçu d'OV Jungle en action.</p>
        <ScreenshotGallery shots={SHOTS} />
      </section>

      <section className="ovj-section">
        <div className="ovj-section-tag">Comment on joue</div>
        <h2 className="ovj-section-title">Trois étapes</h2>
        <p className="ovj-section-sub">Rapide à prendre en main, tendu jusqu'à la dernière carte.</p>
        <div className="ovj-steps">
          {STEPS.map((s) => (
            <article className="ovj-step" key={s.n}>
              <div className="ovj-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ovj-section">
        <div className="ovj-section-tag">Et aussi</div>
        <h2 className="ovj-section-title">Bien plus encore</h2>
        <div className="ovj-more" style={{ marginTop: 32 }}>
          {MORE.map((m) => (
            <span className="ovj-more-chip" key={m}>{m}</span>
          ))}
        </div>
      </section>

      <footer className="ovj-foot">
        <p>© 2026 OV. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
