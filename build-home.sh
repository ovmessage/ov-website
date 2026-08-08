#!/usr/bin/env bash
#
# build-home.sh : construit la page d'accueil Next et l'installe à la racine.
#
# Depuis le 2026-08-07 la home vient de l'app Next `portfolio-live/`, pas d'un
# index.html écrit à la main. Les 7 autres pages (ov-message, white-paper et
# les 5 pages légales) restent du HTML statique et ne sont PAS touchées ici.
#
# ⚠️ La copie est ADDITIVE, jamais un rsync --delete : la racine contient des
# fichiers qui ne viennent pas du build et qui doivent survivre (app-ads.txt
# pour AdMob, robots.txt, sitemap.xml, style.css, script.js, les 7 pages).
#
# Usage : ./build-home.sh
#
set -euo pipefail

RACINE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP="$RACINE/portfolio-live"

echo "==> Build Next (export statique)"
cd "$APP"
npx next build

if [ ! -f "$APP/out/index.html" ]; then
    echo "ERREUR : out/index.html absent, le build n'a rien produit. Arrêt." >&2
    exit 1
fi

echo "==> Installation à la racine du site"
cd "$APP/out"

# Le dossier _next est entièrement régénéré à chaque build : on le remplace
# proprement plutôt que d'empiler les chunks des builds précédents.
rm -rf "$RACINE/_next"

# -R pour les dossiers, pas de --delete : rien d'autre n'est supprimé.
cp -R _next "$RACINE/"

# Tous les fichiers produits à la racine de out/ : pages, payloads RSC et
# contenu de public/. Énumérer les noms à la main (seb.jpg, etc.) faisait
# oublier chaque nouvel asset ajouté dans public/.
find . -maxdepth 1 -type f -exec cp {} "$RACINE/" \;

echo "==> Terminé"
echo "    home       : $RACINE/index.html"
echo "    assets     : $RACINE/_next/"
echo "    intactes   : ov-message.html, white-paper.html, 5 pages légales,"
echo "                 app-ads.txt, robots.txt, sitemap.xml, style.css, script.js"
