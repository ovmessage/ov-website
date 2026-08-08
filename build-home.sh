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

# Le dossier _next est entièrement régénéré à chaque build : on le remplace
# proprement plutôt que d'empiler les chunks des builds précédents.
rm -rf "$RACINE/_next"

# Copie ADDITIVE et RÉCURSIVE de tout out/ vers la racine : pages, payloads RSC,
# _next/, ET les sous-dossiers de public/ (ovm/, ovj/, ovlab/, reachy/...).
# ⚠️ `ditto` FUSIONNE les dossiers (là où `cp -R dir dest` les IMBRIQUE quand
# dest/dir existe déjà) et ne supprime rien : les fichiers hors build (pages
# statiques, assets/, app-ads.txt...) survivent. L'ancien `find -maxdepth 1
# -type f` oubliait les sous-dossiers d'images de public/ (bug images 2026-08-08).
ditto "$APP/out" "$RACINE"

echo "==> Terminé"
echo "    home       : $RACINE/index.html"
echo "    assets     : $RACINE/_next/"
echo "    intactes   : ov-message.html, white-paper.html, 5 pages légales,"
echo "                 app-ads.txt, robots.txt, sitemap.xml, style.css, script.js"
