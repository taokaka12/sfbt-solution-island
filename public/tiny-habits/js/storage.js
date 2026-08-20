/* ============================================================
   Tiny Habits — storage.js
   localStorage 持久化：用户、会话、排行榜、学习数据与习惯花园。
   ============================================================ */
(function () {
  'use strict';
  const LS = window.localStorage;
  const KEYS = {
    users: 'th_users',
    session: 'th_session',
    posts: 'th_posts',
    notifs: 'th_notifs',
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

    // 导出 / 导入全部数据（备份）
    exportAll() {
      return JSON.stringify({
        v: 2,
        users: Store.getUsers(),
        posts: Store.getPosts(),
        notifs: Store.getNotifs(),
        exportedAt: Date.now(),
      }, null, 2);
    },
    importAll(json) {
      try {
        const data = JSON.parse(json);
        if (!data || (data.v !== 1 && data.v !== 2) || typeof data.users !== 'object') return { ok: false, err: '备份文件格式不正确。' };
        const cur = Store.getUsers();
        // 合并用户（同名的覆盖），保留其他备份内容
        Object.keys(data.users).forEach(n => { cur[n] = data.users[n]; });
        write(KEYS.users, cur);
        if (Array.isArray(data.posts)) write(KEYS.posts, data.posts);
        if (Array.isArray(data.notifs)) write(KEYS.notifs, data.notifs);
        return { ok: true, users: Object.keys(data.users).length };
      } catch (e) {
        return { ok: false, err: '备份文件无法解析。' };
      }
    },
    resetAll() {
      Object.keys(KEYS).forEach(k => { try { LS.removeItem(KEYS[k]); } catch (e) {} });
    },
  };

  window.Store = Store;
})();

