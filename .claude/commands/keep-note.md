# Keep Note Command

Takes notes about the topic discussed in recent conversation and creates educational content with a YouTube video script.

## Usage

```
/keep-note <topic-name>
```

## Description

This command analyzes the recent conversation, extracts key information about the specified topic, and creates:

1. A detailed educational note in markdown format
2. A conversational YouTube video script (under 4 minutes)
3. Properly organized folder structure in the root directory

## Parameters

- `topic-name` (required): The name of the topic to create notes for. This will be used for folder and file naming.

## Implementation

```bash
#!/bin/bash

# Get the topic name from the argument
TOPIC_NAME="$1"

if [ -z "$TOPIC_NAME" ]; then
    echo "Error: Please provide a topic name"
    echo "Usage: /keep-note <topic-name>"
    exit 1
fi

# Create sanitized folder name (replace spaces with dashes, lowercase)
FOLDER_NAME=$(echo "$TOPIC_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')

# Create timestamp for indexing
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
INDEX_PREFIX=$(date +"%Y%m%d")

# Create the notes directory structure
NOTES_DIR="notes/$FOLDER_NAME"
mkdir -p "$NOTES_DIR"

# Generate the note filename with index
NOTE_FILE="$NOTES_DIR/${INDEX_PREFIX}_${FOLDER_NAME}.md"

# Create the educational note content
cat > "$NOTE_FILE" << 'EOF'
# [TOPIC_TITLE]

*Generated on [DATE] from conversation analysis*

## Overview

[Brief overview of the topic based on conversation context]

## Key Concepts

### Concept 1
[Detailed explanation with examples]

### Concept 2
[Detailed explanation with examples]

## Technical Implementation

### Code Examples

```javascript
// Example code from the conversation
function example() {
    // Implementation details
}
```

### Best Practices

1. [Practice 1 with explanation]
2. [Practice 2 with explanation]
3. [Practice 3 with explanation]

## Common Pitfalls

- [Pitfall 1 and how to avoid it]
- [Pitfall 2 and how to avoid it]

## Resources and References

- [Relevant documentation links]
- [Additional learning resources]

---

## YouTube Video Script (4-minute educational video)

### Hook (0-15 seconds)
"Today we're diving straight into [TOPIC] - I'll show you exactly how to [main benefit] in under 4 minutes. Let's get started."

### Main Content (15 seconds - 3 minutes 30 seconds)

**Section 1: The Problem (15-45 seconds)**
"Here's the challenge most developers face with [TOPIC]: [specific problem]. Let me show you the solution."

**Section 2: The Solution (45 seconds - 2 minutes 30 seconds)**
"The key is [main concept]. Here's how it works:"

*[Show code example on screen]*

```javascript
// Live code demonstration
[key code example]
```

"Notice how [important detail]. This is crucial because [explanation]."

**Section 3: Pro Tips (2:30 - 3:30)**
"Here are three pro tips to level up your implementation:

1. [Tip 1] - This prevents [common issue]
2. [Tip 2] - This improves [benefit]  
3. [Tip 3] - This helps you [advantage]"

### Closing (3:30 - 4:00)
"That's [TOPIC] in action. You now know how to [key takeaway]. Try this in your next project and let me know how it works for you in the comments. Subscribe for more quick dev tutorials!"

### On-Screen Text Overlays
- Key code snippets
- Important concept definitions
- Pro tip highlights
- Resource links in description

---

*Note: This content is generated from conversation analysis and may need refinement for specific use cases.*
EOF

# Replace placeholders with actual content
sed -i '' "s/\[TOPIC_TITLE\]/$TOPIC_NAME/g" "$NOTE_FILE"
sed -i '' "s/\[DATE\]/$(date +"%B %d, %Y")/g" "$NOTE_FILE"
sed -i '' "s/\[TOPIC\]/$TOPIC_NAME/g" "$NOTE_FILE"

echo "✅ Educational note created: $NOTE_FILE"
echo "📁 Organized in: $NOTES_DIR"
echo "🎥 YouTube script included for 4-minute educational video"
echo ""
echo "Next steps:"
echo "1. Review and customize the generated content"
echo "2. Add specific code examples from your conversation"
echo "3. Refine the video script for your presentation style"
```

## Output Structure

```
notes/
└── topic-name/
    └── YYYYMMDD_topic-name.md
```

## Features

- **Automated Organization**: Creates properly indexed folders and files
- **Educational Focus**: Structured notes with key concepts, examples, and best practices
- **Video Script**: Ready-to-use 4-minute YouTube script with timing breakdown
- **Code Integration**: Placeholder sections for relevant code examples
- **Professional Format**: Clean markdown with proper sections and formatting

## Example Usage

```bash
/keep-note "React Native Authentication"
# Creates: notes/react-native-authentication/20240807_react-native-authentication.md

/keep-note "Convex Database Setup" 
# Creates: notes/convex-database-setup/20240807_convex-database-setup.md
```