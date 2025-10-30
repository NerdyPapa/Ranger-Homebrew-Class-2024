# Ranger Character Creator for D&D 5th Edition

A comprehensive web-based character creator for a homebrew Ranger class redesign. This tool allows players to create fully-featured Ranger characters with custom calling paths, subclasses, instincts, and adaptive edge spellcasting.

## Features

This character creator includes everything you need to build a complete Ranger character:

- **Six Calling Paths**: Choose from Warden, Marksman, Mystic, Prowler, Excavator, or Wayfarer, each with unique abilities and playstyles
- **Seven Subclasses**: Select from Hunter, Beast Master, Gloom Stalker, Horizon Walker, Lunar Sentinel, Fey Wanderer, or Swarmkeeper
- **Instinct System**: Pick from dozens of Instincts that unlock at various levels to customize your Ranger's capabilities
- **Adaptive Edge Casting**: A unique spellcasting system that combines slot-based casting with once-per-long-rest abilities
- **Complete Character Sheet**: Automatic calculation of ability scores, AC, HP, saves, skills, and more
- **Fighting Style Feats**: Special feats that unlock when you take certain instincts
- **Equipment Tracking**: Track armor, weapons, and general equipment

## How to Use

### Opening the Character Creator

Simply open the `index.html` file in your web browser. The character creator will load automatically and you can start building your character right away.

### Building Your Character

The character creator walks you through each step of character creation:

1. **Choose Your Method**: Select whether you want to use Standard Array or Manual Entry for ability scores, and whether you want fixed or rolled HP
2. **Set Your Level**: Use the level selector to set your character level from 1 to 20
3. **Basic Information**: Enter your character name, player name, species, and background
4. **Calling and Subclass**: Select your Ranger calling and subclass (subclass unlocks at level 3)
5. **Ability Scores**: Assign your ability scores using either the standard array or manual entry
6. **Skills**: Choose your skill proficiencies and expertise (expertise unlocks at level 9)
7. **Instincts**: Select your instincts from the available options based on your level
8. **Spells**: If your instincts or origin feat grant spells, choose them from the dropdown menus
9. **Feats**: Select your feats at levels 4, 8, 12, and 16, plus an Epic Boon at level 19
10. **Equipment**: Add your weapons and gear to track everything your character carries

### Understanding the Features

**Calling Features and Subclass Features**: These sections automatically populate based on your selections and show only the features you've unlocked at your current level.

**Instincts**: These are special abilities you can choose at specific levels. Some instincts grant skill proficiencies, fighting styles, or even spells. The number of instincts you can select increases as you level up.

**Adaptive Edge Slots**: These function like spell slots but work with your Ranger's unique casting system. Spells learned from feats and instincts can be cast once per long rest for free, or by using these slots.

**Fighting Style Feats**: When you select an instinct that grants a fighting style (like "Fighting Style - Archery"), you'll unlock a special feat selection where you can choose a more powerful version of that fighting style.

## Project Structure

The project is organized into several folders for easy navigation:

```
ranger-character-creator/
├── index.html           # Main HTML file - open this in your browser
├── css/
│   └── styles.css      # All styling for the character sheet
├── js/
│   ├── data.js         # Game data (species, feats, instincts, armor, etc.)
│   ├── spells.js       # Spell lists and spell-granting features
│   ├── character.js    # Character state and core calculations
│   ├── ui.js           # All UI rendering functions
│   └── main.js         # Initialization and update functions
└── docs/
    ├── Ranger_Homebrew_2_0.docx      # Full homebrew Ranger rules
    ├── Spell_Descriptions.docx       # All spell descriptions
    ├── Weapons_and_Magic_Items.docx  # Weapon and item details
    └── Armor.docx                    # Armor details and rules
```

## Setting Up on GitHub

If you want to share this project or collaborate with others on GitHub, follow these steps:

### First-Time Setup

1. **Create a GitHub Account**: If you don't have one already, go to [github.com](https://github.com) and sign up for a free account

2. **Install Git**: Download and install Git from [git-scm.com](https://git-scm.com)

3. **Create a New Repository on GitHub**:
   - Go to github.com and log in
   - Click the "+" button in the top right and select "New repository"
   - Name it something like "ranger-character-creator"
   - Choose whether to make it Public (anyone can see) or Private (only you can see)
   - Do NOT check "Initialize with README" since you already have one
   - Click "Create repository"

4. **Upload Your Project**:
   
   **Option A - Using GitHub Website (Easier for Beginners)**:
   - On your new repository page, click "uploading an existing file"
   - Drag and drop all the files and folders from your ranger-character-creator folder
   - Write a commit message like "Initial commit of Ranger Character Creator"
   - Click "Commit changes"

   **Option B - Using Git Command Line**:
   ```bash
   cd path/to/ranger-character-creator
   git init
   git add .
   git commit -m "Initial commit of Ranger Character Creator"
   git branch -M main
   git remote add origin https://github.com/yourusername/ranger-character-creator.git
   git push -u origin main
   ```

### Making Changes and Updating

When you make changes to the character creator and want to update GitHub:

1. Make your changes to the files locally
2. Go to your repository on GitHub
3. Click "Add file" → "Upload files"
4. Drag the changed files
5. Write a commit message describing what you changed
6. Click "Commit changes"

Or using command line:
```bash
git add .
git commit -m "Description of what you changed"
git push
```

## Customizing the Character Creator

### Adding New Instincts

To add new instincts, open `js/data.js` and find the `INSTINCTS_DB` object. Add your new instinct to the appropriate level array:

```javascript
{
  name: "Your Instinct Name",
  desc: "Description of what it does",
  action: "passive"  // or "action", "bonus", "reaction"
}
```

### Adding New Calling Features

Open `js/data.js` and find the `DATABASE` object. Navigate to the calling you want to modify and add features:

```javascript
warden: {
  name: "Warden",
  primaryStat: "cha",
  features: [
    { 
      level: 1, 
      name: "Feature Name", 
      description: "What the feature does" 
    }
  ]
}
```

### Adding New Spells to Feats or Instincts

Open `js/spells.js` and add your spell to the appropriate list, then update the `SPELL_SOURCES` object to connect it to the feat or instinct.

## Playtesting and Balance

This character creator is designed to help with playtesting and balancing the homebrew Ranger class. When playtesting:

- Pay attention to how instincts interact with each other
- Note any calling features that feel too strong or too weak
- Track spell usage to see if the Adaptive Edge system works well
- Compare damage output and survivability to other martial classes
- Get feedback from players about which options feel most fun

Keep notes on what works well and what needs adjustment, then we can refine the class together based on actual play experience.

## Troubleshooting

### The page looks broken or unstyled
Make sure all the files are in the correct folders as shown in the Project Structure section above. The `index.html` file expects to find `css/styles.css` and all the JavaScript files in the `js/` folder.

### Calling or Subclass features aren't showing up
This was caused by files being in the wrong location. Make sure you're using the organized folder structure and that `index.html` is in the root folder while JavaScript files are in the `js/` folder.

### Changes to instincts or features aren't appearing
After editing any `.js` files, you need to refresh your browser page (usually by pressing F5 or Ctrl+R). Your browser may be caching the old version of the file.

### The page is completely blank
Open your browser's Developer Console (usually F12) and check for any error messages. This usually means a JavaScript file couldn't load or has a syntax error.

## Contributing

This is a living project designed for playtesting and iteration. If you have suggestions for improvements, balance changes, or new features, please share your feedback!

## License

This is a homebrew project for personal and group use in Dungeons & Dragons 5th Edition campaigns.

---

**Happy Character Building!** 

If you encounter any issues or have questions about how to use the character creator, refer back to this README or examine the example character setup in the initial state of the creator.
