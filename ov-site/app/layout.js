import { Geist, Geist_Mono } from 'next/font/google';
import './styles/globals.scss';
import './styles/portfolio.scss';
import SmoothScroll from './components/SmoothScroll';
import SpotlightPointer from './components/SpotlightPointer';

// Retiré le 2026-08-07 : CookieConsent + @vercel/analytics.
// ⛔ Ne pas réintroduire. Trois raisons cumulatives :
//   1. mentions-legales.html affirme « aucun cookie », « aucun système de
//      tracking, d'analytique » et « aucune requête à un service tiers ».
//   2. La CSP servie par Caddy est en default-src 'self' : l'appel à
//      va.vercel-scripts.com serait bloqué en silence, donc cassé sans alerte.
//   3. Le site n'a jamais eu de bandeau de consentement, et n'en a pas besoin
//      tant qu'il ne dépose rien.

const geistSans = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  // ⛔ metadataBase est OBLIGATOIRE pour que les images d'openGraph sortent en
  // URL ABSOLUES. Sans lui, Next émet un chemin relatif, que la plupart des
  // agrégateurs de liens refusent : l'aperçu part alors sans image.
  metadataBase: new URL('https://ovlabs.fr'),
  title: 'OV, expert en vibe coding',
  description:
    "Expert en vibe coding. J'orchestre des IA et des outils pour concevoir, construire et publier des applications complètes, du prototype aux stores. Sécurité vérifiée par pentest.",
  applicationName: 'OV',
  authors: [{ name: 'OV' }],
  creator: 'OV',
  keywords: [
    'développeur freelance',
    'vibe coding',
    'orchestration IA',
    'Next.js',
    'application mobile',
    'chiffrement',
    'pentest',
    'OV',
  ],
  openGraph: {
    title: 'OV, expert en vibe coding',
    description:
      "J'orchestre des IA pour concevoir, construire et publier des applications complètes, du prototype aux stores. Sécurité vérifiée par pentest.",
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'OV',
    // Le logo OV centré sur le fond du site. 1200x630 = le format paysage
    // attendu ; un carré serait rogné sur les bords par la plupart des services.
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OV',
      },
    ],
  },
  twitter: {
    // summary_large_image affiche la bannière en grand ; 'summary' seul la
    // réduisait à une vignette carrée, et sans images déclarées il n'y avait
    // simplement aucune image.
    card: 'summary_large_image',
    title: 'OV, expert en vibe coding',
    description:
      "J'orchestre des IA pour concevoir, construire et publier des applications complètes, du prototype aux stores. Sécurité vérifiée par pentest.",
    images: ['/og-image.png'],
  },
};

// ℹ️ L'icône du site n'est PAS déclarée ici : elle vient des conventions de
// l'App Router, `app/icon.png` (1024, coins arrondis) et `app/apple-icon.png`
// (180). Next émet les balises <link rel="icon"> tout seul à partir de ces
// fichiers. ⛔ Ne pas y ajouter un champ `icons` en double, il masquerait la
// convention. Un `favicon.ico` est également servi à la RACINE du site, hors
// build, parce que les navigateurs le demandent d'office même sans balise.

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08080d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScroll />
        <SpotlightPointer />
        {children}
      </body>
    </html>
  );
}
