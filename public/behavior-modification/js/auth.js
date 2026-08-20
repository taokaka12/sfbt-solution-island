/* ============================================================
   BehaviorMod Pro — auth.js
   Registration / login with localStorage-backed user accounts.
   ============================================================ */
(function () {
  'use strict';

  function defaultUser(username) {
    const now = Date.now();
    return {
      username: username,
      createdAt: now,
      xp: 0,
      gems: 50,
      streak: 0,
      lastActiveDay: null,
      bestStreak: 0,
      lastActive: now,
      hearts: 5,
      level: 1,
      completedSections: {},   // sectionKey -> { best:0, done:true }
      quizzesTaken: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      lessonsCompleted: 0,
      perfectLessons: 0,
      checkins: [],            // ['YYYY-MM-DD', ...]
      achievements: {},        // achId -> earned timestamp
      ownedItems: ['avatar_default'],
      equipped: { avatar: '🦉' },
      notes: [],               // { id, text, chapter, ts }
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
    };
  }

  function register(username, password) {
    username = (username || '').trim().toLowerCase();
    if (username.length < 3) return { ok: false, err: 'Username must be at least 3 characters.' };
    if (!/^[a-z0-9_]+$/.test(username)) return { ok: false, err: 'Use letters, numbers, and underscores only.' };
    if (!password || password.length < 4) return { ok: false, err: 'Password must be at least 4 characters.' };
    if (Store.getUser(username)) return { ok: false, err: 'That username is already taken.' };
    const u = defaultUser(username);
    u.pass = password;
    Store.saveUser(u);
    Store.setSession({ username: username });
    return { ok: true, user: u };
  }

  function login(username, password) {
    username = (username || '').trim().toLowerCase();
    const u = Store.getUser(username);
    if (!u) return { ok: false, err: 'No account found with that username.' };
    if (u.pass !== password) return { ok: false, err: 'Incorrect password.' };
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

