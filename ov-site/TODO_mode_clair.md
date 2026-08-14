# Chantier à finir : mode clair (thème light)

Décision : on finalise d'abord le site en **sombre**. Le mode clair est reporté.
Objectif retenu : un bouton "apparence" en haut à **gauche** de la page d'accueil, qui bascule vers un fond clair. **Accueil d'abord**, pages projets ensuite.

## Ce qui est déjà en place (favorable)

Les couleurs sont centralisées en tokens sur `.v3` (dans `app/styles/portfolio.scss`, tout en haut) :
`--bg #08080d`, `--bg-2 #0e0e16`, `--ink #f5f5f7`, `--mute`, `--dim`, `--accent #2AA2FF`, `--accent-2 #5CBAFF`, `--line rgba(255,255,255,.08)`, `--line-strong rgba(255,255,255,.16)`.
Redéfinir ces tokens sous `.v3[data-theme="light"]` fait basculer automatiquement tout ce qui les utilise (fond, texte, bordures via `--line`).

## Étapes

1. **Bouton toggle** (composant `app/components/Portfolio3D.jsx`)
   - Ajouter un state `theme` ('dark' | 'light'), défaut 'dark'.
   - Poser `data-theme={theme}` sur l'élément racine `<div className="v3">` (~ligne 323).
   - Mettre un bouton en haut à gauche, calqué sur `.v3-lang-toggle` (qui est en haut à droite, ~ligne 351). Nouveau style `.v3-theme-toggle` : `position:absolute; top:34px; left:24px;` (mêmes styles pilule que le lang toggle). Icône soleil/lune ou libellé.
   - Optionnel : persister le choix (localStorage) + respecter `prefers-color-scheme` au 1er chargement.

2. **Palette claire** : ajouter dans `portfolio.scss`
   ```
   .v3[data-theme="light"] {
     --bg: #f4f6fb; --bg-2: #ffffff;
     --ink: #10131c;
     --mute: rgba(16,19,28,.62); --dim: rgba(16,19,28,.4);
     --line: rgba(16,19,28,.1); --line-strong: rgba(16,19,28,.16);
     /* --accent / --accent-2 : le bleu marche sur clair, on garde */
   }
   ```

3. **Corriger les éléments codés "dark" (ne passent pas par les tokens)**, tous à scoper sous `.v3[data-theme="light"] ...` :
   - **Titres en dégradé** `.grad` (~lignes 505 et 826) : `linear-gradient(#ffffff → accent)` → passer le blanc en sombre (`#10131c → var(--accent)`), sinon le titre est invisible sur clair.
   - **Gros "OV"** en bas (~ligne 1608) : dégradé `rgba(255,255,255,.95) → bleu` → version sombre.
   - **Grille de fond** `.v3-grid` (~lignes 71-72) : lignes `rgba(255,255,255,.04)` → `rgba(16,19,28,.05)`.
   - **Halos** `.v3-orb` (~lignes 28-54) : glows bleus, visibles sur clair mais à adoucir (baisser l'opacité/blur).
   - **Surfaces en verre** : ~32 occurrences de `rgba(255,255,255, faible)` (fonds, reflets) → en clair, invisibles ou à inverser en `rgba(16,19,28, faible)` / cartes blanches à bordure. Repérer via `grep -n "rgba(255, 255, 255" app/styles/portfolio.scss`.
   - **Verre dépoli navy** `rgba(20,27,45,.35)` (2 occ.) → frosted clair `rgba(255,255,255,.6)` + texte sombre.
   - **`.v3-btn-glass`** (~ligne 580) : fond `rgba(255,255,255,.05)` + texte clair → fond `rgba(16,19,28,.05)` + texte sombre.
   - **Icônes sociales** `.v3-hero-socials a` (~ligne 593) : fond/bordure/couleur à adapter.
   - **Nav / menu mobile / aurora hero / radar** : vérifier les fonds sombres codés en dur.
   - **Bouton FAB vert** : OK sur clair, ne pas toucher.
   - **Carte contact** (`.v3-cta-bg`, dégradé bleu) : reste telle quelle (carte colorée, marche sur clair).

4. **Tester** : `npm run build` puis Chrome, **section par section** (hero, projets, services, parcours, stack, contact, footer). C'est un vrai passage visuel, pas une petite correction.

5. **Plus tard : pages projets** (`app/ov-message`, `ov-jungle`, `ov-lab`, `reachy`) : chacune a ses propres tokens en tête de son `.scss`. Même méthode (data-theme + palette claire + corriger dégradés/verre/halos). OV Jungle est en or/orange (traiter à part).

## Rappels
- Zéro tiret cadratin/demi-cadratin dans les textes affichés.
- Petites corrections UI : build seul. Le mode clair, lui, se vérifie visuellement.
