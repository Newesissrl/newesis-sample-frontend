#!/bin/bash

set -e
# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window._env_ = { " >> ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs

while read -r line || [[ -n "$line" ]];
do
    # Split env variables by character `=`
    if printf '%s\n' "$line" | grep -q -e '='; then
        varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
        varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    fi
    
    # Read value of current variable if exists as Environment variable
    value=$(printf '%s\n' "${!varname}")
    # Otherwise use value from .env file
    [[ -z $value ]] && value=${varvalue}
    if [[ $varname == REACT_APP_* ]]; then
        # Append configuration property to JS file
        echo "  $varname: \"$value\"," >> ./env-config.js
    fi
done < <(printenv)

echo "}" >> ./env-config.js

cp ./env-config.js /app/build/

echo "env-config.js created!"