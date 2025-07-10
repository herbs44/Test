// ui.js

function showLoadingScreen() {
  const main = document.getElementById('game-main');
  main.innerHTML = `<div class="loading-screen">
    <div class="loader"></div>
    <p>Loading... <span class="glitch">Y2K</span></p>
  </div>`;
}

// Easter Egg: Kanye-Lyrics anzeigen
function showEasterEgg() {
  const main = document.getElementById('game-main');
  main.innerHTML += `<div class="easter-egg">"Reach for the stars so if you fall you land on a cloud."</div>`;
}

// Glitch Effekt auf Überschriften
function addGlitchEffect(selector) {
  document.querySelectorAll(selector).forEach(el => el.classList.add('glitch'));
}

// Beispiel: Loading-Screen beim Start
// document.addEventListener('DOMContentLoaded', showLoadingScreen);