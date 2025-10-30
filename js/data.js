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
  "Charger": "• +1 STR or DEX.\n• Dash then Bonus Action: melee attack or Shove. If you move 10+ ft first, +5 damage or push 10 ft + knock Prone.",
  "Chef": "• +1 CON or WIS.\n• Proficiency with Cook's Utensils. During Short Rest (1 hour), make treats for PB creatures; each regains additional 1d8 HP. During Long Rest, cook for up to 6 creatures; each gains temp HP = PB + your level.",
  "Crossbow Expert": "• +1 DEX.\n• Ignore Loading; Being within 5 ft of hostile doesn't impose Disadvantage on ranged attacks; Bonus Action attack with Hand Crossbow after one-handed attack.",
  "Crusher": "• +1 STR or CON.\n• Once per turn: Bludgeoning hit moves target 5 ft. Critical with Bludgeoning: attacks vs. target have Advantage until start of your next turn.",
  "Defensive Duelist": "• +1 DEX.\n• Reaction when hit with melee while wielding Finesse weapon: add PB to AC; may turn hit into miss.",
  "Dual Wielder": "• +1 STR or DEX.\n• Two-Weapon Fighting with any one-handed weapons (not just Light). +1 AC while wielding weapons in each hand. Draw/stow two weapons at once.",
  "Durable": "• +1 CON.\n• When you roll Hit Dice to regain HP, minimum HP = 2 × CON mod (min 2).",
  "Elemental Adept": "• +1 INT, WIS, or CHA.\n• Choose Acid/Cold/Fire/Lightning/Thunder: Spells ignore resistance; treat 1s on damage as 2s.",
  "Fey Touched": "• +1 INT, WIS, or CHA.\n• Learn Misty Step + one 1st-level Divination/Enchantment spell. Cast each 1/Long Rest without slot. Use spell slots to cast. Chosen ability for spellcasting.",
  "Grappler": "• +1 STR or DEX.\n• Advantage on attacks vs. grappled creature. Bonus Action to pin (both Restrained until grapple ends).",
  "Great Weapon Master": "• +1 STR.\n• Extra Attack (level 5): make extra attack as Bonus Action if you crit or reduce to 0. Power Attack: -5 to hit, +10 damage with Heavy melee weapon.",
  "Heavily Armored": "• +1 STR or CON.\n• Proficiency with Heavy armor.",
  "Heavy Armor Master": "• +1 STR or CON.\n• Heavy Armor reduces Nonmagical Bludgeoning/Piercing/Slashing by 3.",
  "Inspiring Leader": "• +1 WIS or CHA.\n• After Short/Long Rest, 10-min speech grants temp HP = your level + CHA mod to up to 6 allies (including you).",
  "Keen Mind": "• +1 INT.\n• Advantage on Initiative. Can accurately recall anything seen/heard in past month.",
  "Lightly Armored": "• +1 STR or DEX.\n• Proficiency with Light armor.",
  "Mage Slayer": "• +1 STR or DEX.\n• Advantage on saves vs. spells cast by creature within 5 ft. Reaction to attack caster within 5 ft after they cast. Concentration checks for hit from your attacks have Disadvantage.",
  "Martial Weapon Training": "• +1 STR or DEX.\n• Proficiency with Martial weapons.",
  "Medium Armor Master": "• +1 STR or DEX.\n• No Disadvantage on Stealth in Medium armor; Medium armor Dex cap = +3.",
  "Moderately Armored": "• +1 STR or DEX.\n• Proficiency with Medium armor and Shields.",
  "Mounted Combatant": "• +1 STR, DEX, or WIS.\n• Advantage on melee attacks vs. unmounted smaller than mount. Redirect attacks on mount to you. Mount takes no damage on successful Dex save (half on fail).",
  "Observant": "• +1 INT or WIS.\n• +5 to passive Perception and Investigation. Read lips in known language.",
  "Piercer": "• +1 STR or DEX.\n• Reroll one damage die per turn with Piercing damage; must use new. Critical with Piercing: extra damage die.",
  "Poisoner": "• +1 DEX or INT.\n• Ignore poison resistance; restore hit points as Bonus Action to poisoned target removes Poisoned. Proficiency with Poisoner's Kit; craft contact/ingested/inhaled/injury poison (cost/time halved).",
  "Polearm Master": "• +1 STR or DEX.\n• Bonus Action attack (1d4 + STR) with opposite end of Glaive/Halberd/Pike/Quarterstaff/Spear. Reaction Opportunity Attack when creature enters your reach with those weapons.",
  "Resilient": "• +1 to chosen ability (max 20).\n• Proficiency in saves for that ability.",
  "Ritual Caster": "• +1 INT, WIS, or CHA.\n• Choose Cleric/Druid/Wizard. Learn 2 1st-level rituals from that list. Find/copy more ritual spells (50 gp + 1 hour per level). Cast as rituals only; use chosen ability.",
  "Sentinel": "• +1 STR or DEX.\n• Opportunity Attack reduces target's speed to 0. Opportunity Attack even if Disengage. Reaction attack if adjacent enemy attacks someone else.",
  "Shadow Touched": "• +1 INT, WIS, or CHA.\n• Learn Invisibility + one 1st-level Illusion/Necromancy spell. Cast each 1/Long Rest without slot. Use spell slots to cast. Chosen ability for spellcasting.",
  "Sharpshooter": "• +1 DEX.\n• Attacks at long range don't have Disadvantage. Ignore half/three-quarters cover. Power Attack: -5 to hit, +10 damage with ranged weapon.",
  "Shield Master": "• +1 STR.\n• Bonus Action Shove after Attack action. Add shield's AC to Dex saves vs. single-target effects. Reaction: no damage on successful Dex save (half on fail) if using shield.",
  "Skill Expert": "• +1 to any ability.\n• Proficiency in one skill. Expertise in one proficient skill.",
  "Skulker": "• +1 DEX.\n• Bonus Action to Hide if Lightly Obscured. Missing with ranged attack while hidden doesn't reveal position. No Disadvantage on Perception in dim light.",
  "Slasher": "• +1 STR or DEX.\n• Once per turn: Slashing hit reduces target's speed by 10 ft. Critical with Slashing: target has Disadvantage on attacks until start of your next turn.",
  "Speedy": "• +1 DEX or CON.\n• +10 ft Speed. Dash as Bonus Action PB times per Long Rest.",
  "Spell Sniper": "• +1 INT, WIS, or CHA.\n• Learn one attack-roll cantrip. Attacking spell ranges doubled. Ignore half/three-quarters cover with spell attacks.",
  "Telekinetic": "• +1 INT, WIS, or CHA.\n• Learn Mage Hand; can cast invisibly; Bonus Action to shove creature 5 ft (STR/DEX save vs. 8 + PB + ability mod).",
  "Telepathic": "• +1 INT, WIS, or CHA.\n• Telepathy 60 ft. Detect Thoughts 1/Long Rest or via spell slot (chosen ability for DC).",
  "War Caster": "• +1 INT, WIS, or CHA.\n• Advantage on Concentration saves. Cast spells as Opportunity Attacks. Perform Somatic components while holding weapons/shield.",
  "Weapon Master": "• +1 STR or DEX.\n• Proficiency with 4 weapons of your choice. Gain Weapon Mastery with those weapons."
};

const ARMOR_DATA = {
  "None": { category: "None", acFormula: (dex) => 10 + dex, str: 0 },
  "Padded Armor": { category: "Light", acFormula: (dex) => 11 + dex, str: 0 },
  "Leather Armor": { category: "Light", acFormula: (dex) => 11 + dex, str: 0 },
  "Studded Leather Armor": { category: "Light", acFormula: (dex) => 12 + dex, str: 0 },
  "Hide Armor": { category: "Medium", acFormula: (dex) => 12 + Math.min(dex, 2), str: 0 },
  "Chain Shirt": { category: "Medium", acFormula: (dex) => 13 + Math.min(dex, 2), str: 0 },
  "Scale Mail": { category: "Medium", acFormula: (dex) => 14 + Math.min(dex, 2), str: 0 },
  "Breastplate": { category: "Medium", acFormula: (dex) => 14 + Math.min(dex, 2), str: 0 },
  "Half Plate Armor": { category: "Medium", acFormula: (dex) => 15 + Math.min(dex, 2), str: 0 },
  "Ring Mail": { category: "Heavy", acFormula: () => 14, str: 0 },
  "Chain Mail": { category: "Heavy", acFormula: () => 16, str: 13 },
  "Splint Armor": { category: "Heavy", acFormula: () => 17, str: 15 },
  "Plate Armor": { category: "Heavy", acFormula: () => 18, str: 15 }
};

const INSTINCTS_DB = {
  base: [
    { name: "Ambusher", desc: "When you roll initiative, you can expend a 1st-level Adaptive Edge slot to move up to half your speed.", action: "special" },
    { name: "Battle Hymn", desc: "You gain proficiency in Performance. You also learn the vicious mockery cantrip.", action: "special" },
    { name: "Beast Handler", desc: "You have advantage on Animal Handling checks.", action: "passive" },
    { name: "Beast Speech", desc: "You can cast speak with animals by expending a 1st-level Adaptive Edge slot. Duration is extended to 8 hours.", action: "action" },
    { name: "Bloodmarked", desc: "You gain proficiency in Intimidation. You also learn one cantrip or one Level 1 spell from the Sorcerer or Warlock spell list.", action: "special" },
    { name: "Cunning Linguist", desc: "You learn two languages of your choice. You can take this Instinct multiple times.", action: "passive" },
    { name: "Druidic Warrior", desc: "You learn two cantrips or one level one spell from the Druid spell list. This Instinct can be taken multiple times.", action: "special" },
    { name: "Fleet of Foot", desc: "Your walking speed increases by 10 feet.", action: "passive" },
    { name: "Forager", desc: "When foraging in the wild, you find twice as much food and water as normal.", action: "passive" },
    { name: "Herbalist", desc: "You add double your proficiency bonus to checks made with a Healer's Kit. The time needed to craft a healing potion is reduced to 6 hours.", action: "passive" },
    { name: "Hunter's Mark", desc: "You learn the Hunter's Mark spell. It is always prepared and you can cast it once per day without expending an Adaptive Edge slot.", action: "special" },
    { name: "Lone Wolf", desc: "When no ally is within 30 feet of you, you gain a +2 bonus to attack rolls.", action: "passive" },
    { name: "Natural Camouflage", desc: "You can attempt to hide even when you are only lightly obscured by natural phenomena such as foliage, mist, or heavy rain.", action: "passive" },
    { name: "Nerves of Steel", desc: "You have advantage on saving throws against the frightened condition.", action: "passive" },
    { name: "Pack Tactics", desc: "When an ally is within 5 feet of a creature, you can expend a 1st-level Adaptive Edge slot as a bonus action to gain advantage on your next attack against that creature.", action: "bonus" },
    { name: "Predator's Poise", desc: "When you reduce a creature to 0 hit points, you gain temporary hit points equal to your Wisdom modifier (Warden may use Charisma).", action: "passive" },
    { name: "Warding Thorns", desc: "You learn the Shield Spell.", action: "reaction" },
    { name: "Sacred Oath", desc: "You gain proficiency in Religion. You also learn one cantrip or one Level 1 spell from the Cleric or Paladin spell list.", action: "special" },
    { name: "Skilled Survivalist", desc: "You gain proficiency in one additional skill of your choice from the Ranger skill list.", action: "passive" },
    { name: "Spell Lore", desc: "You gain proficiency in Arcana. You also learn one cantrip or one Level 1 spell from the Wizard or Bard spell list.", action: "special" },
    { name: "Sure Footing", desc: "You have advantage on ability checks and saving throws made to resist being knocked prone or moved against your will.", action: "passive" },
    { name: "Trailblazer", desc: "Difficult terrain doesn't cost you extra movement.", action: "passive" },
    { name: "Weapon Mastery", desc: "Choose one weapon you are proficient with. You gain access to one Weapon Mastery property for that weapon. You can take this Instinct multiple times.", action: "passive" },
    { name: "Wild Charm", desc: "You gain proficiency in Animal Handling. You also learn one cantrip or one Level 1 spell from the Druid spell list.", action: "special" }
  ],
  level6: [
    { name: "Iron Grip", desc: "You can't be disarmed of any items in your hands against your will.", action: "passive" },
    { name: "Silent Step", desc: "You and allies within 30 feet can sneak while traveling at a normal pace.", action: "passive" },
    { name: "Nature's Denizen", desc: "You can cast commune with nature without expending a spell slot once per long rest.", action: "action" },
    { name: "Keen-Eyed", desc: "You can't have disadvantage on Wisdom (Perception) checks due to dim light or lightly obscured areas.", action: "passive" },
    { name: "Fighting Style - Archery", desc: "Grants Archery Fighting Style Feat. +2 to attack rolls with ranged weapons.", action: "passive" },
    { name: "Fighting Style - Blind Fighting", desc: "Grants Blind Fighting Style Feat. Blindsight 10 ft; detect creatures you can't see (not behind total cover); invisible doesn't impose Disadvantage.", action: "passive" },
    { name: "Fighting Style - Defense", desc: "Grants Defense Fighting Style Feat. +1 AC while wearing armor.", action: "passive" },
    { name: "Fighting Style - Dueling", desc: "Grants Dueling Fighting Style Feat. +2 damage when wielding a melee weapon in one hand and no other weapon.", action: "passive" },
    { name: "Fighting Style - Great Weapon Fighting", desc: "Grants Great Weapon Fighting Style Feat. Reroll 1s and 2s on damage dice with two-handed melee weapons.", action: "passive" },
    { name: "Fighting Style - Interception", desc: "Grants Interception Fighting Style Feat. Reaction: reduce damage to adjacent ally by 1d10 + PB.", action: "reaction" },
    { name: "Fighting Style - Protection", desc: "Grants Protection Fighting Style Feat. Reaction: impose Disadvantage on attack against ally within 5 ft (requires shield).", action: "reaction" },
    { name: "Fighting Style - Thrown Weapon Fighting", desc: "Grants Thrown Weapon Fighting Style Feat. +2 damage with Thrown weapons; draw weapon as part of attack.", action: "passive" },
    { name: "Fighting Style - Two-Weapon Fighting", desc: "Grants Two-Weapon Fighting Style Feat. Add ability modifier to damage of off-hand attack.", action: "passive" },
    { name: "Fighting Style - Unarmed Fighting", desc: "Grants Unarmed Fighting Style Feat. Unarmed Strike: 1d6 damage (1d8 if both hands free); Bonus Action 1d4 to grappled creature.", action: "passive" }
  ],
  level9: [
    { name: "Unerring Aim", desc: "When you make a ranged weapon attack roll and miss, you can add 1d4 to the roll. You can decide after rolling but before outcome. Uses = proficiency bonus/long rest.", action: "passive" },
    { name: "Twin Strike", desc: "When you take the Attack action, you can expend a 3rd-level Adaptive Edge slot as a bonus action to make one additional weapon attack as part of the same action.", action: "bonus" }
  ],
  level13: [
    { name: "Elemental Strike", desc: "Your weapon attacks deal a chosen elemental damage type (acid, cold, fire, lightning, or thunder) instead of their normal type. You can change the type after a long rest.", action: "passive" }
  ],
  level17: [
    { name: "Ability Surge", desc: "Increase one ability score of your choice by 2, to a maximum of 22.", action: "passive" }
  ]
};

const FS_FEAT_DESC = {
  "Archery Fighting Style Feat": "• +2 to attack rolls with ranged weapons.",
  "Blind Fighting Fighting Style Feat": "• Blindsight 10 ft; detect creatures you can't see (not behind total cover); invisible doesn't impose Disadvantage.",
  "Defense Fighting Style Feat": "• +1 AC while wearing Light/Medium/Heavy armor.",
  "Dueling Fighting Style Feat": "• +2 damage when wielding a melee weapon in one hand and no other weapon.",
  "Great Weapon Fighting Fighting Style Feat": "• Reroll 1s and 2s on damage dice with melee weapons wielded in two hands; must use new rolls.",
  "Interception Fighting Style Feat": "• Reaction: reduce damage dealt to adjacent ally by 1d10 + PB (requires shield or simple/martial weapon).",
  "Protection Fighting Style Feat": "• Reaction: impose Disadvantage on attack against ally within 5 ft (requires shield).",
  "Thrown Weapon Fighting Fighting Style Feat": "• +2 damage with Thrown weapons; draw a weapon as part of the attack.",
  "Two-Weapon Fighting Fighting Style Feat": "• Add ability modifier to damage of off-hand attack.",
  "Unarmed Fighting Fighting Style Feat": "• Unarmed Strike: 1d6 damage (or 1d8 if both hands free); Bonus Action 1d4 to grappled creature."
};

const EPIC_BOONS = [
  "Boon of Combat Prowess", "Boon of Dimensional Travel", "Boon of Energy Resistance",
  "Boon of Fate", "Boon of Fortitude", "Boon of Irresistible Offense",
  "Boon of Recovery", "Boon of Skill", "Boon of Speed", "Boon of Spell Recall",
  "Boon of the Night Spirit", "Boon of Truesight"
];

const EPIC_BOON_DESC = {
  "Boon of Combat Prowess": "• +1 to any ability; Weapon Mastery for all weapons; Advantage on Initiative.",
  "Boon of Dimensional Travel": "• +1 to any ability; Bonus Action teleport 30 ft (uses = PB/LR).",
  "Boon of Energy Resistance": "• +1 to any ability; Choose damage type, gain resistance; swap on Long Rest.",
  "Boon of Fate": "• +1 to any ability; When you/ally you see fails d20 Test, roll 2d4 and add to roll (PB uses/LR).",
  "Boon of Fortitude": "• +1 to any ability; +40 Max HP; Regain 1 HP every minute.",
  "Boon of Irresistible Offense": "• +1 STR or DEX; Bludgeoning/Piercing/Slashing ignore resistance.",
  "Boon of Recovery": "• +1 to any ability; Reaction: end one condition on self when reduced to 0 HP (PB/LR).",
  "Boon of Skill": "• +1 to any ability; Expertise on all proficient skills.",
  "Boon of Speed": "• +1 to any ability; +30 ft Speed; opportunity attacks vs. you have Disadvantage.",
  "Boon of Spell Recall": "• +1 INT/WIS/CHA; Once per Long Rest, after casting a 4th-level or lower spell, regain one expended 4th-level or lower slot.",
  "Boon of the Night Spirit": "• +1 to any ability; Invisible to darkvision while in magical/nonmagical darkness.",
  "Boon of Truesight": "• +1 to any ability; Truesight 60 ft."
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
  9: { profBonus: 4, instincts: 5, skillProfs: 3 },
  10: { profBonus: 4, instincts: 5, skillProfs: 3 },
  11: { profBonus: 4, instincts: 5, skillProfs: 3 },
  12: { profBonus: 4, instincts: 5, skillProfs: 3 },
  13: { profBonus: 5, instincts: 7, skillProfs: 3 },
  14: { profBonus: 5, instincts: 7, skillProfs: 3 },
  15: { profBonus: 5, instincts: 7, skillProfs: 3 },
  16: { profBonus: 5, instincts: 7, skillProfs: 3 },
  17: { profBonus: 6, instincts: 9, skillProfs: 3 },
  18: { profBonus: 6, instincts: 9, skillProfs: 3 },
  19: { profBonus: 6, instincts: 9, skillProfs: 3 },
  20: { profBonus: 6, instincts: 10, skillProfs: 3 }
};

const SLOT_PROGRESSION = [
  [0, 0, 0, 0, 0],  // level 0 (unused)
  [2, 0, 0, 0, 0],  // level 1
  [2, 0, 0, 0, 0],  // level 2
  [3, 0, 0, 0, 0],  // level 3
  [3, 0, 0, 0, 0],  // level 4
  [4, 2, 0, 0, 0],  // level 5
  [4, 2, 0, 0, 0],  // level 6
  [4, 3, 0, 0, 0],  // level 7
  [4, 3, 0, 0, 0],  // level 8
  [4, 3, 2, 0, 0],  // level 9
  [4, 3, 2, 0, 0],  // level 10
  [4, 3, 3, 0, 0],  // level 11
  [4, 3, 3, 0, 0],  // level 12
  [4, 3, 3, 0, 0],  // level 13
  [4, 3, 3, 2, 0],  // level 14
  [4, 3, 3, 2, 0],  // level 15
  [4, 3, 3, 2, 0],  // level 16
  [4, 3, 3, 3, 1],  // level 17
  [4, 3, 3, 3, 1],  // level 18
  [4, 3, 3, 3, 2],  // level 19
  [4, 3, 3, 3, 2]   // level 20
];

// ========================================
// DATABASE - Callings and Subclasses
// ========================================

const DATABASE = {
  callings: {
    warden: {
      name: "Warden",
      primaryStat: "cha",
      features: [
        { 
          level: 1, 
          name: "Bonus Proficiencies", 
          description: "You gain proficiency with heavy armor and Charisma saving throws. You can choose whether your skills will scale with Wisdom or Charisma when taking this Calling, but cannot be interchanged." 
        },
        { 
          level: 1, 
          name: "Guardian's Endurance", 
          description: "When you roll initiative, you gain temporary hit points equal to your Ranger level + your Wisdom or Charisma modifier. As a bonus action, you can expend a 1st-level Adaptive Edge slot to grant an ally within 30 feet temporary hit points equal to 1d8 + your Wisdom or Charisma modifier." 
        },
        { 
          level: 6, 
          name: "Rallying Cry", 
          description: "When you or an ally within 30 feet is reduced below half hit points, you may use your reaction to expend a 2nd-level Adaptive Edge slot. That creature regains hit points equal to 2d8 + your Wisdom or Charisma modifier." 
        },
        { 
          level: 10, 
          name: "Warden's Protection", 
          description: "As an action, you can expend a 3rd-level Adaptive Edge slot to create a 10-foot protective emanation for 1 minute. While conscious, you and one ally of your choice within 10 feet gain resistance to bludgeoning, piercing, and slashing damage (magical and nonmagical)." 
        },
        { 
          level: 14, 
          name: "Swordbearer's Command", 
          description: "When you take the Attack action, you can expend a 4th-level Adaptive Edge slot to issue a rallying command. Choose up to two creatures within 30 feet. Each may immediately use their reaction to either: make one weapon attack, adding your Charisma modifier to the attack roll, or move up to their speed without provoking opportunity attacks." 
        },
        { 
          level: 18, 
          name: "Heir of the Warden-Kings", 
          description: "As an action, you can expend a 5th-level Adaptive Edge slot to enter a heroic state for 1 minute. While active: Allies within 30 feet have immunity to fear and charm effects. Once per round, when an ally within 30 feet fails a saving throw, you may use your reaction to let them reroll it. Whenever you hit with a melee weapon attack, one ally of your choice within 30 feet gains temporary hit points equal to double your Wisdom or Charisma modifier." 
        }
      ]
    },
    marksman: {
      name: "Marksman",
      primaryStat: "wis",
      features: [
        { 
          level: 1, 
          name: "Bonus Proficiency", 
          description: "You gain proficiency with Perception and Investigation." 
        },
        { 
          level: 1, 
          name: "Deadeye's Focus", 
          description: "As a bonus action, you can expend a 1st-level Adaptive Edge slot to enter a state of perfect focus for 1 minute. While in this state you can add your Wisdom modifier to both the attack roll and damage roll of your ranged weapon attacks. When you choose to make an attack benefiting from this feature, you must have more than half your base movement speed remaining at the start of the attack. Immediately after making the attack, your speed becomes 0 until the start of your next turn, as you center yourself to maintain precision." 
        },
        { 
          level: 6, 
          name: "Trick Shot", 
          description: "When you take the attack action, you may expend a 2nd-level Adaptive Edge slot to attempt one of the following trick shots:\n• Split: The projectile from your first attack is split by the second, turning two attack rolls into three. You can target up to three enemies in range. The weapon damage of the first projectile becomes 1d6.\n• Pin: You pin your target with a projectile, freezing their movement. The target must make a Strength Saving throw (DC 8 + Prof + Wis). On a failure, the target is grappled and must use an action to attempt to break free." 
        },
        { 
          level: 10, 
          name: "Devastating Shot", 
          description: "Once per turn when you make a ranged weapon attack, you can expend a 3rd-level Adaptive Edge slot to declare a Devastating Shot. This attack roll has a -5 penalty, but if it hits, it deals an additional +10 damage. If the target is concentrating on a spell, it makes its concentration check with disadvantage." 
        },
        { 
          level: 14, 
          name: "Perfect Focus", 
          description: "Once per turn, you can expend a 4th-level Adaptive Edge slot to enter a state of Perfect Focus. The number needed for a critical hit decreases by 2 for one minute. This effect requires concentration (as if concentrating on a spell). If you take damage, you must succeed on a Constitution saving throw to maintain concentration." 
        },
        { 
          level: 18, 
          name: "Efficient Volley", 
          description: "When you take the Attack action, you can expend a 5th-level Adaptive Edge slot to unleash a deadly volley. Choose up to four creatures within your weapon's normal range. Make a separate ranged attack roll against each target. Each creature that is hit takes normal damage plus an additional 2d8 damage." 
        }
      ]
    },
    mystic: {
      name: "Mystic",
      primaryStat: "wis",
      features: [
        { 
          level: 1, 
          name: "Bonus Proficiencies", 
          description: "You gain proficiency in Arcana and Nature. You may use a weapon, druidic focus, or arcane focus as your spellcasting focus." 
        },
        { 
          level: 1, 
          name: "Primal Casting", 
          description: "You are a half-caster whose magic draws from both the natural and arcane worlds. You prepare and cast spells using your Adaptive Edge slots, which also serve as your spell slots. Wisdom is your spellcasting ability. You can prepare spells from the Ranger or Cleric lists. Your Spell Save DC equals 8 + your Proficiency Bonus + your Wisdom modifier. You can cast any Ranger or Druid spell you know as a ritual if that spell has the ritual tag. You can use a weapon, druidic focus, or arcane focus as a spellcasting focus for your Mystic spells. You ignore non-costly material components while using such a focus." 
        },
        { 
          level: 6, 
          name: "Spellblade's Strike", 
          description: "When you take the Attack action, you can replace one of your attacks with a spell by expending an Adaptive Edge slot. The spell you cast must target only one creature and must have a casting time of 1 action.\n• 1st-level slot: Cast a cantrip or a 1st-level spell.\n• 2nd-level slot: Cast a 2nd-level spell." 
        },
        { 
          level: 10, 
          name: "Widened Circle", 
          description: "When you cast a Ranger spell of 1st or 2nd level that targets only yourself or one ally, and you cast it using a 3rd-level Adaptive Edge slot, you can also target one additional ally within range." 
        },
        { 
          level: 14, 
          name: "Spirit Channel", 
          description: "When you cast a spell or make an attack, you can expend a 4th-level Adaptive Edge slot to infuse it with one of the following effects:\n• Witchfire Charm: One target of the spell or attack takes an additional 3d8 damage of the spell's type.\n• Lifeward Charm: One ally of your choice within 30 feet of the spell or attack regains 3d8 hit points.\n• Valor or Vex Charm: One creature affected by the spell gains advantage on attack rolls, ability checks, and saving throws (Valor) or disadvantage on attack rolls, ability check or saving throw (Vex) until the start of your next turn.\n• Silent Charm: Until the start of your next turn, spells made by allies within 10 feet of you can't be countered." 
        },
        { 
          level: 18, 
          name: "Avatar of the Hedge", 
          description: "As an action, you can expend a 5th-level Adaptive Edge slot to enter a transcendent state for 1 minute. While in this state: You gain resistance to acid, cold, fire, lightning, and thunder damage. Once per turn when you cast a spell, you can make a weapon attack as a bonus action. That attack deals an additional 1d8 elemental damage of your choice. Beasts and Fey within 30 feet regard you as an ally unless harmed." 
        }
      ]
    },
    prowler: {
      name: "Prowler",
      primaryStat: "wis",
      features: [
        { 
          level: 1, 
          name: "Bonus Proficiencies", 
          description: "You gain proficiency in Stealth and Thieves' Tools." 
        },
        { 
          level: 1, 
          name: "Relentless Pursuit", 
          description: "When a hostile creature you can see within 30 feet moves, you can expend a 1st-level Adaptive Edge slot to use your reaction to move up to half your speed toward it. This movement does not provoke opportunity attacks." 
        },
        { 
          level: 6, 
          name: "Shadow Flourish", 
          description: "When you make a weapon attack, you can expend a 2nd-level Adaptive Edge slot as a bonus action before the attack roll. If the attack hits, the target must make a Constitution Saving Throw (DC = 8 + proficiency bonus + Wis). On a failure, the target is blinded until the start of your next turn. If the attack misses, you instead gain a +2 bonus to AC until the start of your next turn." 
        },
        { 
          level: 10, 
          name: "Crippling Strike", 
          description: "When you hit a creature with a weapon attack, you can expend a 3rd-level Adaptive Edge slot to force the target to make a Constitution saving throw (DC = 8 + proficiency bonus + Wis). On a failed save, the target is stunned until the start of your next turn. On a success, the creature instead suffers disadvantage on its next attack roll." 
        },
        { 
          level: 14, 
          name: "Stalking Terror", 
          description: "As an action, you can expend a 4th-level Adaptive Edge slot to become invisible until the start of your next turn. The first attack you make while invisible deals an additional 3d8 psychic damage on a hit. If this attack reduces a creature to 0 hit points, all hostile creatures of your choice within 30 feet must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Wisdom modifier) or be frightened of you until the end of your next turn." 
        },
        { 
          level: 18, 
          name: "Apex Predator", 
          description: "When you reduce a creature to 0 hit points with a weapon attack, you can expend a 5th-level Adaptive Edge slot as a reaction to immediately make another weapon attack against a different creature within range. If this attack hits, it is treated as a critical hit and deals an extra 2d8 damage." 
        }
      ]
    },
    excavator: {
      name: "Excavator",
      primaryStat: "wis",
      features: [
        { 
          level: 1, 
          name: "Bonus Proficiencies", 
          description: "You gain proficiency in two skills from among Arcana, Nature, History, Religion, Perception, or Survival. You also gain proficiency in Cartographer's Tools." 
        },
        { 
          level: 1, 
          name: "Finder of Lost Lore", 
          description: "Your study of past civilizations has given you a supernatural gift to discern lost knowledge. You can cast Identify, Detect Magic, and Comprehend Languages once per day without expending an Adaptive Edge slot. You can cast them more times per day if you use a 1st-level or higher Adaptive Edge slot. Wisdom is your spellcasting ability." 
        },
        { 
          level: 6, 
          name: "Eyes of Discovery", 
          description: "Whenever you make an Intelligence check related to a magic item, cultural artifact, or ancient location, you may add your Wisdom modifier to the check. You may spend a 2nd-level Adaptive Edge slot to gain advantage on checks to find and avoid traps, gain advantage on checks to find secret doors and passages, and give yourself Darkvision out to a range of 60 feet (or increase existing Darkvision by 30 feet). This effect lasts for one hour. For each additional 2nd-level or higher Adaptive Edge you expend, you may target one additional creature that you can see or that is within 60 feet of you. If you spend at least 10 minutes studying a ruin, dungeon, or ancient location, you can determine which society built it, its age, and other notable details about it, if that knowledge could be known. Certain knowledge is unknowable, and the DM may place restrictions on what this ability can unearth." 
        },
        { 
          level: 10, 
          name: "Singing Songs of Dead Tongues", 
          description: "Your unearthing of lost things has taught you the power to speak, read, write, and understand all languages. You can also share your affinity for lost tongues with allies. You can expend a 3rd-level Adaptive Edge slot to give any ally within 60 feet of you this same ability to speak, read, write, and understand all languages. This effect lasts for one hour. For each level Adaptive Edge above third, you may target one additional creature. Once per day, you can touch an object or a location with written word and magically transform the writing into any other language. This ritual takes 10 minutes and the effect lasts for 24 hours, unless a spell or magical effect of appropriate power undoes this. This ability works not only for words written on parchment, but also inscriptions, or words depicted in pictures or tattoos, or words created by illusory magic." 
        },
        { 
          level: 14, 
          name: "Relic Sage", 
          description: "You have excavated enough lost artifacts to find a way around their magical limitations. You may ignore all class, race, and alignment requirements on attuning to or using a magic item. Additionally, if a magic item requires a certain level to use or attune to, you may spend a 4th-level Adaptive Edge slot as an action to overcome that restriction for one hour. If you use an Adaptive Edge slot in this manner, then attunement to that item happens as part of that action. Additionally, you may attune up to four magic items at once." 
        },
        { 
          level: 18, 
          name: "Loremaster", 
          description: "You have achieved an unrivaled grasp of archaic knowledge. Once per day, you can cast the Legend Lore spell without expending any Adaptive Edge slots or material components. You may cast it additional times, but you must use a 5th-level Adaptive Edge slot and the material components. You gain Proficiency in two more of the skills offered by this calling or the Ranger class at Level 1, and you gain Expertise in a skill in which you are already proficiency that is offered by this calling at Level 1 or the Ranger class. In order to gain expertise, you do not have to have actually gained the skill proficiency from the Level 1 or Level 18 ability of this calling. You may spend an adaptive edge slot as a Bonus Action to gain Proficiency in a skill in which you are not proficient, or gain Expertise in another skill in which you are proficient. You may also use this ability to give an ally that you can see or that is within 60 feet of you Proficiency or Expertise. The duration of this ability depends on the level of the Adaptive Edge slot: 1st-level = 1 Hour Proficiency, 2nd-level = 1 Day Proficiency, 3rd-level = 1 Week Proficiency or 1 Hour Expertise, 4th-level = 1 Day Expertise, 5th-level = 1 Week Expertise." 
        }
      ]
    },
    wayfarer: {
      name: "Wayfarer",
      primaryStat: "wis",
      features: [
        { 
          level: 1, 
          name: "Bonus Proficiencies", 
          description: "You gain proficiency in one skill of your choice from the Ranger or Druid list, and you learn two additional languages." 
        },
        { 
          level: 1, 
          name: "Primal Casting", 
          description: "You are a half-caster. You prepare spells from the Ranger list. Wisdom is your spellcasting ability. Your Adaptive Edge slots are also your spell slots. Pathbound Magic: You gain one 1st-level Druid spell of your choice. It is always prepared and does not count against your number of prepared spells." 
        },
        { 
          level: 6, 
          name: "Quick Study", 
          description: "As a bonus action, you can expend a 2nd-level Adaptive Edge slot to copy a trait from one creature you can see within 30 feet until the start of your next turn: gain that creature's movement type (fly, swim, or climb) up to your speed, gain resistance to one damage type it resists, or gain advantage on your next attack against that creature. In addition, you gain one 2nd-level Druid spell or lower of your choice, always prepared." 
        },
        { 
          level: 10, 
          name: "Wanderer's Resilience", 
          description: "Your walking speed increases by 10 feet, and you gain resistance to poison damage. As a bonus action, you can expend a 3rd-level Adaptive Edge slot to heal yourself for 3d8 + your Wisdom modifier hit points. In addition, you gain one 3rd-level Druid spell or lower of your choice, always prepared." 
        },
        { 
          level: 14, 
          name: "Pathshifter Form", 
          description: "As an action, you can expend a 4th-level Adaptive Edge slot to assume one of the following aspects for up to 1 hour. This transformation requires concentration (as if concentrating on a spell). If your concentration is broken, the form ends. While in a Pathshifter Form, your weapon and unarmed strikes are considered magical for overcoming resistance and immunity, and they deal extra 2d8 elemental damage based on the aspect.\n\n• Sky Aspect: You sprout spectral wings, gaining a flying speed equal to your walking speed. Your weapon strikes deal an extra 2d8 lightning damage on a hit. If this effect ends while you are airborne, or if an ally benefiting from this form's aura is airborne, you or they descend up to 60 feet per round until safely on the ground.\n\n• Sea Aspect: You manifest gilled armor and a spectral harpoon. You gain a swimming speed equal to twice your walking speed and can breathe underwater. Your weapon strikes deal an extra 2d8 cold damage on a hit. You also gain resistance to cold damage.\n\n• Land Aspect: Your limbs take on a stony, bestial form, and your body brims with seismic force. You gain a climbing speed equal to your walking speed, the benefits of spider climb (move across vertical surfaces and ceilings), and you ignore difficult terrain. Your weapon strikes deal an extra 2d8 thunder damage on a hit. If this effect ends while an ally benefiting from this form's aura is on a vertical surface, they descend safely to the ground.\n\n• Shared Benefit: You may extend the chosen movement benefit (fly, swim, or climb) to up to two allies within 30 feet who can see you when you assume your form. Allies don't gain resistances, bonus damage, or other effects of the form.\n\nIn addition, you gain one 4th-level Druid spell or lower of your choice, always prepared." 
        },
        { 
          level: 18, 
          name: "Adventure's Master", 
          description: "You gain immunity to exhaustion, disease, and poison. You no longer need food, water, or air to survive. Upon your death, there is a 50% chance you return to life within 24 hours, as if by the reincarnate spell (DM chooses the form). As an action, you can expend a 5th-level Adaptive Edge slot to cast mass cure wounds. In addition, you gain one 5th-level Druid spell or lower of your choice, always prepared." 
        }
      ]
    }
  },
  subclasses: {
    hunter: {
      name: "Hunter",
      features: [
        { 
          level: 3, 
          name: "Hunter's Lore", 
          description: "You learn the Hunter's Mark Instinct and it does not count against the number of instincts that you know. While a creature is affected by your Hunter's Mark Instinct, you automatically know whether that creature has any immunities, resistances, or vulnerabilities, and what they are." 
        },
        { 
          level: 3, 
          name: "Hunter's Prey", 
          description: "You specialize in hunting either single powerful foes or groups of enemies. Choose one of the following options (you may change your choice on a short or long rest):\n• Colossus Slayer: Once per turn, when you hit a creature that is missing any of its hit points with a weapon attack, the attack deals an extra 1d8 damage.\n• Horde Breaker: Once on each of your turns when you take the Attack action and make a weapon attack, you can make one additional attack with the same weapon against a different creature within 5 feet of the original target and within range." 
        },
        { 
          level: 7, 
          name: "Defensive Tactics", 
          description: "You adapt your fighting style for survival. Choose one of the following options (you may change your choice on a short or long rest):\n• Escape the Horde: Opportunity attacks against you are made with disadvantage.\n• Multiattack Defense: When a creature hits you with an attack roll, that creature has disadvantage on all subsequent attack rolls against you until the end of the turn." 
        },
        { 
          level: 11, 
          name: "Superior Hunter's Prey", 
          description: "Once per turn, when you deal damage to a creature affected by your Hunter's Mark Instinct, you can deal the same Hunter's Mark bonus damage to a different creature you can see within 30 feet of the original target." 
        },
        { 
          level: 15, 
          name: "Superior Hunter's Defense", 
          description: "When you take damage from an attack, you can use your reaction to gain resistance to that damage type until the start of your next turn. If you expend a 3rd-level Adaptive Edge slot when using this feature, you instead gain immunity to that damage type until the start of your next turn." 
        }
      ]
    },
    beastmaster: {
      name: "Beast Master",
      features: [
        { 
          level: 3, 
          name: "Primal Companion", 
          description: "You magically summon a primal beast, which draws strength from your Adaptive Edge. Choose its stat block: Beast of the Land, Beast of the Sea, or Beast of the Sky. You also determine the kind of animal it is, choosing a form appropriate for the stat block. Whatever form it takes, it bears primal markings indicating its supernatural origin. The beast is friendly to you and your allies and obeys your commands. It vanishes if you die. In combat, the beast acts during your turn. It can move and use its reaction on its own, but the only action it takes is the Dodge action unless you command it to act. You can command it in one of the following ways:\n• Attack Replacement: When you take the Attack action, you can sacrifice one of your attacks to command the beast to use its Strike action.\n• Adaptive Command: As a bonus action, you can expend a 1st-level Adaptive Edge slot to command the beast to use its Strike action without sacrificing your own attacks.\n\nIf you are incapacitated, the beast acts on its own and isn't limited to the Dodge action." 
        },
        { 
          level: 3, 
          name: "Restoring or Replacing the Beast", 
          description: "If the beast has died within the last hour, you can take a Magic action to touch it and expend a 1st-level Adaptive Edge slot. The beast returns to life after 1 minute with all its hit points restored. Whenever you finish a long rest, you can summon a different primal beast, which appears in an unoccupied space within 5 feet of you. You choose its stat block and appearance. If you already have a beast from this feature, the old one vanishes when the new one appears." 
        },
        { 
          level: 7, 
          name: "Exceptional Training", 
          description: "When you command your beast to attack, you may also allow it to Dash, Disengage, Dodge, or Help as part of the same bonus action. Its attacks count as magical for the purpose of overcoming resistance and immunity. Whenever it hits with an attack, it may deal force damage instead of its normal type." 
        },
        { 
          level: 11, 
          name: "Bestial Fury", 
          description: "When you command your beast to attack, it can make two attacks instead of one. You can expend a 2nd-level Adaptive Edge slot as a bonus action to command it to make a third attack." 
        },
        { 
          level: 15, 
          name: "Share Bond", 
          description: "While your beast is within 30 feet of you, the beast can expend your Adaptive Edge slots (up to 3rd level) to use your Calling features or Instincts as if it were you. The beast uses your save DC, attack modifier, and any other relevant statistics. The beast can activate one such feature on its turn, following all normal rules for that feature. This does not grant the beast its own pool of Adaptive Edge slots; it draws directly from yours." 
        }
      ]
    },
    gloomstalker: {
      name: "Gloom Stalker",
      features: [
        { 
          level: 3, 
          name: "Dread Ambusher", 
          description: "• Ambusher's Leap: At the start of your first turn of each combat, your speed increases by 10 feet until the end of that turn.\n• Dreadful Strike: Once per turn when you hit a creature with a weapon attack, you can expend a 1st-level Adaptive Edge slot to deal an extra 2d6 psychic damage.\n• Initiative Bonus: When you roll initiative, you can add your Wisdom modifier to the roll." 
        },
        { 
          level: 3, 
          name: "Umbral Sight", 
          description: "You gain darkvision with a range of 60 feet. If you already have darkvision, its range increases by 60 feet. While you are in darkness, you are invisible to any creature that relies on darkvision to see you in that darkness." 
        },
        { 
          level: 7, 
          name: "Iron Mind", 
          description: "You have honed your will against the lurking horrors of the dark. You gain proficiency in Wisdom saving throws. If you already have this proficiency, gain proficiency in Intelligence or Charisma saving throws instead." 
        },
        { 
          level: 11, 
          name: "Stalker's Flurry", 
          description: "When you deal psychic damage to a creature with Dreadful Strike, you can choose one of the following additional effects (once per turn). When you expend a 2nd- or 3rd-level Adaptive Edge slot for Dreadful Strike, you may also apply one or both of the following effects:\n• Sudden Strike: Immediately make one weapon attack against a different creature within 5 feet of the original target.\n• Mass Fear: Hostile creatures of your choice within 10 feet of the target must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Wisdom modifier) or be frightened of you until the start of your next turn.\n\nThe psychic damage of your Dreadful Strike also increases to 2d8." 
        },
        { 
          level: 15, 
          name: "Shadowy Dodge", 
          description: "When a creature targets you with an attack, you can use your reaction and expend a 3rd-level Adaptive Edge slot to impose disadvantage on the attack roll. Whether the attack hits or misses, you can then teleport up to 30 feet to an unoccupied space you can see." 
        }
      ]
    },
    horizonwalker: {
      name: "Horizon Walker",
      features: [
        { 
          level: 3, 
          name: "Planar Warrior", 
          description: "As a bonus action, choose one creature you can see within 30 feet of you. Next time you hit that creature on this turn with a weapon attack, you can expend a 1st-level Adaptive Edge slot to make all damage dealt by the attack force damage, and the creature takes an extra 1d8 force damage from the attack. When you reach 11th level in this class, the extra damage increases to 2d8." 
        },
        { 
          level: 3, 
          name: "Spectral Eye", 
          description: "Your connection to the ethereal plane has improved your senses. You gain proficiency in Perception and Wisdom saving throws." 
        },
        { 
          level: 7, 
          name: "Ethereal Step", 
          description: "As a bonus action, you can expend a 2nd-level Adaptive Edge slot to slip through the Ethereal Plane. You teleport up to 40 feet to an unoccupied space you can see, phasing into the Ethereal Plane as part of this movement. While ethereal, until the end of your turn, you can move through creatures and objects on the Material Plane as if they were difficult terrain, and you can't affect or be affected by creatures or objects on the Material Plane. At the end of your turn, you return to the Material Plane in your current space. When you would return, you can instead roll a d20; on an 11 or higher, you remain on the Ethereal Plane until the start of your next turn, then return automatically. If you would reappear in an occupied space or inside an object, you instead appear in the nearest unoccupied space you can see within 5 feet and take 1d6 force damage." 
        },
        { 
          level: 11, 
          name: "Distant Strike", 
          description: "You gain the ability to pass between the planes in the blink of an eye. When you take the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see. If you attack at least two different creatures with the action, you can make one additional attack with it against a third creature." 
        },
        { 
          level: 15, 
          name: "Spectral Defense", 
          description: "Your ability to move between planes enables you to slip through the planar boundaries to lessen the harm done to you during battle. When you take damage from an attack, you can use your reaction to give yourself resistance to all of that attack's damage on this turn." 
        }
      ]
    },
    lunarsentinel: {
      name: "Lunar Sentinel",
      features: [
        { 
          level: 3, 
          name: "Luminescent Warrior", 
          description: "• Moonlit Draw: When you roll initiative, your weapons shed dim light in a 10-foot radius until you sheathe or drop them (no action required).\n• Radiant Edge: Once per turn when you hit a creature with a weapon attack, the attack deals an extra 1d4 radiant damage. This extra damage increases to 1d6 at 7th level, 1d8 at 11th level, and 1d10 at 15th level." 
        },
        { 
          level: 3, 
          name: "Phase Blink", 
          description: "As a bonus action, you can expend a 1st-level Adaptive Edge slot to teleport up to 30 feet to an unoccupied space you can see. If the destination is in dim light or darkness, you have advantage on the first weapon attack you make before the end of your turn. You also gain advantage on Wisdom (Perception) checks made in dim light or darkness." 
        },
        { 
          level: 7, 
          name: "Sanctified Resilience", 
          description: "You gain resistance to radiant and necrotic damage. Your radiant damage ignores resistance, and if a creature is immune to radiant, your radiant damage is treated as resistance. Rebuke the Fell: When you take necrotic damage or are targeted by an effect that deals necrotic damage, you can use your reaction and expend a 2nd-level Adaptive Edge slot to make one weapon attack against the source if it is within range. On a hit, the attack deals an extra 3d8 radiant damage, and the next attack roll made against that target before the end of your next turn has advantage." 
        },
        { 
          level: 11, 
          name: "Illuminated Vision", 
          description: "You can see normally in darkness (nonmagical and magical) out to 120 feet. You have advantage on saving throws against being blinded." 
        },
        { 
          level: 15, 
          name: "Nightfall's Fury", 
          description: "When you hit a creature with a weapon attack, you can expend an Adaptive Edge slot to deal extra radiant damage. The extra damage is 1d8 per slot level (maximum 5d8). If the target is a celestial, fiend, or aberration, the attack deals an additional 1d8 radiant damage (maximum 6d8). You can use this feature once per turn." 
        }
      ]
    },
    feywanderer: {
      name: "Fey Wanderer",
      features: [
        { 
          level: 3, 
          name: "Otherworldly Glamour", 
          description: "You add your Wisdom modifier (minimum +1) to all Charisma checks. You also gain proficiency in one of the following skills: Deception, Performance, or Persuasion." 
        },
        { 
          level: 7, 
          name: "Beguiling Twist", 
          description: "You have advantage on saving throws to avoid or end the charmed or frightened conditions. In addition, when you or a creature you can see within 120 feet succeeds on a saving throw against being charmed or frightened, you can use your reaction to force a different creature you can see within 120 feet to make a Wisdom saving throw (DC = 8 + your proficiency bonus + your Wisdom modifier). On a failure, the target is either charmed or frightened (your choice) for 1 minute. The target repeats the saving throw at the end of each of its turns, ending the effect on itself on a success." 
        },
        { 
          level: 11, 
          name: "Fey Reinforcements", 
          description: "You can cast Summon Fey by expending an Adaptive Edge slot of 3rd level or higher, and it does not require material components. Once per long rest, you can cast Summon Fey without expending an Adaptive Edge slot. When you cast Summon Fey, you can choose to make the spell not require concentration. If you do, the spell lasts for 1 minute." 
        },
        { 
          level: 15, 
          name: "Misty Wanderer", 
          description: "You can cast Misty Step once per day without expending an Adaptive Edge slot. You can cast it again by expending a 2nd-level Adaptive Edge slot. In addition, you can use Misty Step without expending a slot a number of times equal to your Wisdom modifier (minimum once). You regain these free uses when you finish a long rest. When you cast Misty Step, you can bring along one willing creature within 5 feet. That creature teleports to an unoccupied space of your choice within 5 feet of your destination." 
        }
      ]
    },
    swarmkeeper: {
      name: "Swarmkeeper",
      features: [
        { 
          level: 3, 
          name: "Gathered Swarm", 
          description: "A swarm of intangible nature spirits has bonded with you. The swarm remains in your space, skittering, crawling, or fluttering about. You determine its appearance (insects, birds, pixies, leaves, etc.), and it may change with your mood or the seasons. Once on each of your turns, immediately after you hit a creature with a weapon attack, you can command the swarm to assist you in one of the following ways:\n• Swarm Strike: The target takes 1d6 piercing damage from the swarm.\n• Swarm Push: The target must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Wisdom modifier) or be moved by the swarm up to 15 feet horizontally.\n• Swarm Shift: You are moved by the swarm up to 5 feet horizontally." 
        },
        { 
          level: 3, 
          name: "Swarmkeeper's Gift", 
          description: "Your swarm can act independently of you in small ways. You learn the mage hand cantrip. When you cast it, the spectral hand is formed of your swarm. You may also expend Adaptive Edge slots to manifest certain swarm effects, echoing your spiritual bond: 1st Level Slot = faerie fire, 2nd Level Slot = web, 3rd Level Slot = gaseous form, 4th Level Slot = arcane eye, 5th Level Slot = insect plague. These spells are always prepared for you and do not count against your prepared spells." 
        },
        { 
          level: 7, 
          name: "Writhing Tide", 
          description: "As a bonus action, you can expend a 2nd-level Adaptive Edge slot to condense your swarm into a writhing tide that lifts you. You gain a flying speed of 20 feet and can hover for 1 minute, or until you are incapacitated." 
        },
        { 
          level: 11, 
          name: "Mighty Swarm", 
          description: "Swarm Strike damage increases to 1d8. If a creature fails its saving throw against Swarm Push, the swarm can also knock the creature prone. When you use Swarm Shift, you gain half cover until the start of your next turn." 
        },
        { 
          level: 15, 
          name: "Swarming Dispersal", 
          description: "When you take damage, you can use your reaction and expend a 3rd-level Adaptive Edge slot to vanish into your swarm. You gain resistance to the triggering damage, then teleport to an unoccupied space within 30 feet that you can see, reappearing with your swarm." 
        }
      ]
    }
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
