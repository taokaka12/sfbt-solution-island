/* ============================================================
   Tiny Habits — audio.js
   所有游戏音效用 Web Audio API 实时合成（无需外部文件）。
   设置会持久化到 localStorage。
   ============================================================ */
(function () {
  'use strict';

  let ctx = null;
  let muted = localStorage.getItem('sys_muted') === '1';
  let musicOn = localStorage.getItem('sys_music') === '1';
  let musicTimer = null;
  let musicStep = 0;

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type, vol, when, glideTo) {
    if (muted) return;
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + (when || 0);
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(c.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }

  function noise(dur, vol, when, lp) {
    if (muted) return;
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + (when || 0);
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const g = c.createGain();
    g.gain.setValueAtTime(vol || 0.15, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    let node = src;
    if (lp) {
      const f = c.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = lp;
      src.connect(f); node = f;
    }
    node.connect(g); g.connect(c.destination);
    src.start(t0);
  }

  const S = {
    click: function () { tone(600, 0.08, 'square', 0.08); },
    correct: function () {
      tone(523, 0.12, 'triangle', 0.22);
      tone(659, 0.12, 'triangle', 0.22, 0.1);
      tone(784, 0.22, 'triangle', 0.25, 0.2);
    },
    wrong: function () {
      tone(220, 0.25, 'sawtooth', 0.16, 0, 150);
      noise(0.2, 0.1, 0);
    },
    coin: function () {
      tone(880, 0.09, 'square', 0.14);
      tone(1318, 0.2, 'square', 0.14, 0.08);
    },
    levelUp: function () {
      [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, 0.16, 'square', 0.18, i * 0.09));
    },
    achievement: function () {
      [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.2, 'triangle', 0.2, i * 0.11));
    },
    streak: function () {
      [659, 880, 1109].forEach((f, i) => tone(f, 0.14, 'triangle', 0.2, i * 0.08));
    },
    complete: function () {
      [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.18, 'triangle', 0.2, i * 0.12));
    },
    error: function () { tone(150, 0.3, 'sawtooth', 0.12, 0, 90); },
    whoosh: function () { noise(0.25, 0.12, 0, 1200); },
    heart: function () { tone(740, 0.15, 'sine', 0.2); tone(988, 0.25, 'sine', 0.2, 0.1); },
    correctWarm: function () {
      tone(392, 0.1, 'triangle', 0.2);
      tone(523, 0.12, 'triangle', 0.2, 0.08);
      tone(659, 0.3, 'triangle', 0.22, 0.16);
    },
    fanfare: function () { // 结算 / 满星庆祝
      [392, 523, 659, 784, 1046, 784, 1046, 1318].forEach((f, i) => tone(f, 0.22, 'triangle', 0.2, i * 0.1));
    },
    combo: function (n) { // 连击音效，越高越亮
      const base = Math.min(4, n);
      [523 * Math.pow(1.12, base), 784 * Math.pow(1.12, base)].forEach((f, i) => tone(f, 0.12, 'triangle', 0.18, i * 0.07));
    },
    pop: function () { tone(880, 0.07, 'square', 0.1); tone(1320, 0.1, 'square', 0.1, 0.05); },
    swoosh: function () { noise(0.3, 0.08, 0, 600); },
    water: function () { // 花园浇水：两声水滴
      tone(880, 0.08, 'sine', 0.16, 0, 620);
      tone(1240, 0.14, 'sine', 0.16, 0.1, 880);
    },
    sprout: function () { // 植物升级：上升滑音
      [330, 440, 554, 660, 880].forEach((f, i) => tone(f, 0.18, 'triangle', 0.18, i * 0.08));
    },
  };

  /* Tiny procedural lo-fi music loop: simple pentatonic arpeggio */
  function startMusic() {
    if (musicOn || !ensureCtx()) return;
    musicOn = true;
    localStorage.setItem('sys_music', '1');
    musicStep = 0;
    const scale = [220, 261.6, 293.7, 329.6, 392, 440, 523.3];
    function step() {
      if (!musicOn || muted) return;
      const idx = [0, 2, 4, 6, 4, 2, 5, 4][musicStep % 8];
      const f = scale[idx];
      tone(f, 0.35, 'triangle', 0.05);
      tone(f / 2, 0.4, 'sine', 0.05);
      musicStep++;
    }
    step();
    musicTimer = setInterval(step, 380);
  }
  function stopMusic() {
    musicOn = false;
    localStorage.setItem('sys_music', '0');
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
  }

  const API = {
    play: function (name, arg) { if (S[name]) S[name](arg); },
    setMuted: function (m) { muted = m; localStorage.setItem('sys_muted', m ? '1' : '0'); if (m) stopMusic(); },
    isMuted: function () { return muted; },
    toggleMusic: function () { if (musicOn) stopMusic(); else startMusic(); return musicOn; },
    musicOn: function () { return musicOn; },
    unlock: function () { ensureCtx(); }, // resume on first user gesture
  };

  window.SFX = API;

  // 若上次开启音乐，首次交互后自动恢复
  document.addEventListener('pointerdown', function once() {
    API.unlock();
    if (localStorage.getItem('sys_music') === '1') startMusic();
    document.removeEventListener('pointerdown', once);
  });
})();

