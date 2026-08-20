/* ============================================================
   系统之美 — views.js
   渲染所有顶层视图到 #app。
   ============================================================ */
(function () {
  'use strict';
  const U = UI;

  function h(html) { return html; }
  function el(id) { return document.getElementById(id); }

  function topbar(active) {
    const u = Auth.currentUser();
    const nav = [
      { id: 'home', label: '学习', icon: U.icons().book },
      { id: 'stats', label: '统计', icon: U.icons().trophy },
      { id: 'community', label: '社区', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-8 8a2 2 0 11-2 2 2 2 0 012-2zm-4.5 0A1.5 1.5 0 116 11.5 1.5 1.5 0 017.5 10zm9 0A1.5 1.5 0 1115 11.5 1.5 1.5 0 0116.5 10z"/></svg>' },
    ];
    return '<header class="topbar">' +
      '<div class="brand" data-nav="home"><div class="owl">🌍</div><span>系统之美</span></div>' +
      '<nav>' + nav.map(n =>
        '<button class="nav-item ' + (active === n.id ? 'active' : '') + '" data-nav="' + n.id + '">' + n.icon + '<span>' + n.label + '</span></button>'
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
      review: renderReview,
      settings: renderSettings,
    };
    window.APP.currentView = view;
    const r = renderers[view] || renderHome;
    r();
  }

  /* ---------------- 认证 ---------------- */
  function renderAuth(mode) {
    mode = mode || 'login';
    const app = el('app');
    const err = '<div class="auth-err" id="auth-err"></div>';
    const fields = mode === 'register'
      ? '<div class="field"><label>用户名</label><input id="a-u" placeholder="给自己取个名字" autocomplete="off"></div>' +
        '<div class="field"><label>密码</label><input id="a-p" type="password" placeholder="至少 4 个字符"></div>' +
        '<div class="field"><label>确认密码</label><input id="a-p2" type="password" placeholder="再输一遍密码"></div>'
      : '<div class="field"><label>用户名</label><input id="a-u" placeholder="你的用户名" autocomplete="off"></div>' +
        '<div class="field"><label>密码</label><input id="a-p" type="password" placeholder="你的密码"></div>';
    const submitLbl = mode === 'register' ? '创建账号' : '登录';
    const alt = mode === 'register'
      ? '<div class="auth-alt">已经有账号了？<button id="auth-switch">去登录</button></div>'
      : '<div class="auth-alt">第一次来？<button id="auth-switch">免费注册</button></div>';
    app.innerHTML = '<div class="auth-wrap"><div class="auth-card">' +
      '<div class="owl-big">🌍</div>' +
      '<h1>系统之美</h1>' +
      '<p class="tag">用多邻国的方式，学完《系统之美》' + Curriculum.UNITS.length + ' 个单元的每一小节。</p>' +
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
        if (pass !== pass2) return showErr('两次输入的密码不一致。');
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
    U.regenHearts(u);
    u.checkins.push(today);
    u.lastActiveDay = today;
    const yesterday = U.daysAgoStr(1);
    u.streak = (u.checkins.indexOf(yesterday) >= 0) ? (u.streak + 1) : 1;
    u.bestStreak = Math.max(u.bestStreak || 0, u.streak);
    u.studySeconds += 1;
    const newly = U.claimAchievements(u);
    const gems = U.awardDailyTaskGems(u);
    Auth.saveUser(u);
    if (gems > 0) U.toast('每日奖励已领取：+' + gems + ' 宝石');
    setTimeout(() => {
      newly.forEach(a => {
        SFX.play('achievement');
        U.toast('🏅 解锁成就：' + a.name);
      });
    }, 600);
  }

  function renderShell() {
    const u = Auth.currentUser();
    const app = el('app');
    app.innerHTML = topbar('home') + '<div class="shell" id="shell"><div class="view">加载中…</div></div>';
    wireTopbar();
    go('home');
  }

  /* ---------------- 首页 / 学习路径 ---------------- */
  function renderHome() {
    const u = Auth.currentUser();
    const full = U.fullChapters(u);
    const xpBar = xpBarHtml(u);
    let unitsHtml = '';
    Curriculum.UNITS.forEach(unit => {
      const part = Curriculum.PARTS[unit.part];
      let sectHtml = '';
      let unlocked = true;
      let unitDoneCount = 0;
      const firstIncomplete = firstIncompleteSection(unit);
      unit.sections.forEach((s, i) => {
        const key = Curriculum.getSectionKey(unit.id, i);
        const rec = u.completedSections[key];
        const done = !!(rec && rec.done);
        if (done) unitDoneCount++;
        const isCurrent = firstIncomplete === i;
        let nodeClass = 'node';
        let btn = '';
        if (done) {
          nodeClass += ' done';
          btn = '<button class="node-btn ghost" data-sect="' + key + '" data-unit="' + unit.id + '" data-idx="' + i + '">复习</button>';
        } else if (unlocked) {
          nodeClass += ' cur';
          btn = '<button class="node-btn" data-sect="' + key + '" data-unit="' + unit.id + '" data-idx="' + i + '">' + (isCurrent ? '开始' : '开始') + '</button>';
        } else {
          nodeClass += ' lock';
          btn = '<span class="muted" style="font-size:12px">🔒</span>';
        }
        if (done) unlocked = true;
        else unlocked = false;
        const starLine = done && rec.stars ? '<span class="node-stars">' + '⭐'.repeat(rec.stars) + '</span>' : '';
        sectHtml += '<div class="' + nodeClass + '">' +
          '<span class="ring"></span>' +
          '<span class="node-icon">' + Art.sectionIcon(unit.id, s) + '</span>' +
          '<div class="node-main">' +
          '<div class="node-title">' + s + ' ' + starLine + '</div>' +
          '<div class="node-desc">' + (done ? '已完成 · ' + (rec.best || 0) + ' XP' : '先学后测，掌握知识点') + '</div>' +
          '</div>' +
          (done ? '<span class="node-score">' + (rec.best || 0) + ' XP</span>' : '') +
          btn + '</div>';
      });
      const unitDone = full.indexOf(unit.id) >= 0;
      // 单元进度环
      const pct = Math.round(unitDoneCount / unit.sections.length * 100);
      const ringColor = unitDone ? C_ring(part.color) : '#cbd5e1';
      const ringHtml = '<div class="unit-ring"><svg width="52" height="52">' +
        '<circle cx="26" cy="26" r="21" fill="none" stroke="#e2e8f0" stroke-width="5"></circle>' +
        '<circle cx="26" cy="26" r="21" fill="none" stroke="' + ringColor + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + (2 * Math.PI * 21) + '" stroke-dashoffset="' + (2 * Math.PI * 21 * (1 - pct / 100)) + '" transform="rotate(-90 26 26)"></circle></svg>' +
        '<span class="ring-num">' + (unitDone ? '✓' : unitDoneCount + '/' + unit.sections.length) + '</span></div>';
      unitsHtml += '<div class="unit" style="border-top:6px solid ' + part.color + '">' +
        '<div class="unit-banner">' + Art.unitArt(unit.id) + '</div>' +
        '<div class="unit-title">' + ringHtml +
        '<div class="grow"><h3>' + unit.title + '</h3>' +
        '<div class="meta">' + unit.sections.length + ' 小节 · 最高 ' + unit.xp + ' XP</div></div>' +
        (unitDone ? '<span class="tag green">✓ 已完成</span>' : '') +
        '</div>' + sectHtml + '</div>';
    });
    const shell = el('shell');
    const wrongCount = (u.wrongBook || []).length;
    shell.innerHTML = '<div class="view">' + xpBar +
      heroBanner(u, full) +
      '<div class="banner-msg win" style="background:#e5f9d5"><b>今日目标：</b>' + u.plan.dailyTarget + ' XP · 从下面开始今天的课程。</div>' +
      unitsHtml +
      '<div style="text-align:center;margin-top:26px">' +
      '<button class="btn btn-outline" data-go="daily">📅 每日任务</button> ' +
      '<button class="btn btn-outline" data-go="plan">🗓️ 学习计划</button> ' +
      '<button class="btn btn-outline" data-go="report">📊 学习报告</button> ' +
      '<button class="btn btn-outline" data-go="review">📕 错题本' + (wrongCount ? ' (' + wrongCount + ')' : '') + '</button> ' +
      '<button class="btn btn-outline" data-go="games">🎮 学习游戏</button> ' +
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

  function C_ring(hex) {
    // 直接用单元主题色，不需要转换
    return hex;
  }

  function heroBanner(u, full) {
    const pct = Math.round(Object.keys(u.completedSections).length / Curriculum.totalSections * 100);
    return '<div class="hero-banner">' +
      '<span class="hero-emoji">🌍</span>' +
      '<h1>系统之美 · 决策者的系统思考</h1>' +
      '<div class="hero-sub">' + full.length + '/' + Curriculum.UNITS.length + ' 个单元 · 全书进度 ' + pct + '%</div>' +
      '<div class="hero-stats">' +
      '<div class="hero-stat">🔥 <b>' + u.streak + '</b> 连续</div>' +
      '<div class="hero-stat">⭐ <b>' + u.xp + '</b> XP</div>' +
      '<div class="hero-stat">🏅 <b>' + Object.keys(u.achievements).length + '</b> 成就</div>' +
      '<div class="hero-stat">📚 <b>' + u.lessonsCompleted + '</b> 课</div>' +
      '</div></div>';
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
      '<div class="lbl">' + into + ' / ' + U.LEVEL_XP + ' XP，距 ' + (lvl + 1) + ' 级还差 ' + toNext + '</div></div></div>';
  }

  /* ---------------- 统计 ---------------- */
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
      '<h2 style="margin-bottom:16px">📊 你的学习统计</h2>' +
      '<div class="grid-4">' +
      statCard('🔥', u.streak || 0, '连续天数 · 最佳 ' + (u.bestStreak || 0)) +
      statCard('⭐', u.xp, '总 XP · 等级 ' + u.level) +
      statCard('🪙', u.gems, '钱包里的宝石') +
      statCard('📚', u.lessonsCompleted, '完成的课程') +
      statCard('✅', Object.keys(u.completedSections).length + '/' + Curriculum.totalSections, '已完成小节') +
      statCard('🏁', full.length + '/' + Curriculum.UNITS.length, '已完成单元') +
      statCard('🎯', acc + '%', '测验准确率') +
      statCard('⏱️', minutes, '学习分钟') +
      '</div>' +
      '<div class="card" style="margin-top:18px"><h3>🔥 打卡日历</h3>' + cal + '</div>' +
      '<div class="two-col" style="margin-top:18px">' +
      '<div><div class="card"><h3>🎯 今日任务</h3>' + dailyRows(daily, dailyDone) + '</div>' +
      '<div class="card"><h3>📈 最近进度</h3>' + recentProgressHtml(u) + '</div></div>' +
      '<div class="card"><h3>🛡️ 学习报告摘要</h3>' + reportSummaryHtml(u) +
      '<button class="btn btn-blue" style="margin-top:12px" data-go="report">打开完整报告</button></div>' +
      '</div></div>';
    shell.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => { SFX.play('click'); go(b.getAttribute('data-go')); }));
  }

  function statCard(icon, num, lbl) {
    return '<div class="stat-card"><div class="icon">' + icon + '</div><div class="num">' + num + '</div><div class="lbl">' + lbl + '</div></div>';
  }

  function calendarHtml(u) {
    const dow = ['一', '二', '三', '四', '五', '六', '日'];
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
    }).join('') + '<div class="muted" style="font-size:12px;margin-top:6px">今天完成 ' + done + '/3</div>';
  }

  function recentProgressHtml(u) {
    const recents = Object.keys(u.completedSections).slice(-6).reverse();
    if (!recents.length) return '<div class="empty-state"><div class="big">🌱</div><p>完成第一节课，就能看到进度啦。</p></div>';
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
      summaryRow('完成的单元', full.length + ' / ' + Curriculum.UNITS.length) +
      summaryRow('完成的小节', Object.keys(u.completedSections).length + ' / ' + Curriculum.totalSections) +
      summaryRow('平均准确率', acc + '%') +
      summaryRow('学习时长', minutes + ' 分钟') +
      summaryRow('打卡天数', days) +
      summaryRow('成就徽章', Object.keys(u.achievements).length + ' / ' + U.ACHIEVEMENTS.length) +
      '</div>';
  }
  function summaryRow(k, v) {
    return '<div style="background:#f7f9fb;border-radius:10px;padding:10px 14px"><div class="muted" style="font-size:12px">' + k + '</div><b>' + v + '</b></div>';
  }

  /* ---------------- 排行榜 ---------------- */
  function renderLeaderboard() {
    const u = Auth.currentUser();
    const rows = U.leaderboard();
    const me = u.username;
    const medals = ['top1', 'top2', 'top3'];
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🏆 排行榜</h2>' +
      '<p class="muted" style="margin-bottom:16px">按总 XP 排名。坚持学习，向上攀登！</p>' +
      rows.map((r, i) =>
        '<div class="rank-row ' + (r.name === me ? 'me' : '') + '">' +
        '<span class="pos ' + (medals[i] || '') + '">' + (i + 1) + '</span>' +
        '<span style="font-size:22px">' + r.avatar + '</span>' +
        '<span class="pname">' + r.name + (r.name === me ? '（你）' : '') + '</span>' +
        '<span class="pxp">' + r.xp + ' XP</span>' +
        '</div>'
      ).join('') + '</div>';
  }

  /* ---------------- 商城 ---------------- */
  const SHOP_ITEMS = [
    { id: 'avatar_owl_gold', icon: '🦉', name: '金猫头鹰', desc: '闪闪发光的金色猫头鹰', price: 200, type: 'avatar' },
    { id: 'avatar_fox', icon: '🦊', name: '机灵狐狸', desc: '聪明的狐狸头像', price: 250, type: 'avatar' },
    { id: 'avatar_dragon', icon: '🐉', name: '巨龙', desc: '威风凛凛的龙头像', price: 400, type: 'avatar' },
    { id: 'avatar_unicorn', icon: '🦄', name: '独角兽', desc: '梦幻的独角兽头像', price: 350, type: 'avatar' },
    { id: 'avatar_panda', icon: '🐼', name: '熊猫', desc: '慵懒的熊猫头像', price: 300, type: 'avatar' },
    { id: 'avatar_robot', icon: '🤖', name: '机器人', desc: '精确的机器人头像', price: 500, type: 'avatar' },
    { id: 'title_thinker', icon: '🎓', name: '系统思考者称号', desc: '获得"系统思考者"称号', price: 600, type: 'title', value: '系统思考者' },
    { id: 'title_master', icon: '👑', name: '系统大师称号', desc: '获得"系统大师"称号', price: 1000, type: 'title', value: '系统大师' },
    { id: 'bundle_hearts', icon: '❤️', name: '心形补给', desc: '立即补满 5 颗心', price: 100, type: 'hearts' },
    { id: 'bundle_xp', icon: '⚡', name: '双倍 XP 加成', desc: '接下来 5 节课获得双倍 XP', price: 150, type: 'boost' },
  ];

  function renderShop() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🛒 学习商城</h2>' +
      '<p class="muted" style="margin-bottom:16px">用宝石换取头像、称号和加成。</p>' +
      '<div class="banner-msg win" style="margin-bottom:16px">你有 <b>' + u.gems + ' 🪙 宝石</b>' + (u.boost && u.boost.active ? ' · <b>双倍 XP 生效中</b>' : '') + '</div>' +
      SHOP_ITEMS.map(item => {
        const owned = u.ownedItems.indexOf(item.id) >= 0;
        const equipId = item.type === 'avatar' ? 'avatar_default' : item.id;
        const equipped = u.equipped && u.equipped[item.type === 'avatar' ? 'avatar' : 'title'] === (item.type === 'avatar' ? item.icon : item.value);
        let action;
        if (item.type === 'hearts') action = '<button class="btn btn-blue btn-sm" data-buy="' + item.id + '">购买</button>';
        else if (item.type === 'boost') action = '<button class="btn btn-orange btn-sm" data-buy="' + item.id + '">购买</button>';
        else if (owned) {
          action = equipped
            ? '<span class="owned-tag">已装备</span>'
            : '<button class="btn btn-ghost btn-sm" data-equip="' + item.id + '">装备</button>';
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
        U.toast('❤️ 心形已补满到 5！');
        renderShop(); return;
      }
      if (item.type === 'boost') {
        u.boost = { active: true, remaining: 5 };
        Auth.saveUser(u);
        SFX.play('coin');
        U.toast('⚡ 接下来 5 节课双倍 XP！');
        renderShop(); return;
      }
      if (u.gems < item.price) { SFX.play('error'); U.toast('宝石不够，先继续学习攒宝石吧！'); return; }
      u.gems -= item.price;
      u.ownedItems.push(item.id);
      if (item.type === 'avatar') u.equipped.avatar = item.icon;
      if (item.type === 'title') u.equipped.title = item.value;
      Auth.saveUser(u);
      SFX.play('coin');
      U.toast('已购买：' + item.name + '！');
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

  /* ---------------- 成就 ---------------- */
  function renderAchievements() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🏅 成就徽章</h2>' +
      '<p class="muted" style="margin-bottom:16px">已解锁 ' + Object.keys(u.achievements).length + ' / ' + U.ACHIEVEMENTS.length + ' 枚</p>' +
      '<div class="ach-grid">' + U.ACHIEVEMENTS.map(a => {
        const earned = u.achievements[a.id];
        return '<div class="ach-card ' + (earned ? '' : 'locked') + '">' +
          '<div class="icon">' + a.icon + '</div>' +
          '<div class="nm">' + a.name + '</div>' +
          '<div class="ds">' + a.desc + '</div>' +
          (earned ? '<div class="wow">⭐ 已获得</div>' : '') + '</div>';
      }).join('') + '</div></div>';
  }

  /* ---------------- 社区 ---------------- */
  function renderCommunity() {
    const u = Auth.currentUser();
    let posts = Store.getPosts();
    posts = posts.sort((a, b) => b.ts - a.ts);
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">💬 学习社区</h2>' +
      '<p class="muted" style="margin-bottom:14px">分享学习心得、提出疑问、互相鼓励。</p>' +
      '<div class="post-input"><input id="post-text" placeholder="分享一点关于系统思考的心得…"><button class="btn btn-green" id="post-send">发布</button></div>' +
      '<div id="post-list">' + posts.map(p => postHtml(p, u)).join('') + '</div>' +
      (posts.length ? '' : '<div class="empty-state"><div class="big">🌍</div><p>成为第一个发帖的人吧！</p></div>') +
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
      (p.comments || []).map(c => '<div style="font-size:13px;margin:6px 0"><b>' + c.author + '：</b>' + esc(c.text) + '</div>').join('') +
      '<div class="post-input" style="margin:8px 0 0"><input id="cc-' + p.id + '" placeholder="回复…"><button class="btn btn-sm btn-ghost" data-ccomment="' + p.id + '">回复</button></div></div>' +
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

  /* ---------------- 笔记 ---------------- */
  function renderNotes() {
    const u = Auth.currentUser();
    const shell = el('shell');
    const notes = u.notes || [];
    const chapters = Curriculum.UNITS.map(unit => '<option value="' + unit.id + '">' + unit.title + '</option>').join('');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📝 学习笔记</h2>' +
      '<p class="muted" style="margin-bottom:14px">在学习每一节时，随时记下你的想法。</p>' +
      '<div class="card"><div style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<select class="type-input" id="note-ch" style="flex:0 0 220px">' + chapters + '</select>' +
      '<input class="type-input grow" id="note-title" placeholder="笔记标题（可选）"></div>' +
      '<textarea class="type-input" id="note-body" rows="3" placeholder="想记住什么？"></textarea>' +
      '<button class="btn btn-green" id="note-save">保存笔记（+2 XP）</button></div>' +
      '<div style="margin-top:16px">' + notes.slice().reverse().map(n =>
        '<div class="note"><div class="ntitle">' + esc(n.title || '未命名笔记') + '</div>' +
        '<div class="nbody">' + esc(n.text) + '</div>' +
        '<div class="nmeta">' + (Curriculum.getUnit(n.chapter) ? n.chapter + ' · ' + Curriculum.getUnit(n.chapter).title : '') + ' · ' + timeAgo(n.ts) +
        ' <button class="btn btn-sm btn-subtle" data-delnote="' + n.id + '">删除</button></div></div>'
      ).join('') + (notes.length ? '' : '<div class="empty-state"><div class="big">🗒️</div><p>还没有笔记。</p></div>') + '</div></div>';
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

  /* ---------------- 证书 ---------------- */
  function renderCertificate() {
    const u = Auth.currentUser();
    const full = U.fullChapters(u);
    const done = full.length >= Curriculum.UNITS.length;
    const title = u.equipped && u.equipped.title ? u.equipped.title : '系统思考学习者';
    const dateStr = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    const shell = el('shell');
    shell.innerHTML = '<div class="view">' +
      (done ? '<div class="certificate"><div class="stamp">已完成</div>' +
        '<h1>成就证书</h1>' +
        '<p class="congrats">兹证明</p>' +
        '<div class="name">' + esc(u.username) + '</div>' +
        '<p class="congrats">已完成《系统之美》全部 8 个单元、' + Curriculum.totalSections + ' 个小节的学习。<br><b>系统之美 · 决策者的系统思考</b><br>德内拉·梅多斯 著</p>' +
        '<div class="detail">颁发于 ' + dateStr + ' · ' + u.xp + ' XP · ' + Object.keys(u.achievements).length + ' 枚成就 · ' + title + '</div>' +
        '<div class="seal">🏅</div></div>' +
        '<div style="text-align:center;margin-top:20px"><button class="btn btn-outline" id="cert-print">🖨️ 打印证书</button></div>'
      : '<div class="empty-state"><div class="big">🎖️</div><h2 style="margin:10px 0">还差一步！</h2>' +
        '<p>完成全部 8 个单元就能获得证书。你已经完成了 <b>' + full.length + ' / ' + Curriculum.UNITS.length + '</b> 个单元。</p>' +
        '<button class="btn btn-green btn-lg" style="margin-top:16px" data-go="home">继续学习</button></div>') +
      '</div>';
    const p = el('cert-print');
    if (p) p.addEventListener('click', () => window.print());
    const h = shell.querySelector('[data-go]');
    if (h) h.addEventListener('click', () => go('home'));
  }

  /* ---------------- 个人资料 ---------------- */
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
      '<div><span class="tag green">等级 ' + u.level + '</span> ' +
      (u.equipped.title ? '<span class="tag blue">' + u.equipped.title + '</span>' : '') +
      '<span class="tag orange">🔥 连续 ' + u.streak + ' 天</span></div>' +
      '<p class="muted" style="margin-top:10px;font-size:13px">加入于 ' + new Date(u.createdAt).toLocaleDateString('zh-CN', { month: 'short', year: 'numeric' }) + '</p>' +
      '<div style="margin-top:14px">' + xpBarHtml(u) + '</div>' +
      '<div class="row gap8" style="justify-content:center;margin-top:10px;flex-wrap:wrap">' +
      '<button class="btn btn-outline btn-sm" data-go="shop">🛒 商城</button>' +
      '<button class="btn btn-outline btn-sm" data-go="achievements">🏅 徽章</button>' +
      '<button class="btn btn-outline btn-sm" data-go="certificate">🎖️ 证书</button>' +
      '<button class="btn btn-outline btn-sm" data-go="plan">🗓️ 计划</button>' +
      '<button class="btn btn-outline btn-sm" data-go="review">📕 错题本</button>' +
      '<button class="btn btn-outline btn-sm" data-go="settings">⚙️ 设置</button>' +
      '</div>' +
      '<button class="btn btn-red btn-sm" id="logout" style="margin-top:14px">退出登录</button></div></div>' +
      '<div>' +
      '<div class="card"><h3>📊 一览</h3>' + reportSummaryHtml(u) + '</div>' +
      '<div class="card"><h3>🎯 今日</h3>' + dailyRows(daily, doneCount) + '</div>' +
      '<div class="card"><h3>⚙️ 设置</h3>' +
      '<div class="row between" style="margin:10px 0"><span>音效</span><label class="switch"><input type="checkbox" id="set-sound"' + (SFX.isMuted() ? '' : ' checked') + '><span class="slider"></span></label></div>' +
      '<div class="row between" style="margin:10px 0"><span>背景音乐</span><label class="switch"><input type="checkbox" id="set-music"' + (SFX.musicOn() ? ' checked' : '') + '><span class="slider"></span></label></div>' +
      '<div class="row between" style="margin:10px 0"><span>❤️ 心形恢复中</span><span class="muted" id="heart-count" style="font-size:13px"></span></div>' +
      '</div></div></div></div>';
    const hc = el('heart-count');
    if (hc) {
      const msLeft = U.heartRegenMsLeft(u);
      if ((u.hearts || 0) >= 5) hc.textContent = '已满';
      else {
        const min = Math.ceil(msLeft / 60000);
        hc.textContent = min + ' 分钟后 +1';
      }
    }
    shell.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => go(b.getAttribute('data-go'))));
    el('logout').addEventListener('click', () => {
      Auth.logout();
      SFX.play('click');
      renderAuth('login');
    });
    el('set-sound').addEventListener('change', e => { SFX.setMuted(!e.target.checked); });
    el('set-music').addEventListener('change', e => { SFX.toggleMusic(); });
  }

  /* ---------------- 游戏 ---------------- */
  function renderGames() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🎮 学习游戏</h2>' +
      '<p class="muted" style="margin-bottom:16px">边玩边学，赢取 XP 和宝石！</p>' +
      '<div class="games-grid">' +
      gameCard('flashcard', '🃏', '翻卡记忆', '复习术语，每赢一局 +5 XP') +
      gameCard('match', '🧩', '配对连连看', '术语配对，+8 XP') +
      gameCard('binary', '🟢', '分类闯关', '给概念分类，+8 XP') +
      gameCard('quizrush', '⏱️', '快问快答', '随机题目极速挑战，+10 XP') +
      '</div>' +
      '<div class="card" style="margin-top:20px"><h3>🏅 游戏战绩</h3>' +
      '<div class="grid-3">' + statCard('🎮', u.gamesPlayed || 0, '参与场次') + statCard('🏆', u.gamesWon || 0, '胜利场次') + statCard('🪙', u.gems, '宝石') + '</div></div>' +
      '</div>';
    shell.querySelectorAll('[data-game]').forEach(b => b.addEventListener('click', () => {
      SFX.play('click');
      window.APP.launchGame(b.getAttribute('data-game'));
    }));
  }
  function gameCard(id, icon, name, desc) {
    return '<div class="game-card" data-game="' + id + '"><div class="icon">' + icon + '</div><h4>' + name + '</h4><p>' + desc + '</p></div>';
  }

  /* ---------------- 计划 ---------------- */
  function renderPlan() {
    const u = Auth.currentUser();
    const plan = u.plan || { enabled: false, days: 5, dailyTarget: 20, time: '20:00' };
    const days = [1, 2, 3, 4, 5, 6, 7];
    const names = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '日' };
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">🗓️ 学习计划</h2>' +
      '<p class="muted" style="margin-bottom:16px">安排每周学习时间与每日目标。</p>' +
      '<div class="two-col">' +
      '<div class="card"><h3>每周安排</h3>' +
      days.map(d => {
        const on = (plan.days & (1 << (d - 1))) > 0;
        return '<div class="plan-item"><div class="day ' + (on ? '' : 'off') + '">周' + names[d] + '</div>' +
          '<span class="ptitle">周' + names[d] + '</span>' +
          '<label class="switch" style="margin-left:auto"><input type="checkbox" data-day="' + d + '"' + (on ? ' checked' : '') + '><span class="slider"></span></label></div>';
      }).join('') +
      '</div>' +
      '<div class="card"><h3>目标与提醒</h3>' +
      '<div class="field"><label>每日 XP 目标</label><input type="number" id="plan-xp" min="5" max="100" step="5" value="' + plan.dailyTarget + '"></div>' +
      '<div class="field"><label>提醒时间</label><input type="time" id="plan-time" value="' + plan.time + '"></div>' +
      '<div class="row between" style="margin:10px 0"><span>开启学习提醒</span><label class="switch"><input type="checkbox" id="plan-remind"' + (u.reminders && u.reminders.enabled ? ' checked' : '') + '><span class="slider"></span></label></div>' +
      '<button class="btn btn-green btn-block" id="plan-save" style="margin-top:12px">保存计划</button>' +
      '<p class="muted" style="font-size:12px;margin-top:10px">🕒 提醒会在设定的时间弹出。</p></div>' +
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
      U.toast('✅ 学习计划已保存！');
      go('plan');
    });
  }

  /* ---------------- 报告 ---------------- */
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
      return '<div style="margin:6px 0"><div class="row between" style="font-size:13px"><span>' + unit.icon + ' ' + unit.title + '</span><b>' + done + '/' + unit.sections.length + '</b></div>' +
        '<div style="height:8px;background:var(--feather);border-radius:6px;overflow:hidden"><div style="width:' + pct + '%;height:100%;background:var(--green);border-radius:6px"></div></div></div>';
    }).join('');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📊 学习报告</h2>' +
      '<p class="muted" style="margin-bottom:16px">你的学习旅程全记录。</p>' +
      '<div class="grid-4">' +
      statCard('📅', u.checkins.length, '学习天数') +
      statCard('🔥', u.streak || 0, '当前连击') +
      statCard('⚡', todayXp, '今日 XP') +
      statCard('🗓️', weeklyXp, '本周 XP') +
      statCard('⭐', u.xp, '总 XP') +
      statCard('📚', u.lessonsCompleted, '已完成课程') +
      statCard('🎯', acc + '%', '准确率') +
      statCard('⏱️', hours + ' 小时', '总学习时长') +
      '</div>' +
      '<div class="card"><h3>📈 逐单元进度</h3>' + perChapter + '</div>' +
      '<div class="card"><h3>🏅 成就一览</h3>' +
      '<p>' + Object.keys(u.achievements).length + ' / ' + U.ACHIEVEMENTS.length + ' 已解锁。</p>' +
      '<div class="row wrap gap8">' + U.ACHIEVEMENTS.filter(a => u.achievements[a.id]).map(a => '<span class="tag blue">' + a.icon + ' ' + a.name + '</span>').join('') + '</div></div>' +
      '<button class="btn btn-outline" id="report-print">🖨️ 打印报告</button></div>';
    el('report-print').addEventListener('click', () => window.print());
  }

  function todayXpCalc(u) {
    const p = u.dailyTaskProgress || {};
    return p.xp || 0;
  }
  function weeklyXpCalc(u) {
    return Math.round(u.xp * 0.25);
  }

  /* ---------------- 每日任务 ---------------- */
  function renderDaily() {
    const u = Auth.currentUser();
    const daily = U.getDailyTasks(u);
    const done = daily.filter(t => t.cur >= t.goal).length;
    const shell = el('shell');
    const ringPct = Math.round(done / daily.length * 100);
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📅 每日任务</h2>' +
      '<p class="muted" style="margin-bottom:16px">每天完成任务，赢取额外宝石。</p>' +
      '<div class="card" style="display:flex;align-items:center;gap:20px">' +
      '<div class="progress-ring"><svg viewBox="0 0 36 36" width="90" height="90">' +
      '<circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--feather)" stroke-width="4"></circle>' +
      '<circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--green)" stroke-width="4" stroke-dasharray="100" stroke-dashoffset="' + (100 - ringPct) + '" stroke-linecap="round" transform="rotate(-90 18 18)"></circle></svg>' +
      '<div class="ring-num">' + done + '/' + daily.length + '</div></div>' +
      '<div><h3>连续打卡：🔥 ' + u.streak + ' 天</h3><p class="muted" style="font-size:13px">每天登录保持连击。</p></div></div>' +
      dailyRows(daily, done) +
      '<button class="btn btn-green btn-block" id="daily-claim" style="margin-top:14px">领取奖励</button></div>';
    el('daily-claim').addEventListener('click', () => {
      const gems = U.awardDailyTaskGems(u);
      Auth.saveUser(u);
      if (gems > 0) { SFX.play('coin'); U.toast('领取了 +' + gems + ' 宝石！'); }
      else { SFX.play('click'); U.toast('先完成任务，再来领奖。'); }
      renderDaily();
    });
  }

  /* ---------------- 错题本 ---------------- */
  function renderReview() {
    const u = Auth.currentUser();
    const book = (u.wrongBook || []).slice().sort((a, b) => b.wrongAt - a.wrongAt);
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">📕 错题本</h2>' +
      '<p class="muted" style="margin-bottom:14px">回顾答错的题，巩固薄弱知识点。</p>' +
      (book.length ? '' : '<div class="empty-state"><div class="big">🎉</div><p>还没有错题，继续保持！</p></div>') +
      '<div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">' +
      '<button class="btn btn-ghost btn-sm" id="review-mastered">清除已掌握</button>' +
      '<button class="btn btn-red btn-sm" id="review-clearall">清空错题本</button></div>' +
      book.map((w, i) => {
        let answerTxt = '';
        if (w.type === 'mc' && w.options) answerTxt = w.options[w.answer];
        else if (w.type === 'tf') answerTxt = w.answer ? '正确' : '错误';
        const unit = Curriculum.getUnit(w.unit);
        return '<div class="note" style="border-left-color:var(--red)">' +
          '<div class="ntitle">' + esc(w.q) + '</div>' +
          '<div class="nbody">✅ 正确答案：<b>' + esc(answerTxt) + '</b></div>' +
          '<div class="nmeta">' + (unit ? unit.title + ' · ' + unit.sections[w.idx] : '') +
          ' · 错 ' + (w.times || 1) + ' 次 · ' + timeAgo(w.wrongAt) +
          ' <button class="btn btn-sm btn-subtle" data-delwrong="' + i + '">移除</button></div></div>';
      }).join('') + '</div>';
    shell.querySelectorAll('[data-delwrong]').forEach(b => b.addEventListener('click', () => {
      const i = parseInt(b.getAttribute('data-delwrong'));
      const item = (u.wrongBook || [])[i];
      if (item) {
        u.wrongBook = u.wrongBook.filter(w => w !== item);
        Auth.saveUser(u);
        SFX.play('click');
        renderReview();
      }
    }));
    const me = el('review-mastered');
    if (me) me.addEventListener('click', () => {
      const n = (u.wrongBook || []).length;
      u.wrongBook = [];
      Auth.saveUser(u);
      SFX.play('coin');
      U.toast('已清除 ' + n + ' 条错题');
      renderReview();
    });
    const ca = el('review-clearall');
    if (ca) ca.addEventListener('click', () => {
      u.wrongBook = [];
      Auth.saveUser(u);
      SFX.play('click');
      U.toast('错题本已清空');
      renderReview();
    });
  }

  /* ---------------- 设置 / 数据管理 ---------------- */
  function renderSettings() {
    const u = Auth.currentUser();
    const shell = el('shell');
    shell.innerHTML = '<div class="view"><h2 style="margin-bottom:6px">⚙️ 设置</h2>' +
      '<p class="muted" style="margin-bottom:16px">音效、通知与数据管理。</p>' +
      '<div class="card"><h3>🔔 提醒通知</h3>' +
      '<div class="row between" style="margin:10px 0"><span>浏览器通知（到点提醒学习）</span><label class="switch"><input type="checkbox" id="set-notif"' + ((u.reminders && u.reminders.notify) ? ' checked' : '') + '><span class="slider"></span></label></div>' +
      '<p class="muted" style="font-size:12px">开启后，到设定的提醒时间会发送浏览器通知（需授权）。</p></div>' +
      '<div class="card"><h3>💾 数据备份</h3>' +
      '<div class="row gap8" style="flex-wrap:wrap">' +
      '<button class="btn btn-outline btn-sm" id="export-data">⬇️ 导出备份</button>' +
      '<button class="btn btn-outline btn-sm" id="import-data">⬆️ 导入备份</button>' +
      '<input type="file" id="import-file" accept="application/json" style="display:none">' +
      '<button class="btn btn-red btn-sm" id="reset-data">🗑️ 重置全部数据</button>' +
      '</div></div>' +
      '<div class="card"><h3>🎨 外观</h3>' +
      '<div class="row between" style="margin:10px 0"><span>深色模式</span><label class="switch"><input type="checkbox" id="set-dark"' + (document.body.classList.contains('dark') ? ' checked' : '') + '><span class="slider"></span></label></div></div>' +
      '</div>';
    el('set-notif').addEventListener('change', e => {
      const on = e.target.checked;
      u.reminders = u.reminders || { enabled: false, time: '20:00' };
      u.reminders.notify = on;
      if (on && 'Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
      Auth.saveUser(u);
      U.toast(on ? '🔔 已开启学习通知' : '🔕 已关闭通知');
    });
    el('set-dark').addEventListener('change', e => {
      document.body.classList.toggle('dark', e.target.checked);
      localStorage.setItem('sys_dark', e.target.checked ? '1' : '0');
      SFX.play('click');
    });
    el('export-data').addEventListener('click', () => {
      const json = Store.exportAll();
      const blob = new Blob([json], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '系统之美-备份-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(a.href);
      U.toast('✅ 备份已导出');
      SFX.play('coin');
    });
    el('import-data').addEventListener('click', () => el('import-file').click());
    el('import-file').addEventListener('change', e => {
      const f = e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const res = Store.importAll(reader.result);
        if (!res.ok) { SFX.play('error'); U.toast(res.err); return; }
        SFX.play('coin');
        U.toast('✅ 已导入 ' + res.users + ' 个账号');
        const cur = Auth.currentUser();
        if (cur) { Views.renderShell(); }
        else { Views.renderAuth('login'); }
      };
      reader.readAsText(f);
    });
    el('reset-data').addEventListener('click', () => {
      if (confirm('确定要重置全部数据吗？此操作不可恢复。')) {
        Store.resetAll();
        localStorage.removeItem('sys_dark');
        localStorage.removeItem('sys_muted');
        localStorage.removeItem('sys_music');
        SFX.play('click');
        Views.renderAuth('login');
      }
    });
  }

  /* ---------------- 助手函数 ---------------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return '刚刚';
    if (m < 60) return m + ' 分钟前';
    const h = Math.floor(m / 60);
    if (h < 24) return h + ' 小时前';
    const d = Math.floor(h / 24);
    return d + ' 天前';
  }

  window.Views = { renderAuth, renderHome, renderStats, renderLeaderboard, renderShop, renderAchievements, renderCommunity, renderNotes, renderCertificate, renderProfile, renderGames, renderPlan, renderReport, renderDaily, renderReview, renderSettings, renderShell, go, esc };
  window.APP = window.APP || {};
  window.APP.go = go;
})();

