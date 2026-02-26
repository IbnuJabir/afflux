#!/bin/bash
# Afflux Blog Pipeline Runner
# Called by systemd timer to generate blog posts

set -e

cd /home/builder/code/afflux

# Run the pipeline and capture output
OUTPUT=$(npx tsx pipeline/run-pipeline.ts 2>&1)

# Extract notification JSON between markers
NOTIFICATION=$(echo "$OUTPUT" | sed -n '/^---NOTIFICATION_START---$/,/^---NOTIFICATION_END---$/p' | grep -v '^---NOTIFICATION')

if [ -n "$NOTIFICATION" ]; then
    # Parse JSON fields
    TITLE=$(echo "$NOTIFICATION" | jq -r '.title')
    CATEGORY=$(echo "$NOTIFICATION" | jq -r '.category')
    SLUG=$(echo "$NOTIFICATION" | jq -r '.slug')
    WORDS=$(echo "$NOTIFICATION" | jq -r '.wordCount')
    IMAGES=$(echo "$NOTIFICATION" | jq -r '.imageCount')
    LINKS=$(echo "$NOTIFICATION" | jq -r '.linkCount')
    
    # Build notification message
    MESSAGE="📝 New Draft Created!

Title: $TITLE
Category: $CATEGORY
URL: /blog/$SLUG
Words: $WORDS | Images: $IMAGES | Links: $LINKS
Status: DRAFT - Ready for review"

    # Send notification via OpenClaw CLI
    /home/builder/.npm-global/bin/openclaw message send --channel telegram --to "-1003629690118" --thread 212 --message "$MESSAGE" 2>/dev/null || true
    
    echo "Pipeline completed: $TITLE"
else
    echo "Pipeline failed - no notification output"
    echo "Raw output:"
    echo "$OUTPUT"
    exit 1
fi
