FILE=$(pwd)/config.json
if [ -f "$FILE" ]; then
    jest
else
    echo "{\"prefix\": \"/\"}" >$FILE
    jest
fi
