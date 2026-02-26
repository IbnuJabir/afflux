#!/bin/bash
# Afflux Full Pipeline with Research
# 
# This script:
# 1. Runs the research agent to find products
# 2. Runs the blog pipeline to generate content
# 3. Sends notification

set -e

cd /home/builder/code/afflux

echo "🔍 Step 1: Running Product Research Agent..."
RESEARCH_OUTPUT=$(npx tsx pipeline/research-agent.ts 2>&1) || true

# Check if research succeeded
if echo "$RESEARCH_OUTPUT" | grep -q "---RESEARCH_START---"; then
    echo "   Research completed successfully"
    
    # Extract research JSON
    RESEARCH_JSON=$(echo "$RESEARCH_OUTPUT" | sed -n '/^---RESEARCH_START---$/,/^---RESEARCH_END---$/p' | grep -v '^---RESEARCH')
    
    # Save research for the writing pipeline to use
    echo "$RESEARCH_JSON" > /home/builder/code/afflux/pipeline/latest-research.json
else
    echo "   Research failed or no data, using existing topic pool"
fi

echo ""
echo "📝 Step 2: Running Blog Pipeline..."
PIPELINE_OUTPUT=$(npx tsx pipeline/run-pipeline.ts 2>&1)

# Extract notification
NOTIFICATION=$(echo "$PIPELINE_OUTPUT" | sed -n '/^---NOTIFICATION_START---$/,/^---NOTIFICATION_END---$/p' | grep -v '^---NOTIFICATION')

if [ -n "$NOTIFICATION" ]; then
    TITLE=$(echo "$NOTIFICATION" | jq -r '.title')
    CATEGORY=$(echo "$NOTIFICATION" | jq -r '.category')
    SLUG=$(echo "$NOTIFICATION" | jq -r '.slug')
    WORDS=$(echo "$NOTIFICATION" | jq -r '.wordCount')
    IMAGES=$(echo "$NOTIFICATION" | jq -r '.imageCount')
    LINKS=$(echo "$NOTIFICATION" | jq -r '.linkCount')
    
    MESSAGE="📝 New Draft Created!

Title: $TITLE
Category: $CATEGORY
URL: /blog/$SLUG
Words: $WORDS | Images: $IMAGES | Links: $LINKS
Status: DRAFT - Ready for review"

    echo ""
    echo "📬 Step 3: Sending notification..."
    /home/builder/.npm-global/bin/openclaw message send --channel telegram --to "-1003629690118" --thread 212 --message "$MESSAGE" 2>/dev/null || true
    
    echo "✅ Pipeline completed: $TITLE"
else
    echo "❌ Pipeline failed - no notification output"
    echo "Raw output:"
    echo "$PIPELINE_OUTPUT"
    exit 1
fi
