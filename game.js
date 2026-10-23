/*
 * Backend seam: replace GameRepository's localStorage methods with fetch calls
 * to GET/PUT /api/careers/:id once the real API and database are connected.
 */
const defaultCareer = { energy: 80, hall: 18, overall: 72, power: 76, control: 68, stamina: 74, mental: 71, wins: 6, losses: 3, era: 3.14, strikeouts: 84, war: 1.8 };

const GameRepository = {
  get() { return { ...defaultCareer, ...JSON.parse(localStorage.getItem('benchToHallCareer') || '{}') }; },
  save(career) { localStorage.setItem('benchToHallCareer', JSON.stringify(career)); return career; }
};

let career = GameRepository.get();
let selectedAction = 'training';
const actionEffects = {
  training: { label: '불펜 피칭을 마쳤습니다. 구위가 올랐어요!', energy: -12, power: 2, hall: 1 },
  rest: { label: '회복에 집중했습니다. 다음 등판을 준비하세요.', energy: 20, mental: 1 },
  mentor: { label: '베테랑의 조언이 멘탈을 단단하게 만들었습니다.', energy: -5, mental: 2, hall: 1 }
};

function render() {
  const write = (id, value) => document.getElementById(id).textContent = value;
  write('energy', career.energy); write('overallValue', career.overall); write('power', career.power); write('control', career.control); write('stamina', career.stamina); write('mental', career.mental);
  write('winsLosses', `${career.wins} - ${career.losses}`); write('era', career.era.toFixed(2)); write('strikeouts', career.strikeouts); write('war', career.war.toFixed(1)); write('hallProgressText', `${career.hall} / 100`);
  document.getElementById('hallProgress').style.width = `${career.hall}%`;
  document.querySelectorAll('.attribute').forEach((row) => { const name = row.querySelector('span').textContent.trim().split(' ')[0]; const stat = { 구위: career.power, 제구: career.control, 체력: career.stamina, 멘탈: career.mental }[name]; row.querySelector('i').style.width = `${stat}%`; });
}

function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2800); }

document.querySelectorAll('.action').forEach((button) => button.addEventListener('click', () => { selectedAction = button.dataset.action; document.querySelectorAll('.action').forEach((item) => item.classList.toggle('chosen', item === button)); }));
document.getElementById('confirmAction').addEventListener('click', () => { const effect = actionEffects[selectedAction]; Object.entries(effect).forEach(([key, amount]) => { if (key !== 'label') career[key] = Math.max(0, Math.min(100, (career[key] || 0) + amount)); }); career.overall = Math.round((career.power + career.control + career.stamina + career.mental) / 4); GameRepository.save(career); render(); toast(effect.label); });
document.getElementById('playGame').addEventListener('click', () => { const quality = Math.round((career.power + career.control + career.mental) / 3); const win = quality + Math.random() * 30 > 83; career.wins += win ? 1 : 0; career.losses += win ? 0 : 1; career.strikeouts += 4 + Math.floor(Math.random() * 6); career.war = +(career.war + (win ? .2 : .05)).toFixed(1); career.hall = Math.min(100, career.hall + (win ? 3 : 1)); career.energy = Math.max(0, career.energy - 20); GameRepository.save(career); render(); toast(win ? 'QS! 승리투수가 되었습니다. 명전 여정 +3' : '다음 등판에서 더 강해질 기회가 있어요.'); });
render();
