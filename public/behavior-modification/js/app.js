/* ============================================================
   BehaviorMod Pro — app.js
   Entry point: boot the app, manage session, reminder timer.
   ============================================================ */
(function () {
  'use strict';

  function boot() {
    const u = Auth.currentUser();
    if (u) {
      // migration: ensure new fields exist
      if (u.plan === undefined) u.plan = { enabled: false, days: 5, dailyTarget: 20, time: '20:00' };
      if (u.reminders === undefined) u.reminders = { enabled: false, time: '20:00' };
      if (u.ownedItems === undefined) u.ownedItems = ['avatar_default'];
      if (u.equipped === undefined) u.equipped = { avatar: '🦉' };
      if (u.completedSections === undefined) u.completedSections = {};
      if (u.studySeconds === undefined) u.studySeconds = 0;
      if (u.achievements === undefined) u.achievements = {};
      if (u.notes === undefined) u.notes = [];
      if (u.boost === undefined) u.boost = { active: false, remaining: 0 };
      if (u.gems === undefined) u.gems = 50;
      if (u.checkins === undefined) u.checkins = [];
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
        UI.toast('🔔 Study reminder: time for your daily lesson!');
      }
    }, 30000);
  }

  document.addEventListener('DOMContentLoaded', boot);
})();

