/ ========================================
// UI RENDERING FUNCTIONS
// This file handles all the visual display of character data
// ========================================

// ========================================
// ABILITY SCORES RENDERING
// ========================================

function renderAbilityScores() {
  const container = document.getElementById('abilityScores');
  const abilities = ABILITIES;
  const names = abilities.map(a => ABILITY_LABELS[a]);
  const profBonus = LEVEL_DATA[character.level].profBonus;
  
  // Rangers have proficiency in STR and DEX saves
  const saves = { str: true, dex: true, cha: false, con: false, int: false, wis: false };
  
  container.innerHTML = abilities.map((ab, i) => {
    const base = character.abilities[ab];
    const eff = getScore(ab);  // Gets effective score including bonuses
    const mod = getMod(eff);
    const modStr = (mod >= 0 ? `+${mod}` : `${mod}`);
    const saveMod = saves[ab] ? mod + profBonus : mod;
    const saveStr = (saveMod >= 0 ? `+${saveMod}` : `${saveMod}`);
    const checkmark = saves[ab] ? ' ✓' : '';
    const bgBonus = getBgBonus(ab);
    const featBonus = getFeatBonus(ab);
    
    let inputHTML = '';
    if (character.abilityMethod === 'standard') {
      // Standard Array method - show dropdown with available scores
      const optsPool = [...character.availableArray];
      if (base !== null) optsPool.push(base);  // Include currently selected score
      optsPool.sort((a, b) => b - a);
      const opts = ['<option value="">--</option>', ...optsPool.map(v => `<option value="${v}" ${base === v ? 'selected' : ''}>${v}</option>`)].join('');
      inputHTML = `<select onchange="assignAbility('${ab}', this.value)" style="width: 80px; margin-bottom: 10px;">${opts}</select>`;
    } else {
      // Manual Entry method - show number input
      inputHTML = `<input type="number" value="${base ?? ''}" onchange="assignAbility('${ab}', this.value)" style="width: 80px; margin-bottom: 10px; padding: 5px; text-align: center;" min="1" max="30" placeholder="Score">`;
    }
    
    return `<div class="stat-block">
      <h3>${names[i]}</h3>
      ${inputHTML}
      <div class="stat-modifier">${modStr}</div>
      <div class="stat-save">Save: ${saveStr}${checkmark}</div>
      <div class="bg-bonus">BG +${bgBonus || 0} • Feat/Boon +${featBonus || 0} → <strong>${eff}</strong></div>
    </div>`;
  }).join('');
}

// ========================================
// COMBAT STATS RENDERING
// ========================================

function renderCombatStats() {
  const levelData = LEVEL_DATA[character.level];
  const container = document.getElementById('combatStats');
  const hitDice = character.level;
  const maxHP = calculateHP();
  const baseSpeed = 30;
  const speedBonus = getInstinctSpeedBonus();
  const speedPenalty = getArmorSpeedPenalty();
  const totalSpeed = baseSpeed + speedBonus + speedPenalty;
  
  // If using manual HP method and above level 1, show HP per level inputs
  let hpDisplay = '';
  if (character.hpMethod === 'manual' && character.level > 1) {
    hpDisplay = `<div style="grid-column: 1 / -1; padding: 15px; background: #fff3cd; border-radius: 4px; margin-bottom: 15px;">
      <strong>HP Per Level (Level 1 = 10 + CON):</strong>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top: 10px;">
        ${Array.from({ length: character.level }, (_, i) => {
          if (i === 0) {
            // Level 1 is always max (10) + CON
            return `<div style="text-align: center;">
              <div style="font-size: 11px; margin-bottom: 3px;">Lvl 1</div>
              <div style="font-weight: bold;">10 + ${getMod(getScore('con'))}</div>
            </div>`;
          } else {
            // Levels 2+ can be rolled or manually entered
            const roll = character.rolledHP[i] || 0;
            const conMod = getMod(getScore('con'));
            return `<div style="text-align: center;">
              <div style="font-size: 11px; margin-bottom: 3px;">Lvl ${i + 1}</div>
              <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                <input type="number" value="${roll}" min="1" max="10" onchange="setManualHP(${i + 1}, this.value)" style="width: 50px; padding: 3px; text-align: center;">
                <button onclick="rollHP(${i + 1})" style="padding: 3px 6px; cursor: pointer; background: #8B0000; color: white; border: none; border-radius: 3px;" title="Roll 1d10">ðŸŽ²</button>
              </div>
              <div style="font-size: 10px; margin-top: 2px;">+${conMod} CON</div>
            </div>`;
          }
        }).join('')}
      </div>
    </div>`;
  }
  
  container.innerHTML = `${hpDisplay}
    <div class="combat-stat">
      <div class="combat-stat-label">AC</div>
      <div class="combat-stat-value">${computeAC()}</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Initiative</div>
      <div class="combat-stat-value">${getMod(getScore('dex')) >= 0 ? '+' : ''}${getMod(getScore('dex'))}</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Speed</div>
      <div class="combat-stat-value">${totalSpeed} ft${speedPenalty < 0 ? ' ⚠️' : ''}</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Prof Bonus</div>
      <div class="combat-stat-value">+${levelData.profBonus}</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Max HP</div>
      <div class="combat-stat-value">${maxHP}</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Current HP</div>
      <div class="combat-stat-value" contenteditable="true">${maxHP}</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Temp HP</div>
      <div class="combat-stat-value" contenteditable="true">0</div>
    </div>
    <div class="combat-stat">
      <div class="combat-stat-label">Hit Dice</div>
      <div class="combat-stat-value">${hitDice}d10</div>
    </div>`;
}

// ========================================
// SKILLS RENDERING
// ========================================

function renderSkills() {
  const container = document.getElementById('skillsList');
  const levelData = LEVEL_DATA[character.level];
  const profBonus = levelData.profBonus;
  const maxProf = levelData.skillProfs;  // Max number of proficient skills
  const maxExpert = character.level >= 9 ? 2 : 0;  // Expertise available at level 9
  const instinctProfs = getInstinctSkillProfs();  // Skills granted by instincts
  
  // Count how many skills are already proficient/expert
  let profCount = 0, expertCount = 0;
  Object.values(character.skills).forEach(s => {
    if (s.prof) profCount++;
    if (s.expert) expertCount++;
  });
  
  container.innerHTML = SKILLS.map(skill => {
    const abilMod = getMod(getScore(skill.ability));
    const skillData = character.skills[skill.name];
    const hasInstinctProf = instinctProfs.includes(skill.name);
    const isActuallyProficient = skillData.prof || hasInstinctProf;
    
    // Calculate final modifier
    let modifier = abilMod;
    if (isActuallyProficient) modifier += profBonus;
    if (skillData.expert) modifier += profBonus;  // Expertise adds another proficiency bonus
    
    const modStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
    const profDisabled = (!skillData.prof && profCount >= maxProf);
    const expertDisabled = (!skillData.expert && (expertCount >= maxExpert || !isActuallyProficient || character.level < 9));
    const profLabel = hasInstinctProf ? '✓ (Instinct)' : '';
    
    return `<div class="skill-item">
      <div class="skill-checkboxes">
        <input type="checkbox" class="skill-checkbox" ${skillData.prof ? 'checked' : ''} ${profDisabled || hasInstinctProf ? 'disabled' : ''} onchange="toggleSkillProf('${skill.name}')" title="Proficient">
        <input type="checkbox" class="skill-checkbox" ${skillData.expert ? 'checked' : ''} ${expertDisabled ? 'disabled' : ''} onchange="toggleSkillExpert('${skill.name}')" title="Expertise">
      </div>
      <span class="skill-name">${skill.name} (${skill.ability.toUpperCase()}) ${profLabel}</span>
      <span class="skill-modifier">${modStr}</span>
    </div>`;
  }).join('');
}

// ========================================
// SPELL SLOTS RENDERING (Adaptive Edge)
// ========================================

function renderSlots() {
  const slots = SLOT_PROGRESSION[character.level];
  const container = document.getElementById('adaptiveEdgeSlots');
  const labels = ['1st', '2nd', '3rd', '4th', '5th'];
  
  // Level 1 Rangers don't have spell slots yet
  if (character.level === 1) {
    document.getElementById('slotsTitle').style.display = 'none';
    container.style.display = 'none';
    return;
  }
  
  document.getElementById('slotsTitle').style.display = 'block';
  container.style.display = 'grid';
  
  container.innerHTML = slots.map((count, i) => {
    if (count === 0) return '';
    return `<div class="slot-level">
      <div class="slot-level-title">${labels[i]} Level (${count})</div>
      <div class="slot-boxes">
        ${Array(count).fill(0).map(() => `<div class="slot-box" onclick="this.classList.toggle('used')"></div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

// ========================================
// INSTINCT SELECTION RENDERING
// ========================================

function getInstinctSpellSelector(instinctName, index) {
  // If this instinct doesn't grant spells, return empty string
  if (!instinctName || !SPELL_SOURCES[instinctName]) return '';
  
  const src = SPELL_SOURCES[instinctName];
  const storageKey = `instinct_${index}`;
  let html = '<div style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 4px;">';
  
  // Cantrips selection
  if (src.cantrips > 0) {
    html += `<div style="margin-bottom: 8px;"><strong>Choose ${src.cantrips} Cantrip(s):</strong></div>`;
    for (let i = 0; i < src.cantrips; i++) {
      const selected = character.selectedSpells[storageKey]?.cantrips[i] || '';
      html += `<select class="feat-select" style="width: 100%; margin-bottom: 4px;" onchange="setSpellChoice('${storageKey}', 'cantrips', ${i}, this.value)">
        <option value="">-- Select Cantrip --</option>`;
      const cantripList = CANTRIPS[src.cantripList] || [];
      cantripList.forEach(spell => {
        html += `<option value="${spell}" ${selected === spell ? 'selected' : ''}>${spell}</option>`;
      });
      html += `</select>`;
    }
  }
  
  // Level 1 spells selection (if not fixed)
  if (src.level1 > 0 && !src.fixedSpells) {
    html += `<div style="margin-bottom: 8px; margin-top: 8px;"><strong>Choose ${src.level1} Level 1 Spell(s):</strong></div>`;
    for (let i = 0; i < src.level1; i++) {
      const selected = character.selectedSpells[storageKey]?.level1[i] || '';
      html += `<select class="feat-select" style="width: 100%; margin-bottom: 4px;" onchange="setSpellChoice('${storageKey}', 'level1', ${i}, this.value)">
        <option value="">-- Select Spell --</option>`;
      const spellList = LEVEL1_SPELLS[src.level1List] || [];
      spellList.forEach(spell => {
        html += `<option value="${spell}" ${selected === spell ? 'selected' : ''}>${spell}</option>`;
      });
      html += `</select>`;
    }
  }
  
  html += '</div>';
  return html;
}

function renderInstinctSelectors() {
  const levelData = LEVEL_DATA[character.level];
  const instinctCount = levelData.instincts;
  const container = document.getElementById('instinctsSelection');
  
  if (instinctCount === 0) {
    container.innerHTML = '<p style="padding: 15px; background: #f9f9f9; border-radius: 4px;">No Instincts available at Level 1.</p>';
    return;
  }
  
  // Build available instincts list based on character level
  let available = [...INSTINCTS_DB.base];
  if (character.level >= 6) available = [...available, ...INSTINCTS_DB.level6];
  if (character.level >= 9) available = [...available, ...INSTINCTS_DB.level9];
  if (character.level >= 13) available = [...available, ...INSTINCTS_DB.level13];
  if (character.level >= 17) available = [...available, ...INSTINCTS_DB.level17];
  
  // Ensure the selectedInstincts array matches the number of instincts for this level
  while (character.selectedInstincts.length < instinctCount) character.selectedInstincts.push(null);
  while (character.selectedInstincts.length > instinctCount) character.selectedInstincts.pop();
  
  container.innerHTML = character.selectedInstincts.map((selected, idx) => {
    const chosen = selected ? available.find(i => i.name === selected) : null;
    return `<div class="instinct-selector">
      <label style="font-size: 12px; font-weight: bold; margin-bottom: 5px; display:block;">Instinct ${idx + 1}</label>
      <select onchange="selectInstinct(${idx}, this.value)">
        <option value="">-- Select Instinct --</option>
        ${available.map(i => `<option value="${i.name}" ${selected === i.name ? 'selected' : ''}>${i.name}</option>`).join('')}
      </select>
      <div class="instinct-description">${chosen ? chosen.desc : 'Select an instinct to see description'}</div>
      ${getInstinctSpellSelector(selected, idx)}
    </div>`;
  }).join('');
}

// ========================================
// SPELLS SECTION RENDERING
// ========================================

function renderSpellsSection() {
  const container = document.getElementById('spellsSection');
  const title = document.getElementById('spellsTitle');
  
  initSpellTracking();  // Ensure spell tracking is initialized
  
  let allSpells = [];
  
  // Collect spells from origin feat
  if (character.originFeat && SPELL_SOURCES[character.originFeat]) {
    const stored = character.selectedSpells.originFeat;
    if (stored.cantrips) stored.cantrips.forEach(s => { if (s) allSpells.push({ name: s, level: 'Cantrip', source: character.originFeat }); });
    if (stored.level1) stored.level1.forEach(s => { if (s) allSpells.push({ name: s, level: '1st', source: character.originFeat }); });
    
    // Add fixed spells if they exist
    const src = SPELL_SOURCES[character.originFeat];
    if (src.fixedSpells) {
      src.fixedSpells.forEach(s => allSpells.push({ name: s, level: '1st', source: character.originFeat }));
    }
  }
  
  // Collect spells from instincts
  character.selectedInstincts.forEach((instinct, idx) => {
    if (instinct && SPELL_SOURCES[instinct]) {
      const src = SPELL_SOURCES[instinct];
      const storageKey = `instinct_${idx}`;
      const stored = character.selectedSpells[storageKey];
      
      if (src.fixedSpells) {
        src.fixedSpells.forEach(s => allSpells.push({ name: s, level: '1st', source: instinct }));
      }
      if (stored?.cantrips) stored.cantrips.forEach(s => { if (s) allSpells.push({ name: s, level: 'Cantrip', source: instinct }); });
      if (stored?.level1) stored.level1.forEach(s => { if (s) allSpells.push({ name: s, level: '1st', source: instinct }); });
    }
  });
  
  // Collect spells from general feats
  [4, 8, 12, 16].forEach(level => {
    const feat = character.generalFeats[level];
    if (feat && SPELL_SOURCES[feat]) {
      const src = SPELL_SOURCES[feat];
      const storageKey = `feat_${level}`;
      const stored = character.selectedSpells[storageKey];
      
      if (src.fixedSpells) {
        src.fixedSpells.forEach(s => allSpells.push({ name: s, level: '1st', source: feat }));
      }
      if (stored?.level1) stored.level1.forEach(s => { if (s) allSpells.push({ name: s, level: '1st', source: feat }); });
    }
  });
  
  // Check if Mystic or Wayfarer (full casters)
  const isCaster = character.calling === 'mystic' || character.calling === 'wayfarer';
  
  // If no spells and not a caster, hide the section
  if (allSpells.length === 0 && !isCaster) {
    title.style.display = 'none';
    container.style.display = 'none';
    return;
  }
  
  title.textContent = 'Adaptive Edge Casting';
  title.style.display = 'block';
  container.style.display = 'block';
  
  let html = '';
  
  // Display collected spells from feats and instincts
  if (allSpells.length > 0) {
    html += `<div class="feature-item">
      <div class="feature-title">Known Spells from Feats & Instincts</div>
      <div class="feature-description">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #8B0000;">
              <th style="text-align: left; padding: 8px;">Spell</th>
              <th style="text-align: left; padding: 8px;">Level</th>
              <th style="text-align: left; padding: 8px;">Source</th>
            </tr>
          </thead>
          <tbody>`;
    
    allSpells.forEach(spell => {
      html += `<tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;"><strong>${spell.name}</strong></td>
        <td style="padding: 8px;">${spell.level}</td>
        <td style="padding: 8px; font-size: 11px;">${spell.source}</td>
      </tr>`;
    });
    
    html += `</tbody></table>
        <div class="feat-note" style="margin-top: 10px;">These spells can be cast once per long rest without using a slot, or by expending Adaptive Edge slots.</div>
      </div>
    </div>`;
  }
  
  // Wayfarer/Mystic spellcasting info
  if (isCaster) {
    const callingName = character.calling === 'mystic' ? 'Mystic' : 'Wayfarer';
    const spellList = character.calling === 'mystic' ? 'Cleric & Ranger' : 'Druid';
    
    html += `<div class="feature-item">
      <div class="feature-title">${callingName} Prepared Spells</div>
      <div class="feature-description">
        <p style="margin-bottom: 12px;">As a ${callingName}, you prepare spells from the ${spellList} spell list. Number of prepared spells = WIS modifier + Ranger level.</p>
        <div class="feat-note">Track your prepared ${callingName} spells separately. Use the Adaptive Edge Slots above to track spell slot usage.</div>
      </div>
    </div>`;
  }
  
  container.innerHTML = html;
}

function setSpellChoice(storageKey, level, index, value) {
  initSpellTracking();
  
  if (!character.selectedSpells[storageKey]) {
    character.selectedSpells[storageKey] = { cantrips: [], level1: [] };
  }
  
  if (!character.selectedSpells[storageKey][level]) {
    character.selectedSpells[storageKey][level] = [];
  }
  
  character.selectedSpells[storageKey][level][index] = value;
  renderSpellsSection();
}

// ========================================
// FEATURES AND TRAITS RENDERING
// ========================================

function renderSpeciesFeatures() {
  const s = character.species;
  const block = SPECIES_DATA[s];
  setHTML('speciesTitle', block ? block.title : '—');
  document.getElementById('speciesDesc').textContent = block ? block.desc : 'Select a species to view its traits.';
}

function renderFeaturesAndTraits() {
  // IMPORTANT: Use character object as source of truth, not select elements
  const callingKey = character.calling;
  const subclassKey = character.subclass;
  const lvl = character.level;
  
  renderSpeciesFeatures();
  
  // Render Calling Features
  const callingContainer = document.getElementById('callingFeatures');
  if (callingKey && DATABASE.callings[callingKey]) {
    const calling = DATABASE.callings[callingKey];
    const unlocked = calling.features.filter(f => f.level <= lvl);
    callingContainer.innerHTML = unlocked.length ?
      unlocked.map(f => `<div class="feature-item">
        <div class="feature-title">${f.name} (${f.level}${getOrdinal(f.level)} Level)</div>
        <div class="feature-description">${f.description}</div>
      </div>`).join('') :
      `<p style="padding: 15px; background: #f9f9f9; border-radius: 4px;">No Calling features unlocked yet.</p>`;
  } else {
    callingContainer.innerHTML = '<p style="padding: 15px; background: #f9f9f9; border-radius: 4px;">Select a Calling to see features.</p>';
  }
  
  // Render Subclass Features
  const subclassContainer = document.getElementById('subclassFeatures');
  if (subclassKey && DATABASE.subclasses[subclassKey] && lvl >= 3) {
    const sc = DATABASE.subclasses[subclassKey];
    const unlocked = sc.features.filter(f => f.level <= lvl);
    subclassContainer.innerHTML = unlocked.length ?
      unlocked.map(f => `<div class="feature-item">
        <div class="feature-title">${f.name} (${f.level}${getOrdinal(f.level)} Level)</div>
        <div class="feature-description">${f.description}</div>
      </div>`).join('') :
      `<p style="padding: 15px; background: #f9f9f9; border-radius: 4px;">No Subclass features unlocked yet (requires level 3).</p>`;
  } else if (lvl < 3) {
    subclassContainer.innerHTML = '<p style="padding: 15px; background: #f9f9f9; border-radius: 4px;">Subclass features unlock at 3rd level.</p>';
  } else {
    subclassContainer.innerHTML = '<p style="padding: 15px; background: #f9f9f9; border-radius: 4px;">Select a Subclass to see features.</p>';
  }
  
  // Show/hide feat sections based on level
  document.getElementById('feat4').style.display = lvl >= 4 ? 'block' : 'none';
  document.getElementById('feat8').style.display = lvl >= 8 ? 'block' : 'none';
  document.getElementById('feat12').style.display = lvl >= 12 ? 'block' : 'none';
  document.getElementById('feat16').style.display = lvl >= 16 ? 'block' : 'none';
  document.getElementById('feat19').style.display = lvl >= 19 ? 'block' : 'none';
  
  // Render background and origin feat info
  setHTML('featBgName', character.background || '—');
  setHTML('originFeatName', character.originFeat || '—');
  renderOriginFeatDesc();
  renderBgASISelectors();
  
  // Render general feats for levels 4, 8, 12, 16
  [4, 8, 12, 16].forEach(l => {
    const sel = document.getElementById('featPick' + l);
    if (sel) sel.value = character.generalFeats[l] || "Ability Score Improvement";
    renderGeneralFeatDesc(l);
    renderFeatASIControls(l);
  });
  
  // Render Fighting Style feats (unlocked by certain instincts)
  renderFSFeats();
  
  // Render Epic Boon (level 19)
  const boonSel = document.getElementById('featPick19');
  if (boonSel) boonSel.value = character.epicBoon || "";
  renderEpicBoonDesc();
  renderBoonASIControls();
}

// ========================================
// ACTIONS RENDERING
// ========================================

function renderActions() {
  const actions = [];
  const bonus = [];
  const reacts = [];
  
  // Add weapon attacks
  character.weapons.forEach((w) => {
    const has = (w.name || "").trim() !== "" || (w.mod || "").toString().trim() !== "" || (w.dmg || "").trim() !== "";
    if (has) {
      const modTxt = (w.mod !== "" && !Number.isNaN(parseInt(w.mod, 10))) ?
        (parseInt(w.mod, 10) >= 0 ? `+${parseInt(w.mod, 10)}` : `${parseInt(w.mod, 10)}`) : '';
      const dmgTxt = (w.dmg || '').trim();
      actions.push(`<div class="action-item"><strong>${w.name || 'Weapon'}</strong> — to hit ${modStr}, dmg ${dmg}</div>`);
    }
  });
  
  // Add instinct actions
  const pool = [...INSTINCTS_DB.base, ...INSTINCTS_DB.level6, ...INSTINCTS_DB.level9, ...INSTINCTS_DB.level13, ...INSTINCTS_DB.level17];
  character.selectedInstincts.forEach(n => {
    if (!n) return;
    const inst = pool.find(i => i.name === n);
    if (!inst) return;
    if (inst.action === 'action') actions.push(`<div class="action-item"><strong>${inst.name}:</strong> ${inst.desc}</div>`);
    else if (inst.action === 'bonus') bonus.push(`<div class="action-item"><strong>${inst.name}:</strong> ${inst.desc}</div>`);
    else if (inst.action === 'reaction') reacts.push(`<div class="action-item"><strong>${inst.name}:</strong> ${inst.desc}</div>`);
  });
  
  // Add basic Ranger actions
  actions.push('<div class="action-item"><strong>Attack:</strong> Make weapon attack(s)</div>');
  if (character.level >= 5) actions.push('<div class="action-item"><strong>Extra Attack:</strong> Attack twice when taking the Attack action</div>');
  
  document.getElementById('actionsList').innerHTML = actions.length ? actions.join('') : '<div class="action-item">No actions</div>';
  document.getElementById('bonusActionsList').innerHTML = bonus.length ? bonus.join('') : '<div class="action-item">No bonus actions</div>';
  document.getElementById('reactionsList').innerHTML = reacts.length ? reacts.join('') : '<div class="action-item">No reactions</div>';
}

// ========================================
// EQUIPMENT RENDERING
// ========================================

function renderEquipment() {
  const grid = document.getElementById('equipmentGrid');
  grid.innerHTML = character.equipment.map((val, idx) =>
    `<div class="equipment-slot">
      <label style="font-size:12px; color:#666; width:26px;">${idx + 1}.</label>
      <input type="text" placeholder="Item ${idx + 1}" value="${val}" oninput="setEquipment(${idx}, this.value)" />
    </div>`
  ).join('');
}

// ========================================
// FEAT DESCRIPTION RENDERING
// ========================================

function renderGeneralFeatDesc(level) {
  const key = character.generalFeats[level] || "Ability Score Improvement";
  const text = GENERAL_FEAT_DESC[key] || "—";
  setHTML('featDesc' + level, text);
}

function renderOriginFeatDesc() {
  const name = character.originFeat;
  document.getElementById('originFeatDesc').textContent = name ? (ORIGIN_FEAT_DESC[name] || "—") : "—";
}

function renderEpicBoonDesc() {
  const name = character.epicBoon;
  document.getElementById('boonDesc').textContent = name ? (EPIC_BOON_DESC[name] || "—") : "—";
}

// ========================================
// ABILITY SCORE INCREASE CONTROLS
// ========================================

function renderBgASISelectors() {
  const plus2Sel = document.getElementById('bgPlus2');
  const plus1Sel = document.getElementById('bgPlus1');
  if (!plus2Sel || !plus1Sel) return;
  
  const opts = ['<option value="">+2 — choose</option>', ...ABILITIES.map(a => `<option value="${a}">${ABILITY_LABELS[a]} (+2)</option>`)];
  const opts1 = ['<option value="">+1 — choose</option>', ...ABILITIES.map(a => `<option value="${a}">${ABILITY_LABELS[a]} (+1)</option>`)];
  
  plus2Sel.innerHTML = opts;
  plus1Sel.innerHTML = opts1;
  plus2Sel.value = character.backgroundASI.plus2 || '';
  plus1Sel.value = character.backgroundASI.plus1 || '';
}

function renderFeatASIControls(level) {
  const holder = document.getElementById('featASIControls' + level);
  if (!holder) return;
  
  const feat = character.generalFeats[level] || "Ability Score Improvement";
  const opt = FEAT_ASI_OPTIONS[feat];
  
  if (!opt) {
    holder.innerHTML = '';
    return;
  }
  
  const buildSelect = (id, abilities, placeholder) => {
    const options = ['<option value="">' + placeholder + '</option>', ...abilities.map(a => `<option value="${a}">${ABILITY_LABELS[a]}</option>`)].join('');
    return `<select id="${id}" class="feat-select" onchange="setFeatASI(${level})">${options}</select>`;
  };
  
  if (opt === "ASI") {
    // Full Ability Score Improvement - choose two picks
    const idA = `asi_${level}_a`, idB = `asi_${level}_b`;
    holder.innerHTML = `<div class="feat-note" style="margin-bottom:6px;">Ability Increase: choose two picks (same ability = +2, different = +1/+1).</div>
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px;">
        ${buildSelect(idA, ABILITIES, "+1 pick A")}
        ${buildSelect(idB, ABILITIES, "+1 pick B")}
      </div>`;
    const [a, b] = character.featASI[level] || [];
    if (a) document.getElementById(idA).value = a;
    if (b) document.getElementById(idB).value = b;
  } else if (opt === "ANY_ONE") {
    // Choose any one ability for +1
    const id = `asi_${level}_one`;
    holder.innerHTML = `<div class="feat-note" style="margin-bottom:6px;">Ability Increase: choose one ability for +1.</div>${buildSelect(id, ABILITIES, "+1 pick")}`;
    const [a] = character.featASI[level] || [];
    if (a) document.getElementById(id).value = a;
  } else if (Array.isArray(opt)) {
    // Choose from restricted list
    const id = `asi_${level}_restricted`;
    holder.innerHTML = `<div class="feat-note" style="margin-bottom:6px;">Ability Increase: choose one (${opt.map(o => ABILITY_LABELS[o]).join(' / ')}).</div>${buildSelect(id, opt, "+1 pick")}`;
    const [a] = character.featASI[level] || [];
    if (a) document.getElementById(id).value = a;
  } else {
    holder.innerHTML = '';
  }
}

function renderBoonASIControls() {
  const holder = document.getElementById('boonASIControls');
  if (!holder) return;
  
  const boon = character.epicBoon;
  if (!boon) {
    holder.innerHTML = '';
    return;
  }
  
  const opt = EPIC_BOON_ASI_OPTIONS[boon];
  if (!opt) {
    holder.innerHTML = '';
    return;
  }
  
  const buildSelect = (id, abilities, placeholder) => {
    const options = ['<option value="">' + placeholder + '</option>', ...abilities.map(a => `<option value="${a}">${ABILITY_LABELS[a]}</option>`)].join('');
    return `<select id="${id}" class="feat-select" onchange="setBoonASI(this.value)">${options}</select>`;
  };
  
  if (opt === "ANY_ONE") {
    holder.innerHTML = `<div class="feat-note" style="margin-top:6px;">Epic Boon Ability Increase: choose one ability for +1.</div>${buildSelect('boon_asi', ABILITIES, "+1 pick")}`;
  } else if (Array.isArray(opt)) {
    holder.innerHTML = `<div class="feat-note" style="margin-top:6px;">Epic Boon Ability Increase: choose one (${opt.map(o => ABILITY_LABELS[o]).join(' / ')}).</div>${buildSelect('boon_asi', opt, "+1 pick")}`;
  } else {
    holder.innerHTML = '';
  }
  
  if (character.boonASI) {
    const sel = document.getElementById('boon_asi');
    if (sel) sel.value = character.boonASI;
  }
}

// ========================================
// FIGHTING STYLE FEATS RENDERING
// ========================================

function renderFSFeats() {
  const box = document.getElementById('fsFeatBox');
  const list = document.getElementById('fsFeatList');
  const styles = unlockedStylesFromInstincts();
  
  if (styles.length === 0) {
    box.style.display = 'none';
    list.innerHTML = '';
    return;
  }
  
  box.style.display = 'block';
  list.innerHTML = styles.map(s => {
    const matches = FIGHTING_STYLE_FEATS.filter(f => f.toLowerCase().startsWith(s.toLowerCase()));
    const options = ['<option value="">-- Select --</option>', ...matches.map(f => `<option value="${f}" ${character.fsFeats[s] === f ? 'selected' : ''}>${f}</option>`)].join('');
    const desc = character.fsFeats[s] ? (FS_FEAT_DESC[character.fsFeats[s]] || "—") : "—";
    return `<div class="field-group" style="margin-top:8px;">
      <label>${s} Fighting Style Feat</label>
      <select onchange="character.fsFeats['${s}']=this.value; renderFSFeats(); renderCombatStats();">${options}</select>
      <div class="feature-description" style="margin-top:6px;">${desc}</div>
    </div>`;
  }).join('');
}
