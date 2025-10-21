# Romance Novel Conventions Skill

> Official NovelWeave Skill for mastering romance novel writing conventions, pacing, and emotional arcs.

## Overview

This Skill provides comprehensive guidance on romance novel writing, including genre conventions, emotional pacing, relationship development patterns, and reader expectations. It helps AI assistants deliver expert advice when users are writing love stories, relationship-driven narratives, or romance subplots.

## Features

- **Romance Pacing Guidelines**: Meet-cute timing, first kiss placement, dark moment, and grand gesture
- **Emotional Arc Templates**: Quick reference for relationship milestones at different story percentages
- **Common Pitfalls**: Avoid insta-love, miscommunication-only conflict, and passive protagonists
- **Subgenre Specifics**: Contemporary, historical, paranormal, and romantic suspense conventions
- **Integration with NovelWeave**: Automatically applied during `/specify`, `/plan`, `/write`, and `/analyze` commands

## Installation

### Via NovelWeave Marketplace

1. Open NovelWeave CLI or application
2. Navigate to the Skills Marketplace
3. Search for "Romance Novel Conventions"
4. Click "Install" to add this Skill to your writing environment

### Manual Installation

```bash
# Clone this repository
git clone https://github.com/wordflowlab/skill-romance-writing.git

# Add to NovelWeave skills directory
cp -r skill-romance-writing ~/.novelweave/skills/
```

## Usage

This Skill activates automatically when:

- User mentions romance, love stories, or relationship-driven narratives
- User asks about emotional arcs or relationship development
- User is working on romantic subplots or romantic pacing

### Example Scenarios

**When planning a romance novel:**
```
User: I want to write a contemporary romance about two rival chefs.
Assistant: [Applies romance-novel-conventions Skill]
          - Suggests meet-cute timing (0-10%)
          - Plans relationship milestones
          - Identifies internal/external conflicts
          - Ensures HEA/HFN ending structure
```

**When analyzing pacing:**
```
User: Is my first kiss scene too early?
Assistant: [References Skill guidelines]
          - Checks placement against slow-burn (50-60%) vs fast-burn (20-30%)
          - Evaluates emotional buildup
          - Suggests adjustment if needed
```

## What's Inside

The `SKILL.md` file contains:

- **Core Elements**: Emotional connection, internal conflict, external obstacles, satisfying endings
- **Pacing Guide**: Detailed percentage breakdowns for romance story beats
- **Emotional Beat Points**: First kiss timing, intimacy progression, dark moment placement
- **Common Pitfalls**: Insta-love, miscommunication-only conflict, passive protagonists, unearned endings
- **Subgenre Considerations**: Contemporary, historical, paranormal, romantic suspense
- **Reader Expectations**: What satisfies romance readers vs what frustrates them
- **Practical Checklist**: 8-item checklist for romance novel quality assurance

## Requirements

- NovelWeave v1.0.0 or higher
- Recommended: Works best with dialogue-techniques and character-development Skills

## Contributing

This is an official WordFlow Lab Skill. If you find issues or have suggestions:

1. Open an issue at [novelweave-skills-registry](https://github.com/wordflowlab/novelweave-skills-registry/issues)
2. Reference this Skill by ID: `romance-writing`
3. Follow the [contribution guidelines](https://github.com/wordflowlab/novelweave-skills-registry/blob/main/CONTRIBUTING.md)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

Created and maintained by the WordFlow Lab team.

Part of the official NovelWeave Skills collection.
