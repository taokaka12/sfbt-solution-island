/* ============================================================
   Tiny Habits — learn.js
   学习引擎：BOPPPS+P 先学后测流程、XP/宝石、连击、心形、成就。
   四步：导入→目标→前测→参与式学习 →【实践】→ 后测→总结。
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
      const progress = phase === 'learn' || phase === 'practice' ? 0 : Math.round(qIndex / total * 100);
      if (phase === 'learn') {
        app.innerHTML = '<div class="quiz-shell">' + quizTop('learn', 0, u) +
          '<div class="lesson-banner">' + Art.unitArt(unit.id) + '</div>' +
          '<div class="lesson-card">' + lessonBody + '</div>' +
          '<button class="btn btn-green btn-lg btn-block" id="begin-quiz">🧪 开始实践（再做测验）</button>' +
          '</div>';
        el('begin-quiz').addEventListener('click', () => { SFX.play('whoosh'); phase = 'practice'; render(); });
        el('quiz-back').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
        // 思考提示按钮：点击展开/收起提示
        document.querySelectorAll('[data-rhint]').forEach(btn => {
          btn.addEventListener('click', () => {
            SFX.play('click');
            const box = document.getElementById('rh-' + btn.getAttribute('data-rhint'));
            if (box) box.hidden = !box.hidden;
            btn.textContent = box.hidden ? '💡 思考提示' : '🙈 收起提示';
          });
        });
        return;
      }
      if (phase === 'practice') {
        const sc = Curriculum.getBOPPPS(unit, idx);
        if (window.Practice) {
          Practice.render({ key, unitId, idx, sc, onDone: () => { phase = 'quiz'; qIndex = 0; render(); } });
        } else {
          phase = 'quiz'; qIndex = 0; render();
        }
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
        '<div class="fb-next-wrap"><button class="btn ' + (correct ? 'btn-green' : 'btn-blue') + '" id="fb-next">' + (qIndex + 1 >= questions.length ? '完成' : '继续') + '</button></div>';
      // 反馈插入到题目选项正下方（quiz-shell 内部），而非固定底部通栏
      const shell = document.querySelector('.quiz-shell');
      if (shell) shell.appendChild(fb);
      else document.body.appendChild(fb);
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
    // BOPPPS+P 学习卡片：导入→目标→前测→参与式学习→实践→后测→总结
    const b = Curriculum.getBOPPPS(unit, idx);
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

    // 参与式学习：内联 SVG 配图 + 结构化讲解（分段/小标题/列表/要点框）
    const lessonImg = Art.sectionFigure(unit.id, b.section);
    const explain = b.explain ? '<div class="example explain-body">' + richText(b.explain) + '</div>' : '';
    const bullets = b.bullets.map(bl =>
      '<li><span class="term">' + esc(bl.k) + '</span>' + (bl.v ? ' — ' + esc(bl.v) : '') + '</li>'
    ).join('');

    // 实践步骤：预览
    const p = b.practice || { type: 'celebration', prompt: '动手实践这一节的方法。' };
    const practiceHtml = '<div class="callout" style="background:rgba(45,212,191,.08);border-left-color:var(--teal)">' +
      '<div style="font-weight:800;color:var(--teal);font-family:var(--mono);letter-spacing:1px;font-size:12px">🧪 PRACTICE · 动手实践</div>' +
      '<p style="margin-top:6px">' + markupText(p.prompt || '动手实践这一节的方法。') + '</p>' +
      '<p class="muted" style="font-size:12px;margin-top:6px">这一步将在下一页完成——真正做一个微习惯，而不是只读它。</p></div>';

    // 后测：换成与生活相关的思考题（每个带"思考提示"按钮）
    const reflections = b.reflections || [];
    let reflectionsHtml = '<div class="def">学到这里，停下来想一想：把这一节的想法，用到你自己的学习和生活里。下面是两道思考题——先自己想想，实在没头绪再点"思考提示"。</div>';
    if (reflections.length) {
      reflectionsHtml += reflections.map((r, ri) =>
        '<div class="reflection-item">' +
        '<div class="rq">' + markupText(r.q) + '</div>' +
        '<div class="reflection-hint" id="rh-' + ri + '" hidden>' + markupText(r.hint || '') + '</div>' +
        '<button class="btn btn-ghost btn-sm" style="margin-top:10px" data-rhint="' + ri + '">💡 思考提示</button>' +
        '</div>'
      ).join('');
    } else {
      reflectionsHtml += '<p class="muted">（本节暂无思考题）</p>';
    }

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
      '<p class="muted" style="font-size:13px">' + esc(b.unitTitle) + ' · BOPPPS+P 课程</p>' +

      '<h3>1 · 导入 Bridge-in</h3>' +
      '<div class="example">' + markupText(b.hook) + '</div>' +

      '<h3>2 · 学习目标 Objectives</h3>' +
      '<ul>' + b.objectives.map(o => '<li>🎯 ' + esc(o) + '</li>').join('') + '</ul>' +

      '<h3>3 · 前测 Pre-assessment</h3>' +
      preHtml +

      '<h3>4 · 参与式学习 Participatory learning</h3>' +
      '<figure class="lesson-figure">' + lessonImg +
      '<figcaption>' + esc(b.section) + ' · 一览</figcaption></figure>' +
      explain +
      '<div class="callout">⭐ 需要掌握的关键点：</div>' +
      '<ul>' + bullets + '</ul>' +
      glossary +

      '<h3>5 · 实践 Practice</h3>' +
      practiceHtml +

      '<h3>6 · 后测 Post-assessment</h3>' +
      reflectionsHtml +

      '<h3>7 · 总结 Summary</h3>' +
      '<div class="callout" style="background:rgba(96,165,250,.08);border-left-color:var(--blue)">' + markupText(b.summary) + '</div>';
  }

  // 简单的行内标记：**加粗**、*斜体*
  function markupText(s) {
    let out = esc(s);
    out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    out = out.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    return out;
  }

  /* 富文本排版：把 explain 内容按特殊标记渲染成结构化卡片。
     支持标记：
       ## 小标题
       - 列表项
       *** 分隔 / 要点框（会自动拆成"要点框标题 + 项目"）
       【图示|图标】内联示意图（图标来自 emoji 或指定 SVG）
       【引用】引用框
     普通段落自动分段。 */
  function richText(s) {
    const lines = String(s).split('\n');
    const out = [];
    let inCallout = false;
    let calloutTitle = '';
    let calloutItems = [];
    let inQuote = false;
    let quoteLines = [];

    function flushCallout() {
      if (!calloutItems.length && !calloutTitle) return;
      out.push('<div class="ex-callout"><div class="ex-callout-title">' + calloutTitle + '</div>' +
        '<ul>' + calloutItems.map(it => '<li>' + it + '</li>').join('') + '</ul></div>');
      calloutItems = [];
      calloutTitle = '';
    }
    function flushQuote() {
      if (!quoteLines.length) return;
      out.push('<blockquote class="ex-quote">' + quoteLines.join('<br>') + '</blockquote>');
      quoteLines = [];
    }

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const line = raw.trim();
      // 空行：要点框内部不关闭（允许框内项目分段），仅在遇到新标记时收尾
      if (!line) {
        if (inQuote) { flushQuote(); inQuote = false; }
        continue;
      }

      // 图示：整行【图示|...】或行内
      if (line.startsWith('【图示')) {
        flushCallout(); flushQuote();
        const m = line.match(/^【图示\|([^】]+)】/);
        out.push('<div class="ex-fig">' + (m ? m[1] : '') + '</div>');
        continue;
      }
      // 引用
      if (line.startsWith('【引用】')) {
        flushCallout(); inQuote = true; quoteLines.push(markupText(line.slice(4))); continue;
      }
      if (inQuote) { quoteLines.push(markupText(line)); continue; }

      // 小标题
      if (line.startsWith('## ')) {
        flushCallout(); flushQuote(); inCallout = false; inQuote = false;
        out.push('<h4 class="ex-h4">' + markupText(line.slice(3)) + '</h4>');
        continue;
      }
      // 要点框：`***` 单独一行，或 `*** 标题` 同行开始
      if (line.startsWith('***')) {
        flushCallout(); flushQuote();
        inCallout = true;
        const rest = line.slice(3).trim();
        calloutTitle = rest ? markupText(rest) : '';
        continue;
      }
      if (inCallout) {
        if (calloutTitle === '') { calloutTitle = markupText(line); }
        else { calloutItems.push(markupText(line)); }
        continue;
      }
      // 列表
      if (line.startsWith('- ')) {
        flushQuote();
        out.push('<p class="ex-li">· ' + markupText(line.slice(2)) + '</p>');
        continue;
      }
      // 普通段落
      flushQuote();
      out.push('<p>' + markupText(line) + '</p>');
    }
    flushCallout(); flushQuote();

    // 行内图示（不在行首的【图示|...】）
    return out.join('').replace(/【图示\|([^】]+)】/g, '<span class="ex-inline-fig">$1</span>');
  }

  /* ============================================================
     导出
     ============================================================ */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function el(id) { return document.getElementById(id); }

  window.Learn = { startLesson };
  window.APP = window.APP || {};
  window.APP.startLesson = startLesson;
})();
