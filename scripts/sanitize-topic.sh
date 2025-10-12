#!/bin/bash

# sanitize-topic.sh
# Converts topic to safe filename
# Usage: ./sanitize-topic.sh "My Topic Name"

if [ -z "$1" ]; then
  echo "Usage: $0 \"Topic Name\""
  exit 1
fi

# Convert to lowercase, replace spaces with hyphens, remove special chars
echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//'
