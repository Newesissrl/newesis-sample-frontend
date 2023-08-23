#!/bin/bash
set -e

if [ "$1" = 'yarn' ]; then
    /docker-entrypoint/env.sh
    exec "$@"
fi

exec "$@"