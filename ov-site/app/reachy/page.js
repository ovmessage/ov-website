import Link from 'next/link';
import './reachy.scss';

export const metadata = {
  title: 'Reachy Mini : Assistant vocal robotique',
  description:
    "Reachy Mini transformé en assistant vocal extensible : conversation en français, système d'outils qui agit sur la machine, voix sur-mesure et pipeline vocal local. Construit sur le SDK Python officiel.",
};

const FEATURES = [
  { icon: 'voice', title: 'Conversation vocale', text: "Il écoute, comprend et répond à voix haute, en français, comme un vrai assistant." },
  { icon: 'act', title: 'Il agit, pas seulement parle', text: "Au-delà de la parole : il écrit des fichiers, lance des commandes et cherche sur le web, en déléguant à un agent IA." },
  { icon: 'plugin', title: 'Système d’outils extensible', text: "Une nouvelle capacité, c'est un fichier Python déposé dans un dossier : le robot le charge tout seul." },
  { icon: 'sound', title: 'Voix sur-mesure', text: "Une voix posée et grave, synthétisée, avec la tête et les antennes qui bougent au rythme des mots." },
  { icon: 'local', title: 'Pipeline vocal local', text: "Reconnaissance et synthèse vocale qui tournent sur la machine, sans dépendre d'un service cloud." },
  { icon: 'open', title: 'Open source, modifiable', text: "Construit sur le SDK Python officiel du robot. Rien n'est verrouillé, tout se réécrit." },
];

const STACK = ['Python', 'SDK reachy-mini', 'Whisper', 'Voxtral', 'Gemini TTS', 'OpenRouter'];

const STEPS = [
  { n: '01', title: 'Tu parles', text: "Une phrase adressée au robot, captée par le micro." },
  { n: '02', title: 'Il comprend', text: "La parole devient texte, un modèle décide quoi répondre ou quel outil déclencher." },
  { n: '03', title: 'Il répond ou il agit', text: "Réponse à voix haute, ou action réelle : écrire un fichier, chercher sur le web, lancer une commande." },
];

const MORE = [
  'Tête motorisée',
  'Antennes expressives',
  'Caméra embarquée',
  'Haut-parleur intégré',
  'Émotions',
];

function FeatureIcon({ kind }) {
  const p = {
    width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
  };
  switch (kind) {
    case 'voice':
      return <svg {...p}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8" /></svg>;
    case 'act':
      return <svg {...p}><path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9z" /></svg>;
    case 'plugin':
      return <svg {...p}><path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0zM12 16v5" /></svg>;
    case 'sound':
      return <svg {...p}><path d="M4 9v6h4l5 4V5L8 9zM17 8a5 5 0 0 1 0 8M19.5 5.5a9 9 0 0 1 0 13" /></svg>;
    case 'local':
      return <svg {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
    case 'open':
      return <svg {...p}><path d="m9 18-6-6 6-6M15 6l6 6-6 6" /></svg>;
    default:
      return null;
  }
}

export default function ReachyPage() {
  return (
    <main className="rchy">
      <div className="rchy-grid" aria-hidden="true" />
      <div className="rchy-bg" aria-hidden="true" />

      <div className="rchy-topbar">
        <Link href="/" className="rchy-back">← Retour à l'accueil</Link>
      </div>

      <header className="rchy-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rchy-hero-banner" src="/reachy/reachy.jpg" alt="Reachy Mini sur un bureau" width={1000} height={1000} />
        <div className="rchy-kicker">Robotique & IA</div>
        <h1 className="rchy-title">Reachy Mini</h1>
        <p className="rchy-tagline">Un robot de bureau qui parle, comprend et agit.</p>
        <p className="rchy-sub">
          J'ai transformé un petit robot de bureau en assistant vocal que j'enrichis comme je veux :
          il tient une conversation en français, se pilote à la voix et déclenche de vraies actions
          sur l'ordinateur. Le tout programmé directement sur le robot.
        </p>
      </header>

      <section className="rchy-section">
        <div className="rchy-section-tag">En action</div>
        <h2 className="rchy-section-title">La démo</h2>
        <p className="rchy-section-sub">Le robot en conditions réelles, sur mon bureau.</p>
        <div className="rchy-video-wrap">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className="rchy-video" controls preload="none" poster="/reachy/demo-poster.jpg">
            <source src="/reachy/demo.mp4" type="video/mp4" />
            Votre navigateur ne peut pas lire cette vidéo.
          </video>
        </div>
      </section>

      <section className="rchy-section">
        <div className="rchy-section-tag">Ce que j'ai construit</div>
        <h2 className="rchy-section-title">Bien plus qu'un jouet qui parle</h2>
        <p className="rchy-section-sub">
          L'objectif : un compagnon vocal que j'étends moi-même, capable d'agir pour de vrai
          plutôt que de se contenter de répondre.
        </p>
        <div className="rchy-features">
          {FEATURES.map((f) => (
            <article className="rchy-feature" key={f.title}>
              <div className="rchy-feature-icon"><FeatureIcon kind={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rchy-section">
        <div className="rchy-section-tag">Sous le capot</div>
        <h2 className="rchy-section-title">La stack</h2>
        <p className="rchy-section-sub">
          Voix, compréhension et actions assemblées à la main autour du SDK du robot, avec un mode
          entièrement local pour se passer du cloud.
        </p>
        <div className="rchy-specs">
          {STACK.map((s) => (
            <span className="rchy-spec" key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section className="rchy-section">
        <div className="rchy-section-tag">Comment ça marche</div>
        <h2 className="rchy-section-title">De la voix à l'action</h2>
        <p className="rchy-section-sub">Trois temps, du son capté jusqu'à l'acte réel.</p>
        <div className="rchy-steps">
          {STEPS.map((s) => (
            <article className="rchy-step" key={s.n}>
              <div className="rchy-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rchy-section">
        <div className="rchy-section-tag">Et aussi</div>
        <h2 className="rchy-section-title">Le matériel</h2>
        <div className="rchy-more" style={{ marginTop: 32 }}>
          {MORE.map((m) => (
            <span className="rchy-more-chip" key={m}>{m}</span>
          ))}
        </div>
      </section>

      <footer className="rchy-foot">
        <p>Reachy Mini est un robot open source de Pollen Robotics / Hugging Face.</p>
        <p>Ce projet présente le logiciel que j'ai développé pour lui.</p>
      </footer>
    </main>
  );
}
