/* ============================================================
   博弈思维 — app.js
   入口：启动应用、管理会话、提醒定时器。
   ============================================================ */
(function () {
  'use strict';

  function boot() {
    if (localStorage.getItem('gt_dark') === '1') document.body.classList.add('dark');
    const u = Auth.currentUser();
    if (u) {
      if (u.plan === undefined) u.plan = { enabled: false, days: 5, dailyTarget: 20, time: '20:00' };
      if (u.reminders === undefined) u.reminders = { enabled: false, time: '20:00' };
      if (u.ownedItems === undefined) u.ownedItems = ['avatar_default'];
      if (u.equipped === undefined) u.equipped = { avatar: '♟️' };
      if (u.completedSections === undefined) u.completedSections = {};
      if (u.studySeconds === undefined) u.studySeconds = 0;
      if (u.achievements === undefined) u.achievements = {};
      if (u.notes === undefined) u.notes = [];
      if (u.boost === undefined) u.boost = { active: false, remaining: 0 };
      if (u.gems === undefined) u.gems = 60;
      if (u.checkins === undefined) u.checkins = [];
      if (u.wrongBook === undefined) u.wrongBook = [];
      if (u.bestCombo === undefined) u.bestCombo = 0;
      if (u.simsPlayed === undefined) u.simsPlayed = 0;
      if (u.simsWon === undefined) u.simsWon = 0;
      UI.regenHearts(u);
      Auth.saveUser(u);
      Views.renderShell();
    } else {
      Views.renderAuth('login');
    }
    startReminderLoop();
  }

  function startReminderLoop() {
    setInterval(() => {
      const u = Auth.currentUser();
      if (!u) return;
      if (!u.reminders || !u.reminders.enabled) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const cur = hh + ':' + mm;
      if (cur === u.reminders.time) {
        SFX.play('achievement');
        UI.toast('🔔 学习提醒：该开始今天的博弈课啦！');
        if (u.reminders.notify && 'Notification' in window && Notification.permission === 'granted') {
          try { new Notification('⏰ 博弈思维 · 学习提醒', { body: '该开始今天的博弈课啦！' }); } catch (e) {}
        }
      }
    }, 30000);
  }

  document.addEventListener('DOMContentLoaded', boot);
})();

