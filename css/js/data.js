// ========================================
// GAME DATA - All the species, feats, armor, etc.
// ========================================

const SPECIES_LIST = ["Aasimar", "Dragonborn", "Dwarf", "Elf", "Gnome", "Goliath", "Halfling", "Human", "Kenku", "Orc", "Tiefling"];

const SPECIES_DATA = {
  "Aasimar": {
    title: "Aasimar (Humanoid, Small/Medium, Speed 30)",
    desc: `• Celestial Resistance: Resistance to Necrotic & Radiant.
- Darkvision 60 ft.
- Healing Hands: Magic action; heal PBd4; 1/Long Rest.
- Light Bearer: Light cantrip (CHA).
- Celestial Revelation (3rd level): 1 minute after Bonus Action; choose each time:
  - Heavenly Wings: Fly speed = speed, extra PB radiant on one hit/turn.
  - Inner Radiance: Shed light; end of turn, nearby take PB radiant.
  - Necrotic Shroud: Nearby make CHA save or frightened until your next turn; extra PB necrotic on one hit/turn.`
  },
  "Dragonborn": {
    title: "Dragonborn (Humanoid, Medium, Speed 30)",
    desc: `• Draconic Ancestry: Pick damage type (Acid/Cold/Fire/Lightning/Poison).
- Breath Weapon: Replace one attack: 15-ft cone or 30-ft line (Dex save). 1d10 scaling to 4d10 (5/11/17). Uses = PB/Long Rest.
- Damage Resistance: To ancestry type.
- Darkvision 60 ft.
- Draconic Flight (5th): Bonus Action wings for 10 min; Fly speed = speed; 1/Long Rest.`
  },
  "Dwarf": {
    title: "Dwarf (Humanoid, Medium, Speed 30)",
    desc: `• Darkvision 120 ft.
- Dwarven Resilience: Resistance to Poison; advantage vs. Poisoned.
- Dwarven Toughness: +1 HP per level (starts +1).
- Stonecunning: Bonus Action get Tremorsense 60 ft for 10 min while on stone; uses = PB/Long Rest.`
  },
  "Elf": {
    title: "Elf (Humanoid, Medium, Speed 30)",
    desc: `• Darkvision 60 ft.
- Elven Lineage: choose Drow/High/Wood (grants cantrip & spells at 3rd/5th; 1/Long Rest, also by slots).
- Fey Ancestry: Advantage vs. Charmed.
- Keen Senses: Proficiency in Insight, Perception, or Survival.
- Trance: Long Rest in 4 hours while conscious.`
  },
  "Gnome": {
    title: "Gnome (Humanoid, Small, Speed 30)",
    desc: `• Darkvision 60 ft.
- Gnomish Cunning: Advantage on INT, WIS, CHA saves.
- Gnomish Lineage (Forest or Rock):
  - Forest: Minor Illusion; Speak with Animals prepared PB/day w/o slot.
  - Rock: Mending & Prestidigitation; 10-min tinker tiny device (up to 3) lasting 8 hours.`
  },
  "Goliath": {
    title: "Goliath (Humanoid, Medium, Speed 35)",
    desc: `• Giant Ancestry: PB/Long Rest choose ancestry effect (Cloud teleport; Fire +1d10; Frost +1d6 & slow; Hill prone; Stone reduce damage 1d12+CON; Storm 1d8 on attacker within 60 ft).
- Large Form (5th): Bonus Action become Large 10 min; +10 ft speed; adv STR checks; 1/Long Rest.
- Powerful Build: Adv to end Grappled; count as one size larger for carry.`
  },
  "Halfling": {
    title: "Halfling (Humanoid, Small, Speed 30)",
    desc: `• Brave: Advantage vs. Frightened.
- Halfling Nimbleness: Move through larger creatures' spaces.
- Luck: Reroll 1s on d20 tests (must use new).
- Naturally Stealthy: Can Hide when obscured by larger creature.`
  },
  "Human": {
    title: "Human (Humanoid, Small/Medium, Speed 30)",
    desc: `• Resourceful: Gain Heroic Inspiration after each Long Rest.
- Skillful: Gain proficiency in one skill of your choice.
- Versatile: Gain one Origin feat (Skilled recommended).`
  },
  "Kenku": {
    title: "Kenku (Humanoid, Small/Medium, Speed 30)",
    desc: `• Expert Duplication: When copying writing or craftwork you've seen (including your own), you have Advantage on checks to produce an exact duplicate.
- Kenku Recall: Gain proficiency in two skills of your choice. When you make an ability check using a skill you're proficient in, you can give yourself Advantage before you roll. Uses = your Proficiency Bonus per Long Rest.
- Mimicry: You can accurately mimic sounds and voices you've heard. A listener can tell they're imitations only with a Wisdom (Insight) check vs. DC (8 + your Proficiency Bonus + your Charisma modifier).
- Size Choice: Small or Medium (choose on selection).`
  },
  "Orc": {
    title: "Orc (Humanoid, Medium, Speed 30)",
    desc: `• Adrenaline Rush: Bonus Action Dash; gain temp HP = PB; uses = PB/Short or Long Rest.
- Darkvision 120 ft.
- Relentless Endurance: 1/Long Rest drop to 1 HP instead of 0.`
  },
  "Tiefling": {
    title: "Tiefling (Humanoid, Small/Medium, Speed 30)",
    desc: `• Darkvision 60 ft.
- Fiendish Legacy: choose Abyssal (Poison resist + Poison Spray; Ray of Sickness/Hold Person), Chthonic (Necrotic resist + Chill Touch; False Life/Ray of Enfeeblement), or Infernal (Fire resist + Fire Bolt; Hellish Rebuke/Darkness). Each spell 1/Long Rest, also via slots.
- Otherworldly Presence: Thaumaturgy cantrip.`
  }
};

const BACKGROUNDS = {
  "Acolyte": { originFeat: "Magic Initiate (Cleric)" },
  "Artisan": { originFeat: "Crafter" },
  "Charlatan": { originFeat: "Skilled" },
  "Criminal": { originFeat: "Alert" },
  "Entertainer": { originFeat: "Musician" },
  "Farmer": { originFeat: "Tough" },
  "Guard": { originFeat: "Alert" },
  "Guide": { originFeat: "Magic Initiate (Druid)" },
  "Hermit": { originFeat: "Healer" },
  "Merchant": { originFeat: "Lucky" },
  "Noble": { originFeat: "Skilled" },
  "Sage": { originFeat: "Magic Initiate (Wizard)" },
  "Sailor": { originFeat: "Tavern Brawler" },
  "Scribe": { originFeat: "Skilled" },
  "Soldier": { originFeat: "Savage Attacker" },
  "Wayfarer": { originFeat: "Lucky" }
};

const ORIGIN_FEAT_DESC = {
  "Alert": "• Add Proficiency Bonus to Initiative.\n• After you roll initiative, you may swap initiative with a willing ally; cannot if either is Incapacitated.",
  "Crafter": "• Gain proficiency with 3 Artisan's Tools of your choice.\n• 20% discount on nonmagical items.\n• Fast Crafting: after a Long Rest, craft one item from Fast Crafting table (requires tools & proficiency); lasts until next Long Rest.",
  "Healer": "• Battle Medic: Use Healer's Kit (Utilize) to let a creature spend a Hit Die; you roll it; heal result + PB.\n• Healing Rerolls: Reroll 1s on HP restoration dice from spells or this feat (must use new roll).",
  "Lucky": "• Luck Points equal to PB; refresh on Long Rest.\n• Spend 1 point to gain Advantage on your d20 test, or impose Disadvantage on a creature's attack against you.",
  "Magic Initiate (Cleric)": "• Learn 2 cantrips from Cleric list.\n• Learn 1 level 1 Cleric spell; always prepared; 1/day cast without slot; may also cast with slots. Spellcasting ability = INT/WIS/CHA (pick). Replace one chosen spell each level.",
  "Magic Initiate (Druid)": "• As Magic Initiate (Cleric) but Druid list.",
  "Magic Initiate (Wizard)": "• As Magic Initiate (Cleric) but Wizard list.",
  "Musician": "• Proficiency with 3 instruments.\n• Encouraging Song: after a Short/Long Rest, grant Heroic Inspiration to up to PB allies who hear your song.",
  "Savage Attacker": "• Once per turn when you hit with a weapon, roll its damage dice twice and use either result.",
  "Skilled": "• Gain proficiency in any combination of three skills or tools.\n• Repeatable.",
  "Tavern Brawler": "• Unarmed Strike deals 1d4 + STR (bludgeoning) instead of normal.\n• Reroll 1s on unarmed damage.\n• Proficiency with improvised weapons.\n• Push 5 ft when you hit with Unarmed Strike as part of Attack (1/turn).",
  "Tough": "• Increase max HP by 2 × character level when taken; +2 HP per level thereafter."
};

const GENERAL_FEATS = [
  "Ability Score Improvement",
  "Actor", "Athlete", "Charger", "Chef", "Crossbow Expert", "Crusher",
  "Defensive Duelist", "Dual Wielder", "Durable", "Elemental Adept",
  "Fey Touched", "Grappler", "Great Weapon Master", "Heavily Armored",
  "Heavy Armor Master", "Inspiring Leader", "Keen Mind", "Lightly Armored",
  "Mage Slayer", "Martial Weapon Training", "Medium Armor Master",
  "Moderately Armored", "Mounted Combatant", "Observant", "Piercer",
  "Poisoner", "Polearm Master", "Resilient", "Ritual Caster", "Sentinel",
  "Shadow Touched", "Sharpshooter", "Shield Master", "Skill Expert",
  "Skulker", "Slasher", "Speedy", "Spell Sniper", "Telekinetic",
  "Telepathic", "War Caster", "Weapon Master"
];

const GENERAL_FEAT_DESC = {
  "Ability Score Improvement": "• Increase one ability by +2 or two abilities by +1 (max 20).",
  "Actor": "• +1 CHA (max 20).\n• Advantage to pass as someone while disguised (Deception/Performance).\n• Mimicry of voices/creatures; DC = 8 + CHA mod + PB to detect.",
  "Athlete": "• +1 STR or DEX.\n• Gain Climb Speed = Speed; stand from Prone costs 5 ft; shorter run-up for jumps.",
  "Charger": "• +1 STR or DEX.\n• Dash adds +10 ft that action; after straight 10-ft move then hit, add +1d8 damage or push 10 ft (1/turn).",
  "Chef": "• +1 CON or WIS; Cook's Utensils proficiency.\n• Short Rest meal: extra 1d8 HP on spent dice (up to 4+PB creatures).\n• PB treats grant temp HP = PB (Bonus Action to eat; lasts 8h).",
  "Crossbow Expert": "• +1 DEX.\n• Ignore Loading; can load without free hand.\n• No Disadvantage in melee; add ability mod to Light crossbow off-hand attack.",
  "Crusher": "• +1 STR or CON.\n• Once/turn on bludgeoning hit, move target 5 ft.\n• On bludgeoning crit, attacks vs. target have Advantage until your next turn.",
  "Defensive Duelist": "• +1 DEX.\n• Reaction: add PB to AC vs. a melee hit while wielding a Finesse weapon (until start of your next turn).",
  "Dual Wielder": "• +1 STR or DEX.\n• When you Attack with a Light weapon, make one extra off-hand attack as Bonus Action with a different non-Two-Handed melee weapon.\n• Draw/stow two one-handed weapons at once.",
  "Durable": "• +1 CON.\n• Advantage on Death Saves.\n• Bonus Action: spend one Hit Die to heal.",
  "Elemental Adept": "• +1 INT/WIS/CHA.\n• Pick Acid/Cold/Fire/Lightning/Thunder; spells ignore resistance; treat 1s on damage dice as 2s. Repeatable for different types.",
  "Fey Touched": "• +1 INT/WIS/CHA.\n• Always have Misty Step + one L1 Divination/Enchantment; cast each 1/day w/o slot; also via slots.",
  "Grappler": "• +1 STR or DEX.\n• On Unarmed Strike hit, do damage and Grapple (1/turn).\n• Advantage on attacks vs. your grappled creatures.\n• Move grappled target (your size or smaller) without extra movement.",
  "Great Weapon Master": "• +1 STR.\n• When you hit with a Heavy weapon, add PB damage.\n• On melee crit or drop to 0 HP, make one attack as Bonus Action.",
  "Heavily Armored": "• +1 CON or STR.\n• Gain Heavy armor training.",
  "Heavy Armor Master": "• +1 CON or STR.\n• While in Heavy armor, reduce B/P/S damage from attacks by PB.",
  "Inspiring Leader": "• +1 WIS or CHA.\n• After Short/Long Rest, give temp HP = level + chosen ability mod to up to 6 creatures within 30 ft who hear/see you.",
  "Keen Mind": "• +1 INT.\n• Proficiency (or Expertise if proficient) in Arcana/History/Investigation/Nature/Religion (choose one).\n• Study as a Bonus Action.",
  "Lightly Armored": "• +1 STR or DEX.\n• Gain Light armor & Shield training.",
  "Mage Slayer": "• +1 STR or DEX.\n• Creatures you damage have Disadvantage on Concentration saves.\n• 1/Short or Long Rest: succeed on INT/WIS/CHA save instead after failing.",
  "Martial Weapon Training": "• +1 STR or DEX.\n• Gain Martial weapon proficiency.",
  "Medium Armor Master": "• +1 STR or DEX.\n• While in Medium armor and DEX ≥16, add +3 DEX (not +2) to AC.",
  "Moderately Armored": "• +1 STR or DEX.\n• Gain Medium armor training.",
  "Mounted Combatant": "• +1 STR/DEX/WIS.\n• Advantage on attacks vs. unmounted creatures smaller than your mount within 5 ft of mount; Evasion-like for mount; redirect hit on mount to you.",
  "Observant": "• +1 INT or WIS.\n• Gain proficiency (or Expertise if proficient) in Insight/Investigation/Perception (choose one).\n• Search as Bonus Action.",
  "Piercer": "• +1 STR or DEX.\n• Once/turn on piercing hit, reroll one damage die.\n• On piercing crit, roll one extra damage die.",
  "Poisoner": "• +1 DEX or INT; Poisoner's Kit proficiency.\n• Your Poison damage ignores resistance.\n• Craft PB doses (1h & 50 gp each); Bonus Action apply; save vs. 2d8 Poison + Poisoned (DC 8 + chosen ability mod + PB).",
  "Polearm Master": "• +1 STR or DEX.\n• Bonus Action butt-end d4 bludgeoning after Attack with qualifying weapons.\n• Reaction attack when a creature enters your reach.",
  "Resilient": "• +1 to an ability you lack save proficiency in (max 20); gain save proficiency in it.",
  "Ritual Caster": "• +1 INT/WIS/CHA.\n• Always prepared L1 Rituals = PB (add more as PB increases). 1/Long Rest cast a prepared Ritual at normal casting time without slot.",
  "Sentinel": "• +1 STR or DEX.\n• Opportunity Attack when nearby enemy Disengages or attacks others; on OA hit, reduce target Speed to 0 this turn.",
  "Shadow Touched": "• +1 INT/WIS/CHA.\n• Always have Invisibility + one L1 Illusion/Necromancy; 1/day w/o slot; also via slots.",
  "Sharpshooter": "• +1 DEX.\n• Ranged weapon attacks ignore half/three-quarters cover; no Disadvantage in melee; no Disadvantage at long range.",
  "Shield Master": "• +1 STR.\n• After hitting, 1/turn shove with shield (save STR DC 8+STR+PB) to push 5 ft or knock prone.\n• Reaction to take no damage on successful Dex save while holding shield.",
  "Skill Expert": "• +1 to any ability.\n• Gain one skill proficiency and Expertise in a proficient skill.",
  "Skulker": "• +1 DEX.\n• Blindsight 10 ft.\n• Advantage on Stealth checks to Hide during combat.\n• Missed attack while hidden doesn't reveal you.",
  "Slasher": "• +1 STR or DEX.\n• Once/turn on slashing hit reduce target Speed by 10 ft; on slashing crit, target has Disadvantage on attacks until your next turn.",
  "Speedy": "• +1 DEX or CON; +10 ft speed; Dash ignores Difficult Terrain; enemies have Disadvantage on OAs vs. you.",
  "Spell Sniper": "• +1 INT/WIS/CHA.\n• Spell attack rolls ignore half/three-quarters cover; no Disadvantage in melee; +60 ft to eligible spell ranges.",
  "Telekinetic": "• +1 INT/WIS/CHA.\n• Mage Hand upgrades (+range; silent).\n• Bonus Action shove a creature 5 ft (STR save DC 8 + chosen mod + PB).",
  "Telepathic": "• +1 INT/WIS/CHA.\n• 60-ft one-way telepathy (known language).\n• Detect Thoughts always prepared; 1/day w/o slot; also via slots.",
  "War Caster": "• +1 INT/WIS/CHA.\n• Advantage on Concentration saves.\n• Opportunity cast a 1-action spell targeting the provoker.\n• Perform Somatic while hands occupied.",
  "Weapon Master": "• +1 STR or DEX.\n• Use mastery property of one Simple/Martial weapon you're proficient with; change on a Long Rest."
};

const FIGHTING_STYLE_FEATS = [
  "Archery Fighting Style Feat",
  "Blind Fighting Fighting Style Feat",
  "Defense Fighting Style Feat",
  "Dueling Fighting Style Feat",
  "Great Weapon Fighting Fighting Style Feat",
  "Interception Fighting Style Feat",
  "Protection Fighting Style Feat",
  "Thrown Weapon Fighting Fighting Style Feat",
  "Two-Weapon Fighting Fighting Style Feat",
  "Unarmed Fighting Fighting Style Feat"
];

const FS_FEAT_DESC = {
  "Archery Fighting Style Feat": "• +2 to attack rolls you make with Ranged weapons.",
  "Blind Fighting Fighting Style Feat": "• Blindsight 10 ft.",
  "Defense Fighting Style Feat": "• +1 AC while wearing Light/Medium/Heavy armor.",
  "Dueling Fighting Style Feat": "• +2 damage with a one-handed melee weapon when no other weapons held.",
  "Great Weapon Fighting Fighting Style Feat": "• Treat 1s & 2s on damage dice as 3 when wielding two-handed (Two-Handed/Versatile).",
  "Interception Fighting Style Feat": "• Reaction: reduce damage to a creature within 5 ft by 1d10 + PB while holding shield or weapon.",
  "Protection Fighting Style Feat": "• Reaction: impose Disadvantage on a creature attacking another target within 5 ft while you wield a shield.",
  "Thrown Weapon Fighting Fighting Style Feat": "• +2 damage on attacks with Thrown property weapons.",
  "Two-Weapon Fighting Fighting Style Feat": "• Add ability modifier to damage of the Light-property extra attack.",
  "Unarmed Fighting Fighting Style Feat": "• Unarmed Strike: 1d6 + STR (or 1d8 if no weapons/shield). Start of your turn, 1d4 bludgeoning to one creature you grapple."
};

const EPIC_BOONS = [
  "Boon of Combat Prowess", "Boon of Dimensional Travel", "Boon of Energy Resistance",
  "Boon of Fate", "Boon of Fortitude", "Boon of Irresistible Offense",
  "Boon of Recovery", "Boon of Skill", "Boon of Speed", "Boon of Spell Recall",
  "Boon of the Night Spirit", "Boon of Truesight"
];

const EPIC_BOON_DESC = {
  "Boon of Combat Prowess": "• +1 to any ability (max 30).\n• Once/turn when you miss with an attack, you can hit instead (refresh at start of your next turn).",
  "Boon of Dimensional Travel": "• +1 to any ability (max 30).\n• After Attack or Magic action, teleport up to 30 ft (no action, immediately after).",
  "Boon of Energy Resistance": "• +1 to any ability (max 30).\n• Resistance to two energy types (choose on Long Rest) from Acid/Cold/Fire/Lightning/Necrotic/Poison/Psychic/Radiant/Thunder.\n• Reaction: when you take one of those types, force DEX save on another creature in 60 ft; on fail: 2d12 + CON damage of the same type.",
  "Boon of Fate": "• +1 to any ability (max 30).\n• When a creature within 60 ft succeeds or fails a D20 Test, roll 2d4 and apply as bonus/penalty to that roll. 1/initiative or 1/rest.",
  "Boon of Fortitude": "• +1 to any ability (max 30).\n• +40 max HP. When you regain HP, you can gain additional HP = CON mod (1/turn).",
  "Boon of Irresistible Offense": "• +1 STR or DEX (max 30).\n• Your B/P/S damage ignores resistance; on d20 roll of 20, deal extra damage = the ability increased by this boon.",
  "Boon of Recovery": "• +1 to any ability (max 30).\n• Once/Long Rest when you would drop to 0, drop to 1 and heal for half your max HP.\n• Bonus Action: spend d10s (pool of ten) to heal; regain all dice on Long Rest.",
  "Boon of Skill": "• +1 to any ability (max 30).\n• Proficiency in all skills; gain Expertise in one skill of your choice.",
  "Boon of Speed": "• +1 to any ability (max 30).\n• +30 ft speed; Bonus Action Disengage that also ends Grappled on you.",
  "Boon of Spell Recall": "• +1 INT/WIS/CHA (max 30).\n• When casting with a 1–4 slot, roll 1d4; if equal to slot level, the slot isn't expended.",
  "Boon of the Night Spirit": "• +1 to any ability (max 30).\n• While in Dim Light/Darkness, Bonus Action become Invisible until you take an action/bonus action/reaction.\n• While in Dim Light/Darkness, resistance to all damage except Psychic & Radiant.",
  "Boon of Truesight": "• +1 to any ability (max 30).\n• Truesight 60 ft."
};

const ARMOR_DATA = {
  "None": { category: "None", ac: "10 + Dex", acFormula: (dex) => 10 + dex, str: 0, stealth: false, weight: 0 },
  "Padded Armor": { category: "Light", ac: "11 + Dex", acFormula: (dex) => 11 + dex, str: 0, stealth: true, weight: 8 },
  "Leather Armor": { category: "Light", ac: "11 + Dex", acFormula: (dex) => 11 + dex, str: 0, stealth: false, weight: 10 },
  "Studded Leather Armor": { category: "Light", ac: "12 + Dex", acFormula: (dex) => 12 + dex, str: 0, stealth: false, weight: 13 },
  "Hide Armor": { category: "Medium", ac: "12 + Dex (max 2)", acFormula: (dex) => 12 + Math.min(dex, 2), str: 0, stealth: false, weight: 12 },
  "Chain Shirt": { category: "Medium", ac: "13 + Dex (max 2)", acFormula: (dex) => 13 + Math.min(dex, 2), str: 0, stealth: false, weight: 20 },
  "Scale Mail": { category: "Medium", ac: "14 + Dex (max 2)", acFormula: (dex) => 14 + Math.min(dex, 2), str: 0, stealth: true, weight: 45 },
  "Breastplate": { category: "Medium", ac: "14 + Dex (max 2)", acFormula: (dex) => 14 + Math.min(dex, 2), str: 0, stealth: false, weight: 20 },
  "Half Plate Armor": { category: "Medium", ac: "15 + Dex (max 2)", acFormula: (dex) => 15 + Math.min(dex, 2), str: 0, stealth: true, weight: 40 },
  "Ring Mail": { category: "Heavy", ac: "14", acFormula: (dex) => 14, str: 0, stealth: true, weight: 40 },
  "Chain Mail": { category: "Heavy", ac: "16", acFormula: (dex) => 16, str: 13, stealth: true, weight: 55 },
  "Splint Armor": { category: "Heavy", ac: "17", acFormula: (dex) => 17, str: 15, stealth: true, weight: 60 },
  "Plate Armor": { category: "Heavy", ac: "18", acFormula: (dex) => 18, str: 15, stealth: true, weight: 65 }
};

const LEVEL_DATA = {
  1: { profBonus: 2, instincts: 0, skillProfs: 3 },
  2: { profBonus: 2, instincts: 2, skillProfs: 3 },
  3: { profBonus: 2, instincts: 2, skillProfs: 3 },
  4: { profBonus: 2, instincts: 2, skillProfs: 3 },
  5: { profBonus: 3, instincts: 2, skillProfs: 3 },
  6: { profBonus: 3, instincts: 3, skillProfs: 3 },
  7: { profBonus: 3, instincts: 3, skillProfs: 3 },
  8: { profBonus: 3, instincts: 3, skillProfs: 3 },
  9: { profBonus: 4, instincts: 5, skillProfs: 4 },
  10: { profBonus: 4, instincts: 5, skillProfs: 4 },
  11: { profBonus: 4, instincts: 5, skillProfs: 4 },
  12: { profBonus: 4, instincts: 5, skillProfs: 4 },
  13: { profBonus: 5, instincts: 7, skillProfs: 4 },
  14: { profBonus: 5, instincts: 7, skillProfs: 4 },
  15: { profBonus: 5, instincts: 7, skillProfs: 4 },
  16: { profBonus: 5, instincts: 7, skillProfs: 4 },
  17: { profBonus: 6, instincts: 9, skillProfs: 4 },
  18: { profBonus: 6, instincts: 9, skillProfs: 4 },
  19: { profBonus: 6, instincts: 9, skillProfs: 4 },
  20: { profBonus: 6, instincts: 10, skillProfs: 4 }
};

const SLOT_PROGRESSION = {
  1: [2, 0, 0, 0, 0], 2: [2, 0, 0, 0, 0], 3: [3, 0, 0, 0, 0], 4: [3, 0, 0, 0, 0],
  5: [4, 2, 0, 0, 0], 6: [4, 2, 0, 0, 0], 7: [4, 3, 0, 0, 0], 8: [4, 3, 0, 0, 0],
  9: [4, 3, 2, 0, 0], 10: [4, 3, 2, 0, 0], 11: [4, 3, 3, 0, 0], 12: [4, 3, 3, 0, 0],
  13: [4, 3, 3, 1, 0], 14: [4, 3, 3, 1, 0], 15: [4, 3, 3, 2, 0], 16: [4, 3, 3, 2, 0],
  17: [4, 3, 3, 3, 1], 18: [4, 3, 3, 3, 1], 19: [4, 3, 3, 3, 2], 20: [4, 3, 3, 3, 2]
};

const INSTINCTS_DB = {
  base: [
    { name: "Ambusher", desc: "On initiative, expend 1st-level slot to move half speed.", action: "passive" },
    { name: "Battle Hymn", desc: "Proficiency in Performance. Learn vicious mockery.", action: "passive" },
    { name: "Beast Handler", desc: "Advantage on Animal Handling checks.", action: "passive" },
    { name: "Beast Speech", desc: "Cast speak with animals (8hr duration) by expending 1st-level slot.", action: "passive" },
    { name: "Bloodmarked", desc: "Proficiency in Intimidation. Learn one cantrip or L1 spell (Sorcerer/Warlock).", action: "passive" },
    { name: "Cunning Linguist", desc: "Learn two languages. Repeatable.", action: "passive" },
    { name: "Druidic Warrior", desc: "Learn two cantrips or one L1 Druid spell. Repeatable.", action: "passive" },
    { name: "Fleet of Foot", desc: "+10 ft walking speed.", action: "passive" },
    { name: "Forager", desc: "Find 2x food/water when foraging.", action: "passive" },
    { name: "Herbalist", desc: "Double PB on Healer's Kit checks. Healing potions take 6 hours.", action: "passive" },
    { name: "Hunter's Mark", desc: "Always prepared, 1/day free. +1d6 damage; advantage on Perception/Survival to track.", action: "bonus" },
    { name: "Lone Wolf", desc: "+2 attack when no ally within 30 ft.", action: "passive" },
    { name: "Natural Camouflage", desc: "Hide when lightly obscured by nature (foliage/mist/rain).", action: "passive" },
    { name: "Nerves of Steel", desc: "Advantage vs. frightened condition.", action: "passive" },
    { name: "Pack Tactics", desc: "Expend 1st-level slot (bonus action) for advantage vs. creature with ally within 5 ft.", action: "bonus" },
    { name: "Predator's Poise", desc: "Gain temp HP = WIS mod (or CHA for Warden) when downing creature.", action: "passive" },
    { name: "Warding Thorns", desc: "Learn Shield spell.", action: "passive" },
    { name: "Sacred Oath", desc: "Proficiency in Religion. Learn one cantrip or L1 spell (Cleric/Paladin).", action: "passive" },
    { name: "Skilled Survivalist", desc: "Proficiency in one Ranger skill.", action: "passive" },
    { name: "Spell Lore", desc: "Proficiency in Arcana. Learn one cantrip or L1 spell (Wizard/Bard).", action: "passive" },
    { name: "Sure Footing", desc: "Advantage vs. prone/forced movement.", action: "passive" },
    { name: "Trailblazer", desc: "Difficult terrain costs no extra movement.", action: "passive" },
    { name: "Weapon Mastery - Longsword", desc: "Gain one mastery property for longsword. Repeatable for other weapons.", action: "passive" },
    { name: "Weapon Mastery - Longbow", desc: "Gain one mastery property for longbow. Repeatable for other weapons.", action: "passive" },
    { name: "Weapon Mastery - Shortsword", desc: "Gain one mastery property for shortsword. Repeatable for other weapons.", action: "passive" },
    { name: "Weapon Mastery - Greatsword", desc: "Gain one mastery property for greatsword. Repeatable for other weapons.", action: "passive" },
    { name: "Wild Charm", desc: "Proficiency in Animal Handling. Learn one cantrip or L1 Druid spell.", action: "passive" }
  ],
  level6: [
    { name: "Expert (6th) - Athletics", desc: "Expertise in Athletics. Repeatable for other skills.", action: "passive" },
    { name: "Expert (6th) - Stealth", desc: "Expertise in Stealth. Repeatable for other skills.", action: "passive" },
    { name: "Expert (6th) - Perception", desc: "Expertise in Perception. Repeatable for other skills.", action: "passive" },
    { name: "Expert (6th) - Survival", desc: "Expertise in Survival. Repeatable for other skills.", action: "passive" },
    { name: "Iron Grip", desc: "Can't be disarmed against your will.", action: "passive" },
    { name: "Silent Step", desc: "You and allies within 30 ft sneak at normal pace.", action: "passive" },
    { name: "Nature's Denizen", desc: "Cast commune with nature 1/long rest without slot.", action: "passive" },
    { name: "Keen-Eyed", desc: "No disadvantage on Perception in dim light/lightly obscured.", action: "passive" },
    { name: "Fighting Style - Defense", desc: "Enables Defense FS feat selection.", action: "passive" },
    { name: "Fighting Style - Archery", desc: "Enables Archery FS feat selection.", action: "passive" },
    { name: "Fighting Style - Dueling", desc: "Enables Dueling FS feat selection.", action: "passive" },
    { name: "Fighting Style - Two-Weapon Fighting", desc: "Enables Two-Weapon FS feat selection.", action: "passive" },
    { name: "Fighting Style - Great Weapon Fighting", desc: "Enables Great Weapon Fighting FS feat selection.", action: "passive" },
    { name: "Fighting Style - Thrown Weapon Fighting", desc: "Enables Thrown Weapon FS feat selection.", action: "passive" }
  ],
  level9: [
    { name: "Expert (9th) - Two Skills", desc: "Expertise in two proficient skills of your choice.", action: "passive" },
    { name: "Unerring Aim", desc: "On ranged miss, add 1d4 (after roll, before outcome). PB uses/long rest.", action: "passive" },
    { name: "Twin Strike", desc: "Expend 3rd-level slot (bonus action) for one extra weapon attack.", action: "bonus" }
  ],
  level13: [
    { name: "Elemental Strike", desc: "Weapon attacks deal chosen element (acid/cold/fire/lightning/thunder). Change on long rest.", action: "passive" }
  ],
  level17: [
    { name: "Ability Surge", desc: "Increase one ability score by 2 (max 22).", action: "passive" }
  ]
};

const DATABASE = {
  callings: {
    warden: {
      name: "Warden",
      primaryStat: "cha",
      features: [
        { level: 1, name: "Guardian's Endurance", description: "On Initiative: gain temporary HP = level + CHA mod." },
        { level: 6, name: "Rallying Cry", description: "Reaction: heal an ally when they drop below half HP." }
      ]
    },
    marksman: {
      name: "Marksman",
      primaryStat: "wis",
      features: [
        { level: 1, name: "Deadeye's Focus", description: "Bonus Action: add WIS to next ranged attack and damage." }
      ]
    },
    mystic: { name: "Mystic", primaryStat: "wis", features: [] },
    prowler: { name: "Prowler", primaryStat: "wis", features: [] },
    excavator: { name: "Excavator", primaryStat: "wis", features: [] },
    wayfarer: { name: "Wayfarer", primaryStat: "wis", features: [] }
  },
  subclasses: {
    hunter: {
      name: "Hunter",
      features: [
        { level: 3, name: "Hunter's Prey", description: "Free Hunter's Mark; additional knowledge of resistances." }
      ]
    },
    beastmaster: { name: "Beast Master", features: [] },
    gloomstalker: { name: "Gloom Stalker", features: [] },
    horizonwalker: { name: "Horizon Walker", features: [] },
    lunarsentinel: { name: "Lunar Sentinel", features: [] },
    feywanderer: { name: "Fey Wanderer", features: [] },
    swarmkeeper: { name: "Swarmkeeper", features: [] }
  }
};

const FEAT_ASI_OPTIONS = {
  "Ability Score Improvement": "ASI",
  "Athlete": ["str", "dex"],
  "Charger": ["str", "dex"],
  "Chef": ["con", "wis"],
  "Crossbow Expert": ["dex"],
  "Crusher": ["str", "con"],
  "Defensive Duelist": ["dex"],
  "Dual Wielder": ["str", "dex"],
  "Durable": ["con"],
  "Elemental Adept": ["int", "wis", "cha"],
  "Fey Touched": ["int", "wis", "cha"],
  "Grappler": ["str", "dex"],
  "Great Weapon Master": ["str"],
  "Heavily Armored": ["con", "str"],
  "Heavy Armor Master": ["con", "str"],
  "Inspiring Leader": ["wis", "cha"],
  "Keen Mind": ["int"],
  "Lightly Armored": ["str", "dex"],
  "Mage Slayer": ["str", "dex"],
  "Martial Weapon Training": ["str", "dex"],
  "Medium Armor Master": ["str", "dex"],
  "Moderately Armored": ["str", "dex"],
  "Mounted Combatant": ["str", "dex", "wis"],
  "Observant": ["int", "wis"],
  "Piercer": ["str", "dex"],
  "Poisoner": ["dex", "int"],
  "Polearm Master": ["str", "dex"],
  "Resilient": "ANY_ONE",
  "Ritual Caster": ["int", "wis", "cha"],
  "Sentinel": ["str", "dex"],
  "Shadow Touched": ["int", "wis", "cha"],
  "Sharpshooter": ["dex"],
  "Shield Master": ["str"],
  "Skill Expert": "ANY_ONE",
  "Skulker": ["dex"],
  "Slasher": ["str", "dex"],
  "Speedy": ["dex", "con"],
  "Spell Sniper": ["int", "wis", "cha"],
  "Telekinetic": ["int", "wis", "cha"],
  "Telepathic": ["int", "wis", "cha"],
  "War Caster": ["int", "wis", "cha"],
  "Weapon Master": ["str", "dex"]
};

const EPIC_BOON_ASI_OPTIONS = {
  "Boon of Irresistible Offense": ["str", "dex"],
  "Boon of Spell Recall": ["int", "wis", "cha"],
  "Boon of Combat Prowess": "ANY_ONE",
  "Boon of Dimensional Travel": "ANY_ONE",
  "Boon of Energy Resistance": "ANY_ONE",
  "Boon of Fate": "ANY_ONE",
  "Boon of Fortitude": "ANY_ONE",
  "Boon of Recovery": "ANY_ONE",
  "Boon of Skill": "ANY_ONE",
  "Boon of Speed": "ANY_ONE",
  "Boon of the Night Spirit": "ANY_ONE",
  "Boon of Truesight": "ANY_ONE"
};

const SKILLS = [
  { name: "Acrobatics", ability: "dex" },
  { name: "Animal Handling", ability: "wis" },
  { name: "Arcana", ability: "int" },
  { name: "Athletics", ability: "str" },
  { name: "Deception", ability: "cha" },
  { name: "History", ability: "int" },
  { name: "Insight", ability: "wis" },
  { name: "Intimidation", ability: "cha" },
  { name: "Investigation", ability: "int" },
  { name: "Medicine", ability: "wis" },
  { name: "Nature", ability: "int" },
  { name: "Perception", ability: "wis" },
  { name: "Performance", ability: "cha" },
  { name: "Persuasion", ability: "cha" },
  { name: "Religion", ability: "int" },
  { name: "Sleight of Hand", ability: "dex" },
  { name: "Stealth", ability: "dex" },
  { name: "Survival", ability: "wis" }
];

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

const ABILITY_LABELS = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma'
};
