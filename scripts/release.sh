#!/bin/bash
set -e

VERSION=$(node -p "require('./package.json').version")
TAG="v${VERSION}"

echo "Releasing ${TAG}..."

git add .
git commit -m "Release ${TAG}" || echo "Nothing to commit"
git push origin master

gh release create "${TAG}" --title "${TAG}" --notes "Release ${TAG}"

echo "Done. Workflow triggered for ${TAG}."
