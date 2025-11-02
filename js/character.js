// ========================================
// CHARACTER STATE & CALCULATIONS
// ========================================

// The main character object that stores all character data
let character = {
  name: "New Character",
  player: "",
  species: "Human",
  subspecies: null,
  background: "Soldier",
  level: 1,
  calling: null,
  subclass: null,
  armor: "None",
  shield: false,
  abilityMethod: 'standard',
  hpMethod: 'fixed',
  abilities: {
    str: null,
    dex: null,
    con: null,
    int: null,
    wis: null,
    cha: null
  },
  availableArray: [15, 14, 13, 12, 10, 8],
  skills: {},
  selectedInstincts: [],
  rolledHP: [],
  weapons: [
    { name: "", mod: "", dmg: "" },
    { name: "", mod: "", dmg: "" },
    { name: "", mod: "", dmg: "" }
  ],
  equipment: ["", "", "", "", "", ""],
  originFeat: null,
  backgroundASI: {
    mode: 'twoPlusOne',
    plus2: '',
    plus1: ''
  },
  featASI: {
    4: [],
    8: [],
    12: [],
    16: []
  },
  boonASI: '',
  generalFeats: {
    4: "",
    8: "",
    12: "",
    16: ""
  },
  fsFeats: {},
  epicBoon: "",
  selectedSpells: {
    originFeat: { cantrips: [], level1: [] },
    instincts: {},
    calling: { cantrips: [], level1: [], level2: [], level3: [], level4: [], level5: [] }
  },
  // NEW TRACKING PROPERTIES
  rangerSkillChoices: [],
  callingSkillChoices: {},
  weaponMaster: null,
  expertiseChoices: []
};

// Initialize all skills with proficiency/expertise tracking
SKILLS.forEach(s => character.skills[s.name] = { prof: false, expert: false });

// ========================================
// HELPER FUNCTIONS
// ========================================

function getMod(score) {
  if (score === null || Number.isNaN(score)) return 0;
  return Math.floor((score - 10) / 2);
}

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function setHTML(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ========================================
// ABILITY SCORE CALCULATIONS
// ========================================

function getBaseScore(ab) {
  const v = character.abilities[ab];
  return (v == null ? 0 : v);
}

function getBgBonus(ab) {
  let bonus = 0;
  if (character.backgroundASI.mode === 'twoPlusOne') {
    if (character.backgroundASI.plus2 === ab) bonus += 2;
    if (character.backgroundASI.plus1 === ab) bonus += 1;
  }
  return bonus;
}

function getFeatBonus(ab) {
  let b = 0;
  [4, 8, 12, 16].forEach(l => {
    (character.featASI[l] || []).forEach(entry => {
      if (entry === ab) b += 1;
    });
  });
  if (character.boonASI === ab && character.epicBoon) b += 1;
  return b;
}

function getScore(ab) {
  return getBaseScore(ab) + getBgBonus(ab) + getFeatBonus(ab);
}

// ========================================
// CALLING & SUBCLASS HANDLERS
// ========================================

function handleCallingChange() {
  const val = document.getElementById('callingSelect').value || null;
  character.calling = val;
  updateCharacter();
}

function handleSubclassChange() {
  const val = document.getElementById('subclassSelect').value || null;
  character.subclass = val;
  const note = document.getElementById('subclassNote');
  if (note) note.style.display = (character.level < 3 && val) ? 'inline' : 'none';
  updateCharacter();
}

// ========================================
// NEW: SUBSPECIES HANDLER
// ========================================

function setSubspecies(subspecies) {
  character.subspecies = subspecies;
  updateCharacter();
}

// ========================================
// NEW: RANGER SKILL SELECTION
// ========================================

function setRangerSkill(index, skillName) {
  if (!character.rangerSkillChoices) character.rangerSkillChoices = [];
  
  // Clear old skill proficiency if changing
  const oldSkill = character.rangerSkillChoices[index];
  if (oldSkill && character.skills[oldSkill]) {
    // Only clear if not selected elsewhere
    const otherSelections = character.rangerSkillChoices.filter((s, i) => i !== index && s === oldSkill);
    if (otherSelections.length === 0) {
      character.skills[oldSkill].prof = false;
    }
  }
  
  character.rangerSkillChoices[index] = skillName;
  
  // Auto-check the skill
  if (skillName && character.skills[skillName]) {
    character.skills[skillName].prof = true;
  }
  
  updateCharacter();
}

// ========================================
// NEW: CALLING SKILL SELECTION
// ========================================

function setCallingSkill(index, skillName) {
  if (!character.callingSkillChoices) character.callingSkillChoices = {};
  if (!character.callingSkillChoices[character.calling]) {
    character.callingSkillChoices[character.calling] = [];
  }
  
  // Clear old skill proficiency if changing
  const oldSkill = character.callingSkillChoices[character.calling][index];
  if (oldSkill && character.skills[oldSkill]) {
    const otherSelections = character.callingSkillChoices[character.calling].filter((s, i) => i !== index && s === oldSkill);
    if (otherSelections.length === 0) {
      character.skills[oldSkill].prof = false;
    }
  }
  
  character.callingSkillChoices[character.calling][index] = skillName;
  
  // Auto-check the skill
  if (skillName && character.skills[skillName]) {
    character.skills[skillName].prof = true;
  }
  
  updateCharacter();
}

// ========================================
// NEW: WEAPON MASTER SELECTION
// ========================================

function setWeaponMaster(weaponName) {
  character.weaponMaster = weaponName;
  updateCharacter();
}

// ========================================
// NEW: EXPERTISE SELECTION (LEVEL 9)
// ========================================

function setExpertise(index, skillName) {
  if (!character.expertiseChoices) character.expertiseChoices = [];
  
  // Clear old expertise if changing
  const oldSkill = character.expertiseChoices[index];
  if (oldSkill && character.skills[oldSkill]) {
    character.skills[oldSkill].expert = false;
  }
  
  character.expertiseChoices[index] = skillName;
  
  // Auto-apply expertise
  if (skillName && character.skills[skillName]) {
    character.skills[skillName].expert = true;
  }
  
  updateCharacter();
}

// ========================================
// NEW: SPELL SELECTION FOR SPELLCASTING CALLINGS
// ========================================

function setCallingSpell(level, index, spellName) {
  if (!character.selectedSpells.calling) {
    character.selectedSpells.calling = {
      cantrips: [], level1: [], level2: [], level3: [], level4: [], level5: []
    };
  }
  
  const key = level === 0 ? 'cantrips' : `level${level}`;
  if (!character.selectedSpells.calling[key]) {
    character.selectedSpells.calling[key] = [];
  }
  
  character.selectedSpells.calling[key][index] = spellName;
  updateCharacter();
}

// ========================================
// ARMOR & AC CALCULATIONS
// ========================================

function hasFS(featName) {
  return Object.values(character.fsFeats).includes(featName);
}

function hasGeneralFeat(featName) {
  return Object.values(character.generalFeats).includes(featName);
}

function hasHeavyArmorProficiency() {
  const isWarden = character.calling === 'warden';
  return isWarden || hasGeneralFeat('Heavily Armored');
}

function setArmor(armorName) {
  character.armor = armorName;
  const armorInfo = ARMOR_DATA[armorName];

  const display = document.getElementById('currentArmor');
  if (display) display.textContent = armorName;

  const warnings = document.getElementById('armorWarnings');
  if (warnings) {
    let warnText = '';
    if (armorInfo.category === 'Heavy' && !hasHeavyArmorProficiency()) {
      warnText += '<div style="color:#856404; font-size:11px; background:#fff3cd; padding:6px; border-radius:4px; margin-top:4px;">⚠️ Heavy armor requires proficiency (Warden or Heavily Armored feat).</div>';
    }
    if (armorInfo.str > 0 && getScore('str') < armorInfo.str) {
      warnText += '<div style="color:#856404; font-size:11px; background:#fff3cd; padding:6px; border-radius:4px; margin-top:4px;">⚠️ This armor requires STR ' + armorInfo.str + '. You have STR ' + getScore('str') + '. Speed reduced by 10 ft.</div>';
    }
    warnings.innerHTML = warnText;
  }

  updateCharacter();
}

function computeAC() {
  const armorInfo = ARMOR_DATA[character.armor || 'None'];
  const dexMod = getMod(getScore('dex'));
  
  // Calculate base AC from armor
  let ac = armorInfo.ac;
  
  // Add DEX modifier based on armor type
  if (armorInfo.dexBonus === "full") {
    // Light armor or no armor: add full DEX modifier
    ac += dexMod;
  } else if (typeof armorInfo.dexBonus === "number" && armorInfo.dexBonus > 0) {
    // Medium armor: add DEX modifier up to the armor's max
    ac += Math.min(dexMod, armorInfo.dexBonus);
  }
  // Heavy armor (dexBonus = 0): don't add DEX modifier
  
  if (character.shield) ac += 2;
  if (armorInfo.category !== 'None' && hasFS("Defense Fighting Style Feat")) ac += 1;
  return ac;
}

// ========================================
// HP CALCULATIONS
// ========================================

function calculateHP() {
  const conEff = getScore('con');
  const conMod = getMod(conEff);
  
  if (character.hpMethod === 'fixed') {
    return 10 + ((character.level - 1) * 6) + (character.level * conMod);
  }
  
  while (character.rolledHP.length < character.level) {
    character.rolledHP.push(0);
  }
  
  let total = 10 + conMod;
  for (let i = 1; i < character.level; i++) {
    total += (character.rolledHP[i] || 0) + conMod;
  }
  return total;
}

function setManualHP(level, value) {
  character.rolledHP[level - 1] = parseInt(value || "0", 10);
  updateCharacter();
}

function rollHP(level) {
  const r = Math.floor(Math.random() * 10) + 1;
  character.rolledHP[level - 1] = r;
  updateCharacter();
}

// ========================================
// SPEED CALCULATIONS
// ========================================

function getInstinctSpeedBonus() {
  let bonus = 0;
  character.selectedInstincts.forEach(n => {
    if (n === "Fleet of Foot") bonus += 10;
  });
  return bonus;
}

function getArmorSpeedPenalty() {
  const armor = ARMOR_DATA[character.armor];
  if (!armor || armor.str === 0) return 0;
  const strScore = getScore('str');
  return strScore < armor.str ? -10 : 0;
}

// ========================================
// SKILL MANAGEMENT
// ========================================

function getInstinctSkillProfs() {
  const profs = [];
  character.selectedInstincts.forEach(n => {
    if (!n) return;
    if (n === "Battle Hymn") profs.push("Performance");
    if (n === "Bloodmarked") profs.push("Intimidation");
    if (n === "Sacred Oath") profs.push("Religion");
    if (n === "Spell Lore") profs.push("Arcana");
    if (n === "Wild Charm") profs.push("Animal Handling");
  });
  return profs;
}

function toggleSkillProf(name) {
  const s = character.skills[name];
  s.prof = !s.prof;
  if (!s.prof) s.expert = false;
  renderSkills();
}

function toggleSkillExpert(name) {
  character.skills[name].expert = !character.skills[name].expert;
  renderSkills();
}

// ========================================
// INSTINCT MANAGEMENT
// ========================================

function selectInstinct(index, name) {
  character.selectedInstincts[index] = name || null;
  syncFightingStyleFeats();
  renderInstinctSelectors();
  renderActions();
  renderFSFeats();
  renderCombatStats();
}

function unlockedStylesFromInstincts() {
  const styles = [];
  character.selectedInstincts.forEach(n => {
    if (!n) return;
    const m = n.match(/^Fighting Style - (.+)$/);
    if (m) styles.push(m[1]);
  });
  return [...new Set(styles)];
}

function syncFightingStyleFeats() {
  const styles = unlockedStylesFromInstincts();
  Object.keys(character.fsFeats).forEach(k => {
    if (k !== "(ASI choice)" && !styles.includes(k)) delete character.fsFeats[k];
  });
  styles.forEach(s => {
    if (!(s in character.fsFeats)) character.fsFeats[s] = "";
  });
}

// ========================================
// EQUIPMENT MANAGEMENT
// ========================================

function setEquipment(index, value) {
  character.equipment[index] = value;
}

function setWeapon(index, key, value) {
  character.weapons[index][key] = value;
  renderActions();
}

// ========================================
// FEAT MANAGEMENT
// ========================================

function setBackground(name) {
  character.background = name;
  character.originFeat = BACKGROUNDS[name]?.originFeat || null;
  character.backgroundASI = { mode: 'twoPlusOne', plus2: '', plus1: '' };
  setHTML('featBgName', name || '—');
  setHTML('originFeatName', character.originFeat || '—');
  renderOriginFeatDesc();
  renderBgASISelectors();
  updateCharacter();
}

function setBgASI(which, value) {
  if (which === 'plus2') {
    character.backgroundASI.plus2 = value || '';
    if (value && value === character.backgroundASI.plus1) {
      character.backgroundASI.plus1 = '';
    }
  } else {
    character.backgroundASI.plus1 = value || '';
    if (value && value === character.backgroundASI.plus2) {
      character.backgroundASI.plus2 = '';
    }
  }
  renderBgASISelectors();
  updateCharacter();
}

function pickGeneralFeat(level, value) {
  character.generalFeats[level] = value;
  character.featASI[level] = [];
  if (value && value.includes("Fighting Style Feat")) {
    character.fsFeats["(ASI choice)"] = value;
  }
  renderGeneralFeatDesc(level);
  renderFeatASIControls(level);
  renderCombatStats();
  renderAbilityScores();
  renderSkills();
}

function setFeatASI(level) {
  const feat = character.generalFeats[level] || "Ability Score Improvement";
  const opt = FEAT_ASI_OPTIONS[feat];
  let picks = [];
  
  if (opt === "ASI") {
    const a = document.getElementById(`asi_${level}_a`)?.value || '';
    const b = document.getElementById(`asi_${level}_b`)?.value || '';
    picks = [];
    if (a) picks.push(a);
    if (b) picks.push(b);
  } else if (opt === "ANY_ONE") {
    const a = document.getElementById(`asi_${level}_one`)?.value || '';
    picks = a ? [a] : [];
  } else if (Array.isArray(opt)) {
    const a = document.getElementById(`asi_${level}_restricted`)?.value || '';
    picks = a ? [a] : [];
  }
  
  character.featASI[level] = picks;
  updateCharacter();
}

function setBoonASI(value) {
  character.boonASI = value || '';
  updateCharacter();
}

// ========================================
// LEVEL & METHOD CHANGES
// ========================================

function updateLevel() {
  character.level = parseInt(document.getElementById('levelSelect').value, 10);
  const note = document.getElementById('subclassNote');
  if (note) note.style.display = (character.level < 3 && character.subclass) ? 'inline' : 'none';
  updateCharacter();
}

function changeAbilityMethod() {
  character.abilityMethod = document.getElementById('abilityMethod').value;
  
  if (character.abilityMethod === 'standard') {
    character.availableArray = [15, 14, 13, 12, 10, 8];
    character.abilities = { str: null, dex: null, con: null, int: null, wis: null, cha: null };
    document.getElementById('abilityScoresTitle').textContent = 'Ability Scores - Standard Array (15, 14, 13, 12, 10, 8)';
  } else {
    document.getElementById('abilityScoresTitle').textContent = 'Ability Scores - Manual Entry';
  }
  
  updateCharacter();
}

function assignAbility(ability, value) {
  if (character.abilityMethod === 'manual') {
    character.abilities[ability] = (value === "" ? null : parseInt(value, 10));
    updateCharacter();
    return;
  }
  
  if (character.abilities[ability] !== null) {
    character.availableArray.push(character.abilities[ability]);
    character.availableArray.sort((a, b) => b - a);
  }
  
  character.abilities[ability] = (value === "" ? null : parseInt(value, 10));
  const idx = character.availableArray.indexOf(character.abilities[ability]);
  if (idx > -1) character.availableArray.splice(idx, 1);
  
  updateCharacter();
}

// ========================================
// SLOT MANAGEMENT
// ========================================

function resetSlots() {
  document.querySelectorAll('.slot-box').forEach(el => el.classList.remove('used'));
}
