/* ============================================================
   BehaviorMod Pro — storage.js
   localStorage-backed persistence: users, session, leaderboard,
   community posts, and per-user learning data.
   ============================================================ */
(function () {
  'use strict';
  const LS = window.localStorage;
  const KEYS = {
    users: 'bm_users',
    session: 'bm_session',
    posts: 'bm_posts',
    notifs: 'bm_notifs',
  };

  function read(key, fallback) {
    try {
      const raw = LS.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { LS.setItem(key, JSON.stringify(val)); } catch (e) { /* quota */ }
  }

  const Store = {
    getUsers() {
      const u = read(KEYS.users, {});
      if (typeof u !== 'object' || Array.isArray(u)) return {};
      return u;
    },
    saveUser(u) {
      const users = Store.getUsers();
      users[u.username] = u;
      write(KEYS.users, users);
    },
    getUser(name) {
      const users = Store.getUsers();
      return users[name] || null;
    },
    getSession() { return read(KEYS.session, null); },
    setSession(s) { write(KEYS.session, s); },
    clearSession() { LS.removeItem(KEYS.session); },

    getPosts() {
      const p = read(KEYS.posts, []);
      return Array.isArray(p) ? p : [];
    },
    savePosts(posts) { write(KEYS.posts, posts); },

    getNotifs() { return read(KEYS.notifs, []); },
    saveNotifs(n) { write(KEYS.notifs, n); },
  };

  window.Store = Store;
})();

