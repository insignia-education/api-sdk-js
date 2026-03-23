#!/bin/bash
set -e

if [ -z "${GITHUB_TOKEN}" ]; then
    echo "Error: GITHUB_TOKEN is not set."
    exit 1
fi

VERSION=$(node -p "require('./package.json').version")
TAG="v${VERSION}"

REMOTE=$(git remote get-url origin)
REPO=$(echo "${REMOTE}" | sed 's/.*github\.com[:/]\(.*\)\.git/\1/' | sed 's/.*github\.com[:/]\(.*\)/\1/')

echo "Releasing ${TAG} for ${REPO}..."

git add .
git commit -m "Release ${TAG}"
git push origin master

curl -s -X POST \
    -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"tag_name\":\"${TAG}\",\"name\":\"${TAG}\",\"body\":\"Release ${TAG}\"}" \
    "https://api.github.com/repos/${REPO}/releases"

echo "Done. Workflow triggered for ${TAG}."
