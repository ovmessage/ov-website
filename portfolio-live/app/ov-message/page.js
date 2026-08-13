import Link from 'next/link';
import ScreenshotGallery from './ScreenshotGallery';
import { IconGooglePlay } from '../components/Icons';
import './ovmessage.scss';

export const metadata = {
  title: 'OV Message : Messagerie chiffrée, 100% hors ligne',
  description:
    "Messagerie qui chiffre vos SMS de bout en bout. Sans compte, sans serveur. Chiffrement post-quantique ML-KEM-768 + X25519, AES-256-GCM.",
};

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.ov.message';

// Codes promo Google Play (téléchargement gratuit, premier arrivé premier servi).
// ⚠️ Statut mis à jour À LA MAIN : passer `used: true` quand un code est consommé.
// Google ne fournit pas d'API pour vérifier code par code ; le décompte global se
// voit dans la Play Console (Promotions). Un code cliqué ouvre l'écran d'échange Play.
const PROMO_CODES = [
  { code: 'M415BXJQE1HGZQK3YT7AJ80', used: true },
  { code: 'T6YVTEJGZPFQUGVAS25MLM5', used: true },
  { code: '8YHR78UJLP50TLSKBHTWY3Y' },
  { code: 'WF58SY4C0SNUGF5VGMK6WR0' },
  { code: 'PAKD8LQAQ3P5NC74P2EV9CY' },
  { code: 'YUEN04RGG4J2KEZQZMEVSP4' },
  { code: '9BLJBXR7HNGZ92W02S1W1FR' },
  { code: 'RPSW2GURCQ659RW2QKKJ1XW' },
  { code: '8HVB09Y8KDSFLGJQTJGQ0NM' },
  { code: '9204GCJCAFUAFPRX46FGD9G' },
  { code: 'X0GHY647PERFEUAS7RA14X2' },
  { code: 'CMTTCD5RV0YSXTR62XLVS10' },
  { code: 'XX2RZDR88B3W31NHGBESJCF' },
  { code: 'GE1LXZ405EB8ZBX70B563SY' },
  { code: 'VBYABH5Z2X52NE6922H76FX' },
  { code: 'RQAWH234MFC7FRUGD7UV5N5' },
  { code: 'EUJZV6E6613RTSAGEAL6RZB' },
  { code: 'FRJX39Z03Y451V7KTDHQVBY' },
  { code: '02LHN55BU1SY42ET85N00WX' },
  { code: 'TG8NFX9XEXRCPUJ6WVK6GRX' },
  { code: '4W2QQ2HS8EQ5NRKAEXJ1VKL' },
  { code: '7ZM958XQKGF5T45RGKBKYSR' },
  { code: 'EP2UX3NXV4H6SUZ9XB5L9BZ' },
  { code: 'AVRBLPZF6LL1Q8X38H6DJWB' },
  { code: '0KUM3QJWM55J8E1GFLHFJRG' },
  { code: 'U1ASPGAGEN2LV4LQLAXVTJZ' },
  { code: 'HHDGCPHYUWDUUK8KEXGNX44' },
  { code: '5VY840KASQNVJ2BHA422BVT' },
  { code: 'CYX1WBCGVHGLGUTTKTJ6W0K' },
  { code: 'S9ALBXDPBTC2JBQUCQUWJVT' },
  { code: 'RGD67ZF05H09YAG22Q17S5M' },
  { code: 'HE8ZK63735KA14GBD47AQNT' },
  { code: '0KUQGF9KYVZQ2LFPNV1D03T' },
  { code: '85UWYQYCKRN8B5F735YZVFF' },
  { code: 'E2Z97KU5V99U6SC53QJYJMQ' },
  { code: '92YVB73FGP3AMYPXTCK6UKS' },
  { code: '3MVTRG1K4D153ASKS4YL8VX' },
  { code: 'JGGJ7QWGYR2S4MV0S56W31K' },
  { code: '1NWJCZTLFFVBUYT0RXJQ336' },
  { code: 'CBW39E2K2YSULQ8F65EDJ6S' },
  { code: 'VYUSWVQGNNPWJCQBRT57ZGS' },
  { code: '7SF50YEHDYA0X61H458UCYA' },
  { code: 'PTH6VZQ43764TLB4BJD6FHE' },
  { code: 'ZCDXA9QDURSFJKBC60A7KRN' },
  { code: 'N23LGBGCFJ1PVTF81KQ4CXS' },
  { code: 'B180CU4ZDEM7X3B3ENPF4W9' },
  { code: '1JEFDCE0Z59DLUDN6UL0LJ3' },
  { code: 'TWQPZKVG9WQ7T8E202V56C1' },
  { code: 'S4SBUR239YUGHLFMVLNK885' },
  { code: 'N1BD7D5YU8XESQA16745L7B' },
];

const FEATURES = [
  { icon: 'panic', title: 'Mode Panic', text: "Deux mots de passe : l'un ouvre l'app, l'autre l'efface en simulant un fonctionnement normal. L'attaquant ne voit rien." },
  { icon: 'pairing', title: 'Appairage post-quantique', text: 'Échange de clé à distance par SMS, sans serveur. Hybride ML-KEM-768 + X25519, résistant aux ordinateurs quantiques de demain.' },
  { icon: 'fortress', title: 'Mode Forteresse', text: 'Filtre à la réception : tout ce qui n’est pas chiffré, signé et entièrement déchiffrable est supprimé automatiquement.' },
  { icon: 'keys', title: 'Protection des clés', text: 'Vos clés sont chiffrées par votre mot de passe. En cas de perte ou de vol de votre téléphone, elles restent inutilisables sans lui.' },
  { icon: 'ephemeral', title: 'Messages éphémères', text: 'Auto-suppression par contact, de 5 minutes à 1 semaine. Les messages disparaissent sans trace ni intervention.' },
  { icon: 'keypool', title: 'Pool de 500 clés', text: '500 clés pré-générées par contact. Changez de clé à distance en communiquant simplement son numéro. Pas besoin de se revoir.' },
  { icon: 'file', title: 'Fichiers .ov', text: 'Chiffrez n’importe quel fichier en AES-256-GCM et partagez-le partout (WhatsApp, email, cloud). Seule la clé déchiffre.' },
  { icon: 'sms', title: 'App SMS par défaut', text: 'Remplace votre application SMS : messages chiffrés et classiques réunis dans une seule interface.' },
  { icon: 'ovny', title: 'Mode OVNY', text: "Force l'envoi exclusivement en chiffré. Tout message en clair est bloqué automatiquement, impossible d'envoyer à découvert par erreur." },
];

// Icônes dans le style de l'app (Ionicons : trait rond, currentColor).
function FeatureIcon({ kind }) {
  const p = {
    width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
  };
  switch (kind) {
    case 'panic':
      return <svg {...p}><path d="M12 2a8 8 0 0 0-8 8c0 2.6 1.2 4.4 2.6 5.4.3.2.4.5.4.8V18a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1.8c0-.3.1-.6.4-.8C18.8 14.4 20 12.6 20 10a8 8 0 0 0-8-8Z" /><circle cx="9" cy="10.5" r="1.3" fill="currentColor" stroke="none" /><circle cx="15" cy="10.5" r="1.3" fill="currentColor" stroke="none" /><path d="M10 20v-2M14 20v-2" /></svg>;
    case 'pairing':
      return <svg {...p}><path d="M4 9h13M14 6l3 3-3 3" /><path d="M20 15H7M10 18l-3-3 3-3" /></svg>;
    case 'fortress':
      return <svg {...p}><path d="M12 3 5 6v5c0 4.4 3 7.4 7 9 4-1.6 7-4.6 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case 'keys':
      return <svg {...p}><circle cx="8" cy="8" r="4" /><path d="m11 11 8 8M16 16l2.2-2.2M18 18l2-2" /></svg>;
    case 'ephemeral':
      return <svg {...p}><circle cx="12" cy="13.5" r="7.5" /><path d="M12 13.5V9M9 2.5h6M12 6V2.5" /></svg>;
    case 'keypool':
      return <svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
    case 'file':
      return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /><rect x="9" y="12.5" width="6" height="4.5" rx="1" /><path d="M10.5 12.5v-1a1.5 1.5 0 0 1 3 0v1" /></svg>;
    case 'sms':
      return <svg {...p}><path d="M21 11.5a8 8 0 0 1-8 8H7l-4 3v-4.5a8 8 0 1 1 18-6.5Z" /><path d="M8 10.5h8M8 14h5" /></svg>;
    case 'ovny':
      return <svg {...p}><circle cx="12" cy="12" r="6.5" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)" /></svg>;
    default:
      return null;
  }
}

const SPECS = ['ML-KEM-768 + X25519', 'AES-256-GCM', 'Argon2id', 'SHA-256', 'SHA3-256', 'HKDF-SHA256', 'HMAC-SHA256'];

const STEPS = [
  { n: '01', title: 'Installer', text: 'Téléchargez l’application. Un mot de passe protège l’accès en quelques secondes.' },
  { n: '02', title: 'Échanger une clé', text: 'En personne par QR code, ou à distance par appairage post-quantique : échange par SMS puis vérification vocale d’un code de 12 caractères hex.' },
  { n: '03', title: 'Communiquer', text: 'Envoyez et recevez des messages chiffrés de bout en bout. Seul votre contact peut les lire.' },
];

const SHOTS = [
  { src: '/ovm/1-chat.jpg', alt: 'Conversation chiffrée' },
  { src: '/ovm/4-chiffrement.jpg', alt: 'Chiffrement d’un message' },
  { src: '/ovm/5-dechiffrement.jpg', alt: 'Déchiffrement' },
  { src: '/ovm/6-cles.jpg', alt: 'Gestion des clés' },
  { src: '/ovm/2-contacts.jpg', alt: 'Contacts' },
  { src: '/ovm/7-parametres.jpg', alt: 'Paramètres' },
];

const MORE = [
  'Panic Keys',
  'Anti-capture d’écran',
  'Sauvegardes cloud bloquées',
  'Notifications privées',
  'Protection anti-rejeu',
  'Deux modes d’encodage',
  'Verrouillage automatique',
];

export default function OvMessagePage() {
  return (
    <main className="ovm">
      <div className="ovm-grid" aria-hidden="true" />
      <div className="ovm-bg" aria-hidden="true">
        <div className="v3-bg">
          <div className="v3-orb a" />
          <div className="v3-orb b" />
        </div>
      </div>

      <div className="ovm-topbar">
        <Link href="/" className="ovm-back">← Retour à l'accueil</Link>
      </div>

      <header className="ovm-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ovm-hero-banner" src="/ovm/feature.jpg" alt="OV Message" width={1024} height={500} />
        <div className="ovm-kicker">Produit</div>
        <h1 className="ovm-title">OV Message</h1>
        <p className="ovm-tagline">Messagerie chiffrée, 100% hors ligne.</p>
        <p className="ovm-sub">
          Chiffre vos SMS de bout en bout. Un mot de passe, une clé, un contact, et chaque
          conversation devient privée. Sans compte, sans inscription, sans serveur.
        </p>
        <a className="ovm-cta" href={PLAY_URL} target="_blank" rel="noreferrer noopener">
          <IconGooglePlay size={18} />
          Disponible sur Google Play
        </a>
      </header>

      <section className="ovm-section">
        <div className="ovm-section-tag">Codes promo</div>
        <h2 className="ovm-section-title">Télécharge-la gratuitement</h2>
        <p className="ovm-section-sub">
          Récupère OV Message gratuitement sur Google Play. Clique un code disponible
          pour l'échanger. Premier arrivé, premier servi.
        </p>
        <details className="ovm-promo">
          <summary className="ovm-promo-summary">
            Afficher les codes promo
            <span className="ovm-promo-count">{PROMO_CODES.filter((c) => !c.used).length} disponibles</span>
          </summary>
          <div className="ovm-promo-grid">
          {PROMO_CODES.map(({ code, used }) =>
            used ? (
              <span key={code} className="ovm-promo-code is-used" aria-disabled="true">
                <span className="ovm-promo-text">{code}</span>
                <span className="ovm-promo-status">Utilisé</span>
              </span>
            ) : (
              <a
                key={code}
                className="ovm-promo-code"
                href={`https://play.google.com/redeem?code=${code}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="ovm-promo-text">{code}</span>
                <span className="ovm-promo-status">Disponible</span>
              </a>
            )
          )}
          </div>
        </details>
      </section>

      <section className="ovm-section">
        <div className="ovm-section-tag">Ce qui la distingue</div>
        <h2 className="ovm-section-title">Pensée pour la confidentialité réelle</h2>
        <p className="ovm-section-sub">
          Pas des promesses marketing : des mécanismes de sécurité concrets, du chiffrement à la
          protection en cas de perte ou de vol.
        </p>
        <div className="ovm-features">
          {FEATURES.map((f) => (
            <article className="ovm-feature" key={f.title}>
              <div className="ovm-feature-icon"><FeatureIcon kind={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ovm-section">
        <div className="ovm-section-tag">Sous le capot</div>
        <h2 className="ovm-section-title">La technique</h2>
        <p className="ovm-section-sub">Les briques cryptographiques qui protègent vos messages.</p>
        <div className="ovm-specs">
          {SPECS.map((s) => (
            <span className="ovm-spec" key={s}>{s}</span>
          ))}
        </div>

        <a className="ovm-whitepaper" href="/white-paper.html">
          <div className="ovm-wp-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
              <path d="M14 3v5h5M9 13h6M9 17h4" />
            </svg>
          </div>
          <div className="ovm-wp-body">
            <h3>White paper technique</h3>
            <p>L'architecture cryptographique et les choix de conception, en détail.</p>
          </div>
          <span className="ovm-wp-arrow" aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="ovm-section">
        <div className="ovm-section-tag">Captures d'écran</div>
        <h2 className="ovm-section-title">L'interface</h2>
        <p className="ovm-section-sub">Le chiffrement rendu simple, à la portée de tous.</p>
        <ScreenshotGallery shots={SHOTS} />
      </section>

      <section className="ovm-section">
        <div className="ovm-section-tag">Comment ça marche</div>
        <h2 className="ovm-section-title">Trois étapes</h2>
        <p className="ovm-section-sub">Communiquer en sécurité, sans compétence technique.</p>
        <div className="ovm-steps">
          {STEPS.map((s) => (
            <article className="ovm-step" key={s.n}>
              <div className="ovm-step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ovm-section">
        <div className="ovm-section-tag">Et aussi</div>
        <h2 className="ovm-section-title">Bien plus encore</h2>
        <div className="ovm-more" style={{ marginTop: 32 }}>
          {MORE.map((m) => (
            <span className="ovm-more-chip" key={m}>{m}</span>
          ))}
        </div>
      </section>

      <footer className="ovm-foot">
        <p>© 2026 OV. Tous droits réservés.</p>
      </footer>
    </main>
  );
}
