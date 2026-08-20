/* ============================================================
   系统之美 — learn.js
   学习引擎：BOPPPS 先学后测流程、XP/宝石、连击、心形、成就
   以及四款学习游戏。
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
    let combo = 0;
    let bestCombo = 0;

    function render() {
      const u = Auth.currentUser();
      const total = questions.length;
      const progress = phase === 'learn' ? 0 : Math.round(qIndex / total * 100);
      if (phase === 'learn') {
        app.innerHTML = '<div class="quiz-shell">' + quizTop('learn', 0, u) +
          '<div class="lesson-banner">' + Art.unitArt(unit.id) + '</div>' +
          '<div class="lesson-card">' + lessonBody + '</div>' +
          '<button class="btn btn-green btn-lg btn-block" id="begin-quiz">🚀 开始测验</button>' +
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
      wireKeyboard(q, qIndex);
      el('quiz-back').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
    }

    function quizTop(ph, progress, u) {
      const comboHtml = combo >= 2 ? '<div class="combo-badge">🔥 x' + combo + '</div>' : '';
      const keyHint = ph === 'quiz' ? '<div class="keyhint" title="键盘快捷键">⌨️</div>' : '';
      return '<div class="quiz-top">' +
        '<button class="back" id="quiz-back">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
        comboHtml +
        keyHint +
        '<div class="lives">' + heartsHtml(u.hearts) + '</div></div>';
    }
    function heartsHtml(n) {
      let s = '';
      for (let i = 0; i < 5; i++) s += '<span style="opacity:' + (i < n ? 1 : 0.2) + '">❤️</span>';
      return s;
    }

    function questionHtml(q, qi) {
      if (q.type === 'tf') {
        return '<div class="option" data-val="true"><span class="letter">✓</span>正确</div>' +
          '<div class="option" data-val="false"><span class="letter">✗</span>错误</div>';
      }
      if (q.type === 'mc') {
        return q.options.map((o, i) => '<div class="option" data-val="' + i + '"><span class="letter">' + String.fromCharCode(65 + i) + '</span>' + esc(o) + '</div>').join('');
      }
      if (q.type === 'type') {
        return '<input class="type-input" id="type-ans" placeholder="输入你的答案…" autocomplete="off">';
      }
      if (q.type === 'match') {
        return '<div id="match-area">' + q.pairs.map((pair, i) =>
          '<div class="match-row"><div class="match-left">' + esc(pair[0]) + '</div>' +
          '<select data-mid="' + i + '"><option value="">—</option>' + q.choices.map((c, j) => '<option value="' + j + '">' + esc(c) + '</option>').join('') + '</select></div>'
        ).join('') + '</div>';
      }
      return '<div class="option" data-val="0"><span class="letter">✓</span>我明白了</div>';
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
        // 供键盘快捷键统一触发
        inp.addEventListener('entercheck', check);
        const btn = document.createElement('button');
        btn.className = 'btn btn-green btn-lg btn-block';
        btn.textContent = '检查';
        btn.style.marginTop = '10px';
        btn.addEventListener('click', check);
        inp.parentNode.appendChild(btn);
        return;
      }
      if (q.type === 'match') {
        const btn = document.createElement('button');
        btn.className = 'btn btn-green btn-lg btn-block';
        btn.textContent = '检查';
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

    // 键盘快捷键：A-D / 1-4 选择，Enter 继续
    let kbHandler = null;
    function wireKeyboard(q, qi) {
      if (kbHandler) { document.removeEventListener('keydown', kbHandler); kbHandler = null; }
      kbHandler = (e) => {
        if (document.querySelector('.feedback')) return; // 反馈弹出时禁用
        if (document.querySelector('.type-input')) {
          if (e.key === 'Enter') { const inp = document.querySelector('.type-input'); if (inp.value.trim()) inp.dispatchEvent(new Event('entercheck')); }
          return;
        }
        const key = e.key.toLowerCase();
        if (q.type === 'mc') {
          const idxMap = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
          if (key in idxMap && idxMap[key] < q.options.length) {
            const opt = document.querySelectorAll('.option')[idxMap[key]];
            if (opt && !opt.disabled) opt.click();
          }
        } else if (q.type === 'tf') {
          if (key === 't' || key === 'y' || key === '1') { const o = document.querySelector('.option[data-val="true"]'); if (o && !o.disabled) o.click(); }
          if (key === 'f' || key === 'n' || key === '2') { const o = document.querySelector('.option[data-val="false"]'); if (o && !o.disabled) o.click(); }
        }
      };
      document.addEventListener('keydown', kbHandler);
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
        combo++;
        if (combo > bestCombo) bestCombo = combo;
        u.bestCombo = Math.max(u.bestCombo || 0, combo);
        if (combo >= 3) SFX.play('combo', combo);
        else SFX.play('correct');
      } else {
        wrongCount++;
        combo = 0;
        // 扣心；若此前满血，标记恢复计时起点
        if (u.hearts >= 5) u.lastHeartTs = Date.now();
        u.hearts = Math.max(0, u.hearts - 1);
        // 记入错题本
        u.wrongBook = u.wrongBook || [];
        const wk = key + '::' + qi;
        if (!u.wrongBook.find(w => w.key === wk)) {
          u.wrongBook.push({
            key: wk, unit: unitId, idx: idx, qi: qi,
            q: q.q, type: q.type, options: q.options || null,
            answer: q.answer, pairs: q.pairs || null, text: q.text || null,
            wrongAt: Date.now(), times: 1,
          });
        } else {
          const w = u.wrongBook.find(w => w.key === wk);
          w.times = (w.times || 0) + 1;
          w.wrongAt = Date.now();
        }
        SFX.play('wrong');
      }
      Auth.saveUser(u);

      const fb = document.createElement('div');
      fb.className = 'feedback ' + (correct ? 'correct' : 'wrong');
      const msg = correct
        ? (q.explain || '答对了！+10 XP')
        : (q.explain || '再想想，正确答案已经标出。继续加油！');
      fb.innerHTML = '<div class="msg">' + (correct ? '✅ ' : '❌ ') + esc(msg) + '</div>' +
        '<button class="btn ' + (correct ? 'btn-green' : 'btn-blue') + '" id="fb-next">' + (qIndex + 1 >= questions.length ? '完成' : '继续') + '</button>';
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
      // 星级评定：>=90 三星，>=70 两星，>=50 一星
      const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
      const starHtml = '⭐⭐⭐'.slice(0, stars * 2) || '☆☆☆';
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
      rec.stars = Math.max(rec.stars || 0, stars);
      rec.done = true;
      u.completedSections[key] = rec;
      U.updateDailyTask(u, 'lessons', 1);
      U.updateDailyTask(u, 'xp', xpGain);
      if (pct >= 90) U.updateDailyTask(u, 'quiz', 1);
      if (u.boost && u.boost.active) { u.boost.remaining--; if (u.boost.remaining <= 0) u.boost.active = false; }
      const newly = U.claimAchievements(u);
      const gems = U.awardDailyTaskGems(u);
      Auth.saveUser(u);
      SFX.play('fanfare');
      U.confetti(60);
      if (newly.length) {
        newly.forEach(a => setTimeout(() => { SFX.play('achievement'); U.toast('🏅 成就：' + a.name); }, 400));
      }
      const comboLine = bestCombo >= 3 ? '<div class="row between" style="margin-top:8px"><span>最高连击</span><b>🔥 x' + bestCombo + '</b></div>' : '';
      const app = el('app');
      app.innerHTML = '<div class="quiz-shell"><div class="view" style="text-align:center">' +
        '<div class="stars" style="font-size:44px;letter-spacing:6px">' + starHtml + '</div>' +
        '<h2 style="margin:8px 0">' + (pct >= 90 ? '太出色了！' : pct >= 60 ? '本节完成！' : '再接再厉！') + '</h2>' +
        '<p class="muted">测验得分 ' + pct + '% · ' + stars + ' 星</p>' +
        '<div class="card" style="max-width:340px;margin:18px auto;text-align:left">' +
        '<div class="row between"><span>获得 XP</span><b>+' + xpGain + ' ⚡</b></div>' +
        '<div class="row between" style="margin-top:8px"><span>宝石</span><b>+' + gemGain + ' 🪙</b></div>' +
        '<div class="row between" style="margin-top:8px"><span>准确率</span><b>' + pct + '%</b></div>' +
        comboLine +
        '</div>' +
        '<button class="btn btn-green btn-lg" id="fin-continue">继续</button></div></div>';
      el('fin-continue').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
    }

    render();
  }

  function lessonHtml(unit, idx) {
    // BOPPPS 学习卡片：导入→目标→前测→参与式学习→后测→总结
    const b = Curriculum.getBOPPPS(unit, idx);
    const questions = Curriculum.getQuestions(unit.id, idx);
    const pre = b.preQ;
    let preHtml = '';
    if (b.preText) {
      preHtml = '<p>🤔 ' + markupText(b.preText) + '</p>';
    }
    if (pre && pre.type === 'mc') {
      preHtml += '<p style="margin-top:8px"><b>热身问题：</b>' + esc(pre.q) + '</p>' +
        '<ol style="padding-left:20px;margin:6px 0">' +
        pre.options.map(o => '<li>' + esc(o) + '</li>').join('') + '</ol>' +
        '<p class="muted" style="font-size:13px">💡 答案就藏在下面的讲解里，认真找找！</p>';
    } else if (pre && pre.type === 'tf') {
      preHtml += '<p style="margin-top:8px"><b>热身：</b>' + esc(pre.q) + ' <span class="muted">（正确 / 错误）</span></p>';
    }

    // 参与式学习：内容相关配图 + 通俗讲解 + 关键点
    const imgKey = 'U' + String(unit.id).padStart(2, '0') + '-S' + String(idx).padStart(2, '0');
    const sectionImg = 'images/lessons/' + imgKey + '.jpg';
    const lessonImg = '<figure class="lesson-figure">' +
      '<img src="' + sectionImg + '" alt="图解：' + esc(b.section) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '<figcaption>' + esc(b.section) + ' · 一览</figcaption></figure>';
    const explain = b.explain ? '<div class="example" style="background:#fff8e6;border-left-color:var(--orange)">' + markupText(b.explain) + '</div>' : '';
    const bullets = b.bullets.map(bl =>
      '<li><span class="term">' + esc(bl.k) + '</span>' + (bl.v ? ' — ' + esc(bl.v) : '') + '</li>'
    ).join('');

    // 后测：提前展示测验题
    const quizPreview = questions.map((q) => {
      if (q.type === 'mc') {
        return '<li><b>' + esc(q.q) + '</b><ol type="a" style="padding-left:20px">' +
          q.options.map(o => '<li>' + esc(o) + '</li>').join('') + '</ol></li>';
      }
      if (q.type === 'tf') {
        return '<li><b>' + esc(q.q) + '</b> <span class="muted">（正确 / 错误）</span></li>';
      }
      return '<li><b>' + esc(q.q) + '</b></li>';
    }).join('');

    // 术语小词典
    let glossary = '';
    if (b.vocab) {
      const entries = Object.keys(b.vocab);
      if (entries.length) {
        glossary = '<div class="vocab"><div class="vocab-title">📖 本节术语 · 通俗解释</div>' +
          entries.map(w => {
            const v = b.vocab[w];
            return '<div class="vocab-item"><span class="vocab-word">' + esc(w) + '</span>' +
              '<span class="vocab-plain">→ ' + esc(v.plain) + '</span></div>';
          }).join('') + '</div>';
      }
    }

    return '<div class="title">' + esc(b.section) + '</div>' +
      '<p class="muted" style="font-size:13px">' + esc(b.unitTitle) + ' · BOPPPS 课程</p>' +

      '<h3>1 · 导入 Bridge-in</h3>' +
      '<div class="example">' + markupText(b.hook) + '</div>' +

      '<h3>2 · 学习目标 Objectives</h3>' +
      '<ul>' + b.objectives.map(o => '<li>🎯 ' + esc(o) + '</li>').join('') + '</ul>' +

      '<h3>3 · 前测 Pre-assessment</h3>' +
      '<div class="def">正式学习之前，先想一想——别紧张，只是热热身。</div>' +
      preHtml +

      '<h3>4 · 参与式学习 Participatory learning</h3>' +
      lessonImg +
      explain +
      '<div class="callout">⭐ 需要掌握的关键点：</div>' +
      '<ul>' + bullets + '</ul>' +
      glossary +

      '<h3>5 · 后测 Post-assessment</h3>' +
      '<div class="def">下面这些就是待会儿要回答的题目。要达到 <b>60% 以上</b>才能完成本节并获得 XP。</div>' +
      '<ol>' + quizPreview + '</ol>' +

      '<h3>6 · 总结 Summary</h3>' +
      '<div class="callout" style="background:#eef7ff;border-left-color:var(--blue)">' + markupText(b.summary) + '</div>';
  }

  // 简单的行内标记：**加粗**、*斜体*
  function markupText(s) {
    let out = esc(s);
    out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    out = out.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    return out;
  }

  /* ============================================================
     游戏
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
      '<div style="font-size:70px">🏆</div><h2>你赢了！</h2>' +
      '<p class="muted">+' + xp + ' XP · +' + gem + ' 宝石</p>' +
      '<button class="btn btn-green btn-lg" id="g-cont">继续</button></div></div>';
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

  // 为快问快答生成 4 个互不重复的选项
  function uniqueOpts(term, pool) {
    const opts = [term.d];
    const others = shuffle(pool.filter(x => x.d !== term.d));
    for (let i = 0; i < others.length && opts.length < 4; i++) {
      if (opts.indexOf(others[i].d) < 0) opts.push(others[i].d);
    }
    while (opts.length < 4) {
      const fill = ['以上都不是', '以上都是', '无法判断'];
      if (opts.indexOf(fill[opts.length - 1]) < 0) opts.push(fill[opts.length - 1]);
      else opts.push('无法确定');
    }
    return shuffle(opts);
  }

  /* -- 翻卡记忆 -- */
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
        '<button class="btn btn-red btn-lg" id="f-know" style="flex:1">没记住</button>' +
        '<button class="btn btn-green btn-lg" id="f-good" style="flex:1">记住了</button></div></div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      el('fc').addEventListener('click', () => { flipped = !flipped; SFX.play('click'); render(); });
      el('f-good').addEventListener('click', () => { SFX.play('correct'); correct++; idx++; flipped = false; render(); });
      el('f-know').addEventListener('click', () => { SFX.play('wrong'); idx++; flipped = false; render(); });
    }
    render();
  }

  /* -- 配对连连看 -- */
  function gameMatch(app, u) {
    const pairs = shuffle(shuffle(allTerms()).slice(0, 5));
    const choices = shuffle(pairs.map(p => p.d));
    let done = 0;
    function render() {
      app.innerHTML = '<div class="quiz-shell"><div class="quiz-top">' +
        '<button class="back" id="gb">✕</button>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round(done / pairs.length * 100) + '%"></div></div>' +
        '<div class="lives">🧩</div></div>' +
        '<div class="question-title">把概念和解释配对</div>' +
        '<div id="ma">' + pairs.map((p, i) =>
          '<div class="match-row"><div class="match-left"><b>' + esc(p.t) + '</b></div>' +
          '<select data-m="' + i + '"><option value="">—</option>' + choices.map((c, j) => '<option value="' + j + '">' + esc(c) + '</option>').join('') + '</select></div>'
        ).join('') + '</div>' +
        '<button class="btn btn-green btn-lg btn-block" id="m-check">检查答案</button></div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      el('m-check').addEventListener('click', () => {
        let all = true;
        document.querySelectorAll('[data-m]').forEach(sel => {
          const i = parseInt(sel.getAttribute('data-m'));
          if (choices[parseInt(sel.value)] !== pairs[i][1]) all = false;
        });
        if (!all) { SFX.play('wrong'); U.toast('有的配对不对，再改改！'); return; }
        SFX.play('correct');
        rewardGame(app, u, 8, 4);
      });
    }
    render();
  }

  /* -- 分类闯关 -- */
  function gameBinary(app, u) {
    const items = [
      { s: '存款越多，利息越多，存款又更多——这是增强回路。', safe: true },
      { s: '室温低了就加热，高了就停止——这是调节回路。', safe: true },
      { s: '一方的军备升级换来对方的军备升级——这是竞争升级。', safe: true },
      { s: '每个人都多用一点公共草场，草场最终荒芜——这是公地悲剧。', safe: true },
      { s: '考试分数下滑，于是降低目标标准——这是目标侵蚀。', safe: true },
      { s: '症状解见效快，被反复使用，根本解被搁置——这是转嫁负担。', safe: true },
      { s: '把所有力量都用来惩罚违规者，从不改变规则——这是正确的系统干预。', safe: false },
      { s: '只要不断加大参数数值，系统就能彻底改变——这是有效的杠杆。', safe: false },
      { s: '只盯容易衡量的指标，忽略重要的东西——这是健康的系统思维。', safe: false },
      { s: '把模型摊开用数据检验——这是把心智模式展现在阳光下。', safe: true },
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
        '<div class="question-title">系统思考，还是思维误区？</div>' +
        '<div class="question-sub">判断下面这句描述是<b>正确的系统思考</b>还是<b>常见的思维误区</b></div>' +
        '<div class="binary-card" id="bc">' + esc(it.s) + '</div>' +
        '<div class="row" style="gap:10px;margin-top:16px">' +
        '<button class="btn btn-green btn-lg" id="b-inc" style="flex:1">系统思考 ✓</button>' +
        '<button class="btn btn-red btn-lg" id="b-dec" style="flex:1">思维误区 ✗</button></div></div>';
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

  /* -- 快问快答 -- */
  function gameQuizRush(app, u) {
    const pool = allTerms();
    const questions = shuffle(pool.map(t => {
      const opts = uniqueOpts(t, pool);
      return { q: t.t, a: t.d, opts };
    }));
    const deck = questions.slice(0, 10);
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

