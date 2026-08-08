# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site web vitrine de **OV** (la marque) et **OV Message** (le produit phare actuel). Site statique.

⛔ **Hébergement : le VPS OVH, plus GitHub Pages** (depuis le 2026-08-03). Servi par Caddy depuis `/home/debian/ovjungle/site` sur `ovlabs.fr` — publier = pousser les fichiers là (`scp … ovjungle:/home/debian/ovjungle/site/`). La branche `gh-pages` du repo `ovmessage/ov-website` ne contient plus que des redirections, à garder tant que la fiche Play Store d'OV Message pointe dessus. ⚠️ `mentions-legales.html` déclare encore GitHub Pages comme hébergeur : c'est **faux** et légalement l'hébergeur réel doit être nommé.

**Stack :**
- HTML statique (5 pages : `index.html`, `ov-message.html`, `conditions.html`, `confidentialite.html`, `mentions-legales.html`)
- ⛔ **Bootstrap 5.1.3, Font Awesome 6 et la police Outfit sont SELF-HÉBERGÉS** dans `assets/vendor/` depuis le 2026-08-05 (avant : jsDelivr, cdnjs, Google Fonts). Motif double : un CDN compromis exécutait du JS arbitraire sur la page qui porte le formulaire, et Google Fonts transmettait l'IP de chaque visiteur — ce que les mentions légales prétendaient l'inverse. ⛔ **Ne JAMAIS « dépanner » un asset en rebranchant un CDN** : la CSP servie par Caddy n'autorise plus aucune origine externe, le fichier serait bloqué en silence, et la promesse « aucune requête à un tiers » des mentions légales deviendrait fausse.
- ⚠️ Les `.ttf` de Font Awesome ont été retirés du `all.min.css` : seuls les `.woff2` sont livrés (tous les navigateurs les gèrent). Y remettre une référence `.ttf` créerait un 404.
- ⚠️ La police Outfit est une **variable font** : 2 fichiers `.woff2` (latin, latin-ext) couvrent les 5 graisses. Les noms gstatic sont opaques mais uniques — ne pas les renommer, `outfit.css` les cible en relatif (`fonts/…`, depuis `assets/vendor/`).
- CSS unique : `style.css`
- JS unique : `script.js`
- Pas de build step, pas de framework
- Formulaire contact via **FormSubmit**, endpoint **haché** `080fb1f9c86229e21e43e2d4be8dd4b8` → `contact@ovlabs.fr` (activé le 2026-08-05). ⛔ Ne pas revenir à la forme `formsubmit.co/ajax/<adresse>` : elle réexpose l'adresse au moissonnage, et l'ancienne cible `contact@ov-innovations.com` est MORTE (domaine en `clientHold`, sans MX — les messages étaient perdus en silence).

## Workflow git (autorisé pour CE projet uniquement)

L'utilisateur **autorise git uniquement pour ce repo** (`ov-encryption-website`). Pour tous ses autres projets (notamment OV Message Android et iOS), git n'est PAS utilisé. Donc ici :

- ✅ `git add` / `git commit` / `git push` autorisés (uniquement quand demandé explicitement)
- ✅ Style commit messages : court, impératif, anglais (cf `git log`)
- ❌ Ne jamais push sans demande explicite
- ❌ Pas de `--amend` sur des commits déjà pushés
- ❌ Pas de force-push

## Positionnement éditorial — décisions clés

Décisions verrouillées (à respecter dans toute future modif) :

1. **OV = la marque, OV Message = un produit parmi d'autres à venir.** La page d'accueil (`index.html`) doit être **evergreen** : elle parle de la marque + du fondateur, **pas** d'un produit en particulier. Quand un nouveau produit arrivera, on créera juste une nouvelle page produit + un lien dans la nav, **sans toucher à `index.html`**.

2. **Vision IA pleinement assumée.** La home assume :
   - Démarche solo (un seul individu : Mondzongo Franck)
   - Méthode V.I.A.T (Validation, Itérations, Audit, Tests — plusieurs IA croisées)
   - Finalité long-terme : construire une **IA souveraine** comme partenaire intellectuel
   - Source du récit : `documentation/05_business/strategies/VISION_STRATEGIQUE_ET_FEUILLE_DE_ROUTE.md` (côté projet OV Message)

3. **Signature en clair** : le fondateur (**Mondzongo Franck**) signe la page d'accueil avec photo (`assets/images/portrait.jpg`). Plus d'anonymat — son nom est déjà public sur la fiche Play Store.

4. **Aucune mention d'autres projets futurs** : pas de roadmap publique, pas de portefeuille, pas de teasing. Si on développe d'autres produits, ils auront leur propre page.

5. **Suppression de la vaporware** : les 12 « cas d'usage » de la home actuelle (SMS chiffrés, anti-phishing, OTP, IoT, blockchain, chèques bancaires…) ne décrivent pas des produits existants. **À supprimer purement et simplement** — pas à remplacer.

6. **Le développement assisté par IA est REVENDIQUÉ, jamais caché** (décidé le 2026-08-07). L'orchestration d'IA et le vibe coding sont le positionnement CENTRAL de la home et une fierté, pas un secret gênant à euphémiser. Le hero l'affiche en clair (« J'orchestre des IA. Je livre des produits. ») et le rôle assumé est « Développeur freelance & expert en vibe coding ». ⛔ Ne JAMAIS adoucir, masquer ni retirer cette revendication au motif que ça ferait « moins sérieux » : le sérieux se prouve par le résultat (apps publiées sur les stores, SDK de chiffrement, sécurité auditée), pas en cachant la méthode. Source de vérité du contenu home : l'app Next `portfolio-live/` (voir `app/data.js`), pas un `index.html` écrit à la main.

## Audience

Multi-cible mais positionnement **B2B sérieux** comme registre dominant :
- Journalistes / lanceurs d'alerte
- Avocats / professions réglementées
- RSSI / entreprises sensibles
- Chercheurs / philosophes (vu la finalité IA souveraine)
- Particuliers exigeants (secondaire)

Tonalité : **sobre, ambitieuse, factuelle**. Éviter :
- Affirmations absolues du type *« impossible »* / *« infaillible »* / *« aucune trace forensique récupérable »* — risque juridique
- Jargon vague *« Avancé »* / *« de Pointe »* / *« Multicouches »* — préférer specs réelles (AES-256-GCM, ML-KEM-768 + X25519, Argon2id m=64MB t=3, etc.)
- Marketing creux comme *« Spécifications techniques : Chiffrement = Avancé »*

## Travail en cours — refonte page d'accueil

Voir `validated_texts.md` (à la racine) pour l'état détaillé section par section.

**Workflow validé avec le user :** rédaction section par section, validation point par point, écriture dans `validated_texts.md` au fur et à mesure que les textes sont validés.

**Sections planifiées (`index.html`) :**
1. Hero ✅ validée
2. Manifeste 🚧 chantier en cours
3. Méthode V.I.A.T ⏳
4. Principes (4 cards à garder) ⏳
5. Vision IA souveraine ⏳
6. Contact (formulaire existant à garder)

## Page produit (`ov-message.html`) — chantier connu

À traiter **après** la home. Travail prévu :

### Corrections factuelles (le site dit faux)

| Sujet | Correction |
|---|---|
| Code SAS d'appairage | **12 caractères hex (48 bits)**, pas 8 ni 12 mélangés |
| Modes d'encodage | **2 modes** : Base36 + Base64 (Unicode = normalisation NFC, pas un mode) |
| ~~Mot de passe minimum~~ | ⛔ **LIGNE FAUSSE, ne pas appliquer.** Vérifié dans le code le 2026-08-07 : `components/LoginPasswordModal.js:91` (Android) et `:86` (iOS) donnent tous deux `getGraphemes(pwd).length >= 6`, et aucune règle de complexité n'existe dans les deux projets. **Le site a raison avec 6 caractères.** |
| Messages éphémères max | **1 semaine** (pas 1 mois) |
| Langues | **35** (ou conserver « +30 » qui reste vrai) |
| « 26 fonctionnalités » | Chiffre marketing arbitraire — vérifier ou retirer |

### Génériser le wording cross-plateforme

Préparer le pivot iOS (en cours côté projet) :
- Retirer mention *« téléphones compacts type Soyes, Melrose »* (marques Android obscures qui décrédibilisent)
- Retirer *« Application SMS par défaut »* trop Android-spécifique → reformuler *« messagerie SMS / RCS »*
- Retirer mentions *« Toutes les sauvegardes Android sont bloquées »* → *« Sauvegardes cloud bloquées »*
- *« Retour haptique : API Android »* → générique
- *« Android Keystore »* (dans `confidentialite.html`) → *« coffre-fort matériel sécurisé du téléphone »* ou *« Android Keystore / iOS Secure Enclave »*

### Ajouts à envisager (vrais arguments tech sous-vendus)

- Section dédiée **Pairing post-quantique hybride ML-KEM-768 + X25519** (différenciateur fort, Signal vient juste d'avoir PQXDH)
- **KEK/DEK** — clé maître / clé de données, protection at-rest
- **Argon2id (m=64MB, t=3)** explicite pour le hash mot de passe
- **AppKillScheduler natif** (kill du process en background, pas de DEK persistant en RAM)

### Pages légales (`conditions.html`, `confidentialite.html`, `mentions-legales.html`)

- Compléter section 2 « Description du service » dans `conditions.html` (tronquée : ne contient qu'une phrase sur les tarifs SMS)
- Harmoniser la mention « 1 mois » vs « 1 semaine » des messages éphémères entre les pages
- Actualiser « Dernière mise à jour : Février 2026 » si modifs effectives

## Sources de vérité (pour ne pas inventer)

- **Code Android** : `~/Desktop/ov_message_android/` — référence pour les valeurs actuelles (SAS = 12 hex, pool = 500, etc.)
- **Code iOS** : `~/Desktop/ov_message_ios_nouveau/` — référence pour ce qui sort en iOS
- **Vision OV (récit)** : `~/Desktop/ov_message_ios_nouveau/documentation/05_business/strategies/VISION_STRATEGIQUE_ET_FEUILLE_DE_ROUTE.md`
- **Audit complet de l'app Android (avril 2026)** : voir mémoire utilisateur Claude

Toujours vérifier dans le code avant de revendiquer une fonctionnalité ou un chiffre — le site contenait plusieurs erreurs factuelles dues à des affirmations marketing non confirmées par le code.

## Assets

- `assets/images/portrait.jpg` — photo fondateur (646×1000 px, JPEG ~242 KB, nom de fichier neutre). À utiliser **uniquement en vignette signature ronde ~120×120 px** dans la section Manifeste. **Pas en hero** (décision réaffirmée le 2026-05-10 : un selfie en grand au-dessus du pli ferait basculer la home vers du personal brand, incompatible avec le positionnement B2B sérieux).
- `assets/images/icon_ov.webp` / `icon_ov_96.png` — logo OV (header)
- `assets/images/ov-message/*` — captures écran et visuels OV Message (page produit uniquement)
