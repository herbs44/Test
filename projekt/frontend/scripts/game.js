// game.js

const acts = [
  {
    id: 1,
    name: 'College Dropout',
    theme: 'Rebellion gegen das Bildungssystem, Selbstfindung',
    color: '#ffb347',
    palette: ['#a05a2c', '#ffb347', '#ffe6b3'],
    intro: 'Willkommen zu Act 1: College Dropout! Triff Entscheidungen, die Kanyes Weg bestimmen.'
  },
  {
    id: 2,
    name: 'Late Registration',
    theme: 'Künstlerische Reife, Orchestrale Komplexität',
    color: '#b71c1c',
    palette: ['#b71c1c', '#ffd700', '#7c0a02'],
    intro: 'Act 2: Late Registration! Produziere Musik und meistere kreative Herausforderungen.'
  },
  {
    id: 3,
    name: 'Graduation',
    theme: 'Erfolg, Zukunft, Technologie',
    color: '#00e6ff',
    palette: ['#00e6ff', '#ff00c8', '#c0c0c0'],
    intro: 'Act 3: Graduation! Erlebe Kanyes Triumph und performe auf der großen Bühne.'
  }
];

let currentAct = 1;

function showAct(actId) {
  const act = acts.find(a => a.id === actId);
  const main = document.getElementById('game-main');
  main.innerHTML = `
    <div class="act-intro" style="color:${act.color}">
      <h2>${act.name}</h2>
      <p>${act.intro}</p>
      <button id="start-act-btn">Start</button>
    </div>
  `;
  document.getElementById('start-act-btn').onclick = () => startAct(actId);
}

function startAct(actId) {
  // Placeholder für Story- und Mini-Game-Logik
  const main = document.getElementById('game-main');
  main.innerHTML = `<div class="glitch"><h3>Act ${actId} Gameplay kommt bald!</h3></div>`;
}

async function fetchUser(userId) {
  const res = await fetch('URL_ZUM_GAS_API?path=getUser&userId=' + encodeURIComponent(userId));
  return res.json();
}

async function saveUserProgress(userId, progress) {
  const res = await fetch('URL_ZUM_GAS_API?path=saveProgress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, progress })
  });
  return res.json();
}

// Beispiel-Aufruf:
// fetchUser('testuser').then(data => console.log(data));
// saveUserProgress('testuser', { act: 1, choice: 'music' }).then(data => console.log(data));

document.getElementById('act1-btn').onclick = () => showAct(1);
document.getElementById('act2-btn').onclick = () => showAct(2);
document.getElementById('act3-btn').onclick = () => showAct(3);

// Initial Act anzeigen
document.addEventListener('DOMContentLoaded', () => showAct(currentAct));