/* ============================================================
   Tiny Habits — practice.js
   实践引擎：配方卡向导 + 庆祝时刻全屏动画。
   在 BOPPPS 的「参与式学习」与「后测」之间执行。
   ============================================================ */
(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function el(id) { return document.getElementById(id); }

  /* ---- 庆祝方式选项 ---- */
  function celebrationOptions() {
    return Curriculum.CELEBRATIONS.map(c =>
      '<option value="' + c.id + '">' + c.emoji + ' ' + c.name + '</option>'
    ).join('');
  }
  function celebrationName(id) {
    const c = Curriculum.CELEBRATIONS.find(x => x.id === id);
    return c ? c.emoji + ' ' + c.name : '';
  }

  /* ---- 庆祝时刻：全屏 fist pump ---- */
  function celebrateMoment(opts) {
    opts = opts || {};
    const overlay = document.createElement('div');
    overlay.className = 'celebrate-moment';
    overlay.innerHTML =
      '<div class="inner">' +
      '<span class="fist">' + (opts.emoji || '✊') + '</span>' +
      '<h2>' + (opts.title || '感觉成功！') + '</h2>' +
      '<p class="sub">' + (opts.sub || '这不是形式主义——研究表明，积极的情绪反馈正是让习惯真正"长牢"的关键。你刚才的做法，和科学同步。') + '</p>' +
      '<button class="btn btn-green btn-lg" id="cel-go">' + (opts.cta || '继续') + '</button>' +
      '</div>';
    document.body.appendChild(overlay);
    SFX.play('fanfare');
    UI.confetti(50);
    el('cel-go').addEventListener('click', () => {
      overlay.remove();
      if (opts.onDone) opts.onDone();
    });
  }

  /* ---- 配方卡向导 ---- */
  function renderRecipe({ key, unitId, idx, sc, onDone }) {
    const app = document.getElementById('app');
    const p = sc.practice || {};
    app.innerHTML = '<div class="quiz-shell">' +
      '<div class="quiz-top"><button class="back" id="rp-back">✕</button>' +
      '<div class="progress-track"><div class="progress-fill" style="width:100%"></div></div>' +
      '<div class="lives">🧪</div></div>' +
      '<div class="lesson-card">' +
      '<div class="title">🧪 实践 · 配方实验室</div>' +
      '<p class="muted" style="font-size:13px">' + esc(sc.section || '') + ' · 亲手种下一颗习惯种子</p>' +
      '<div class="def">' + (p.prompt || '把你的愿望写成一个微习惯配方。') + '</div>' +
      '<div class="field"><label>① 锚点（Anchor）——我已有的固定动作</label>' +
      '<input class="type-input" id="rp-anchor" placeholder="' + esc(p.anchorHint || '在我刷完牙之后') + '" autocomplete="off"></div>' +
      '<div class="field"><label>② 微行为（Tiny Behavior）——30 秒内能完成的动作</label>' +
      '<input class="type-input" id="rp-behavior" placeholder="' + esc(p.behaviorHint || '我会做两个俯卧撑') + '" autocomplete="off"></div>' +
      '<div class="field"><label>③ 庆祝方式（Celebration）——完成后立刻做</label>' +
      '<select class="type-input" id="rp-celebrate">' + celebrationOptions() + '</select></div>' +
      '<div class="recipe-card"><div class="recipe-line"><span class="k">AFTER I</span><span class="v" id="rp-pv-anchor">刷完牙之后</span></div>' +
      '<div class="recipe-line"><span class="k">I WILL</span><span class="v" id="rp-pv-behavior">做两个俯卧撑</span></div>' +
      '<div class="recipe-line"><span class="k">THEN</span><span class="v" id="rp-pv-celebrate">✊ 握拳轻挥</span></div></div>' +
      '<div style="display:flex;gap:10px;margin-top:16px">' +
      '<button class="btn btn-green btn-lg" id="rp-save" style="flex:1">🌱 种进习惯花园</button>' +
      '<button class="btn btn-blue btn-lg" id="rp-skip">跳过实践</button></div>' +
      '</div></div>';

    const refreshPreview = () => {
      const a = el('rp-anchor').value.trim();
      const b = el('rp-behavior').value.trim();
      const c = el('rp-celebrate').value;
      if (a) el('rp-pv-anchor').textContent = a;
      if (b) el('rp-pv-behavior').textContent = b;
      el('rp-pv-celebrate').textContent = celebrationName(c);
    };
    el('rp-anchor').addEventListener('input', refreshPreview);
    el('rp-behavior').addEventListener('input', refreshPreview);
    el('rp-celebrate').addEventListener('change', refreshPreview);
    el('rp-back').addEventListener('click', () => { SFX.play('click'); window.APP.go('home'); });

    el('rp-save').addEventListener('click', () => {
      const anchor = el('rp-anchor').value.trim();
      const behavior = el('rp-behavior').value.trim();
      const celebration = celebrationName(el('rp-celebrate').value);
      if (!anchor || !behavior) { SFX.play('error'); UI.toast('请先填好锚点和微行为。'); return; }
      const habit = Garden.addHabit({ anchor, behavior, celebration, sourceKey: key });
      Auth.saveUser(Auth.currentUser());
      SFX.play('coin');
      UI.toast('🌱 已种进习惯花园：' + behavior);
      celebrateMoment({
        emoji: '🌱',
        title: '种子已种下！',
        sub: '「' + behavior + '」已经写进你的配方卡，并种进了习惯花园。明天完成它，就是第一次浇水。',
        onDone,
      });
    });

    el('rp-skip').addEventListener('click', () => {
      SFX.play('click');
      onDone();
    });
  }

  /* ---- B=MAP 互动（由 bmap.js 提供） ---- */
  function renderBmap({ key, unitId, idx, sc, onDone }) {
    const app = document.getElementById('app');
    app.innerHTML = '<div class="quiz-shell">' +
      '<div class="quiz-top"><button class="back" id="bm-back">✕</button>' +
      '<div class="progress-track"><div class="progress-fill" style="width:100%"></div></div>' +
      '<div class="lives">🧪</div></div>' +
      '<div class="lesson-card">' +
      '<div class="title">🧪 实践 · 行为实验室</div>' +
      '<p class="muted" style="font-size:13px">' + esc(sc.section || '') + ' · 拖动行为点，观察 B=MAP</p>' +
      '<div class="def">' + (sc.practice.prompt || '拖动点，让它越过行动线。') + '</div>' +
      '<div id="bmap-mount"></div>' +
      '<div class="bmap-readout" id="bmap-readout"></div>' +
      '<button class="btn btn-green btn-lg btn-block" id="bm-done" style="margin-top:16px">完成实验，进入测验</button>' +
      '</div></div>';
    el('bm-back').addEventListener('click', () => { SFX.play('click'); window.APP.go('home'); });
    if (window.BehaviorMap) {
      window.BehaviorMap.render('bmap-mount', 'bmap-readout');
    } else {
      const m = document.getElementById('bmap-mount');
      m.innerHTML = '<p class="muted">B=MAP 交互组件加载中…</p>';
    }
    el('bm-done').addEventListener('click', () => { SFX.play('click'); onDone(); });
  }

  /* ---- Maui 练习 ---- */
  function renderMaui({ key, unitId, idx, sc, onDone }) {
    const app = document.getElementById('app');
    const p = sc.practice || {};
    app.innerHTML = '<div class="quiz-shell">' +
      '<div class="quiz-top"><button class="back" id="maui-back">✕</button>' +
      '<div class="progress-track"><div class="progress-fill" style="width:100%"></div></div>' +
      '<div class="lives">🌅</div></div>' +
      '<div class="lesson-card">' +
      '<div class="title">🌅 实践 · Maui 习惯</div>' +
      '<div class="def">' + (p.prompt || '现在，想象你刚睡醒。把脚放到地板上，然后说出那句话。') + '</div>' +
      '<div class="recipe-card">' +
      '<div class="recipe-line"><span class="k">AFTER I</span><span class="v">把脚放到地板上</span></div>' +
      '<div class="recipe-line"><span class="k">I WILL</span><span class="v">说：今天会是美好的一天</span></div></div>' +
      '<button class="btn btn-green btn-lg btn-block" id="maui-do" style="margin-top:16px">🌅 我现在就说！</button>' +
      '<button class="btn btn-outline btn-block btn-sm" id="maui-skip" style="margin-top:8px">跳过</button>' +
      '</div></div>';
    el('maui-back').addEventListener('click', () => { SFX.play('click'); window.APP.go('home'); });
    el('maui-do').addEventListener('click', () => {
      const r = Garden.mauiDone();
      if (!r.ok) { SFX.play('error'); UI.toast(r.msg); return; }
      celebrateMoment({
        emoji: '🌅',
        title: '美好的一天！',
        sub: '你已经完成了 Maui 习惯。连续 ' + r.streak + ' 天。' + (r.streak >= 2 ? ' 连续打卡，你在为自己创造可复制的仪式。' : ' 明天同一时刻，再来一次。'),
        cta: '进入测验',
        onDone,
      });
    });
    el('maui-skip').addEventListener('click', () => { SFX.play('click'); onDone(); });
  }

  /* ---- 通用庆祝实践 ---- */
  function renderCelebration({ key, unitId, idx, sc, onDone }) {
    const app = document.getElementById('app');
    const p = sc.practice || {};
    app.innerHTML = '<div class="quiz-shell">' +
      '<div class="quiz-top"><button class="back" id="cb-back">✕</button>' +
      '<div class="progress-track"><div class="progress-fill" style="width:100%"></div></div>' +
      '<div class="lives">✨</div></div>' +
      '<div class="lesson-card">' +
      '<div class="title">✨ 实践 · 庆祝时刻</div>' +
      '<p class="muted" style="font-size:13px">' + esc(sc.section || '') + ' · 你要学的最重要技能：感觉成功</p>' +
      '<div class="def">' + (p.prompt || '选一个庆祝方式，认真做一次。') + '</div>' +
      '<div class="field"><label>选择你的庆祝方式</label>' +
      '<select class="type-input" id="cb-celebrate">' + celebrationOptions() + '</select></div>' +
      '<p class="muted" style="font-size:13px">' + (p.celebrationHint || '做的时候，注意体会那种「感觉良好」的瞬间。') + '</p>' +
      '<button class="btn btn-green btn-lg btn-block" id="cb-go" style="margin-top:12px">开始庆祝！</button>' +
      '<button class="btn btn-outline btn-block btn-sm" id="cb-skip" style="margin-top:8px">跳过</button>' +
      '</div></div>';
    el('cb-back').addEventListener('click', () => { SFX.play('click'); window.APP.go('home'); });
    el('cb-go').addEventListener('click', () => {
      const c = Curriculum.CELEBRATIONS.find(x => x.id === el('cb-celebrate').value);
      celebrateMoment({
        emoji: c ? c.emoji : '✨',
        title: '你正在练习成功！',
        sub: c ? c.desc : '',
        cta: '进入测验',
        onDone,
      });
    });
    el('cb-skip').addEventListener('click', () => { SFX.play('click'); onDone(); });
  }

  /* ---- 渲染入口 ---- */
  function render(opts) {
    const sc = opts.sc || {};
    const type = (sc.practice && sc.practice.type) || 'celebration';
    const handlers = {
      recipe: renderRecipe,
      celebration: renderCelebration,
      bmap: renderBmap,
      maui: renderMaui,
    };
    const fn = handlers[type] || renderCelebration;
    fn(opts);
  }

  window.Practice = { render, celebrateMoment, celebrationName };
})();

