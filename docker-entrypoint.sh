#!/bin/bash
set -e

cp -v /app/build/$TENANT/* /app/build/
sed -i -e "s/__tenant.site.title__/$TITLE/g" -e "s/__tenant.site.description__/$DESCRIPTION/g" /app/build/index.html

if [ "$1" = 'yarn' ]; then
    node /docker-entrypoint/build-env.js /app/build/
    exec "$@"
fi

exec "$@"