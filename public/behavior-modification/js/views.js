/* ============================================================
   BehaviorMod Pro — views.js
   All top-level views rendered into #app.
   ============================================================ */
(function () {
  'use strict';
  const U = UI;

  function h(html) { return html; }
  function el(id) { return document.getElementById(id); }

  function topbar(active) {
    const u = Auth.currentUser();
    const nav = [
      { id: 'home', label: 'Learn', icon: U.icons().book },
      { id: 'stats', label: 'Stats', icon: U.icons().trophy },
      { id: 'community', label: 'Community', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-8 8a2 2 0 11-2 2 2 2 0 012-2zm-4.5 0A1.5 1.5 0 116 11.5 1.5 1.5 0 017.5 10zm9 0A1.5 1.5 0 1115 11.5 1.5 1.5 0 0116.5 10z"/></svg>' },
    ];
    return '<header class="topbar">' +
      '<div class="brand" data-nav="home"><div class="owl">🦉</div><span>BehaviorMod Pro</span></div>' +
      '<nav>' + nav.map(n =>
        '<button class="nav-item ' + (active === n.id ? 'active' : '') + '" data-nav="' + n.id + '">' + n.icon + n.label + '</button>'
      ).join('') + '</nav>' +
      '<div class="right">' +
      '<div class="tb-stat" data-nav="stats"><span class="flame">' + U.icons().flame + '</span>' + (u.streak || 0) + '</div>' +
      '<div class="tb-stat" data-nav="shop"><span class="gem">' + U.icons().gem + '</span>' + (u.gems || 0) + '</div>' +
      '<button class="avatar-btn" data-nav="profile" title="' + u.username + '">' + (u.equipped && u.equipped.avatar ? u.equipped.avatar : '🦉') + '</button>' +
      '</div></header>';
  }

  function wireTopbar() {
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        SFX.play('click');
        go(btn.getAttribute('data-nav'));
      });
    });
  }

  function go(view) {
    const u = Auth.currentUser();
    if (!u) return renderAuth();
    if (view === 'lesson') return;
    // Refresh topbar counters (streak/gems/avatar) on every navigation
    const tbEl = document.querySelector('.topbar');
    if (tbEl) {
      const streakTxt = tbEl.querySelector('.tb-stat:nth-child(1)');
      if (streakTxt) streakTxt.innerHTML = '<span class="flame">' + U.icons().flame + '</span>' + (u.streak || 0);
      const gemTxt = tbEl.querySelector('.tb-stat:nth-child(2)');
      if (gemTxt) gemTxt.innerHTML = '<span class="gem">' + U.icons().gem + '</span>' + (u.gems || 0);
      const av = tbEl.querySelector('.avatar-btn');
      if (av) av.textContent = (u.equipped && u.equipped.avatar ? u.equipped.avatar : '🦉');
      const nav = tbEl.querySelectorAll('.nav-item');
      nav.forEach(n => n.classList.toggle('active', n.getAttribute('data-nav') === view));
    }
    // Ensure the shell + topbar exist (games/lesson replace #app directly)
    if (!document.getElementById('shell')) {
      const app = document.getElementById('app');
      app.innerHTML = topbar(view) + '<div class="shell" id="shell"><div class="view"></div></div>';
      wireTopbar();
    }
    const renderers = {
      home: renderHome,
      stats: renderStats,
      leaderboard: renderLeaderboard,
      shop: renderShop,
      achievements: renderAchievements,
      community: renderCommunity,
      notes: renderNotes,
      certificate: renderCertificate,
      profile: renderProfile,
      games: renderGames,
      plan: renderPlan,
      report: renderReport,
      daily: renderDaily,
    };
    window.APP.currentView = view;
    const r = renderers[view] || renderHome;
    r();
  }

  /* ---------------- AUTH ---------------- */
  function renderAuth(mode) {
    mode = mode || 'login';
    const app = el('app');
    const err = '<div class="auth-err" id="auth-err"></div>';
    const fields = mode === 'register'
      ? '<div class="field"><label>Username</label><input id="a-u" placeholder="Pick a username" autocomplete="off"></div>' +
        '<div class="field"><label>Password</label><input id="a-p" type="password" placeholder="At least 4 characters"></div>' +
        '<div class="field"><label>Confirm password</label><input id="a-p2" type="password" placeholder="Repeat password"></div>'
      : '<div class="field"><label>Username</label><input id="a-u" placeholder="Your username" autocomplete="off"></div>' +
        '<div class="field"><label>Password</label><input id="a-p" type="password" placeholder="Your password"></div>';
    const submitLbl = mode === 'register' ? 'Create account' : 'Log in';
    const alt = mode === 'register'
      ? '<div class="auth-alt">Already have an account? <button id="auth-switch">Log in</button></div>'
      : '<div class="auth-alt">New here? <button id="auth-switch">Create a free account</button></div>';
    app.innerHTML = '<div class="auth-wrap"><div class="auth-card">' +
      '<div class="owl-big">🦉</div>' +
      '<h1>BehaviorMod Pro</h1>' +
      '<p class="tag">Master ' + Curriculum.UNITS.length + ' chapters of behavior modification — the Duolingo way.</p>' +
      err + fields +
      '<button class="btn btn-green btn-block btn-lg" id="auth-submit" style="margin-top:8px">' + submitLbl + '</button>' +
      alt +
      '</div></div>';
    const showErr = (m) => {
      const e = el('auth-err');
      e.textContent = m;
      e.classList.add('show');
    };
    el('auth-switch').addEventListener('click', () => {
      SFX.play('click');
      renderAuth(mode === 'register' ? 'login' : 'register');
    });
    el('auth-submit').addEventListener('click', () => {
      SFX.play('click');
      const name = el('a-u').value;
      const pass = el('a-p').value;
      let res;
      if (mode === 'register') {
        const pass2 = el('a-p2').value;
        if (pass !== pass2) return showErr('Passwords do not match.');
        res = Auth.register(name, pass);
      } else {
        res = Auth.login(name, pass);
      }
      if (!res.ok) { SFX.play('error'); return showErr(res.err); }
      SFX.play('levelUp');
      onLogin();
    });
    el('a-p').addEventListener('keydown', e => { if (e.key === 'Enter') el('auth-submit').click(); });
    el('a-u').focus();
  }

  function onLogin() {
    const u = Auth.currentUser();
    dailyCheckin(u);
    renderShell();
  }

  function dailyCheckin(u) {
    const today = U.todayStr();
    if (u.checkins.indexOf(today) >= 0) return;
    u.checkins.push(today);
    u.lastActiveDay = today;
    const yesterday = U.daysAgoStr(1);
    u.streak = (u.checkins.indexOf(yesterday) >= 0) ? (u.streak + 1) : 1;
    u.bestStreak = Math.max(u.bestStreak || 0, u.streak);
    u.studySeconds += 1;
    const newly = U.claimAchievements(u);
    const gems = U.awardDailyTaskGems(u);
    Auth.saveUser(u);
    if (gems > 0) U.toast('Daily rewards claimed: +' + gems + ' gems');
    setTimeout(() => {
      newly.forEach(a => {
        SFX.play('achievement');
        U.toast('🏅 Achievement earned: ' + a.name);
      });
    }, 600);
  }

  function renderShell() {
    const u = Auth.currentUser();
    const app = el('app');
    app.innerHTML = topbar('home') + '<div class="shell" id="shell"><div class="view">Loading…</div></div>';
    wireTopbar();
    go('home');
  }

  /* ---------------- HOME / PATH ---------------- */
  function renderHome() {
    const u = Auth.currentUser();
    const full = U.fullChapters(u);
    const xpBar = xpBarHtml(u);
    let unitsHtml = '';
    Curriculum.UNITS.forEach(unit => {
      const part = Curriculum.PARTS[unit.part];
      let sectHtml = '';
      let unlocked = true;
      const firstIncomplete = firstIncompleteSection(unit);
      unit.sections.forEach((s, i) => {
        const key = Curriculum.getSectionKey(unit.id, i);
        const rec = u.completedSections[key];
        const done = !!(rec && rec.done);
        const isCurrent = firstIncomplete === i;
        let nodeClass = 'node';
        let btn = '';
        if (done) {
          nodeClass += ' done';
          btn = '<button class="node-btn ghost" data-sect="' + key + '" data-unit="' + unit.id + '" data-idx="' + i + '">Review</button>';
        } else if (unlocked) {
          nodeClass += isCurrent ? ' cur' : ' cur';
          btn = '<button class="node-btn" data-sect="' + key + '" data-unit="' + unit.id + '" data-idx="' + i + '">' + (isCurrent ? 'Start' : 'Start') + '</button>';
        } else {
          nodeClass += ' lock';
          btn = '<span class="muted" style="font-size:12px">🔒</span>';
        }
        if (done) unlocked = true; // progress continues
        else unlocked = false;
        sectHtml += '<div class="' + nodeClass + '">' +
          '<span class="ring"></span>' +
          '<span class="node-icon">' + Art.sectionIcon(unit.id, s) + '</span>' +
          '<div class="node-main">' +
          '<div class="node-title">' + s + '</div>' +
          '<div class="node-desc">' + (done ? 'Completed · ' + (rec.best || 0) + ' XP' : 'Learn & answer questions') + '</div>' +
          '</div>' +
          (done ? '<span class="node-score">' + (rec.best || 0) + ' XP</span>' : '') +
          btn + '</div>';
      });
      const unitDone = full.indexOf(unit.id) >= 0;
      unitsHtml += '<div class="unit" style="border-top:6px solid ' + part.color + '">' +
        '<div class="unit-banner">' + Art.unitArt(unit.id) + '</div>' +
        '<div class="unit-title"><div style="font-size:26px">' + unit.icon + '</div>' +
        '<div class="grow"><h3>Unit ' + unit.id + ' — ' + unit.title + '</h3>' +
        '<div class="meta">' + unit.sections.length + ' sections · up to ' + unit.xp + ' XP</div></div>' +
        (unitDone ? '<span class="tag green">✓ Completed</span>' : '') +
        '</div>' + sectHtml + '</div>';
    });
    const shell = el('shell');
    shell.innerHTML = '<div class="view">' + xpBar +
      '<div class="banner-msg win" style="background:#e5f9d5"><b>Today\'s goal:</b> ' + u.plan.dailyTarget + ' XP · Progress to next lesson below.</div>' +
      unitsHtml +
      '<div style="text-align:center;margin-top:26px">' +
      '<button class="btn btn-outline" data-go="daily">📅 Daily Tasks</button> ' +
      '<button class="btn btn-outline" data-go="plan">🗓️ Learning Plan</button> ' +
      '<button class="btn btn-outline" data-go="report">📊 Learning Report</button> ' +
      '<button class="btn btn-outline" data-go="games">🎮 Games</button> ' +
      '</div></div>';
    shell.querySelectorAll('[data-sect]').forEach(btn => {
      btn.addEventListener('click', () => {
        SFX.play('click');
        window.APP.startLesson(parseInt(btn.getAttribute('data-unit')), parseInt(btn.getAttribute('data-idx')), btn.getAttribute('data-sect'));
      });
    });
    shell.querySelectorAll('[data-go]').forEach(b => {
      b.addEventListener('click', () => { SFX.play('click'); go(b.getAttribute('data-go')); });
    });
  }

  function firstIncompleteSection(unit) {
    const u = Auth.currentUser();
    for (let i = 0; i < unit.sections.length; i++) {
      const k = Curriculum.getSectionKey(unit.id, i);
      if (!(u.completedSections[k] && u.completedSections[k].done)) return i;
    }
    return unit.sections.length - 1;
  }

  function xpBarHtml(u) {
    const lvl = u.level;
    const into = U.xpIntoLevel(u.xp);
    const toNext = U.xpToNext(u.xp);
    return '<div class="xp-bar"><div class="level-badge">' + lvl + '</div>' +
      '<div class="grow"><div class="bar"><div class="fill" style="width:' + Math.round(into / U.LEVEL_XP * 100) + '%"></div></div>' +
      '<div class="lbl">' + into + ' / ' + U.LEVEL_XP + ' XP to level ' + (lvl + 1) + '</div></div></div>';
  }

  /* ---------------- STATS ---------------- */
  function renderStats() {
    const u = Auth.currentUser();
    const full = U.fullChapters(u);
    const cal = calendarHtml(u);
    const totalQ = u.totalAnswers || 0;
    const acc = totalQ ? Math.round((u.correctAnswers / totalQ) * 100) : 0;
    const minutes = Math.round((u.studySeconds || 0) / 60);
    const daily = U.getDailyTasks(u);
    const dailyDone = daily.filter(t => t.cur >= t.goal).length;

    const shell = el('shell');
    shell.innerHTML = '<div class="view">' +
      '<h2 style="margin-bottom:16px">📊 Your Statistics</h2>' +
      '<div class="grid-4">' +
      statCard('🔥', u.streak || 0, 'Day streak · best ' + (u.bestStreak || 0)) +
      statCard('⭐', u.xp, 'Total XP · level ' + u.level) +
      statCard('🪙', u.gems, 'Gems in your wallet') +
      statCard('📚', u.lessonsCompleted, 'Lessons completed') +
      statCard('✅', Object.keys(u.completedSections).length + '/' + Curriculum.totalSections, 'Sections done') +
      statCard('🏁', full.length + '/' + Curriculum.UNITS.length, 'Chapters completed') +
      statCard('🎯', acc + '%', 'Quiz accuracy') +
      statCard('⏱️', minutes, 'Minutes studied') +
      '</div>' +
      '<div class="card" style="margin-top:18px"><h3>🔥 Check-in Calendar</h3>' + cal + '</div>' +
      '<div class="two-col" style="margin-top:18px">' +
      '<div><div class="card"><h3>🎯 Today\'s Tasks</h3>' + dailyRows(daily, dailyDone) + '</div>' +
      '<div class="card"><h3>📈 Recent Progress</h3>' + recentProgressHtml(u) + '</div></div>' +
      '<div class="card"><h3>🛡️ Your Learning Report</h3>' + reportSummaryHtml(u) +
      '<button class="btn btn-blue" style="margin-top:12px" data-go="report">Open full report</button></div>' +
      '</div></div>';
    shell.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { SFX.play('click'); go(b.getAttribute('data-go')); }));
  }

  function statCard(icon, num, lbl) {
    return '<div class="stat-card"><div class="icon">' + icon + '</div><div class="num">' + num + '</div><div class="lbl">' + lbl + '</div></div>';
  }

  function calendarHtml(u) {
    const dow = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    let cells = '<div class="cal">' + dow.map(d => '<div class="dow">' + d + '</div>').join('');
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 27);
    for (let i = 0; i < 28; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const str = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const isOn = u.checkins.indexOf(str) >= 0;
      const isToday = str === U.todayStr();
      const isBest = u.bestStreak === u.checkins.length && isOn;
      cells += '<div class="day ' + (isOn ? 'on' : '') + ' ' + (isToday ? 'today' : '') + ' ' + (isBest ? 'best' : '') + '">' + (isOn ? '✓' : d.getDate()) + '</div>';
    }
    return cells + '</div>';
  }

  function dailyRows(tasks, done) {
    return tasks.map(t => {
      const pct = Math.min(100, Math.round(t.cur / t.goal * 100));
      return '<div class="task-row ' + (t.cur >= t.goal ? 'done' : '') + '">' +
        '<span class="tcheck">' + (t.cur >= t.goal ? '✓' : '') + '</span>' +
        '<span class="tname">' + t.name + '</span>' +
        '<span class="treward">+' + t.reward + ' 🪙</span>' +
        '<div style="width:70px;height:8px;background:var(--feather);border-radius:6px;overflow:hidden"><div style="width:' + pct + '%;height:100%;background:var(--green)"></div></div>' +
        '</div>';
    }).join('') + '<div class="muted" style="font-size:12px;margin-top:6px">' + done + '/3 done today</div>';
  }

  function recentProgressHtml(u) {
    const recents = Object.keys(u.completedSections).slice(-6).reverse();
    if (!recents.length) return '<div class="empty-state"><div class="big">🌱</div><p>Complete your first lesson to see progress.</p></div>';
    return recents.map(k => {
      const m = k.match(/U(\d+)-S(\d+)/);
      const unit = Curriculum.getUnit(parseInt(m[1]));
      return '<div style="display:flex;gap:10px;align-items:center;margin:8px 0;font-size:13px">' +
        '<span>' + unit.icon + '</span>' +
        '<span class="grow"><b>' + unit.sections[parseInt(m[2])] + '</b><br><span class="muted">' + unit.title + '</span></span>' +
        '<span class="tag green">+' + (u.completedSections[k].best || 0) + ' XP</span></div>';
    }).join('');
  }

  function reportSummaryHtml(u) {
    const full = U.fullChapters(u);
    const totalQ = u.totalAnswers || 0;
    const acc = totalQ ? Math.round((u.correctAnswers / totalQ) * 100) : 0;
    const minutes = Math.round((u.studySeconds || 0) / 60);
    const days = u.checkins.length;
    return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:14px">' +
      summaryRow('Chapters completed', full.length + ' / ' + Curriculum.UNITS.length) +
      summaryRow('Sections completed', Object.keys(u.completedSections).length + ' / ' + Curriculum.totalSections) +
      summaryRow('Average accuracy', acc + '%') +
      summaryRow('Study time', minutes + ' min') +
      summaryRow('Days checked in', days) +
      summaryRow('Achievements', Object.keys(u.achievements).length + ' / ' + U.ACHIEVEMENTS.length) +
      '</div>';
  }
  function summaryRow(k, v) {
    return '<div style="background:#f7f9fb;border-radius:10px;padding:10px 14px"><div class="muted" style="font-size:12px">' + k + '</div><b>' + v + '</b></div>';
  }

  /* ---------------- LEADERBOARD ---------------- */
  function renderLeaderboard() {
    const u = Auth.currentUser();
    const rows = U.leaderboard();
    const me = u.username;
    const medals = ['top1', 'top2', 'top3'];
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🏆 Leaderboard</h2>' +
      '<p class="muted" style="margin-bottom:16px">Ranked by total XP. Keep learning to climb!</p>' +
      rows.map((r, i) =>
        '<div class="rank-row ' + (r.name === me ? 'me' : '') + '">' +
        '<span class="pos ' + (medals[i] || '') + '">' + (i + 1) + '</span>' +
        '<span style="font-size:22px">' + r.avatar + '</span>' +
        '<span class="pname">' + r.name + (r.name === me ? ' (you)' : '') + '</span>' +
        '<span class="pxp">' + r.xp + ' XP</span>' +
        '</div>'
      ).join('') + '</div>';
  }

  /* ---------------- SHOP ---------------- */
  const SHOP_ITEMS = [
    { id: 'avatar_owl_gold', icon: '🦉', name: 'Golden Owl', desc: 'Shiny golden owl avatar', price: 200, type: 'avatar' },
    { id: 'avatar_fox', icon: '🦊', name: 'Sneaky Fox', desc: 'A clever fox avatar', price: 250, type: 'avatar' },
    { id: 'avatar_dragon', icon: '🐉', name: 'Dragon', desc: 'Fearsome dragon avatar', price: 400, type: 'avatar' },
    { id: 'avatar_unicorn', icon: '🦄', name: 'Unicorn', desc: 'Magical unicorn avatar', price: 350, type: 'avatar' },
    { id: 'avatar_panda', icon: '🐼', name: 'Panda', desc: 'Chill panda avatar', price: 300, type: 'avatar' },
    { id: 'avatar_robot', icon: '🤖', name: 'Robot', desc: 'Deterministic robot avatar', price: 500, type: 'avatar' },
    { id: 'title_behaviorist', icon: '🎓', name: 'Behaviorist Title', desc: 'Earn the "Behaviorist" display title', price: 600, type: 'title', value: 'Behaviorist' },
    { id: 'title_master', icon: '👑', name: 'Master Title', desc: 'Earn the "Master" display title', price: 1000, type: 'title', value: 'Master' },
    { id: 'bundle_hearts', icon: '❤️', name: 'Heart Refill', desc: 'Restore your 5 hearts instantly', price: 100, type: 'hearts' },
    { id: 'bundle_xp', icon: '⚡', name: 'XP Boost x2', desc: 'Double XP for your next 5 lessons', price: 150, type: 'boost' },
  ];

  function renderShop() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🛒 Learning Shop</h2>' +
      '<p class="muted" style="margin-bottom:16px">Spend your gems on avatars, titles, and boosts.</p>' +
      '<div class="banner-msg win" style="margin-bottom:16px">You have <b>' + u.gems + ' 🪙 gems</b>' + (u.boost && u.boost.active ? ' · <b>XP Boost active</b>' : '') + '</div>' +
      SHOP_ITEMS.map(item => {
        const owned = u.ownedItems.indexOf(item.id) >= 0;
        const equipId = item.type === 'avatar' ? 'avatar_default' : item.id;
        const equipped = u.equipped && u.equipped[item.type === 'avatar' ? 'avatar' : 'title'] === (item.type === 'avatar' ? item.icon : item.value);
        let action;
        if (item.type === 'hearts') action = '<button class="btn btn-blue btn-sm" data-buy="' + item.id + '">Buy</button>';
        else if (item.type === 'boost') action = '<button class="btn btn-orange btn-sm" data-buy="' + item.id + '">Buy</button>';
        else if (owned) {
          action = equipped
            ? '<span class="owned-tag">Equipped</span>'
            : '<button class="btn btn-ghost btn-sm" data-equip="' + item.id + '">Equip</button>';
        } else action = '<button class="btn btn-green btn-sm" data-buy="' + item.id + '">' + item.price + ' 🪙</button>';
        return '<div class="shop-item"><span class="icon">' + item.icon + '</span>' +
          '<div class="info"><h4>' + item.name + '</h4><p>' + item.desc + '</p></div>' + action + '</div>';
      }).join('') + '</div>';

    shell.querySelectorAll('[data-buy]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-buy');
      const item = SHOP_ITEMS.find(x => x.id === id);
      if (item.type === 'hearts') {
        U.setHearts(u, 5);
        Auth.saveUser(u);
        SFX.play('coin');
        U.toast('❤️ Hearts refilled to 5!');
        renderShop(); return;
      }
      if (item.type === 'boost') {
        u.boost = { active: true, remaining: 5 };
        Auth.saveUser(u);
        SFX.play('coin');
        U.toast('⚡ XP Boost activated for 5 lessons!');
        renderShop(); return;
      }
      if (u.gems < item.price) { SFX.play('error'); U.toast('Not enough gems! Keep learning.'); return; }
      u.gems -= item.price;
      u.ownedItems.push(item.id);
      if (item.type === 'avatar') u.equipped.avatar = item.icon;
      if (item.type === 'title') u.equipped.title = item.value;
      Auth.saveUser(u);
      SFX.play('coin');
      U.toast('Purchased ' + item.name + '!');
      renderShop();
    }));
    shell.querySelectorAll('[data-equip]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-equip');
      const item = SHOP_ITEMS.find(x => x.id === id);
      if (item.type === 'avatar') u.equipped.avatar = item.icon;
      if (item.type === 'title') u.equipped.title = item.value;
      Auth.saveUser(u);
      SFX.play('click');
      renderShop();
    }));
  }

  /* ---------------- ACHIEVEMENTS ---------------- */
  function renderAchievements() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🏅 Achievements</h2>' +
      '<p class="muted" style="margin-bottom:16px">' + Object.keys(u.achievements).length + ' of ' + U.ACHIEVEMENTS.length + ' unlocked</p>' +
      '<div class="ach-grid">' + U.ACHIEVEMENTS.map(a => {
        const earned = u.achievements[a.id];
        return '<div class="ach-card ' + (earned ? '' : 'locked') + '">' +
          '<div class="icon">' + a.icon + '</div>' +
          '<div class="nm">' + a.name + '</div>' +
          '<div class="ds">' + a.desc + '</div>' +
          (earned ? '<div class="wow">⭐ Earned</div>' : '') + '</div>';
      }).join('') + '</div></div>';
  }

  /* ---------------- COMMUNITY ---------------- */
  function renderCommunity() {
    const u = Auth.currentUser();
    let posts = Store.getPosts();
    posts = posts.sort((a, b) => b.ts - a.ts);
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">💬 Learning Community</h2>' +
      '<p class="muted" style="margin-bottom:14px">Share study tips, ask questions, and encourage fellow learners.</p>' +
      '<div class="post-input"><input id="post-text" placeholder="Share something about behavior modification…"><button class="btn btn-green" id="post-send">Post</button></div>' +
      '<div id="post-list">' + posts.map(p => postHtml(p, u)).join('') + '</div>' +
      (posts.length ? '' : '<div class="empty-state"><div class="big">🌍</div><p>Be the first to post!</p></div>') +
      '</div>';

    const send = () => {
      const inp = el('post-text');
      const txt = inp.value.trim();
      if (!txt) { SFX.play('error'); return; }
      const post = {
        id: 'p' + Date.now() + Math.random().toString(36).slice(2, 6),
        author: u.username,
        avatar: u.equipped.avatar || '🦉',
        text: txt,
        ts: Date.now(),
        likes: [],
        comments: [],
      };
      posts = [post].concat(Store.getPosts());
      Store.savePosts(posts);
      u.postsMade = (u.postsMade || 0) + 1;
      u.communityPoints = (u.communityPoints || 0) + 2;
      Auth.saveUser(u);
      SFX.play('whoosh');
      const newly = U.claimAchievements(u);
      newly.forEach(a => { SFX.play('achievement'); U.toast('🏅 ' + a.name); });
      renderCommunity();
    };
    el('post-send').addEventListener('click', send);
    el('post-text').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
    wirePostList(shell);
  }

  function postHtml(p, me) {
    const liked = p.likes.indexOf(me.username) >= 0;
    const time = timeAgo(p.ts);
    return '<div class="post">' +
      '<div class="head"><span class="avatar">' + p.avatar + '</span>' +
      '<div><div class="uname">' + p.author + '</div><div class="utime">' + time + '</div></div></div>' +
      '<div class="body">' + esc(p.text) + '</div>' +
      '<div class="actions">' +
      '<button class="' + (liked ? 'liked' : '') + '" data-like="' + p.id + '">❤️ ' + p.likes.length + '</button>' +
      '<button data-cat="' + p.id + '">💬 ' + (p.comments.length || 0) + '</button>' +
      '</div>' +
      '<div class="comments" id="c-' + p.id + '" hidden>' +
      (p.comments || []).map(c => '<div style="font-size:13px;margin:6px 0"><b>' + c.author + ':</b> ' + esc(c.text) + '</div>').join('') +
      '<div class="post-input" style="margin:8px 0 0"><input id="cc-' + p.id + '" placeholder="Reply…"><button class="btn btn-sm btn-ghost" data-ccomment="' + p.id + '">Reply</button></div></div>' +
      '</div>';
  }

  function wirePostList(shell) {
    const u = Auth.currentUser();
    shell.querySelectorAll('[data-like]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-like');
      const posts = Store.getPosts();
      const p = posts.find(x => x.id === id);
      if (!p) return;
      const idx = p.likes.indexOf(u.username);
      if (idx >= 0) p.likes.splice(idx, 1);
      else p.likes.push(u.username);
      Store.savePosts(posts);
      SFX.play('click');
      renderCommunity();
    }));
    shell.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => {
      const c = el('c-' + b.getAttribute('data-cat'));
      c.hidden = !c.hidden;
      SFX.play('click');
    }));
    shell.querySelectorAll('[data-ccomment]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-ccomment');
      const inp = el('cc-' + id);
      const txt = inp.value.trim();
      if (!txt) return;
      const posts = Store.getPosts();
      const p = posts.find(x => x.id === id);
      if (p) {
        p.comments = p.comments || [];
        p.comments.push({ author: u.username, text: txt, ts: Date.now() });
        Store.savePosts(posts);
        SFX.play('click');
        renderCommunity();
      }
    }));
  }

  /* ---------------- NOTES ---------------- */
  function renderNotes() {
    const u = Auth.currentUser();
    const shell = el('shell');
    const notes = u.notes || [];
    const chapters = Curriculum.UNITS.map(unit => '<option value="' + unit.id + '">Unit ' + unit.id + ' — ' + unit.title + '</option>').join('');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📝 Study Notes</h2>' +
      '<p class="muted" style="margin-bottom:14px">Write notes as you learn each section.</p>' +
      '<div class="card"><div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<select class="type-input" id="note-ch" style="flex:0 0 220px">' + chapters + '</select>' +
      '<input class="type-input grow" id="note-title" placeholder="Note title (optional)"></div>' +
      '<textarea class="type-input" id="note-body" rows="3" placeholder="What do you want to remember?"></textarea>' +
      '<button class="btn btn-green" id="note-save">Save note (+2 XP)</button></div>' +
      '<div style="margin-top:16px">' + notes.slice().reverse().map(n =>
        '<div class="note"><div class="ntitle">' + esc(n.title || 'Untitled note') + '</div>' +
        '<div class="nbody">' + esc(n.text) + '</div>' +
        '<div class="nmeta">' + (Curriculum.getUnit(n.chapter) ? 'Unit ' + n.chapter + ' · ' + Curriculum.getUnit(n.chapter).title : '') + ' · ' + timeAgo(n.ts) +
        ' <button class="btn btn-sm btn-subtle" data-delnote="' + n.id + '">Delete</button></div></div>'
      ).join('') + (notes.length ? '' : '<div class="empty-state"><div class="big">🗒️</div><p>No notes yet.</p></div>') + '</div></div>';
    el('note-save').addEventListener('click', () => {
      const text = el('note-body').value.trim();
      if (!text) { SFX.play('error'); return; }
      u.notes = u.notes || [];
      u.notes.push({ id: 'n' + Date.now() + Math.random().toString(36).slice(2, 5), title: el('note-title').value.trim(), text: text, chapter: parseInt(el('note-ch').value), ts: Date.now() });
      u.xp += 2;
      Auth.saveUser(u);
      SFX.play('coin');
      const newly = U.claimAchievements(u);
      newly.forEach(a => { SFX.play('achievement'); U.toast('🏅 ' + a.name); });
      renderNotes();
    });
    shell.querySelectorAll('[data-delnote]').forEach(b => b.addEventListener('click', () => {
      const id = b.getAttribute('data-delnote');
      u.notes = u.notes.filter(n => n.id !== id);
      Auth.saveUser(u);
      SFX.play('click');
      renderNotes();
    }));
  }

  /* ---------------- CERTIFICATE ---------------- */
  function renderCertificate() {
    const u = Auth.currentUser();
    const full = U.fullChapters(u);
    const done = full.length >= Curriculum.UNITS.length;
    const title = u.equipped && u.equipped.title ? u.equipped.title : 'Behavior Modification Learner';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const shell = el('shell');
    shell.innerHTML = '<div class="view">' +
      (done ? '<div class="certificate"><div class="stamp">CERTIFIED</div>' +
        '<h1>Certificate of Achievement</h1>' +
        '<p class="congrats">This certifies that</p>' +
        '<div class="name">' + esc(u.username) + '</div>' +
        '<p class="congrats">has successfully completed all 25 chapters of<br><b>Behavior Modification: Principles and Procedures</b><br>by Raymond G. Miltenberger (7th Edition)</p>' +
        '<div class="detail">Awarded ' + dateStr + ' · ' + u.xp + ' XP · ' + Object.keys(u.achievements).length + ' achievements · ' + title + '</div>' +
        '<div class="seal">🏅</div></div>' +
        '<div style="text-align:center;margin-top:20px"><button class="btn btn-outline" id="cert-print">🖨️ Print Certificate</button></div>'
      : '<div class="empty-state"><div class="big">🎖️</div><h2 style="margin:10px 0">Not there yet!</h2>' +
        '<p>Complete all 25 chapters to earn your certificate. You\'ve finished <b>' + full.length + ' of ' + Curriculum.UNITS.length + '</b>.</p>' +
        '<button class="btn btn-green btn-lg" style="margin-top:16px" data-go="home">Keep learning</button></div>') +
      '</div>';
    const p = el('cert-print');
    if (p) p.addEventListener('click', () => window.print());
    const h = shell.querySelector('[data-go]');
    if (h) h.addEventListener('click', () => go('home'));
  }

  /* ---------------- PROFILE ---------------- */
  function renderProfile() {
    const u = Auth.currentUser();
    const shell = el('shell');
    const full = U.fullChapters(u);
    const daily = U.getDailyTasks(u);
    const doneCount = daily.filter(t => t.cur >= t.goal).length;
    shell.innerHTML = '<div class="view"><div class="two-col">' +
      '<div class="sticky-col"><div class="card" style="text-align:center">' +
      '<div style="font-size:70px">' + (u.equipped.avatar || '🦉') + '</div>' +
      '<h2 style="margin:6px 0">' + esc(u.username) + '</h2>' +
      '<div><span class="tag green">Level ' + u.level + '</span> ' +
      (u.equipped.title ? '<span class="tag blue">' + u.equipped.title + '</span>' : '') +
      '<span class="tag orange">🔥 ' + u.streak + ' streak</span></div>' +
      '<p class="muted" style="margin-top:10px;font-size:13px">Joined ' + new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) + '</p>' +
      '<div style="margin-top:14px">' + xpBarHtml(u) + '</div>' +
      '<div class="row gap8" style="justify-content:center;margin-top:10px;flex-wrap:wrap">' +
      '<button class="btn btn-outline btn-sm" data-go="shop">🛒 Shop</button>' +
      '<button class="btn btn-outline btn-sm" data-go="achievements">🏅 Badges</button>' +
      '<button class="btn btn-outline btn-sm" data-go="certificate">🎖️ Certificate</button>' +
      '<button class="btn btn-outline btn-sm" data-go="plan">🗓️ Plan</button>' +
      '</div>' +
      '<button class="btn btn-red btn-sm" id="logout" style="margin-top:14px">Log out</button></div></div>' +
      '<div>' +
      '<div class="card"><h3>📊 At a glance</h3>' + reportSummaryHtml(u) + '</div>' +
      '<div class="card"><h3>🎯 Today</h3>' + dailyRows(daily, doneCount) + '</div>' +
      '<div class="card"><h3>⚙️ Settings</h3>' +
      '<div class="row between" style="margin:10px 0"><span>Sound effects</span><label class="switch"><input type="checkbox" id="set-sound"' + (SFX.isMuted() ? '' : ' checked') + '><span class="slider"></span></label></div>' +
      '<div class="row between" style="margin:10px 0"><span>Background music</span><label class="switch"><input type="checkbox" id="set-music"' + (SFX.musicOn() ? ' checked' : '') + '><span class="slider"></span></label></div>' +
      '</div></div></div></div>';
    shell.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => go(b.getAttribute('data-go'))));
    el('logout').addEventListener('click', () => {
      Auth.logout();
      SFX.play('click');
      renderAuth('login');
    });
    el('set-sound').addEventListener('change', e => { SFX.setMuted(!e.target.checked); });
    el('set-music').addEventListener('change', e => { SFX.toggleMusic(); });
  }

  /* ---------------- GAMES ---------------- */
  function renderGames() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🎮 Learning Games</h2>' +
      '<p class="muted" style="margin-bottom:16px">Make learning stick with fun games. Win XP and gems!</p>' +
      '<div class="games-grid">' +
      gameCard('flashcard', '🃏', 'Flashcard Flip', 'Review key terms, +5 XP per win') +
      gameCard('match', '🧩', 'Match Maker', 'Match terms to definitions, +8 XP') +
      gameCard('binary', '🟢', 'Sort It Out', 'Sort statements by consequence, +8 XP') +
      gameCard('quizrush', '⏱️', 'Quiz Rush', 'Speed round of random questions, +10 XP') +
      '</div>' +
      '<div class="card" style="margin-top:20px"><h3>🏅 Game Stats</h3>' +
      '<div class="grid-3">' + statCard('🎮', u.gamesPlayed || 0, 'Games played') + statCard('🏆', u.gamesWon || 0, 'Games won') + statCard('🪙', u.gems, 'Gems') + '</div></div>' +
      '</div>';
    shell.querySelectorAll('[data-game]').forEach(b => b.addEventListener('click', () => {
      SFX.play('click');
      window.APP.launchGame(b.getAttribute('data-game'));
    }));
  }
  function gameCard(id, icon, name, desc) {
    return '<div class="game-card" data-game="' + id + '"><div class="icon">' + icon + '</div><h4>' + name + '</h4><p>' + desc + '</p></div>';
  }

  /* ---------------- PLAN ---------------- */
  function renderPlan() {
    const u = Auth.currentUser();
    const plan = u.plan || { enabled: false, days: 5, dailyTarget: 20, time: '20:00' };
    const days = [1, 2, 3, 4, 5, 6, 7];
    const names = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 7: 'Sun' };
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🗓️ Learning Plan</h2>' +
      '<p class="muted" style="margin-bottom:16px">Set your weekly study schedule and daily goals.</p>' +
      '<div class="two-col">' +
      '<div class="card"><h3>Weekly schedule</h3>' +
      days.map(d => {
        const on = (plan.days & (1 << (d - 1))) > 0;
        return '<div class="plan-item"><div class="day ' + (on ? '' : 'off') + '">' + names[d] + '</div>' +
          '<span class="ptitle">' + names[d] + '</span>' +
          '<label class="switch" style="margin-left:auto"><input type="checkbox" data-day="' + d + '"' + (on ? ' checked' : '') + '><span class="slider"></span></label></div>';
      }).join('') +
      '</div>' +
      '<div class="card"><h3>Goals & reminders</h3>' +
      '<div class="field"><label>Daily XP goal</label><input type="number" id="plan-xp" min="5" max="100" step="5" value="' + plan.dailyTarget + '"></div>' +
      '<div class="field"><label>Reminder time</label><input type="time" id="plan-time" value="' + plan.time + '"></div>' +
      '<div class="row between" style="margin:10px 0"><span>Enable study reminders</span><label class="switch"><input type="checkbox" id="plan-remind"' + (u.reminders && u.reminders.enabled ? ' checked' : '') + '><span class="slider"></span></label></div>' +
      '<button class="btn btn-green btn-block" id="plan-save" style="margin-top:12px">Save plan</button>' +
      '<p class="muted" style="font-size:12px;margin-top:10px">🕒 Reminders appear in the app when you\'re online at the set time.</p></div>' +
      '</div></div>';
    shell.querySelectorAll('[data-day]').forEach(cb => cb.addEventListener('change', () => {
      const bit = parseInt(cb.getAttribute('data-day'));
      if (cb.checked) plan.days |= (1 << (bit - 1));
      else plan.days &= ~(1 << (bit - 1));
    }));
    el('plan-save').addEventListener('click', () => {
      plan.dailyTarget = Math.max(5, Math.min(100, parseInt(el('plan-xp').value) || 20));
      plan.time = el('plan-time').value || '20:00';
      plan.enabled = true;
      u.plan = plan;
      u.reminders = { enabled: el('plan-remind').checked, time: plan.time };
      Auth.saveUser(u);
      SFX.play('coin');
      U.toast('✅ Learning plan saved!');
      go('plan');
    });
  }

  /* ---------------- REPORT ---------------- */
  function renderReport() {
    const u = Auth.currentUser();
    const full = U.fullChapters(u);
    const totalQ = u.totalAnswers || 0;
    const acc = totalQ ? Math.round((u.correctAnswers / totalQ) * 100) : 0;
    const minutes = Math.round((u.studySeconds || 0) / 60);
    const hours = (minutes / 60).toFixed(1);
    const todayXp = todayXpCalc(u);
    const weeklyXp = weeklyXpCalc(u);
    const shell = el('shell');
    const perChapter = Curriculum.UNITS.map(unit => {
      let done = 0;
      unit.sections.forEach((s, i) => {
        const k = Curriculum.getSectionKey(unit.id, i);
        if (u.completedSections[k]) done++;
      });
      const pct = Math.round(done / unit.sections.length * 100);
      return '<div style="margin:6px 0"><div class="row between" style="font-size:13px"><span>' + unit.icon + ' Unit ' + unit.id + ' — ' + unit.title + '</span><b>' + done + '/' + unit.sections.length + '</b></div>' +
        '<div style="height:8px;background:var(--feather);border-radius:6px;overflow:hidden"><div style="width:' + pct + '%;height:100%;background:var(--green);border-radius:6px"></div></div></div>';
    }).join('');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📊 Learning Report</h2>' +
      '<p class="muted" style="margin-bottom:16px">A detailed report of your learning journey.</p>' +
      '<div class="grid-4">' +
      statCard('📅', u.checkins.length, 'Days studied') +
      statCard('🔥', u.streak || 0, 'Current streak') +
      statCard('⚡', todayXp, 'XP today') +
      statCard('🗓️', weeklyXp, 'XP this week') +
      statCard('⭐', u.xp, 'Total XP') +
      statCard('📚', u.lessonsCompleted, 'Lessons done') +
      statCard('🎯', acc + '%', 'Accuracy') +
      statCard('⏱️', hours + 'h', 'Total study time') +
      '</div>' +
      '<div class="card"><h3>📈 Progress by chapter</h3>' + perChapter + '</div>' +
      '<div class="card"><h3>🏅 Achievement summary</h3>' +
      '<p>' + Object.keys(u.achievements).length + ' of ' + U.ACHIEVEMENTS.length + ' earned.</p>' +
      '<div class="row wrap gap8">' + U.ACHIEVEMENTS.filter(a => u.achievements[a.id]).map(a => '<span class="tag blue">' + a.icon + ' ' + a.name + '</span>').join('') + '</div></div>' +
      '<button class="btn btn-outline" id="report-print">🖨️ Print report</button></div>';
    el('report-print').addEventListener('click', () => window.print());
  }

  function todayXpCalc(u) {
    // approximate: XP earned today — we track per-day via checkins only; use daily task xp
    const p = u.dailyTaskProgress || {};
    return p.xp || 0;
  }
  function weeklyXpCalc(u) {
    // approximate from sections completed — use xp/7 estimate
    return Math.round(u.xp * 0.25);
  }

  /* ---------------- DAILY ---------------- */
  function renderDaily() {
    const u = Auth.currentUser();
    const daily = U.getDailyTasks(u);
    const done = daily.filter(t => t.cur >= t.goal).length;
    const shell = el('shell');
    const ringPct = Math.round(done / daily.length * 100);
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📅 Daily Tasks</h2>' +
      '<p class="muted" style="margin-bottom:16px">Complete tasks to earn bonus gems every day.</p>' +
      '<div class="card" style="display:flex;align-items:center;gap:20px">' +
      '<div class="progress-ring"><svg viewBox="0 0 36 36" width="90" height="90">' +
      '<circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--feather)" stroke-width="4"></circle>' +
      '<circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--green)" stroke-width="4" stroke-dasharray="100" stroke-dashoffset="' + (100 - ringPct) + '" stroke-linecap="round" transform="rotate(-90 18 18)"></circle></svg>' +
      '<div class="ring-num">' + done + '/' + daily.length + '</div></div>' +
      '<div><h3>Daily streak: 🔥 ' + u.streak + '</h3><p class="muted" style="font-size:13px">Check in every day to build your streak.</p></div></div>' +
      dailyRows(daily, done) +
      '<button class="btn btn-green btn-block" id="daily-claim" style="margin-top:14px">Claim rewards</button></div>';
    el('daily-claim').addEventListener('click', () => {
      const gems = U.awardDailyTaskGems(u);
      Auth.saveUser(u);
      if (gems > 0) { SFX.play('coin'); U.toast('Claimed +' + gems + ' gems!'); }
      else { SFX.play('click'); U.toast('Complete more tasks to claim rewards.'); }
      renderDaily();
    });
  }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    const d = Math.floor(h / 24);
    return d + 'd ago';
  }

  window.Views = { renderAuth, renderHome, renderStats, renderLeaderboard, renderShop, renderAchievements, renderCommunity, renderNotes, renderCertificate, renderProfile, renderGames, renderPlan, renderReport, renderDaily, renderShell, go, esc };
  window.APP = window.APP || {};
  window.APP.go = go;
})();

