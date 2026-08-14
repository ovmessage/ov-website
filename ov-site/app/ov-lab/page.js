import Link from 'next/link';
import { IconYoutube } from '../components/Icons';
import ScreenshotGallery from './ScreenshotGallery';
import './ovlab.scss';

export const metadata = {
  title: 'OV Lab IA : Studio de production de vidéos IA',
  description:
    "OV Lab IA : une chaîne de cours vidéo sur l'intelligence artificielle au niveau praticien, produits par un studio automatisé. D'un sujet à une vidéo montée, narrée et sous-titrée.",
};

const CHANNEL_URL = 'https://www.youtube.com/channel/UCLndwVqXZv6f1i5DMtDlwAw';

const FEATURES = [
  { icon: 'video', title: 'Cours vidéo', text: "Des cours de 5 à 10 minutes qui vont droit au concret, sans détour théorique." },
  { icon: 'shorts', title: 'Formats courts', text: "Des shorts verticaux, pensés pour TikTok et YouTube, qui donnent l'essentiel en une minute." },
  { icon: 'pipeline', title: 'Production automatisée', text: "Un sujet entre, une vidéo montée en sort : le studio enchaîne chaque étape tout seul." },
  { icon: 'voice', title: 'Voix de la chaîne', text: "Une narration cohérente d'une vidéo à l'autre, l'identité sonore reconnaissable d'OV Lab IA." },
  { icon: 'captions', title: 'Sous-titres FR & EN', text: "Chaque cours sous-titré en français et en anglais, généré automatiquement." },
  { icon: 'footage', title: 'Habillage soigné', text: "De vraies séquences vidéo libres de droit et des visuels générés, pas de fond fixe." },
  { icon: 'thumbnail', title: 'Miniatures & articles', text: "Miniature et version écrite produites en même temps que la vidéo." },
  { icon: 'target', title: 'Niveau praticien', text: "Le fil conducteur : montrer ce qui marche vraiment, pas des généralités." },
];

const STACK = ['Python', 'FFmpeg', 'TTS IA', 'Génération d’images', 'Séquences vidéo', 'Sous-titrage auto'];

const SHOTS = [
  { src: '/ovlab/thumb1.jpg', alt: 'Claude Code dans le terminal', href: 'https://www.youtube.com/watch?v=95li8zPMbZo' },
  { src: '/ovlab/thumb2.jpg', alt: 'Musique IA locale, à qui appartient-elle', href: 'https://www.youtube.com/watch?v=v2rX9RGdeLM' },
  { src: '/ovlab/thumb3.jpg', alt: 'Pourquoi ton agent IA se plante', href: 'https://www.youtube.com/watch?v=zO6jeCaFIok' },
  { src: '/ovlab/thumb4.jpg', alt: 'Sécuriser le terminal de son agent IA', href: 'https://www.youtube.com/watch?v=wj70DgL0v2g' },
  { src: '/ovlab/thumb5.jpg', alt: 'Faut-il donner accès à ton argent à une IA', href: 'https://www.youtube.com/watch?v=yvCFqudrBb8' },
  { src: '/ovlab/thumb6.jpg', alt: 'Ton IA te donne toujours raison', href: 'https://www.youtube.com/watch?v=OV6uTvDG2hA' },
];

const STEPS = [
  { n: '01', title: 'Un sujet', text: "Tout part d'un sujet : un outil, une méthode ou un concept d'IA à rendre limpide." },
  { n: '02', title: 'Le studio produit', text: "Il met en forme, illustre, narre, monte et sous-titre. En chaîne, sans montage manuel." },
  { n: '03', title: 'Publication', text: "Le cours long sur YouTube, les shorts sur TikTok, la communauté sur Skool." },
];

const MORE = [
  'Multilingue',
  'Miniatures',
  'Articles PDF',
  'Musique générée',
];

function FeatureIcon({ kind }) {
  const p = {
    width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
  };
  switch (kind) {
    case 'video':
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9.5 5 2.5-5 2.5z" /></svg>;
    case 'shorts':
      return <svg {...p}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 10.5v3l2.5-1.5z" /></svg>;
    case 'pipeline':
      return <svg {...p}><rect x="3" y="9" width="5" height="6" rx="1.2" /><rect x="16" y="9" width="5" height="6" rx="1.2" /><path d="M8 12h5m0 0-2.5-2.5M13 12l-2.5 2.5" /></svg>;
    case 'voice':
      return <svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8" /></svg>;
    case 'captions':
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M9.5 10.5a2.2 2.2 0 1 0 0 3M17 10.5a2.2 2.2 0 1 0 0 3" /></svg>;
    case 'footage':
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4" /></svg>;
    case 'thumbnail':
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="m4.5 18 5-5 4 4 3-3 3 3" /></svg>;
    case 'target':
      return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></svg>;
    default:
      return null;
  }
}

export default function OvLabPage() {
  return (
    <main className="ovl">
      <div className="ovl-grid" aria-hidden="true" />
      <div className="ovl-bg" aria-hidden="true" />

      <div className="ovl-topbar">
        <Link href="/" className="ovl-back">← Retour à l'accueil</Link>
      </div>

      <header className="ovl-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ovl-hero-banner" src="/ovlab/banner.jpg" alt="OV Lab IA" width={1280} height={720} />
        <div className="ovl-kicker">Studio vidéo</div>
        <h1 className="ovl-title">OV Lab IA</h1>
        <p className="ovl-tagline">L'IA au niveau praticien.</p>
        <p className="ovl-sub">
          Une chaîne de cours vidéo sur l'intelligence artificielle, pensés pour la pratique.
          Produits par un studio automatisé : d'un sujet à une vidéo montée, narrée et sous-titrée.
        </p>
        <div className="ovl-ctas">
          <a className="ovl-cta" href={CHANNEL_URL} target="_blank" rel="noreferrer noopener">
            <IconYoutube size={18} />
            Voir la chaîne
          </a>
        </div>
      </header>

      <section className="ovl-section">
        <div className="ovl-section-tag">La chaîne</div>
        <h2 className="ovl-section-title">Des cours qui vont au concret</h2>
        <p className="ovl-section-sub">
          Pas de survol théorique : des sujets d'IA expliqués au niveau de celui qui les utilise
          vraiment, en format long comme en format court.
        </p>
        <div className="ovl-features">
          {FEATURES.map((f) => (
            <article className="ovl-feature" key={f.title}>
              <div className="ovl-feature-icon"><FeatureIcon kind={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ovl-section">
        <div className="ovl-section-tag">Sous le capot</div>
        <h2 className="ovl-section-title">Le studio</h2>
        <p className="ovl-section-sub">
          Une chaîne de production développée de bout en bout : mise en forme, voix, illustration,
          montage et sous-titres, du sujet au fichier prêt à publier.
        </p>
        <div className="ovl-specs">
          {STACK.map((s) => (
            <span className="ovl-spec" key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section className="ovl-section">
        <div className="ovl-section-tag">Aperçu</div>
        <h2 className="ovl-section-title">Quelques cours</h2>
        <p className="ovl-section-sub">Un aperçu de ce qui est déjà en ligne. Cliquez pour regarder sur la chaîne.</p>
        <ScreenshotGallery shots={SHOTS} />
      </section>

      <section className="ovl-section">
        <div className="ovl-section-tag">Comment ça marche</div>
        <h2 className="ovl-section-title">Du sujet à la vidéo</h2>
        <p className="ovl-section-sub">Trois temps, une seule chaîne automatisée.</p>
        <div className="ovl-steps">
          {STEPS.map((s) => (
            <article className="ovl-step" key={s.n}>
              <div className="ovl-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ovl-section">
        <div className="ovl-section-tag">Et aussi</div>
        <h2 className="ovl-section-title">Bien plus encore</h2>
        <div className="ovl-more" style={{ marginTop: 32 }}>
          {MORE.map((m) => (
            <span className="ovl-more-chip" key={m}>{m}</span>
          ))}
        </div>
      </section>

      <footer className="ovl-foot">
        <p>© 2026 OV. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
