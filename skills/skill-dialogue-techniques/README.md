# Natural Dialogue Techniques Skill

> Official NovelWeave Skill for writing authentic, character-driven dialogue that reveals personality and advances plot.

## Overview

This Skill provides expert guidance on crafting natural dialogue, including character voice differentiation, subtext over exposition, realistic interruptions, and avoiding common dialogue mistakes. It helps AI assistants deliver professional dialogue-writing advice when users are creating character conversations or dialogue-heavy scenes.

## Features

- **Character Voice Development**: Word choice, sentence structure, speech patterns, and what characters avoid saying
- **Subtext Techniques**: Surface vs emotional vs relationship vs thematic layers
- **Interruption & Overlap**: Natural conversation flow, thought interrupting speech
- **Common Mistake Avoidance**: Info-dumping, all characters sound the same, perfect grammar in casual speech
- **Advanced Techniques**: Dialogue as action, silence as dialogue, action breaking dialogue
- **Specialized Scenarios**: Arguments/conflict, romance/intimacy, suspense/tension
- **Integration with NovelWeave**: Automatically applied during `/specify`, `/plan`, `/write`, and `/analyze` commands

## Installation

### Via NovelWeave Marketplace

1. Open NovelWeave CLI or application
2. Navigate to the Skills Marketplace
3. Search for "Natural Dialogue Techniques"
4. Click "Install" to add this Skill to your writing environment

### Manual Installation

```bash
# Clone this repository
git clone https://github.com/wordflowlab/skill-dialogue-techniques.git

# Add to NovelWeave skills directory
cp -r skill-dialogue-techniques ~/.novelweave/skills/
```

## Usage

This Skill activates automatically when:

- User is writing dialogue scenes or asks about character conversations
- User requests help with character voice or dialogue differentiation
- User asks about making dialogue sound more natural or realistic

### Example Scenarios

**When writing dialogue:**
```
User: Write a conversation between two colleagues arguing.
Assistant: [Applies natural-dialogue-techniques Skill]
          - Uses short, rapid exchanges
          - Includes interruptions
          - Shows escalation through language
          - Avoids on-the-nose exposition
```

**When analyzing dialogue:**
```
User: Does this dialogue sound natural?
Assistant: [References Skill guidelines]
          - Checks for info-dumping
          - Validates character voice consistency
          - Identifies opportunities for subtext
          - Suggests removing perfect grammar for casual speech
```

## What's Inside

The `SKILL.md` file contains:

- **Core Principles**: Revealing character through language, subtext over directness
- **Character Voice Components**: Word choice, sentence structure, speech patterns, strategic silence
- **Subtext Layers**: Surface meaning, emotional layer, relationship dynamics, thematic significance
- **Interruptions & Overlap**: Realistic conversation flow, when to use interruptions
- **Common Mistakes**: Info-dumping, identical character voices, perfect casual grammar, narrating actions
- **Advanced Techniques**: Dialogue as action, silence as powerful communication, action beats
- **Dialogue Purpose**: Every exchange should reveal character, advance plot, establish atmosphere, or show conflict
- **Specialized Scenarios**: Arguments/conflict, romance/intimacy, suspense/tension techniques
- **Revision Techniques**: Read-aloud test, cover-up method, purpose test
- **10-Item Quality Checklist**: Ensures dialogue meets professional standards

## Requirements

- NovelWeave v1.0.0 or higher
- Recommended: Works best with character-development and scene-writing Skills

## Contributing

This is an official WordFlow Lab Skill. If you find issues or have suggestions:

1. Open an issue at [novelweave-skills-registry](https://github.com/wordflowlab/novelweave-skills-registry/issues)
2. Reference this Skill by ID: `dialogue-techniques`
3. Follow the [contribution guidelines](https://github.com/wordflowlab/novelweave-skills-registry/blob/main/CONTRIBUTING.md)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

Created and maintained by the WordFlow Lab team.

Part of the official NovelWeave Skills collection.
