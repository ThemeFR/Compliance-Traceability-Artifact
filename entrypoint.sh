#!/bin/bash
# entrypoint.sh — CTA autoresearch loop launcher
# Runs inside the Docker container as the non-root researcher user.
# Mounts the repo at /home/researcher/repo via docker run -v.

set -e

REPO=/home/researcher/repo
cd "$REPO"

# Trust the mounted repo (git complains about ownership mismatch on volume mounts)
git config --global --add safe.directory "$REPO"

# Install node deps if not present (ajv for validate.js)
# node_modules persists in the volume after first run
if [ ! -d node_modules ]; then
  echo "[entrypoint] Installing node dependencies..."
  npm install --silent
fi

# Read the loop prompt from program.md
PROMPT=$(cat program.md)

echo "[entrypoint] Starting CTA autoresearch loop..."
echo "[entrypoint] $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "[entrypoint] Stopping condition: program.md §STOPPING CONDITION"
echo "---"

exec claude --dangerously-skip-permissions -p "$PROMPT"
