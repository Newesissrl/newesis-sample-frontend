#!/bin/bash
set -e

if [[ ! -v TENANT ]]; then
    echo "Variable TENANT is not set, default logos will be used"
elif [[ -z "$TENANT" ]]; then
    echo "Variable TENANT is set to the empty string, default logos will be used"
else
    echo "Tenant is: $TENANT"
    if [ -d "/app/build/$TENANT" ]; then
        cp -v /app/build/$TENANT/* /app/build/
    fi
fi

if [[ ! -v TITLE ]]; then
    echo "Variable TITLE is not set, assigning default value"
    export TITLE="Mzinga.io Sample Frontend"
elif [[ -z "$TITLE" ]]; then
    echo "Variable TITLE is set to the empty string, assigning default value"
    export TITLE="Mzinga.io Sample Frontend"
else
    echo "TITLE is: $TITLE"
fi

if [[ ! -v DESCRIPTION ]]; then
    echo "Variable DESCRIPTION is not set, assigning default value"
    export DESCRIPTION="Mzinga.io Sample Frontend"
elif [[ -z "$DESCRIPTION" ]]; then
    echo "Variable DESCRIPTION is set to the empty string, assigning default value"
    export DESCRIPTION="Mzinga.io Sample Frontend"
else
    echo "DESCRIPTION is: $DESCRIPTION"
fi

echo "Updating home page title and description"
sed -i -e "s/__tenant.site.title__/$TITLE/g" -e "s/__tenant.site.description__/$DESCRIPTION/g" /app/build/index.html

if [ "$1" = 'yarn' ]; then
    node /docker-entrypoint/build-env.js /app/build/
    exec "$@"
fi

exec "$@"