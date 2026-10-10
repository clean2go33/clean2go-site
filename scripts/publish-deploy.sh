#!/usr/bin/env bash
# Construit le site et publie dist/ sur la branche « deploy » (source de l'hébergement).
# Usage : PUBLIC_SITE_URL=https://... [PUBLIC_NOINDEX=1] scripts/publish-deploy.sh "message"
set -euo pipefail
MSG="${1:-Mise à jour du site}"
npm run build
TMP="$(mktemp -d)"
cp -a dist/. "$TMP/"
git fetch origin deploy 2>/dev/null || true
WT="$(mktemp -d)"
if git show-ref --verify --quiet refs/remotes/origin/deploy; then
  git worktree add -B deploy "$WT" origin/deploy
else
  git worktree add --detach "$WT"; (cd "$WT" && git checkout --orphan deploy && git rm -rf . >/dev/null 2>&1 || true)
fi
(cd "$WT" && find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} + && cp -a "$TMP/." . && git add -A \
  && git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "$MSG

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>" --allow-empty \
  && git push origin deploy)
git worktree remove --force "$WT"
echo "✓ branche deploy publiée"
