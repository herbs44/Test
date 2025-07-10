// audio.js

let audioCtx;
let musicSource;
let gainNode;
let currentTrack = null;
let isMuted = false;

const tracks = {
  1: 'assets/audio/college_dropout_loop.mp3',
  2: 'assets/audio/late_registration_loop.mp3',
  3: 'assets/audio/graduation_loop.mp3'
};

function playMusic(actId) {
  if (isMuted) return;
  if (currentTrack === actId) return;
  stopMusic();
  const url = tracks[actId];
  fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioCtx.createGain();
      audioCtx.decodeAudioData(buffer, decoded => {
        musicSource = audioCtx.createBufferSource();
        musicSource.buffer = decoded;
        musicSource.loop = true;
        musicSource.connect(gainNode).connect(audioCtx.destination);
        gainNode.gain.value = document.getElementById('volume-slider').value;
        musicSource.start(0);
        currentTrack = actId;
      });
    });
}

function stopMusic() {
  if (musicSource) {
    musicSource.stop();
    musicSource.disconnect();
    musicSource = null;
    currentTrack = null;
  }
}

document.getElementById('mute-btn').onclick = () => {
  isMuted = !isMuted;
  if (isMuted) {
    stopMusic();
    document.getElementById('mute-btn').textContent = '🔇';
  } else {
    playMusic(currentAct);
    document.getElementById('mute-btn').textContent = '🔊';
  }
};

document.getElementById('volume-slider').oninput = (e) => {
  if (gainNode) gainNode.gain.value = e.target.value;
};

// Hook in game.js: playMusic(currentAct) aufrufen, wenn Act wechselt
window.playMusic = playMusic;
window.stopMusic = stopMusic;