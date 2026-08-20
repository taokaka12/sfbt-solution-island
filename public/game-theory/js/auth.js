/* ============================================================
   博弈思维 — auth.js
   注册 / 登录，账号数据保存在 localStorage。
   ============================================================ */
(function () {
  'use strict';

  function defaultUser(username) {
    const now = Date.now();
    return {
      username: username,
      createdAt: now,
      xp: 0,
      gems: 60,
      streak: 0,
      lastActiveDay: null,
      bestStreak: 0,
      lastActive: now,
      hearts: 5,
      level: 1,
      completedSections: {},
      quizzesTaken: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      lessonsCompleted: 0,
      perfectLessons: 0,
      checkins: [],
      achievements: {},
      ownedItems: ['avatar_default'],
      equipped: { avatar: '♟️' },
      notes: [],
      plan: { enabled: false, days: 5, dailyTarget: 20, time: '20:00' },
      reminders: { enabled: false, time: '20:00' },
      studySeconds: 0,
      lastReport: null,
      dailyTasksDate: null,
      dailyTaskProgress: {},
      postsMade: 0,
      likesGiven: 0,
      communityPoints: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      simsPlayed: 0,
    };
  }

  function register(username, password) {
    username = (username || '').trim();
    if (username.length < 2) return { ok: false, err: '用户名至少需要 2 个字符。' };
    if (!password || password.length < 4) return { ok: false, err: '密码至少需要 4 个字符。' };
    if (Store.getUser(username)) return { ok: false, err: '这个用户名已经被注册了。' };
    const u = defaultUser(username);
    u.pass = password;
    Store.saveUser(u);
    Store.setSession({ username: username });
    return { ok: true, user: u };
  }

  function login(username, password) {
    username = (username || '').trim();
    const u = Store.getUser(username);
    if (!u) return { ok: false, err: '没有找到这个账号。' };
    if (u.pass !== password) return { ok: false, err: '密码不正确。' };
    Store.setSession({ username: username });
    return { ok: true, user: u };
  }

  function logout() {
    Store.clearSession();
  }

  function currentUser() {
    const s = Store.getSession();
    if (!s || !s.username) return null;
    return Store.getUser(s.username);
  }

  function saveUser(u) {
    Store.saveUser(u);
  }

  window.Auth = { register, login, logout, currentUser, saveUser };
})();

