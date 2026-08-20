/* ============================================================
   Tiny Habits — garden.js
   习惯花园：配方卡生成的习惯 → 每日浇水 → 成长阶段。
   ============================================================ */
(function () {
  'use strict';

  function stageFor(waterCount) {
    const stages = Curriculum.PLANT_STAGES;
    let s = stages[0];
    for (let i = 0; i < stages.length; i++) {
      if (waterCount >= stages[i].min) s = stages[i];
    }
    return s;
  }

  function addHabit(opts) {
    const u = Auth.currentUser();
    if (!u) return null;
    u.habits = u.habits || [];
    u.garden = u.garden || { watered: {} };
    const habit = {
      id: 'h' + Date.now() + Math.random().toString(36).slice(2, 6),
      anchor: opts.anchor || '',
      behavior: opts.behavior || '',
      celebration: opts.celebration || '',
      plant: 'seed',
      created: Date.now(),
      sourceKey: opts.sourceKey || null,
      waterLog: [],
    };
    u.habits.push(habit);
    Auth.saveUser(u);
    return habit;
  }

  function water(habitId) {
    const u = Auth.currentUser();
    if (!u) return { ok: false, msg: '请先登录。' };
    u.habits = u.habits || [];
    u.garden = u.garden || { watered: {} };
    const habit = u.habits.find(h => h.id === habitId);
    if (!habit) return { ok: false, msg: '没有找到这个习惯。' };
    const today = UI.todayStr();
    const wateredList = u.garden.watered[today] || [];
    if (wateredList.indexOf(habitId) >= 0) return { ok: false, msg: '今天已经浇过水啦，明天再来。' };

    wateredList.push(habitId);
    u.garden.watered[today] = wateredList;
    habit.waterLog.push(today);

    const before = stageFor(habit.waterLog.length - 1).stage;
    const after = stageFor(habit.waterLog.length).stage;
    const leveled = after > before;

    UI.addXp(u, 5);
    if (leveled) { SFX.play('sprout'); UI.toast('🌿 「' + habit.behavior + '」长大了！现在是「' + stageFor(after).name + '」'); }
    else { SFX.play('water'); UI.toast('💧 浇水成功 +5 XP'); }

    const newly = UI.claimAchievements(u);
    newly.forEach(a => setTimeout(() => { SFX.play('achievement'); UI.toast('🏅 ' + a.name); }, 400));
    Auth.saveUser(u);
    return { ok: true, leveled, stage: after };
  }

  function mauiDone() {
    const u = Auth.currentUser();
    if (!u) return { ok: false, msg: '请先登录。' };
    const today = UI.todayStr();
    if (u.maui && u.maui.done === today) return { ok: false, msg: '今天的 Maui 已经打过卡啦。' };
    const yesterday = UI.daysAgoStr(1);
    let streak = 1;
    if (u.maui && u.maui.done === yesterday) streak = (u.maui.streak || 0) + 1;
    u.maui = { done: today, streak: streak };
    u.bestMauiStreak = Math.max(u.bestMauiStreak || 0, streak);
    UI.addXp(u, 10);
    SFX.play('sprout');
    const newly = UI.claimAchievements(u);
    newly.forEach(a => setTimeout(() => { SFX.play('achievement'); UI.toast('🏅 ' + a.name); }, 400));
    Auth.saveUser(u);
    return { ok: true, streak };
  }

  function mauiState() {
    const u = Auth.currentUser();
    const today = UI.todayStr();
    return {
      doneToday: !!(u.maui && u.maui.done === today),
      streak: (u.maui && u.maui.streak) || 0,
    };
  }

  function renderGarden() {
    const u = Auth.currentUser();
    const shell = document.getElementById('shell');
    const habits = u.habits || [];
    const today = UI.todayStr();
    const wateredToday = (u.garden && u.garden.watered && u.garden.watered[today]) || [];

    let gridHtml;
    if (!habits.length) {
      gridHtml = '<div class="empty-state"><div class="big">🌱</div><p>你的习惯花园还空着。<br>去「配方实验室」或学习课程的「实践」环节，种下你的第一颗习惯种子吧。</p>' +
        '<button class="btn btn-green" style="margin-top:14px" data-go="lab">去配方实验室</button></div>';
    } else {
      gridHtml = '<div class="garden-grid">' + habits.map(h => {
        const stage = stageFor(h.waterLog.length);
        const plantSvg = Art.plant(stage.stage);
        const watered = wateredToday.indexOf(h.id) >= 0;
        const waterBtn = watered
          ? '<span class="watered-tag">✓ 今日已浇水</span>'
          : '<button class="btn btn-green btn-sm water-btn" data-water="' + h.id + '">💧 浇水（+5 XP）</button>';
        const celebration = h.celebration ? ' · 庆祝：' + h.celebration : '';
        return '<div class="plant-card">' +
          '<div class="plant-svg">' + plantSvg + '</div>' +
          '<div class="plant-name">' + Views.esc(h.behavior) + '</div>' +
          '<div class="plant-behavior">' + Views.esc(h.anchor) + ' 之后' + celebration + '</div>' +
          '<div class="plant-stage">🌿 ' + stage.name + ' · 浇水 ' + h.waterLog.length + ' 次</div>' +
          '<div class="plant-xp">+5 XP / 天</div>' +
          waterBtn +
          '</div>';
      }).join('') + '</div>';
    }

    shell.innerHTML = '<div class="view">' +
      '<div style="display:flex;align-items:center;gap:14px;margin-bottom:6px">' +
      '<h2>🌻 习惯花园</h2>' +
      '<button class="btn btn-outline btn-sm" data-go="lab" style="margin-left:auto">+ 配方实验室</button></div>' +
      '<p class="muted" style="margin-bottom:16px">每一个习惯都是一颗种子。每天完成它 = 浇一次水。坚持浇灌，它会发芽、开花、结果。</p>' +
      '<div class="banner-msg win">📋 你的配方卡：' +
      '<span class="mono">After I <b>' + Views.esc((u.habits && u.habits[0] && u.habits[0].anchor) || '________') + '</b>, I will <b>' + Views.esc((u.habits && u.habits[0] && u.habits[0].behavior) || '________') + '</b></span></div>' +
      gridHtml +
      '</div>';

    shell.querySelectorAll('[data-water]').forEach(b => b.addEventListener('click', () => {
      const r = water(b.getAttribute('data-water'));
      if (!r.ok) { SFX.play('error'); U_toast(r.msg); }
      renderGarden();
    }));
    shell.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { SFX.play('click'); window.APP.go(b.getAttribute('data-go')); }));
  }

  function U_toast(msg) { UI.toast(msg); }

  window.Garden = { addHabit, water, mauiDone, mauiState, stageFor, renderGarden };
})();

