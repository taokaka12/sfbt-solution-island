/* ============================================================
   BehaviorMod Pro — learn.js
   The lesson engine: BOPPPS learn-then-quiz flow per section,
   XP/gems, streaks, hearts, achievements, and the four learning
   games.
   ============================================================ */
(function () {
  'use strict';
  const U = UI;

  function startLesson(unitId, idx, key) {
    const unit = Curriculum.getUnit(unitId);
    if (!unit) return;
    const questions = Curriculum.getQuestions(unitId, idx);
    const app = document.getElementById('app');

    const lessonBody = lessonHtml(unit, idx);

    let qIndex = 0;
    let score = 0;
    let wrongCount = 0;
    let phase = 'learn';

    function render() {
      const u = Auth.currentUser();
      const total = questions.length;
      const progress = phase === 'learn' ? 0 : Math.round(qIndex / total * 100);
      if (phase === 'learn') {
        app.innerHTML = '<div class="quiz-shell">' + quizTop('learn', 0, u) +
          '<div class="lesson-banner">' + Art.unitArt(unit.id) + '</div>' +
          '<div class="lesson-card">' + lessonBody + '</div>' +
          '<button class="btn btn-green btn-lg btn-block" id="begin-quiz">🚀 Start the Quiz</button>' +
          '</div>';
        el('begin-quiz').addEventListener('click', () => { SFX.play('whoosh'); phase = 'quiz'; qIndex = 0; render(); });
        el('quiz-back').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
        return;
      }
      if (qIndex >= total) return finish();
      const q = questions[qIndex];
      app.innerHTML = '<div class="quiz-shell">' + quizTop('quiz', progress, u) +
        '<div class="question-title">' + esc(q.q) + '</div>' +
        (q.hint ? '<div class="question-sub">💡 ' + esc(q.hint) + '</div>' : '') +
        questionHtml(q, qIndex) +
        '</div>';
      wireQuestion(q, qIndex);
      el('quiz-back').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
    }

    function quizTop(ph, progress, u) {
      return '<div class="quiz-top">' +
        '<button class="back" id="quiz-back">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
        '<div class="lives">' + heartsHtml(u.hearts) + '</div></div>';
    }
    function heartsHtml(n) {
      let s = '';
      for (let i = 0; i < 5; i++) s += '<span style="opacity:' + (i < n ? 1 : 0.2) + '">❤️</span>';
      return s;
    }

    function questionHtml(q, qi) {
      if (q.type === 'tf') {
        return '<div class="option" data-val="true"><span class="letter">✓</span>True</div>' +
          '<div class="option" data-val="false"><span class="letter">✗</span>False</div>';
      }
      if (q.type === 'mc') {
        return q.options.map((o, i) => '<div class="option" data-val="' + i + '"><span class="letter">' + String.fromCharCode(65 + i) + '</span>' + esc(o) + '</div>').join('');
      }
      if (q.type === 'type') {
        return '<input class="type-input" id="type-ans" placeholder="Type your answer…" autocomplete="off">';
      }
      if (q.type === 'match') {
        return '<div id="match-area">' + q.pairs.map((pair, i) =>
          '<div class="match-row"><div class="match-left">' + esc(pair[0]) + '</div>' +
          '<select data-mid="' + i + '"><option value="">—</option>' + q.choices.map((c, j) => '<option value="' + j + '">' + esc(c) + '</option>').join('') + '</select></div>'
        ).join('') + '</div>';
      }
      return '<div class="option" data-val="0"><span class="letter">✓</span>I understand</div>';
    }

    function wireQuestion(q, qi) {
      if (q.type === 'type') {
        const inp = el('type-ans');
        inp.focus();
        const check = () => {
          const v = inp.value.trim().toLowerCase();
          if (!v) return;
          grade(q, qi, v);
        };
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
        const btn = document.createElement('button');
        btn.className = 'btn btn-green btn-lg btn-block';
        btn.textContent = 'Check';
        btn.style.marginTop = '10px';
        btn.addEventListener('click', check);
        inp.parentNode.appendChild(btn);
        return;
      }
      if (q.type === 'match') {
        const btn = document.createElement('button');
        btn.className = 'btn btn-green btn-lg btn-block';
        btn.textContent = 'Check';
        btn.style.marginTop = '10px';
        btn.addEventListener('click', () => {
          const vals = [];
          document.querySelectorAll('[data-mid]').forEach(sel => vals.push(parseInt(sel.value)));
          if (vals.some(v => isNaN(v))) { SFX.play('error'); return; }
          const correct = q.pairs.every((pair, i) => pair[1] === q.choices[vals[i]]);
          grade(q, qi, correct, vals);
        });
        document.getElementById('match-area').appendChild(btn);
        return;
      }
      document.querySelectorAll('.option').forEach(o => o.addEventListener('click', () => {
        const val = o.getAttribute('data-val');
        const correct = q.type === 'tf' ? (val === 'true') === !!q.answer : parseInt(val) === q.answer;
        grade(q, qi, correct, val);
      }));
    }

    function grade(q, qi, correct, raw) {
      const u = Auth.currentUser();
      if (q.type === 'mc' || q.type === 'tf') {
        document.querySelectorAll('.option').forEach(o => o.disabled = true);
        const target = document.querySelector('.option[data-val="' + (q.type === 'tf' ? (q.answer ? 'true' : 'false') : q.answer) + '"]');
        if (target) target.classList.add('correct');
        if (!correct) {
          const sel = document.querySelector('.option[data-val="' + raw + '"]');
          if (sel && !sel.classList.contains('correct')) sel.classList.add('wrong');
        }
      }
      if (q.type === 'type') {
        const inp = el('type-ans');
        if (correct) inp.classList.add('good'); else inp.classList.add('bad');
      }
      u.totalAnswers = (u.totalAnswers || 0) + 1;
      if (correct) {
        u.correctAnswers = (u.correctAnswers || 0) + 1;
        score += 10;
        SFX.play('correct');
      } else {
        wrongCount++;
        u.hearts = Math.max(0, u.hearts - 1);
        SFX.play('wrong');
      }
      Auth.saveUser(u);

      const fb = document.createElement('div');
      fb.className = 'feedback ' + (correct ? 'correct' : 'wrong');
      const msg = correct
        ? (q.explain || 'Correct! +10 XP')
        : (q.explain || 'Not quite. The correct answer is highlighted. Keep going!');
      fb.innerHTML = '<div class="msg">' + (correct ? '✅ ' : '❌ ') + esc(msg) + '</div>' +
        '<button class="btn ' + (correct ? 'btn-green' : 'btn-blue') + '" id="fb-next">' + (qIndex + 1 >= questions.length ? 'Finish' : 'Continue') + '</button>';
      document.body.appendChild(fb);
      el('fb-next').addEventListener('click', () => {
        fb.remove();
        qIndex++;
        render();
      });
    }

    function finish() {
      const u = Auth.currentUser();
      const pct = questions.length ? Math.round(score / (questions.length * 10) * 100) : 0;
      let xpGain = Math.round(score * (u.boost && u.boost.active ? 2 : 1));
      const gemGain = pct >= 60 ? (pct >= 90 ? 6 : 3) : 1;
      u.lessonsCompleted = (u.lessonsCompleted || 0) + 1;
      if (wrongCount === 0) u.perfectLessons = (u.perfectLessons || 0) + 1;
      u.xp += xpGain;
      u.gems += gemGain;
      u.level = U.levelFromXp(u.xp);
      u.studySeconds += 120;
      const rec = u.completedSections[key] || {};
      rec.best = Math.max(rec.best || 0, xpGain);
      rec.done = true;
      u.completedSections[key] = rec;
      U.updateDailyTask(u, 'lessons', 1);
      U.updateDailyTask(u, 'xp', xpGain);
      if (pct >= 90) U.updateDailyTask(u, 'quiz', 1);
      if (u.boost && u.boost.active) { u.boost.remaining--; if (u.boost.remaining <= 0) u.boost.active = false; }
      const newly = U.claimAchievements(u);
      const gems = U.awardDailyTaskGems(u);
      Auth.saveUser(u);
      SFX.play('complete');
      U.confetti(60);
      if (newly.length) {
        newly.forEach(a => setTimeout(() => { SFX.play('achievement'); U.toast('🏅 Achievement: ' + a.name); }, 400));
      }
      const app = el('app');
      app.innerHTML = '<div class="quiz-shell"><div class="view" style="text-align:center">' +
        '<div style="font-size:80px">' + (pct >= 90 ? '🏆' : pct >= 60 ? '🎉' : '💪') + '</div>' +
        '<h2 style="margin:8px 0">' + (pct >= 90 ? 'Outstanding!' : pct >= 60 ? 'Section completed!' : 'Almost there!') + '</h2>' +
        '<p class="muted">You scored ' + pct + '% on the quiz.</p>' +
        '<div class="card" style="max-width:340px;margin:18px auto;text-align:left">' +
        '<div class="row between"><span>XP earned</span><b>+' + xpGain + ' ⚡</b></div>' +
        '<div class="row between" style="margin-top:8px"><span>Gems</span><b>+' + gemGain + ' 🪙</b></div>' +
        '<div class="row between" style="margin-top:8px"><span>Accuracy</span><b>' + pct + '%</b></div>' +
        '</div>' +
        '<button class="btn btn-green btn-lg" id="fin-continue">Continue</button></div></div>';
      el('fin-continue').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
    }

    render();
  }

  function lessonHtml(unit, idx) {
    // Build a BOPPPS study card with rich, plain-language content:
    // Bridge-in → Objectives → Pre-assessment → Participatory learning
    // (creative explanation + key points) → Post-assessment (the quiz
    // itself) → Summary. Hard words are highlighted with IPA + a plain
    // explanation, plus a full glossary.
    const b = Curriculum.getBOPPPS(unit, idx);
    const questions = Curriculum.getQuestions(unit.id, idx);
    const pre = b.preQ;
    let preHtml = '';
    if (b.preText) {
      preHtml = '<p>🤔 ' + markupText(b.preText) + '</p>';
    }
    if (pre && pre.type === 'mc') {
      preHtml += '<p style="margin-top:8px"><b>Warm-up question:</b> ' + esc(pre.q) + '</p>' +
        '<ol style="padding-left:20px;margin:6px 0">' +
        pre.options.map(o => '<li>' + esc(o) + '</li>').join('') + '</ol>' +
        '<p class="muted" style="font-size:13px">💡 Answer hidden in the lesson below — look for it!</p>';
    } else if (pre && pre.type === 'tf') {
      preHtml += '<p style="margin-top:8px"><b>Warm-up:</b> ' + esc(pre.q) + ' <span class="muted">(True / False)</span></p>';
    }

    // Participatory learning: a content-matched diagram + creative explanation + key points
    const imgKey = 'U' + String(unit.id).padStart(2, '0') + '-S' + String(idx).padStart(2, '0');
    const sectionImg = 'images/lessons/' + imgKey + '.jpg';
    const lessonImg = '<figure class="lesson-figure">' +
      '<img src="' + sectionImg + '" alt="Diagram: ' + esc(b.section) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '<figcaption>' + esc(b.section) + ' — at a glance</figcaption></figure>';
    const explain = b.explain ? '<div class="example" style="background:#fff8e6;border-left-color:var(--orange)">' + markupText(b.explain) + '</div>' : '';
    const bullets = b.bullets.map(bl =>
      '<li><span class="term">' + esc(bl.k) + '</span>' + (bl.v ? ' — ' + esc(bl.v) : '') + '</li>'
    ).join('');

    // Post-assessment: the actual quiz questions shown up front
    const quizPreview = questions.map((q) => {
      if (q.type === 'mc') {
        return '<li><b>' + esc(q.q) + '</b><ol type="a" style="padding-left:20px">' +
          q.options.map(o => '<li>' + esc(o) + '</li>').join('') + '</ol></li>';
      }
      if (q.type === 'tf') {
        return '<li><b>' + esc(q.q) + '</b> <span class="muted">(True / False)</span></li>';
      }
      return '<li><b>' + esc(q.q) + '</b></li>';
    }).join('');

    // Glossary of hard words (above CET-4) with IPA + plain meaning
    let glossary = '';
    if (b.vocab) {
      const entries = Object.keys(b.vocab);
      if (entries.length) {
        glossary = '<div class="vocab"><div class="vocab-title">📖 Hard words — said simply</div>' +
          entries.map(w => {
            const v = b.vocab[w];
            return '<div class="vocab-item"><span class="vocab-word">' + esc(w) + '</span> ' +
              '<span class="vocab-ipa">' + esc(v.ipa) + '</span>' +
              '<span class="vocab-plain">→ ' + esc(v.plain) + '</span></div>';
          }).join('') + '</div>';
      }
    }

    return '<div class="title">' + esc(b.section) + '</div>' +
      '<p class="muted" style="font-size:13px">' + esc(b.unitTitle) + ' · BOPPPS lesson</p>' +

      '<h3>1 · Bridge-in</h3>' +
      '<div class="example">' + markupText(b.hook) + '</div>' +

      '<h3>2 · Objectives</h3>' +
      '<ul>' + b.objectives.map(o => '<li>🎯 ' + esc(o) + '</li>').join('') + '</ul>' +

      '<h3>3 · Pre-assessment</h3>' +
      '<div class="def">Before we dive in, think about this — no pressure, just warm up your brain.</div>' +
      preHtml +

      '<h3>4 · Participatory learning</h3>' +
      lessonImg +
      explain +
      '<div class="callout">⭐ Key points to lock in:</div>' +
      '<ul>' + bullets + '</ul>' +
      glossary +

      '<h3>5 · Post-assessment</h3>' +
      '<div class="def">These are the exact questions you will answer next. You need <b>60% or higher</b> to complete the section and earn XP.</div>' +
      '<ol>' + quizPreview + '</ol>' +

      '<h3>6 · Summary</h3>' +
      '<div class="callout" style="background:#eef7ff;border-left-color:var(--blue)">' + markupText(b.summary) + '</div>';
  }

  // Minimal inline markup: **bold**, *italic*.
  function markupText(s) {
    let out = esc(s);
    out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    out = out.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    return out;
  }

  /* ============================================================
     GAMES
  ============================================================ */
  function launchGame(id) {
    const u = Auth.currentUser();
    const app = el('app');
    const games = {
      flashcard: gameFlashcard,
      match: gameMatch,
      binary: gameBinary,
      quizrush: gameQuizRush,
    };
    const fn = games[id];
    if (fn) { u.gamesPlayed = (u.gamesPlayed || 0) + 1; Auth.saveUser(u); fn(app, u); }
  }

  function rewardGame(app, u, xp, gem) {
    u.xp += xp;
    u.gems += gem;
    u.gamesWon = (u.gamesWon || 0) + 1;
    u.studySeconds += 60;
    const newly = U.claimAchievements(u);
    Auth.saveUser(u);
    SFX.play('complete');
    U.confetti(40);
    newly.forEach(a => setTimeout(() => { SFX.play('achievement'); U.toast('🏅 ' + a.name); }, 400));
    app.innerHTML = '<div class="quiz-shell"><div class="view" style="text-align:center">' +
      '<div style="font-size:70px">🏆</div><h2>You won!</h2>' +
      '<p class="muted">+' + xp + ' XP · +' + gem + ' gems</p>' +
      '<button class="btn btn-green btn-lg" id="g-cont">Continue</button></div></div>';
    el('g-cont').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
  }

  function allTerms() {
    const out = [];
    Curriculum.UNITS.forEach(unit => unit.sections.forEach((s, i) => {
      const qs = Curriculum.getQuestions(unit.id, i);
      qs.forEach(q => {
        if (q.type === 'mc') out.push({ t: q.q.replace(/\s*\(.+?\)\s*/, ' '), d: q.options[q.answer] });
      });
    }));
    return out;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* -- Flashcard Flip -- */
  function gameFlashcard(app, u) {
    const terms = shuffle(allTerms()).slice(0, 10);
    let idx = 0, correct = 0, flipped = false;
    function render() {
      if (idx >= terms.length) return rewardGame(app, u, correct >= 8 ? 10 : 5, correct >= 8 ? 5 : 2);
      const card = terms[idx];
      app.innerHTML = '<div class="quiz-shell"><div class="quiz-top">' +
        '<button class="back" id="gb">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round(idx / terms.length * 100) + '%"></div></div>' +
        '<div class="lives">🃏 ' + (idx + 1) + '/' + terms.length + '</div></div>' +
        '<div class="fc-card" id="fc">' + (flipped ? card.d : card.t) + '</div>' +
        '<div class="row" style="gap:10px;margin-top:16px">' +
        '<button class="btn btn-red btn-lg" id="f-know" style="flex:1">Not sure</button>' +
        '<button class="btn btn-green btn-lg" id="f-good" style="flex:1">I knew it</button></div></div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      el('fc').addEventListener('click', () => { flipped = !flipped; SFX.play('click'); render(); });
      el('f-good').addEventListener('click', () => { SFX.play('correct'); correct++; idx++; flipped = false; render(); });
      el('f-know').addEventListener('click', () => { SFX.play('wrong'); idx++; flipped = false; render(); });
    }
    render();
  }

  /* -- Match Maker -- */
  function gameMatch(app, u) {
    const pairs = shuffle(shuffle(allTerms()).slice(0, 5));
    const choices = shuffle(pairs.map(p => p.d));
    let done = 0;
    function render() {
      app.innerHTML = '<div class="quiz-shell"><div class="quiz-top">' +
        '<button class="back" id="gb">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round(done / pairs.length * 100) + '%"></div></div>' +
        '<div class="lives">🧩</div></div>' +
        '<div class="question-title">Match each concept to its definition</div>' +
        '<div id="ma">' + pairs.map((p, i) =>
          '<div class="match-row"><div class="match-left"><b>' + esc(p.t) + '</b></div>' +
          '<select data-m="' + i + '"><option value="">—</option>' + choices.map((c, j) => '<option value="' + j + '">' + esc(c) + '</option>').join('') + '</select></div>'
        ).join('') + '</div>' +
        '<button class="btn btn-green btn-lg btn-block" id="m-check">Check answers</button></div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      el('m-check').addEventListener('click', () => {
        let all = true;
        document.querySelectorAll('[data-m]').forEach(sel => {
          const i = parseInt(sel.getAttribute('data-m'));
          if (choices[parseInt(sel.value)] !== pairs[i][1]) all = false;
        });
        if (!all) { SFX.play('wrong'); U.toast('Some matches are wrong — fix them!'); return; }
        SFX.play('correct');
        rewardGame(app, u, 8, 4);
      });
    }
    render();
  }

  /* -- Sort It Out (binary) -- */
  function gameBinary(app, u) {
    const items = [
      { s: 'A reward given after studying increases studying.', safe: true },
      { s: 'Removing chores after tantrums increases tantrums.', safe: true },
      { s: 'Losing recess for misbehavior decreases the behavior.', safe: false },
      { s: 'Ignoring a behavior that used to get attention decreases it.', safe: false },
      { s: 'Presenting praise after sharing increases sharing.', safe: true },
      { s: 'Taking away a video game after hitting decreases hitting.', safe: false },
      { s: 'A child cleans to end nagging — cleaning increases.', safe: true },
      { s: 'Time-out removes access to fun and decreases misbehavior.', safe: false },
    ];
    const deck = shuffle(items).slice(0, 6);
    let idx = 0, correct = 0, answered = false;
    function render() {
      if (idx >= deck.length) return rewardGame(app, u, correct >= 4 ? 8 : 4, correct >= 4 ? 4 : 2);
      const it = deck[idx];
      app.innerHTML = '<div class="quiz-shell"><div class="quiz-top">' +
        '<button class="back" id="gb">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round(idx / deck.length * 100) + '%"></div></div>' +
        '<div class="lives">🟢</div></div>' +
        '<div class="question-title">Reinforcement or Punishment?</div>' +
        '<div class="question-sub">Does this event <b>increase</b> (reinforcement) or <b>decrease</b> (punishment) the behavior?</div>' +
        '<div class="binary-card" id="bc">' + esc(it.s) + '</div>' +
        '<div class="row" style="gap:10px;margin-top:16px">' +
        '<button class="btn btn-green btn-lg" id="b-inc" style="flex:1">Increase (Reinforcement)</button>' +
        '<button class="btn btn-red btn-lg" id="b-dec" style="flex:1">Decrease (Punishment)</button></div></div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      const pick = (val) => {
        if (answered) return;
        answered = true;
        const good = val === it.safe;
        const card = el('bc');
        card.style.borderColor = good ? 'var(--green)' : 'var(--red)';
        card.style.background = good ? '#e6ffd1' : '#ffe4e4';
        if (good) { SFX.play('correct'); correct++; } else SFX.play('wrong');
        setTimeout(() => { idx++; answered = false; render(); }, 900);
      };
      el('b-inc').addEventListener('click', () => pick(true));
      el('b-dec').addEventListener('click', () => pick(false));
    }
    render();
  }

  /* -- Quiz Rush -- */
  function gameQuizRush(app, u) {
    const questions = shuffle(allTerms().map(t => ({ q: t.t, a: t.d, opts: shuffle([t.d].concat(shuffle(allTerms()).slice(0, 3).map(x => x.d))) })));
    const deck = questions.slice(0, 10).map(q => {
      if (q.opts.length < 4) q.opts = shuffle([q.a, 'None of the above', 'All of the above', 'Cannot be determined']);
      return q;
    });
    let idx = 0, correct = 0;
    function render() {
      if (idx >= deck.length) return rewardGame(app, u, correct >= 7 ? 12 : 5, correct >= 7 ? 6 : 2);
      const q = deck[idx];
      app.innerHTML = '<div class="quiz-shell"><div class="quiz-top">' +
        '<button class="back" id="gb">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round(idx / deck.length * 100) + '%"></div></div>' +
        '<div class="lives">⏱️ ' + (idx + 1) + '/' + deck.length + '</div></div>' +
        '<div class="question-title">' + esc(q.q) + '</div>' +
        q.opts.map((o, i) => '<div class="option" data-o="' + i + '"><span class="letter">' + String.fromCharCode(65 + i) + '</span>' + esc(o) + '</div>').join('') +
        '</div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      document.querySelectorAll('.option').forEach(o => o.addEventListener('click', () => {
        const good = q.opts[parseInt(o.getAttribute('data-o'))] === q.a;
        document.querySelectorAll('.option').forEach(x => x.disabled = true);
        o.classList.add(good ? 'correct' : 'wrong');
        if (good) { SFX.play('correct'); correct++; } else { SFX.play('wrong'); }
        setTimeout(() => { idx++; render(); }, 800);
      }));
    }
    render();
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function el(id) { return document.getElementById(id); }

  window.Learn = { startLesson, launchGame };
  window.APP = window.APP || {};
  window.APP.startLesson = startLesson;
  window.APP.launchGame = launchGame;
})();

