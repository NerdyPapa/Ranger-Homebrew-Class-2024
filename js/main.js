// ========================================
// MAIN INITIALIZATION & UPDATE
// ========================================

function initSelectors() {
  // Initialize level selector (1-20)
  const lvlSel = document.getElementById('levelSelect');
  lvlSel.innerHTML = Array.from({ length: 20 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
  lvlSel.value = '1';
  
  // Initialize species selector
  const spSel = document.getElementById('speciesSelect');
  spSel.innerHTML = SPECIES_LIST.map(s => `<option value="${s}">${s}</option>`).join('');
  spSel.value = character.species;
  
  // Initialize background selector
  const bgSel = document.getElementById('backgroundSelect');
  bgSel.innerHTML = Object.keys(BACKGROUNDS).map(b => `<option value="${b}">${b}</option>`).join('');
  bgSel.value = character.background;
  
  // Initialize feat selectors for levels 4, 8, 12, 16
  ["featPick4", "featPick8", "featPick12", "featPick16"].forEach(id => {
    const sel = document.getElementById(id);
    sel.innerHTML = GENERAL_FEATS.map(n => `<option value="${n}">${n}</option>`).join('');
  });
  
  // Initialize epic boon selector for level 19
  const boonSel = document.getElementById('featPick19');
  boonSel.innerHTML = ['<option value="">-- Select Epic Boon --</option>', ...EPIC_BOONS.map(n => `<option value="${n}">${n}</option>`)].join('');
}

function updateCharacter() {
  renderAbilityScores();
  renderCombatStats();
  renderSkills();
  renderSlots();
  renderInstinctSelectors();
  renderFeaturesAndTraits();
  renderActions();
  renderEquipment();
}

// ========================================
// INITIALIZATION ON PAGE LOAD
// ========================================

(function init() {
  initSelectors();
  setBackground(character.background);
  
  // Initialize armor UI state display
  const armorSel = document.getElementById('armorSelect');
  if (armorSel) armorSel.value = character.armor;
  setArmor(character.armor);
  
  updateCharacter();
})();
