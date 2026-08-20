/* ============================================================
   博弈思维 — ui.js
   共享 UI 助手：提示、庆祝、彩带、XP/等级、成就引擎、每日任务、排行榜。
   ============================================================ */
(function () {
  'use strict';

  const LEVEL_XP = 100;
  const ACHIEVEMENTS = [
    { id: 'first_lesson', icon: '🎓', name: '初入博弈', desc: '完成第一节课', check: u => u.lessonsCompleted >= 1 },
    { id: 'five_lessons', icon: '📚', name: '策略新秀', desc: '完成 5 节课', check: u => u.lessonsCompleted >= 5 },
    { id: 'twenty_five', icon: '📖', name: '博弈学者', desc: '完成 25 节课', check: u => u.lessonsCompleted >= 25 },
    { id: 'chapter_complete', icon: '🏁', name: '章节通关', desc: '完成第一个完整章节', check: u => fullChapters(u).length >= 1 },
    { id: 'half_book', icon: '📗', name: '半程智士', desc: '完成全书一半的章节', check: u => fullChapters(u).length >= 4 },
    { id: 'streak_3', icon: '🔥', name: '渐入佳境', desc: '连续打卡 3 天', check: u => u.bestStreak >= 3 },
    { id: 'streak_7', icon: '⚡', name: '七天连击', desc: '连续打卡 7 天', check: u => u.bestStreak >= 7 },
    { id: 'streak_30', icon: '🌋', name: '博弈大师', desc: '连续打卡 30 天', check: u => u.bestStreak >= 30 },
    { id: 'level_5', icon: '⭐', name: '策略新星', desc: '达到 5 级', check: u => u.level >= 5 },
    { id: 'level_10', icon: '💎', name: '钻石思维', desc: '达到 10 级', check: u => u.level >= 10 },
    { id: 'quiz_master', icon: '🏆', name: '测验达人', desc: '答对 100 道题', check: u => u.correctAnswers >= 100 },
    { id: 'perfect_lesson', icon: '✨', name: '完美无缺', desc: '无错完成一节课', check: u => (u.perfectLessons || 0) >= 1 },
    { id: 'combo_5', icon: '🔥', name: '连击新星', desc: '在一节课中连对 5 题', check: u => (u.bestCombo || 0) >= 5 },
    { id: 'combo_10', icon: '🌪️', name: '连击大师', desc: '在一节课中连对 10 题', check: u => (u.bestCombo || 0) >= 10 },
    { id: 'gems_500', icon: '🪙', name: '宝石富翁', desc: '持有 500 颗宝石', check: u => u.gems >= 500 },
    { id: 'notes_5', icon: '📝', name: '笔记达人', desc: '写下 5 条学习笔记', check: u => u.notes.length >= 5 },
    { id: 'community_star', icon: '💬', name: '社区之星', desc: '发表 3 条社区帖子', check: u => u.postsMade >= 3 },
    { id: 'gamer', icon: '🎮', name: '游戏冠军', desc: '赢得 3 场学习游戏', check: u => u.gamesWon >= 3 },
    { id: 'checkin_7', icon: '📅', name: '持之以恒', desc: '累计打卡 7 天', check: u => u.checkins.length >= 7 },
    { id: 'full_book', icon: '👑', name: '博弈之王', desc: '完成全书的每一个小节', check: u => fullChapters(u).length >= 19 },
    { id: 'sim_win', icon: '🤖', name: '模拟大师', desc: '在博弈模拟器中获胜 3 次', check: u => (u.simsWon || 0) >= 3 },
  ];

  function fullChapters(u) {
    const done = {};
    Curriculum.UNITS.forEach(unit => {
      let all = true;
      unit.sections.forEach((s, i) => {
        const k = Curriculum.getSectionKey(unit.id, i);
        if (!u.completedSections[k]) all = false;
      });
      if (all) done[unit.id] = true;
    });
    return Object.keys(done).map(Number);
  }

  function levelFromXp(xp) { return Math.floor(xp / LEVEL_XP) + 1; }
  function xpIntoLevel(xp) { return xp % LEVEL_XP; }
  function xpToNext(xp) { return LEVEL_XP - (xp % LEVEL_XP); }

  function icons() {
    return {
      flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 23c4.97 0 8-3.58 8-8 0-3.5-2-6.5-4-8 .5 2-1 3.5-2.5 3.5C12.5 10.5 12 9 12.5 7.5 11 9 10 11 10 13c0 1-.3 1.7-.7 2.2C8 13 8 10 8 10c-2 2.2-3 5-3 7 0 4.42 3.03 8 7 8z"/></svg>',
      gem: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l4 5h-8l4-5zm-2 8h4l-2 12-2-12zm8 0h4l-2.5 6.5L18 9zM6 9l-3.5 6.5L0 9h6z"/></svg>',
      heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.7-10-9C.4 9 2 5 6 5c2.4 0 4 1.5 6 4 2-2.5 3.6-4 6-4 4 0 5.6 4 4 7-2.5 4.3-10 9-10 9z"/></svg>',
      lightning: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
      trophy: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 2h14v3h3v4c0 3-2.5 5-6 5.2V16h3v4H5v-4h3v-1.8C4.5 14 2 12 2 9V5h3V2zm2 2H4v3c0 2.5 1.7 4.1 4 4.3V4zm13 0h-3v7.3c2.3-.2 4-1.8 4-4.3V4z"/></svg>',
      book: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.5A6 6 0 006.5 4H2v16h4.5A6 6 0 0112 22a6 6 0 015.5-2H22V4h-4.5A6 6 0 0012 5.5zm1 13.3V8a4 4 0 012.5-.9H20v9.5h-4.5a6 6 0 00-2.5.7z"/></svg>',
    };
  }

  function toast(msg, ms) {
    const old = document.querySelector('.toast');
    if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms || 2600);
  }

  function confetti(n) {
    const colors = ['#2e9e4f', '#2a7de1', '#f7c948', '#e24b3f', '#8f6bd8', '#f59f2a', '#17a396'];
    for (let i = 0; i < (n || 80); i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (2.2 + Math.random() * 1.8) + 's';
      p.style.animationDelay = (Math.random() * 0.7) + 's';
      p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4800);
    }
  }

  function celebration({ title, subtitle, xp, onDone, confettiOn }) {
    SFX.play('fanfare');
    if (confettiOn !== false) confetti(90);
    const overlay = document.createElement('div');
    overlay.className = 'celebration';
    const faces = ['😀', '🎉', '😎', '🏆', '🤩'];
    const balloons = ['🎈', '🎈', '🎈', '🎊', '🎈'].map((b, i) =>
      '<div class="balloon" style="left:' + (12 + i * 19) + '%;animation-delay:' + (i * 0.5) + 's">' + b + '</div>'
    ).join('');
    overlay.innerHTML =
      balloons +
      '<div class="inner">' +
      '<div class="face">' + faces[Math.floor(Math.random() * faces.length)] + '</div>' +
      '<h2>' + title + '</h2>' +
      (subtitle ? '<p class="muted" style="margin-top:6px">' + subtitle + '</p>' : '') +
      (xp ? '<div class="xp">+' + xp + ' XP</div>' : '') +
      '<button class="btn btn-green btn-lg btn-block" id="cel-done">继续</button>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#cel-done').addEventListener('click', () => {
      overlay.remove();
      if (onDone) onDone();
    });
  }

  function rating(score, total) {
    const p = score / total;
    if (p >= 0.9) return { face: '😍', title: '太棒了！', sound: 'correct' };
    if (p >= 0.7) return { face: '😃', title: '干得漂亮！', sound: 'correctWarm' };
    if (p >= 0.5) return { face: '🙂', title: '继续加油！', sound: 'whoosh' };
    return { face: '💪', title: '再练一练！', sound: 'whoosh' };
  }

  function getDailyTasks(u) {
    const today = todayStr();
    if (u.dailyTasksDate !== today) {
      u.dailyTasksDate = today;
      u.dailyTaskProgress = { xp: 0, lessons: 0, quiz: 0, sim: 0 };
    }
    const p = u.dailyTaskProgress;
    return [
      { id: 'xp', name: '今天赚 20 XP', goal: 20, cur: p.xp, reward: 5 },
      { id: 'lessons', name: '完成 2 节课', goal: 2, cur: p.lessons, reward: 5 },
      { id: 'sim', name: '玩 1 次博弈模拟器', goal: 1, cur: p.sim, reward: 5 },
    ];
  }

  function updateDailyTask(u, id, val) {
    const p = u.dailyTaskProgress || {};
    if (id === 'xp') p.xp = (p.xp || 0) + val;
    if (id === 'lessons') p.lessons = (p.lessons || 0) + val;
    if (id === 'quiz') p.quiz = 1;
    if (id === 'sim') p.sim = (p.sim || 0) + (val || 1);
    u.dailyTaskProgress = p;
  }

  function awardDailyTaskGems(u) {
    const tasks = getDailyTasks(u);
    let newGems = 0;
    tasks.forEach(t => {
      if (t.cur >= t.goal) {
        if (!(u.dailyTaskProgress.done && u.dailyTaskProgress.done[t.id])) {
          newGems += t.reward;
          u.gems += t.reward;
          u.dailyTaskProgress.done = Object.assign({}, u.dailyTaskProgress.done, { [t.id]: true });
        }
      }
    });
    return newGems;
  }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function daysAgoStr(n) {
    const d = new Date(Date.now() - n * 86400000);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function leaderboard() {
    const users = Store.getUsers();
    const rows = Object.keys(users).map(name => ({
      name: name,
      xp: users[name].xp || 0,
      level: users[name].level || 1,
      avatar: (users[name].equipped && users[name].equipped.avatar) || '♟️',
      streak: users[name].streak || 0,
    }));
    rows.sort((a, b) => b.xp - a.xp);
    return rows;
  }

  function addXp(u, amount, opts) {
    opts = opts || {};
    const before = u.level;
    u.xp += amount;
    u.level = levelFromXp(u.xp);
    u.lastActive = Date.now();
    if (u.level > before) {
      SFX.play('levelUp');
      toast('🎉 升级了！你达到了 ' + u.level + ' 级！');
      confetti(60);
    }
    return { leveledUp: u.level > before, newLevel: u.level };
  }

  function claimAchievements(u) {
    const newly = [];
    ACHIEVEMENTS.forEach(a => {
      if (!u.achievements[a.id] && a.check(u)) {
        u.achievements[a.id] = Date.now();
        newly.push(a);
      }
    });
    return newly;
  }

  function setHearts(u, n) {
    u.hearts = Math.max(0, Math.min(5, n));
    u.lastHeartTs = Date.now();
  }

  const HEART_REGEN_MS = 30 * 60 * 1000;
  function regenHearts(u) {
    if ((u.hearts || 0) >= 5) return u.hearts;
    const last = u.lastHeartTs || Date.now();
    const now = Date.now();
    let gained = Math.floor((now - last) / HEART_REGEN_MS);
    if (gained > 0) {
      u.hearts = Math.min(5, (u.hearts || 0) + gained);
      u.lastHeartTs = last + gained * HEART_REGEN_MS;
      if ((u.hearts || 0) >= 5) u.lastHeartTs = now;
    }
    return u.hearts;
  }
  function heartRegenMsLeft(u) {
    if ((u.hearts || 0) >= 5) return 0;
    const last = u.lastHeartTs || Date.now();
    const passed = Date.now() - last;
    return Math.max(0, HEART_REGEN_MS - (passed % HEART_REGEN_MS));
  }

  window.UI = {
    icons, toast, confetti, celebration, rating, LEVEL_XP,
    levelFromXp, xpIntoLevel, xpToNext, fullChapters,
    getDailyTasks, updateDailyTask, awardDailyTaskGems, todayStr, daysAgoStr,
    leaderboard, addXp, claimAchievements, setHearts, ACHIEVEMENTS,
    regenHearts, heartRegenMsLeft,
  };
})();

