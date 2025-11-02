// ========================================
// WEAPONS DATABASE
// Complete weapon listings with properties and mastery effects
// ========================================

const WEAPONS_DATABASE = {
  // ========================================
  // SIMPLE MELEE WEAPONS
  // ========================================
  "Club": {
    damage: "1d4",
    damageType: "bludgeoning",
    properties: ["Light"],
    mastery: "Slow",
    masteryDesc: "Hit creature's speed reduced by 10 ft until start of your next turn.",
    category: "simple melee"
  },
  "Dagger": {
    damage: "1d4",
    damageType: "piercing",
    properties: ["Finesse", "Light", "Thrown (20/60)"],
    mastery: "Nick",
    masteryDesc: "When you make extra attack with this weapon, you can make it as part of Attack action instead of Bonus Action.",
    category: "simple melee"
  },
  "Greatclub": {
    damage: "1d8",
    damageType: "bludgeoning",
    properties: ["Two-Handed"],
    mastery: "Push",
    masteryDesc: "Hit creature, push it 10 ft away (save: STR DC 8 + Prof + STR).",
    category: "simple melee"
  },
  "Handaxe": {
    damage: "1d6",
    damageType: "slashing",
    properties: ["Light", "Thrown (20/60)"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "simple melee"
  },
  "Javelin": {
    damage: "1d6",
    damageType: "piercing",
    properties: ["Thrown (30/120)"],
    mastery: "Slow",
    masteryDesc: "Hit creature's speed reduced by 10 ft until start of your next turn.",
    category: "simple melee"
  },
  "Light Hammer": {
    damage: "1d4",
    damageType: "bludgeoning",
    properties: ["Light", "Thrown (20/60)"],
    mastery: "Nick",
    masteryDesc: "When you make extra attack with this weapon, you can make it as part of Attack action instead of Bonus Action.",
    category: "simple melee"
  },
  "Mace": {
    damage: "1d6",
    damageType: "bludgeoning",
    properties: [],
    mastery: "Sap",
    masteryDesc: "Hit creature, disadvantage on next attack before start of your next turn.",
    category: "simple melee"
  },
  "Quarterstaff": {
    damage: "1d6",
    damageType: "bludgeoning",
    properties: ["Versatile (1d8)"],
    mastery: "Topple",
    masteryDesc: "Hit creature, it must save or be knocked prone (save: CON DC 8 + Prof + STR).",
    category: "simple melee"
  },
  "Sickle": {
    damage: "1d4",
    damageType: "slashing",
    properties: ["Light"],
    mastery: "Nick",
    masteryDesc: "When you make extra attack with this weapon, you can make it as part of Attack action instead of Bonus Action.",
    category: "simple melee"
  },
  "Spear": {
    damage: "1d6",
    damageType: "piercing",
    properties: ["Thrown (20/60)", "Versatile (1d8)"],
    mastery: "Sap",
    masteryDesc: "Hit creature, disadvantage on next attack before start of your next turn.",
    category: "simple melee"
  },

  // ========================================
  // SIMPLE RANGED WEAPONS
  // ========================================
  "Light Crossbow": {
    damage: "1d8",
    damageType: "piercing",
    properties: ["Ammunition (80/320)", "Loading", "Two-Handed"],
    mastery: "Slow",
    masteryDesc: "Hit creature's speed reduced by 10 ft until start of your next turn.",
    category: "simple ranged"
  },
  "Dart": {
    damage: "1d4",
    damageType: "piercing",
    properties: ["Finesse", "Thrown (20/60)"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "simple ranged"
  },
  "Shortbow": {
    damage: "1d6",
    damageType: "piercing",
    properties: ["Ammunition (80/320)", "Two-Handed"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "simple ranged"
  },
  "Sling": {
    damage: "1d4",
    damageType: "bludgeoning",
    properties: ["Ammunition (30/120)"],
    mastery: "Slow",
    masteryDesc: "Hit creature's speed reduced by 10 ft until start of your next turn.",
    category: "simple ranged"
  },

  // ========================================
  // MARTIAL MELEE WEAPONS
  // ========================================
  "Battleaxe": {
    damage: "1d8",
    damageType: "slashing",
    properties: ["Versatile (1d10)"],
    mastery: "Topple",
    masteryDesc: "Hit creature, it must save or be knocked prone (save: CON DC 8 + Prof + STR).",
    category: "martial melee"
  },
  "Flail": {
    damage: "1d8",
    damageType: "bludgeoning",
    properties: [],
    mastery: "Sap",
    masteryDesc: "Hit creature, disadvantage on next attack before start of your next turn.",
    category: "martial melee"
  },
  "Glaive": {
    damage: "1d10",
    damageType: "slashing",
    properties: ["Heavy", "Reach", "Two-Handed"],
    mastery: "Graze",
    masteryDesc: "Miss with attack, deal damage equal to ability modifier to target.",
    category: "martial melee"
  },
  "Greataxe": {
    damage: "1d12",
    damageType: "slashing",
    properties: ["Heavy", "Two-Handed"],
    mastery: "Cleave",
    masteryDesc: "Kill creature, make melee attack against second creature within 5 ft with same weapon.",
    category: "martial melee"
  },
  "Greatsword": {
    damage: "2d6",
    damageType: "slashing",
    properties: ["Heavy", "Two-Handed"],
    mastery: "Graze",
    masteryDesc: "Miss with attack, deal damage equal to ability modifier to target.",
    category: "martial melee"
  },
  "Halberd": {
    damage: "1d10",
    damageType: "slashing",
    properties: ["Heavy", "Reach", "Two-Handed"],
    mastery: "Cleave",
    masteryDesc: "Kill creature, make melee attack against second creature within 5 ft with same weapon.",
    category: "martial melee"
  },
  "Lance": {
    damage: "1d12",
    damageType: "piercing",
    properties: ["Reach", "Special"],
    mastery: "Topple",
    masteryDesc: "Hit creature, it must save or be knocked prone (save: CON DC 8 + Prof + STR).",
    category: "martial melee"
  },
  "Longsword": {
    damage: "1d8",
    damageType: "slashing",
    properties: ["Versatile (1d10)"],
    mastery: "Sap",
    masteryDesc: "Hit creature, disadvantage on next attack before start of your next turn.",
    category: "martial melee"
  },
  "Maul": {
    damage: "2d6",
    damageType: "bludgeoning",
    properties: ["Heavy", "Two-Handed"],
    mastery: "Topple",
    masteryDesc: "Hit creature, it must save or be knocked prone (save: CON DC 8 + Prof + STR).",
    category: "martial melee"
  },
  "Morningstar": {
    damage: "1d8",
    damageType: "piercing",
    properties: [],
    mastery: "Sap",
    masteryDesc: "Hit creature, disadvantage on next attack before start of your next turn.",
    category: "martial melee"
  },
  "Pike": {
    damage: "1d10",
    damageType: "piercing",
    properties: ["Heavy", "Reach", "Two-Handed"],
    mastery: "Push",
    masteryDesc: "Hit creature, push it 10 ft away (save: STR DC 8 + Prof + STR).",
    category: "martial melee"
  },
  "Rapier": {
    damage: "1d8",
    damageType: "piercing",
    properties: ["Finesse"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "martial melee"
  },
  "Scimitar": {
    damage: "1d6",
    damageType: "slashing",
    properties: ["Finesse", "Light"],
    mastery: "Nick",
    masteryDesc: "When you make extra attack with this weapon, you can make it as part of Attack action instead of Bonus Action.",
    category: "martial melee"
  },
  "Shortsword": {
    damage: "1d6",
    damageType: "piercing",
    properties: ["Finesse", "Light"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "martial melee"
  },
  "Trident": {
    damage: "1d6",
    damageType: "piercing",
    properties: ["Thrown (20/60)", "Versatile (1d8)"],
    mastery: "Topple",
    masteryDesc: "Hit creature, it must save or be knocked prone (save: CON DC 8 + Prof + STR).",
    category: "martial melee"
  },
  "War Pick": {
    damage: "1d8",
    damageType: "piercing",
    properties: [],
    mastery: "Sap",
    masteryDesc: "Hit creature, disadvantage on next attack before start of your next turn.",
    category: "martial melee"
  },
  "Warhammer": {
    damage: "1d8",
    damageType: "bludgeoning",
    properties: ["Versatile (1d10)"],
    mastery: "Push",
    masteryDesc: "Hit creature, push it 10 ft away (save: STR DC 8 + Prof + STR).",
    category: "martial melee"
  },
  "Whip": {
    damage: "1d4",
    damageType: "slashing",
    properties: ["Finesse", "Reach"],
    mastery: "Slow",
    masteryDesc: "Hit creature's speed reduced by 10 ft until start of your next turn.",
    category: "martial melee"
  },

  // ========================================
  // MARTIAL RANGED WEAPONS
  // ========================================
  "Blowgun": {
    damage: "1",
    damageType: "piercing",
    properties: ["Ammunition (25/100)", "Loading"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "martial ranged"
  },
  "Hand Crossbow": {
    damage: "1d6",
    damageType: "piercing",
    properties: ["Ammunition (30/120)", "Light", "Loading"],
    mastery: "Vex",
    masteryDesc: "Hit creature, advantage on next attack against it before end of next turn.",
    category: "martial ranged"
  },
  "Heavy Crossbow": {
    damage: "1d10",
    damageType: "piercing",
    properties: ["Ammunition (100/400)", "Heavy", "Loading", "Two-Handed"],
    mastery: "Push",
    masteryDesc: "Hit creature, push it 10 ft away (save: STR DC 8 + Prof + STR).",
    category: "martial ranged"
  },
  "Longbow": {
    damage: "1d8",
    damageType: "piercing",
    properties: ["Ammunition (150/600)", "Heavy", "Two-Handed"],
    mastery: "Slow",
    masteryDesc: "Hit creature's speed reduced by 10 ft until start of your next turn.",
    category: "martial ranged"
  },
  "Net": {
    damage: "0",
    damageType: "none",
    properties: ["Special", "Thrown (5/15)"],
    mastery: "Topple",
    masteryDesc: "Hit creature, it must save or be knocked prone (save: CON DC 8 + Prof + STR).",
    category: "martial ranged"
  }
};

// Helper function to check if weapon uses DEX modifier
function weaponUsesDex(weaponName) {
  if (!WEAPONS_DATABASE[weaponName]) return false;
  const weapon = WEAPONS_DATABASE[weaponName];
  return weapon.properties.some(prop => 
    prop === "Finesse" || 
    prop === "Light" || 
    prop.startsWith("Thrown") ||
    weapon.category.includes("ranged")
  );
}

// Helper function to get weapon attack modifier
function getWeaponAttackMod(weaponName, character) {
  if (!WEAPONS_DATABASE[weaponName]) return 0;
  
  const usesDex = weaponUsesDex(weaponName);
  const abilMod = usesDex ? getMod(getScore('dex')) : getMod(getScore('str'));
  const profBonus = LEVEL_DATA[character.level].profBonus;
  
  return abilMod + profBonus;
}

// Helper function to get weapon damage string
function getWeaponDamageString(weaponName, character) {
  if (!WEAPONS_DATABASE[weaponName]) return "";
  
  const weapon = WEAPONS_DATABASE[weaponName];
  const usesDex = weaponUsesDex(weaponName);
  const abilMod = usesDex ? getMod(getScore('dex')) : getMod(getScore('str'));
  
  return `${weapon.damage} + ${abilMod}`;
}
