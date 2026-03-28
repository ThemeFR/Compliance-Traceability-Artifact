# CTA Autoresearch Loop — Docker image
# Non-root researcher user + Claude Code CLI + Node.js tooling
#
# Build:  docker build -t cta-loop .
# Run:    see run-loop.ps1 (Windows) or run-loop.sh (Linux/Mac)
#
# The repo is volume-mounted at runtime — nothing from the repo
# is baked into this image. The image is pure environment.

FROM node:22-slim

# git is needed for `git checkout spec/cta-v0.1.schema.json` (revert on failure)
RUN apt-get update \
    && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

# Claude Code CLI — installed globally in the image
RUN npm install -g @anthropic-ai/claude-code

# Non-root user — limits blast radius of loop edits to the mounted repo
RUN useradd -m -s /bin/bash researcher

# Repo mounts here at runtime
RUN mkdir -p /home/researcher/repo \
    && chown researcher:researcher /home/researcher/repo

# Claude writes session state to ~/.claude inside the container
RUN mkdir -p /home/researcher/.claude \
    && chown -R researcher:researcher /home/researcher/.claude

USER researcher
WORKDIR /home/researcher/repo

# entrypoint.sh is copied from the repo at build time.
# It installs node_modules (into the volume), then launches claude.
COPY --chown=researcher:researcher entrypoint.sh /home/researcher/entrypoint.sh
RUN chmod +x /home/researcher/entrypoint.sh

ENTRYPOINT ["/home/researcher/entrypoint.sh"]
