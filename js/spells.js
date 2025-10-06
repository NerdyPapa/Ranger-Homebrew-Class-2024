// ========================================
// SPELL DATA
// ========================================

const CANTRIPS = {
  cleric: ["Guidance", "Light", "Mending", "Resistance", "Sacred Flame", "Spare the Dying", "Thaumaturgy"],
  druid: ["Druidcraft", "Guidance", "Mending", "Poison Spray", "Produce Flame", "Resistance", "Shillelagh", "Thorn Whip"],
  wizard: ["Blade Ward", "Dancing Lights", "Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Prestidigitation", "Ray of Frost", "Shocking Grasp", "True Strike"],
  ranger: ["Druidcraft", "Guidance", "Mending", "Poison Spray", "Produce Flame", "Resistance", "Shillelagh", "Thorn Whip"],
  sorcerer: ["Acid Splash", "Blade Ward", "Chill Touch", "Dancing Lights", "Fire Bolt", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Poison Spray", "Prestidigitation", "Ray of Frost", "Shocking Grasp", "True Strike"],
  warlock: ["Blade Ward", "Chill Touch", "Eldritch Blast", "Friends", "Mage Hand", "Minor Illusion", "Poison Spray", "Prestidigitation", "True Strike"],
  bard: ["Blade Ward", "Dancing Lights", "Friends", "Light", "Mage Hand", "Mending", "Message", "Minor Illusion", "Prestidigitation", "True Strike", "Vicious Mockery"],
  paladin: ["Guidance", "Light", "Mending", "Resistance", "Sacred Flame", "Spare the Dying", "Thaumaturgy"]
};

const LEVEL1_SPELLS = {
  cleric: ["Bless", "Command", "Cure Wounds", "Detect Magic", "Guiding Bolt", "Healing Word", "Inflict Wounds", "Protection from Evil and Good", "Sanctuary", "Shield of Faith"],
  druid: ["Animal Friendship", "Charm Person", "Cure Wounds", "Detect Magic", "Entangle", "Faerie Fire", "Fog Cloud", "Goodberry", "Healing Word", "Jump", "Longstrider", "Speak with Animals", "Thunderwave"],
  wizard: ["Alarm", "Burning Hands", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Expeditious Retreat", "False Life", "Feather Fall", "Find Familiar", "Fog Cloud", "Grease", "Identify", "Illusory Script", "Jump", "Longstrider", "Mage Armor", "Magic Missile", "Protection from Evil and Good", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Tasha's Hideous Laughter", "Tenser's Floating Disk", "Thunderwave", "Unseen Servant", "Witch Bolt"],
  ranger: ["Alarm", "Animal Friendship", "Cure Wounds", "Detect Magic", "Entangle", "Fog Cloud", "Goodberry", "Hunter's Mark", "Jump", "Longstrider", "Speak with Animals"],
  sorcerer: ["Burning Hands", "Charm Person", "Chromatic Orb", "Color Spray", "Comprehend Languages", "Detect Magic", "Disguise Self", "Expeditious Retreat", "False Life", "Feather Fall", "Fog Cloud", "Jump", "Mage Armor", "Magic Missile", "Ray of Sickness", "Shield", "Silent Image", "Sleep", "Thunderwave", "Witch Bolt"],
  warlock: ["Armor of Agathys", "Arms of Hadar", "Charm Person", "Comprehend Languages", "Expeditious Retreat", "Hellish Rebuke", "Hex", "Illusory Script", "Protection from Evil and Good", "Unseen Servant", "Witch Bolt"],
  bard: ["Bane", "Charm Person", "Comprehend Languages", "Cure Wounds", "Detect Magic", "Disguise Self", "Faerie Fire", "Feather Fall", "Healing Word", "Heroism", "Identify", "Illusory Script", "Silent Image", "Sleep", "Speak with Animals", "Tasha's Hideous Laughter", "Thunderwave", "Unseen Servant"],
  paladin: ["Bless", "Command", "Compelled Duel", "Cure Wounds", "Detect Evil and Good", "Detect Magic", "Detect Poison and Disease", "Divine Favor", "Heroism", "Protection from Evil and Good", "Purify Food and Drink", "Searing Smite", "Shield of Faith", "Thunderous Smite", "Wrathful Smite"],
  fey_touched: ["Bane", "Bless", "Charm Person", "Command", "Compelled Duel", "Comprehend Languages", "Detect Magic", "Detect Poison and Disease", "Disguise Self", "Heroism", "Identify", "Sleep", "Speak with Animals", "Tasha's Hideous Laughter"],
  shadow_touched: ["Bane", "Cause Fear", "Charm Person", "Disguise Self", "False Life", "Inflict Wounds", "Ray of Sickness", "Silent Image"]
};

// Spell sources tracking - tracks which features grant spells
const SPELL_SOURCES = {
  // Origin Feats
  "Magic Initiate (Cleric)": { cantrips: 2, cantripList: "cleric", level1: 1, level1List: "cleric" },
  "Magic Initiate (Druid)": { cantrips: 2, cantripList: "druid", level1: 1, level1List: "druid" },
  "Magic Initiate (Wizard)": { cantrips: 2, cantripList: "wizard", level1: 1, level1List: "wizard" },
  
  // Instincts
  "Bloodmarked": { cantrips: 1, cantripList: "sorcerer", level1: 1, level1List: "sorcerer" },
  "Druidic Warrior": { cantrips: 2, cantripList: "druid", level1: 1, level1List: "druid" },
  "Sacred Oath": { cantrips: 1, cantripList: "paladin", level1: 1, level1List: "paladin" },
  "Spell Lore": { cantrips: 1, cantripList: "bard", level1: 1, level1List: "bard" },
  "Wild Charm": { cantrips: 0, cantripList: null, level1: 1, level1List: "druid" },
  "Battle Hymn": { cantrips: 1, cantripList: "bard", level1: 0, level1List: null },
  "Hunter's Mark": { cantrips: 0, cantripList: null, level1: 0, level1List: null, fixedSpells: ["Hunter's Mark"], note: "Always prepared; can cast 1/day without a slot or by using slots" },
  
  // General Feats
  "Fey Touched": { 
    cantrips: 0, 
    cantripList: null, 
    level1: 2, 
    level1List: "fey_touched",
    fixedSpells: ["Misty Step"]
  },
  "Shadow Touched": { 
    cantrips: 0, 
    cantripList: null, 
    level1: 2, 
    level1List: "shadow_touched",
    fixedSpells: ["Invisibility"]
  }
};

// Track selected spells in character object
function initSpellTracking() {
  if (!character.selectedSpells) {
    character.selectedSpells = {
      originFeat: { cantrips: [], level1: [] },
      instincts: {},
      calling: { cantrips: [], level1: [], level2: [], level3: [], level4: [], level5: [] }
    };
  }
}
