#!/bin/bash
set -e

if [ "$1" = 'yarn' ]; then
    node /docker-entrypoint/build-env.js /app/build/
    exec "$@"
fi

exec "$@"