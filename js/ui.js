// ========================================
// UI RENDERING FUNCTIONS
// ========================================

function renderAbilityScores() {
  const container = document.getElementById('abilityScores');
  const abilities = ABILITIES;
  const names = abilities.map(a => ABILITY_LABELS[a]);
  const profBonus = LEVEL_DATA[character.level].profBonus;
  const saves = { str: true, dex: true, cha: false, con: false, int: false, wis: false };
  
  container.innerHTML = abilities.map((ab, i) => {
    const base = character.abilities[ab];
    const eff = getScore(ab);
    const mod = getMod(eff);
    const modStr = (mod >= 0 ? `+${mod}` : `${mod}`);
    const saveMod = saves[ab] ? mod + profBonus : mod;
    const saveStr = (saveMod >= 0 ? `+${saveMod}` : `${saveMod}`);
    const checkmark = saves[ab] ? ' ✓' : '';
    const bgBonus = getBgBonus(ab);
    const featBonus = getFeatBonus(ab);
    
    let inputHTML = '';
    if (character.abilityMethod === 'standard') {
      const optsPool = [...character.availableArray];
      if (base !== null) optsPool.push(base);
      optsPool.sort((a, b) => b - a);
      const opts = ['<option value="">--</option>', ...optsPool.map(v => `<option value="${v}" ${base === v ? 'selected' : ''}>${v}</option>`)].join('');
      inputHTML = `<select onchange="assignAbility('${ab}', this.value)" style="width: 80px; margin-bottom: 10px;">${opts}</select>`;
    } else {
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

function renderCombatStats() {
  const levelData = LEVEL_DATA[character.level];
  const container = document.getElementById('combatStats');
  const hitDice = character.level;
  const maxHP = calculateHP();
  const baseSpeed = 30;
  const speedBonus = getInstinctSpeedBonus();
  const speedPenalty = getArmorSpeedPenalty();
  const totalSpeed = baseSpeed + speedBonus + speedPenalty;
  
  let hpDisplay = '';
  if (character.hpMethod === 'manual' && character.level > 1) {
    hpDisplay = `<div style="grid-column: 1 / -1; padding: 15px; background: #fff3cd; border-radius: 4px; margin-bottom: 15px;">
      <strong>HP Per Level (Level 1 = 10 + CON):</strong>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top: 10px;">
        ${Array.from({ length: character.level }, (_, i) => {
          if (i === 0) {
            return `<div style="text-align: center;">
              <div style="font-size: 11px; margin-bottom: 3px;">Lvl 1</div>
              <div style="font-weight: bold;">10 + ${getMod(getScore('con'))}</div>
            </div>`;
          } else {
            const roll = character.rolledHP[i] || 0;
            const conMod = getMod(getScore('con'));
            return `<div style="text-align: center;">
              <div style="font-size: 11px; margin-bottom: 3px;">Lvl ${i + 1}</div>
              <div style="display: flex; gap: 5px; justify-content: center; align-items: center;">
                <input type="number" value="${roll}" min="1" max="10" onchange="setManualHP(${i + 1}, this.value)" style="width: 50px; padding: 3px; text-align: center;">
                <button onclick="rollHP(${i + 1})" style="padding: 3px 6px; cursor: pointer; background: #8B0000; color: white; border: none; border-radius: 3px;" title="Roll 1d10">🎲</button>
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

function renderSkills() {
  const container = document.getElementById('skillsList');
  const levelData = LEVEL_DATA[character.level];
  const profBonus = levelData.profBonus;
  const maxProf = levelData.skillProfs;
  const maxExpert = character.level >= 9 ? 2 : 0;
  const instinctProfs = getInstinctSkillProfs();
  
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
    
    let modifier = abilMod;
    if (isActuallyProficient) modifier += profBonus;
    if (skillData.expert) modifier += profBonus;
    
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

function renderSlots() {
  const slots = SLOT_PROGRESSION[character.level];
  const container = document.getElementById('adaptiveEdgeSlots');
  const labels = ['1st', '2nd', '3rd', '4th', '5th'];
  
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
function getInstinctSpellSelector(instinctName, index) {
  if (!instinctName || !SPELL_SOURCES[instinctName]) return '';
  
  const src = SPELL_SOURCES[instinctName];
  const storageKey = `instinct_${index}`;
  let html = '<div style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 4px;">';
  
  // Cantrips
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
  
  // Level 1 spells
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
  
  let available = [...INSTINCTS_DB.base];
  if (character.level >= 6) available = [...available, ...INSTINCTS_DB.level6];
  if (character.level >= 9) available = [...available, ...INSTINCTS_DB.level9];
  if (character.level >= 13) available = [...available, ...INSTINCTS_DB.level13];
  if (character.level >= 17) available = [...available, ...INSTINCTS_DB.level17];
  
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
      ${renderInstinctSpellSelector(selected, idx)}
    </div>`;
  }).join('');
}

function getInstinctSpellSelector(instinctName, index) {
  if (!instinctName || !SPELL_SOURCES[instinctName]) return '';
  
  const src = SPELL_SOURCES[instinctName];
  const storageKey = `instinct_${index}`;
  let html = '<div style="margin-top: 10px; padding: 10px; background: #f0f0f0; border-radius: 4px;">';
  
  // Cantrips
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
  
  // Level 1 spells
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
  
  let available = [...INSTINCTS_DB.base];
  if (character.level >= 6) available = [...available, ...INSTINCTS_DB.level6];
  if (character.level >= 9) available = [...available, ...INSTINCTS_DB.level9];
  if (character.level >= 13) available = [...available, ...INSTINCTS_DB.level13];
  if (character.level >= 17) available = [...available, ...INSTINCTS_DB.level17];
  
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

function renderSpellsSection() {
  const container = document.getElementById('spellsSection');
  const title = document.getElementById('spellsTitle');
  
  initSpellTracking();
  
  let allSpells = [];
  
  // Collect origin feat spells
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
  
  // Collect instinct spells
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
  
  // Collect feat spells
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
  
  // Check if Mystic or Wayfarer
  const isCaster = character.calling === 'mystic' || character.calling === 'wayfarer';
  
  if (allSpells.length === 0 && !isCaster) {
    title.style.display = 'none';
    container.style.display = 'none';
    return;
  }
  
  title.textContent = 'Adaptive Edge Casting';
  title.style.display = 'block';
  container.style.display = 'block';
  
  let html = '';
  
  // Display collected spells
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
  
  // Wayfarer/Mystic spellcasting
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
