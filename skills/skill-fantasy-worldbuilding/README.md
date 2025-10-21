# Fantasy World-Building Skill

> Official NovelWeave Skill for creating immersive fantasy worlds with consistent magic systems, rich cultures, and deep history.

## Overview

This Skill provides expert guidance on fantasy world-building, covering magic system design (hard vs soft), species/culture creation, historical depth, political structures, and avoiding common fantasy pitfalls. It helps AI assistants deliver sophisticated world-building advice when users are creating fantasy settings.

## Features

- **Sanderson's Laws of Magic**: Complete framework for designing hard and soft magic systems
- **World-Building Framework**: Geography, ecology, society, culture, and historical depth
- **Species Design Principles**: Avoiding single-trait stereotypes, creating internal diversity
- **Magic System Templates**: Energy sources, rules, costs, limitations, and forbidden abilities
- **Common Pitfall Avoidance**: Over-exposition, inconsistent rules, default medieval Europe, chosen one tropes
- **Integration with NovelWeave**: Automatically applied during `/specify`, `/plan`, `/write`, and `/analyze` commands

## Installation

### Via NovelWeave Marketplace

1. Open NovelWeave CLI or application
2. Navigate to the Skills Marketplace
3. Search for "Fantasy World-Building"
4. Click "Install" to add this Skill to your writing environment

### Manual Installation

```bash
# Clone this repository
git clone https://github.com/wordflowlab/skill-fantasy-worldbuilding.git

# Add to NovelWeave skills directory
cp -r skill-fantasy-worldbuilding ~/.novelweave/skills/
```

## Usage

This Skill activates automatically when:

- User mentions fantasy, magic systems, or world-building
- User asks about species design, magic rules, or fantasy conventions
- User is working on high fantasy, low fantasy, urban fantasy, or dark fantasy

### Example Scenarios

**When designing a magic system:**
```
User: I want a magic system where people control elements.
Assistant: [Applies fantasy-world-building Skill]
          - Asks about energy source (innate vs external)
          - Defines rules and limitations
          - Establishes costs and consequences
          - Ensures limitations create interesting conflicts
```

**When analyzing world consistency:**
```
User: Does my world make sense?
Assistant: [References Skill guidelines]
          - Checks magic system consistency
          - Validates geography affects culture
          - Ensures at least three generations of history
          - Verifies political structures have clear motivations
```

## What's Inside

The `SKILL.md` file contains:

- **Sanderson's Three Laws of Magic**: Understanding vs satisfaction, limitations vs power, expansion vs addition
- **Hard Magic System Design**: Energy source, usage rules, costs/consequences, possible vs impossible
- **Soft Magic System Design**: When to use mystery, maintaining sense of wonder
- **World-Building Framework**: Geography, ecosystems, magic's impact on environment
- **Society & Culture Layers**: Political, economic, social, cultural considerations
- **Historical Depth**: Current era, parent generation, grandparent generation, ancient history
- **Species Design**: Avoiding stereotypes, creating depth, ecological niches
- **Common Pitfalls**: Over-exposition, inconsistent rules, medieval Europe default, chosen one trap
- **Fantasy Subgenres**: High fantasy, low fantasy, urban fantasy, dark fantasy conventions
- **Information Reveal Strategy**: Iceberg principle, show vs tell timing

## Requirements

- NovelWeave v1.0.0 or higher
- Recommended: Works best with character-development and plot-structure Skills

## Contributing

This is an official WordFlow Lab Skill. If you find issues or have suggestions:

1. Open an issue at [novelweave-skills-registry](https://github.com/wordflowlab/novelweave-skills-registry/issues)
2. Reference this Skill by ID: `fantasy-worldbuilding`
3. Follow the [contribution guidelines](https://github.com/wordflowlab/novelweave-skills-registry/blob/main/CONTRIBUTING.md)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

Created and maintained by the WordFlow Lab team.

Part of the official NovelWeave Skills collection.
