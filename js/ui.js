// ========================================
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
      inputHTML = `<input type="number" value="${base ?? ''}" onchange="assignAbility('${ab}', this.value)" style="width: 80px; margin-bottom: 10px; padding: 5px; text-align: center; border: 1px solid #ccc; border-radius: 3px;" min="1" max="30" placeholder="Score">`;
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
  
  // FIXED: Removed dice roller, made purely manual with automatic CON calculation
  let hpDisplay = '';
  if (character.hpMethod === 'manual' && character.level > 1) {
    hpDisplay = `<div style="grid-column: 1 / -1; padding: 15px; background: #fff3cd; border-radius: 4px; margin-bottom: 15px;">
      <strong>HP Per Level (Level 1 = 10 + CON, each level after = HP roll + CON):</strong>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 10px;">
        ${Array.from({ length: character.level }, (_, i) => {
          if (i === 0) {
            const conMod = getMod(getScore('con'));
            const lvl1HP = 10 + conMod;
            return `<div style="text-align: center;">
              <div style="font-size: 11px; margin-bottom: 3px;">Lvl 1</div>
              <div style="font-weight: bold; font-size: 18px;">${lvl1HP}</div>
              <div style="font-size: 10px; color: #666;">(10 + ${conMod})</div>
            </div>`;
          } else {
            const roll = character.rolledHP[i] || 0;
            const conMod = getMod(getScore('con'));
            const levelTotal = roll + conMod;
            return `<div style="text-align: center;">
              <div style="font-size: 11px; margin-bottom: 3px;">Lvl ${i + 1}</div>
              <input type="number" value="${roll}" min="0" max="10" onchange="setManualHP(${i + 1}, this.value)" style="width: 60px; padding: 5px; text-align: center; border: 1px solid #ccc; border-radius: 3px; font-size: 16px;">
              <div style="font-size: 10px; margin-top: 2px; color: #666;">+${conMod} = ${levelTotal}</div>
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
      <div class="combat-stat-value">${totalSpeed} ft${speedPenalty < 0 ? ' WARNING' : ''}</div>
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

// ========================================
// SPELL SLOTS RENDERING (Adaptive Edge)
// ========================================

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
      <h3 class="slot-level-title">${labels[i]} Level</h3>
      <div class="slot-boxes">
        ${Array.from({ length: count }, (_, j) => `<div class="slot-box" onclick="this.classList.toggle('used')"></div>`).join('')}
      </div>
    </div>`;
  }).filter(Boolean).join('');
}

// ========================================
// SPELLS SECTION RENDERING (NEW: ORGANIZED BY LEVEL)
// ========================================

function renderSpellsSection() {
  const container = document.getElementById('spellsSection');
  const spellTitle = document.getElementById('spellsTitle');
  
  // Only show spells for spellcasting callings
  const spellcasters = ['mystic', 'wayfarer', 'excavator'];
  if (!character.calling || !spellcasters.includes(character.calling)) {
    spellTitle.style.display = 'none';
    container.style.display = 'none';
    return;
  }
  
  spellTitle.style.display = 'block';
  container.style.display = 'block';
  spellTitle.textContent = "Adaptive Edge Casting";
  
  // Collect all spells from all sources
  const allSpells = {
    cantrips: [],
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: []
  };
  
  // Add spells from calling
  if (character.selectedSpells && character.selectedSpells.calling) {
    Object.keys(character.selectedSpells.calling).forEach(key => {
      if (allSpells[key]) {
        const spells = character.selectedSpells.calling[key];
        if (Array.isArray(spells)) {
          spells.forEach(spell => {
            if (spell && spell.trim() !== '') {
              allSpells[key].push(spell);
            }
          });
        }
      }
    });
  }
  
  // Add spells from origin feat
  if (character.selectedSpells && character.selectedSpells.originFeat) {
    if (character.selectedSpells.originFeat.cantrips) {
      character.selectedSpells.originFeat.cantrips.forEach(spell => {
        if (spell && spell.trim() !== '') allSpells.cantrips.push(spell);
      });
    }
    if (character.selectedSpells.originFeat.level1) {
      character.selectedSpells.originFeat.level1.forEach(spell => {
        if (spell && spell.trim() !== '') allSpells.level1.push(spell);
      });
    }
  }
  
  // Add spells from instincts
  if (character.selectedSpells && character.selectedSpells.instincts) {
    Object.values(character.selectedSpells.instincts).forEach(instSpells => {
      if (instSpells) {
        if (instSpells.cantrips) {
          instSpells.cantrips.forEach(spell => {
            if (spell && spell.trim() !== '') allSpells.cantrips.push(spell);
          });
        }
        if (instSpells.level1) {
          instSpells.level1.forEach(spell => {
            if (spell && spell.trim() !== '') allSpells.level1.push(spell);
          });
        }
      }
    });
  }
  
  // Render organized by level
  let html = '';
  
  const levelLabels = {
    cantrips: 'Cantrips',
    level1: '1st-Level Spells',
    level2: '2nd-Level Spells',
    level3: '3rd-Level Spells',
    level4: '4th-Level Spells',
    level5: '5th-Level Spells'
  };
  
  Object.keys(levelLabels).forEach(levelKey => {
    const spells = allSpells[levelKey];
    if (spells && spells.length > 0) {
      html += `<h3 class="spell-level-header">${levelLabels[levelKey]}</h3>`;
      
      // Remove duplicates
      const uniqueSpells = [...new Set(spells)];
      
      uniqueSpells.forEach(spellName => {
        html += `<div class="feature-item">
          <div class="feature-title">${spellName}</div>
          <div class="feature-description">
            <em>Spell details available in rulebook or Spell Descriptions document.</em>
          </div>
        </div>`;
      });
    }
  });
  
  if (html === '') {
    html = '<p style="padding:15px; background:#f9f9f9; border-radius:4px;">No spells selected yet. Choose your calling spells from the spell selection dropdowns in the Calling Features section.</p>';
  }
  
  container.innerHTML = html;
}


// ========================================
// INSTINCTS SELECTION RENDERING
// ========================================

function renderInstinctSelectors() {
  const container = document.getElementById('instinctsSelection');
  const levelData = LEVEL_DATA[character.level];
  const totalInstincts = levelData.instincts;
  
  if (totalInstincts === 0) {
    container.innerHTML = '<p style="padding:15px; background:#f9f9f9; border-radius:4px;">Instincts are available from Level 2 onwards.</p>';
    return;
  }
  
  while (character.selectedInstincts.length < totalInstincts) {
    character.selectedInstincts.push(null);
  }
  
  const getAvailableInstincts = (index) => {
    const pools = [
      { level: 2, pool: INSTINCTS_DB.base },
      { level: 6, pool: INSTINCTS_DB.level6 },
      { level: 9, pool: INSTINCTS_DB.level9 },
      { level: 13, pool: INSTINCTS_DB.level13 },
      { level: 17, pool: INSTINCTS_DB.level17 }
    ];
    
    let available = [];
    pools.forEach(p => {
      if (character.level >= p.level) {
        available = available.concat(p.pool);
      }
    });
    
    return available.filter(inst => {
      if (!inst.repeatable) {
        const alreadyPicked = character.selectedInstincts.filter((s, i) => i !== index && s === inst.name).length > 0;
        if (alreadyPicked) return false;
      }
      return true;
    });
  };
  
  let html = '';
  for (let i = 0; i < totalInstincts; i++) {
    const available = getAvailableInstincts(i);
    const selected = character.selectedInstincts[i];
    const selectedInst = available.find(inst => inst.name === selected);
    
    html += `<div class="feature-item" style="margin-bottom:15px;">
      <div class="feature-title">Instinct Slot ${i + 1}</div>
      <select class="feat-select" onchange="selectInstinct(${i}, this.value)">
        <option value="">-- Choose Instinct --</option>
        ${available.map(inst => `<option value="${inst.name}" ${selected === inst.name ? 'selected' : ''}>${inst.name}</option>`).join('')}
      </select>
      ${selectedInst ? `<div class="feature-description" style="margin-top:8px;">${selectedInst.desc}</div>` : ''}
    </div>`;
  }
  
  container.innerHTML = html;
}

// ========================================
// FEATURES AND TRAITS RENDERING (UPDATED)
// ========================================

function renderSpeciesFeatures() {
  const s = character.species;
  const block = SPECIES_DATA[s];
  setHTML('speciesTitle', block ? block.title : '—');
  document.getElementById('speciesDesc').textContent = block ? block.desc : 'Select a species to view its traits.';
  
  // NEW: Render subspecies selection if applicable
  const subspeciesContainer = document.getElementById('subspeciesSelection');
  if (subspeciesContainer) {
    if (SUBSPECIES[character.species]) {
      const options = SUBSPECIES[character.species];
      let subspeciesHTML = `
        <div class="field-group" style="margin-top:10px;">
          <label>Subspecies</label>
          <select onchange="setSubspecies(this.value)" class="feat-select">
            <option value="">-- Choose ${character.species} Subspecies --</option>
            ${options.map(sub => `<option value="${sub}" ${character.subspecies === sub ? 'selected' : ''}>${sub}</option>`).join('')}
          </select>
        </div>
      `;
      
      if (character.subspecies && SUBSPECIES_DATA[character.subspecies]) {
        const subData = SUBSPECIES_DATA[character.subspecies];
        subspeciesHTML += `
          <div style="margin-top:10px; padding:10px; background:#f9f9f9; border-radius:4px;">
            <strong>${character.subspecies} Benefits:</strong>
            <p style="margin-top:5px;">${subData.desc || ''}</p>
          </div>
        `;
      }
      
      subspeciesContainer.innerHTML = subspeciesHTML;
    } else {
      subspeciesContainer.innerHTML = '';
    }
  }
}

function renderFeaturesAndTraits() {
  const callingKey = character.calling;
  const subclassKey = character.subclass;
  const lvl = character.level;
  
  renderSpeciesFeatures();
  
  // NEW: Render Ranger Base Features
  const rangerFeaturesContainer = document.getElementById('rangerBaseFeatures');
  if (rangerFeaturesContainer && RANGER_BASE_FEATURES) {
    let rangerHTML = '';
    
    for (let featLevel in RANGER_BASE_FEATURES) {
      if (parseInt(featLevel) <= lvl) {
        RANGER_BASE_FEATURES[featLevel].forEach(feature => {
          rangerHTML += `<div class="feature-item">
            <div class="feature-title">${feature.name} (${featLevel}${getOrdinal(parseInt(featLevel))} Level)</div>
            <div class="feature-description">${feature.description}</div>`;
          
          // Render skill choices for Ranger Training
          if (feature.skillChoices) {
            rangerHTML += '<div style="margin-top:10px;">';
            for (let i = 0; i < feature.pickCount; i++) {
              rangerHTML += `<select class="feat-select" onchange="setRangerSkill(${i}, this.value)" style="margin-top:5px;">
                <option value="">-- Choose Skill ${i + 1} --</option>
                ${feature.skillChoices.map(skill => 
                  `<option value="${skill}" ${character.rangerSkillChoices && character.rangerSkillChoices[i] === skill ? 'selected' : ''}>${skill}</option>`
                ).join('')}
              </select>`;
            }
            rangerHTML += '</div>';
          }
          
          // Render Weapon Master dropdown
          if (feature.weaponMasterChoice && WEAPONS_DATABASE) {
            const weaponsList = Object.keys(WEAPONS_DATABASE);
            rangerHTML += `<div style="margin-top:10px;">
              <select class="feat-select" onchange="setWeaponMaster(this.value)">
                <option value="">-- Choose Weapon --</option>
                ${weaponsList.map(weapon => 
                  `<option value="${weapon}" ${character.weaponMaster === weapon ? 'selected' : ''}>${weapon}</option>`
                ).join('')}
              </select>
            </div>`;
            
            // Show weapon details if selected
            if (character.weaponMaster && WEAPONS_DATABASE[character.weaponMaster]) {
              const wpn = WEAPONS_DATABASE[character.weaponMaster];
              const hasFinesse = wpn.properties.some(p => p.toLowerCase().includes('finesse'));
              const hasLight = wpn.properties.some(p => p.toLowerCase().includes('light'));
              const usesDex = hasFinesse || hasLight;
              const abilMod = usesDex ? getMod(getScore('dex')) : getMod(getScore('str'));
              const profBonus = LEVEL_DATA[character.level].profBonus;
              const toHit = abilMod + profBonus;
              
              rangerHTML += `<div style="margin-top:10px; padding:10px; background:#fff3cd; border-radius:4px; border-left:4px solid #856404;">
                <strong>${character.weaponMaster}</strong><br>
                Damage: ${wpn.damage} ${wpn.damageType}<br>
                Properties: ${wpn.properties.length > 0 ? wpn.properties.join(', ') : 'None'}<br>
                To Hit: +${toHit} (${usesDex ? 'DEX' : 'STR'} + Prof)<br>
                <br><strong>Mastery: ${wpn.mastery}</strong><br>
                <em>${wpn.masteryDesc}</em>
              </div>`;
            }
          }
          
          // Render Expertise dropdown (Level 9)
          if (feature.expertiseChoice && lvl >= 9) {
            const proficientSkills = SKILLS.filter(s => character.skills[s.name].prof).map(s => s.name);
            rangerHTML += '<div style="margin-top:10px;">';
            for (let i = 0; i < feature.pickCount; i++) {
              rangerHTML += `<select class="feat-select" onchange="setExpertise(${i}, this.value)" style="margin-top:5px;">
                <option value="">-- Choose Expertise ${i + 1} --</option>
                ${proficientSkills.map(skill => 
                  `<option value="${skill}" ${character.expertiseChoices && character.expertiseChoices[i] === skill ? 'selected' : ''}>${skill}</option>`
                ).join('')}
              </select>`;
            }
            rangerHTML += '</div>';
          }
          
          rangerHTML += '</div>';
        });
      }
    }
    
    rangerFeaturesContainer.innerHTML = rangerHTML || '<p style="padding:15px; background:#f9f9f9; border-radius:4px;">No Ranger features yet.</p>';
  }
  
  // Render Calling Features (UPDATED for skill choices)
  const callingContainer = document.getElementById('callingFeatures');
  if (callingKey && DATABASE.callings[callingKey]) {
    const calling = DATABASE.callings[callingKey];
    const unlocked = calling.features.filter(f => f.level <= lvl);
    let callingHTML = '';
    
    unlocked.forEach(feature => {
      callingHTML += `<div class="feature-item">
        <div class="feature-title">${feature.name} (${feature.level}${getOrdinal(feature.level)} Level)</div>
        <div class="feature-description">${feature.description}</div>`;
      
      // Render skill choices (for Marksman, Mystic)
      if (feature.skillChoices) {
        callingHTML += '<div style="margin-top:10px;">';
        for (let i = 0; i < feature.pickCount; i++) {
          callingHTML += `<select class="feat-select" onchange="setCallingSkill(${i}, this.value)" style="margin-top:5px;">
            <option value="">-- Choose Skill ${i + 1} --</option>
            ${feature.skillChoices.map(skill => {
              const isSelected = character.callingSkillChoices && 
                                 character.callingSkillChoices[callingKey] && 
                                 character.callingSkillChoices[callingKey][i] === skill;
              return `<option value="${skill}" ${isSelected ? 'selected' : ''}>${skill}</option>`;
            }).join('')}
          </select>`;
        }
        callingHTML += '</div>';
      }
      
      // Render spell selection UI for spellcasting features
      if (feature.spellcasting || feature.spellChoices) {
        callingHTML += '<div style="margin-top:15px; padding:10px; background:#f0f8ff; border-radius:4px; border-left:3px solid #4a90e2;">';
        callingHTML += '<strong>Spell Selection</strong><br>';
        
        if (feature.spellcasting) {
          // Full spellcasting feature (Mystic, Excavator)
          callingHTML += '<div style="margin-top:8px; font-size:0.9em; color:#555;">';
          callingHTML += 'Choose your spells from the Ranger and Druid spell lists.<br>';
          callingHTML += '<em>More spell selection options coming soon.</em>';
          callingHTML += '</div>';
        }
        
        if (feature.spellChoices) {
          // Specific spell choices (Wayfarer's Pathbound Magic)
          callingHTML += '<div style="margin-top:8px;">';
          callingHTML += `Choose ${feature.spellChoices.count || 1} ${feature.spellChoices.spellList || 'Druid'} spell:<br>`;
          callingHTML += '<select class="feat-select" style="margin-top:5px; width:100%;">';
          callingHTML += '<option value="">-- Choose Spell --</option>';
          // Add spell options (this would need to be populated from SPELLS_DB)
          const spellList = feature.spellChoices.spellList || 'Druid';
          const exampleSpells = ['Animal Friendship', 'Charm Person', 'Cure Wounds', 'Detect Magic', 'Entangle', 'Faerie Fire', 'Goodberry', 'Healing Word', 'Jump', 'Longstrider', 'Speak with Animals', 'Thunderwave'];
          exampleSpells.forEach(spell => {
            callingHTML += `<option value="${spell}">${spell}</option>`;
          });
          callingHTML += '</select>';
          callingHTML += '</div>';
        }
        
        callingHTML += '</div>';
      }
      
      callingHTML += '</div>';
    });
    
    callingContainer.innerHTML = callingHTML || '<p style="padding:15px; background:#f9f9f9; border-radius:4px;">No Calling features unlocked yet.</p>';
  } else {
    callingContainer.innerHTML = '<p style="padding:15px; background:#f9f9f9; border-radius:4px;">Select a Calling to see features.</p>';
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
  
  // Render Fighting Style feats
  renderFSFeats();
  
  // Render Epic Boon (level 19)
  const boonSel = document.getElementById('featPick19');
  if (boonSel) boonSel.value = character.epicBoon || "";
  renderEpicBoonDesc();
  renderBoonASIControls();
}

// ========================================
// ACTIONS RENDERING (UPDATED)
// ========================================

function renderActions() {
  const actions = [];
  const bonus = [];
  const reacts = [];
  
  // Add weapon attacks
  character.weapons.forEach((w) => {
    const has = (w.name || "").trim() !== "" || (w.mod || "").toString().trim() !== "" || (w.dmg || "").trim() !== "";
    if (has) {
      const modStr = (w.mod !== "" && !Number.isNaN(parseInt(w.mod, 10))) ?
        (parseInt(w.mod, 10) >= 0 ? `+${parseInt(w.mod, 10)}` : `${parseInt(w.mod, 10)}`) : '';
      const dmgTxt = (w.dmg || '').trim();
      actions.push(`<div class="action-item"><strong>${w.name || 'Weapon'}</strong> — to hit ${modStr}, dmg ${dmgTxt}</div>`);
    }
  });
  
  // Add basic Ranger actions
  actions.push('<div class="action-item"><strong>Attack:</strong> Make weapon attack(s)</div>');
  if (character.level >= 5) {
    actions.push('<div class="action-item"><strong>Extra Attack:</strong> Attack twice when taking the Attack action</div>');
  }
  
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
  
  // NEW: Add calling feature actions
  if (character.calling && DATABASE.callings[character.calling]) {
    const calling = DATABASE.callings[character.calling];
    calling.features.filter(f => f.level <= character.level).forEach(feature => {
      if (feature.actionType === 'action') {
        actions.push(`<div class="action-item"><strong>${feature.name}:</strong> ${feature.description}</div>`);
      } else if (feature.actionType === 'bonus') {
        bonus.push(`<div class="action-item"><strong>${feature.name}:</strong> ${feature.description}</div>`);
      } else if (feature.actionType === 'reaction') {
        reacts.push(`<div class="action-item"><strong>${feature.name}:</strong> ${feature.description}</div>`);
      }
    });
  }
  
  // NEW: Add subclass feature actions
  if (character.subclass && DATABASE.subclasses[character.subclass] && character.level >= 3) {
    const subclass = DATABASE.subclasses[character.subclass];
    subclass.features.filter(f => f.level <= character.level).forEach(feature => {
      if (feature.actionType === 'action') {
        actions.push(`<div class="action-item"><strong>${feature.name}:</strong> ${feature.description}</div>`);
      } else if (feature.actionType === 'bonus') {
        bonus.push(`<div class="action-item"><strong>${feature.name}:</strong> ${feature.description}</div>`);
      } else if (feature.actionType === 'reaction') {
        reacts.push(`<div class="action-item"><strong>${feature.name}:</strong> ${feature.description}</div>`);
      }
    });
  }
  
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
    const id = `asi_${level}_one`;
    holder.innerHTML = `<div class="feat-note" style="margin-bottom:6px;">Ability Increase: choose one ability for +1.</div>${buildSelect(id, ABILITIES, "+1 pick")}`;
    const [a] = character.featASI[level] || [];
    if (a) document.getElementById(id).value = a;
  } else if (Array.isArray(opt)) {
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
