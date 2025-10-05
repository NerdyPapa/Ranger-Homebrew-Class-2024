# Ranger Homebrew Character Creator

A comprehensive web-based character sheet builder for a custom Ranger class in tabletop RPGs. This tool helps players create, customize, and manage their Ranger characters from levels 1-20.

## Features

- **Character Customization**
  - 11 playable species with unique traits
  - 16 backgrounds with origin feats
  - 6 Calling options (Warden, Marksman, Mystic, Prowler, Excavator, Wayfarer)
  - 7 Subclass options (Hunter, Beast Master, Gloom Stalker, and more)

- **Ability Score Management**
  - Standard Array (15, 14, 13, 12, 10, 8) or Manual Entry
  - Background ability score increases (+2/+1)
  - Feat bonuses tracked automatically

- **Combat Statistics**
  - Automatic AC calculation based on armor and Dexterity
  - HP tracking (fixed or rolled method)
  - Speed calculation with bonuses and penalties
  - Initiative and proficiency bonus

- **Skills System**
  - 18 skills with proficiency and expertise tracking
  - Automatic modifier calculation
  - Instinct-based skill proficiencies

- **Instincts System**
  - Base instincts available at level 2
  - Advanced instincts unlock at levels 6, 9, 13, and 17
  - Fighting Style options

- **Feats**
  - Origin feat from background
  - General feats at levels 4, 8, 12, 16
  - Epic Boons at level 19
  - Ability score improvements

- **Adaptive Edge Slots**
  - Spell slot tracking system
  - Visual slot management with click-to-use interface

- **Equipment & Weapons**
  - Armor and shield selection with proficiency warnings
  - Quick weapon attack entry
  - Equipment inventory (6 slots)

- **Actions Tracker**
  - Automatically categorized Actions, Bonus Actions, and Reactions
  - Based on selected instincts and abilities

- **Print-Friendly**
  - One-click print to create physical character sheets

## How to Use

1. **Visit the Character Creator**: [Open the tool here](https://yourusername.github.io/Ranger-Homebrew-Character-Creator/)
   *(Replace with your actual GitHub Pages URL once enabled)*

2. **Set Up Your Character**:
   - Choose your Ability Score method (Standard Array or Manual Entry)
   - Select HP method (Fixed or Manual/Rolled)
   - Pick your starting level (1-20)

3. **Build Your Character**:
   - Enter character name and player name
   - Select species and background
   - Choose calling and subclass (available at level 3)
   - Assign ability scores

4. **Customize Further**:
   - Select armor and shield
   - Choose skill proficiencies
   - Pick instincts as you level up
   - Select feats at appropriate levels
   - Add weapons and equipment

5. **Track Progress**:
   - Use Adaptive Edge Slots to track spell usage
   - Update HP as needed
   - Print your character sheet

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript**: Interactive functionality and calculations
- **Lodash**: Utility functions

## Project Structure
ranger-character-creator/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # All styling
├── js/
│   ├── data.js          # Game data (species, feats, armor, etc.)
│   ├── character.js     # Character state and calculations
│   ├── ui.js            # UI rendering functions
│   └── main.js          # Initialization
└── README.md            # This file
## Local Development

To run this project locally:

1. Clone the repository:
```bash
   git clone https://github.com/yourusername/Ranger-Homebrew-Character-Creator.git
