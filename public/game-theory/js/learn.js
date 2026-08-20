/* ============================================================
   博弈思维 — learn.js
   学习引擎：BOPPPS 先学后测流程、XP/宝石、连击、心形、成就、
   四款学习游戏 + 交互式博弈模拟器。
   ============================================================ */
(function () {
  'use strict';
  const U = UI;

  function startLesson(unitId, idx, key) {
    // 进入课程时回到页面顶部
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
        // 「想一想」按钮：展开 / 收起思考思路
        document.querySelectorAll('.think-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const hid = btn.getAttribute('data-think');
            const box = document.getElementById('think-' + hid);
            if (!box) return;
            const willShow = box.hidden;
            box.hidden = !willShow;
            SFX.play(willShow ? 'reveal' : 'click');
            btn.textContent = willShow ? '🙈 收起来' : '💡 想一想';
          });
        });
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
          grade(q, qi, v.indexOf(q.answer.toLowerCase()) >= 0);
        };
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
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

    let kbHandler = null;
    function wireKeyboard(q, qi) {
      if (kbHandler) { document.removeEventListener('keydown', kbHandler); kbHandler = null; }
      kbHandler = (e) => {
        if (document.querySelector('.feedback')) return;
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
        if (u.hearts >= 5) u.lastHeartTs = Date.now();
        u.hearts = Math.max(0, u.hearts - 1);
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
    const b = Curriculum.getBOPPPS(unit, idx);
    const key = Curriculum.getSectionKey(unit.id, idx);
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

    // 参与式学习：内容相关收益矩阵（SVG 内联） + 通俗讲解 + 关键点
    const matrix = matrixForSection(unit.id, idx);

    const explain = b.explain ? '<div class="example" style="background:#f6f4ee;border-left-color:var(--orange)">' + markupText(b.explain) + '</div>' : '';
    const bullets = b.bullets.map(bl =>
      '<li><span class="term">' + esc(bl.k) + '</span>' + (bl.v ? ' — ' + esc(bl.v) : '') + '</li>'
    ).join('');

    // 现实生活思考题（取代原后测题目预览）
    const thinks = ((typeof window !== 'undefined' && window.ThinkBank) ? window.ThinkBank[key] : null) || [];
    const thinkHtml = thinks.length
      ? '<div class="think-list">' + thinks.map((t, i) =>
          '<div class="think-item"><div class="think-q"><span class="think-num">' + (i + 1) + '</span>' + esc(t.q) + '</div>' +
          '<button class="btn btn-ghost btn-sm think-btn" data-think="' + key + '-' + i + '">💡 想一想</button>' +
          '<div class="think-hint" id="think-' + key + '-' + i + '" hidden>' + markupText(t.hint) + '</div></div>'
        ).join('') + '</div>'
      : '<p class="muted">本节思考题正在路上，先进入测验检验你的理解吧！</p>';

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
      preHtml +

      '<h3>4 · 参与式学习 Participatory learning</h3>' +
      matrix +
      explain +
      '<div class="callout">⭐ 需要掌握的关键点：</div>' +
      '<ul>' + bullets + '</ul>' +
      glossary +

      '<h3>5 · 后测 Post-assessment · 现实生活思考题</h3>' +
      '<div class="def">把本节博弈思维用到现实里，想一想这些场景你会怎么做。点击「想一想」获取思考方向（没有标准答案，重在思考过程）。</div>' +
      thinkHtml +

      '<h3>6 · 总结 Summary</h3>' +
      '<div class="callout" style="background:#eef7ff;border-left-color:var(--blue)">' + markupText(b.summary) + '</div>';
  }

  // 为特定小节返回收益矩阵 HTML（若适用）
  function matrixForSection(unitId, idx) {
    const key = 'U' + unitId + '-S' + idx;
    const MATRICES = {
      'U5-S0': { r1: '抗拒', r2: '坦白', c1: '抗拒', c2: '坦白',
        vals: [[0.5,0.5,'各坐半年','最优解'], [5,0,'A被放 B坐5年'], [0,5,'A坐5年 B被放'], [3,3,'各坐3年','均衡']],
        eq: [3], caption: '囚犯困境：每个人的理性选择（坦白）导致最差结果', title: '表5.2 · 囚犯困境' },
      'U9-S0': { r1: '大猪按', r2: '大猪等', c1: '小猪按', c2: '小猪等',
        vals: [[5,1,'都按'], [4,4,'大猪按·小猪等','均衡'], [-1,9,'小猪按·大猪等'], [0,0,'都不按']],
        eq: [1], caption: '智猪博弈：小猪等是占优策略，均衡（4,4）', title: '表9.1 · 智猪博弈' },
      'U10-S0': { r1: '甲进攻', r2: '甲后退', c1: '乙进攻', c2: '乙后退',
        vals: [[-10,-10,'两败俱伤'], [10,0,'甲赢','均衡1'], [0,10,'乙赢','均衡2'], [5,5,'相安无事']],
        eq: [1,2], caption: '懦夫博弈：两个纳什均衡（一进一退）', title: '表10.1 · 懦夫博弈' },
      'U11-S0': { r1: '丈夫球赛', r2: '丈夫偶像剧', c1: '妻子球赛', c2: '妻子偶像剧',
        vals: [[2,1,'都看球','均衡1'], [0,0,'分开看'], [0,0,'分开看'], [1,2,'都看偶像剧','均衡2']],
        eq: [0,3], caption: '性别战：两个均衡都在对角线上（共赢）', title: '表11.1 · 性别战' },
      'U12-S1': { r1: '侍从信公主', r2: '侍从不信', c1: '公主说真话', c2: '公主骗他',
        vals: [[5,5,'目标一致'], [0,0], [0,0], [2,2,'目标一致但互相猜疑']],
        eq: [0], caption: '信任博弈：利益一致时信任才有基础', title: '信任博弈' },
      'U13-S0': { r1: '你出石头', r2: '你出布', c1: '对方出石头', c2: '对方出布',
        vals: [[0,0,'平'], [-1,1,'你输'], [1,-1,'你赢'], [0,0,'平']],
        caption: '石头剪子布：没有纯策略纳什均衡，要用混合策略', title: '石头剪子布' },
      'U15-S0': { r1: '提议者提9:1', r2: '提议者提5:5', c1: '响应者接受', c2: '响应者拒绝',
        vals: [[9,1,'理性预测'], [0,0,'双输'], [5,5,'现实常见'], [0,0,'双输']],
        caption: '最后通牒：理性预测与公平现实之间的差距', title: '最后通牒博弈' },
      'U18-S1': { r1: '我合作', r2: '我背叛', c1: '你合作', c2: '你背叛',
        vals: [[3,3,'双赢'], [0,5,'我吃亏'], [5,0,'我占便宜'], [1,1,'双输']],
        caption: '重复博弈：双方都合作（3,3）是最优长期结果', title: '重复囚犯困境' },
    };
    const m = MATRICES[key];
    if (!m) return '';
    return '<div class="payoff-wrap">' +
      '<div style="font-size:13px;font-weight:900;margin-bottom:6px;color:var(--green-deep)">📊 ' + esc(m.title || '收益矩阵') + '</div>' +
      '<div class="payoff">' +
      '<div class="corner">对局</div>' +
      '<div class="col-head">' + esc(m.c1) + '</div>' +
      '<div class="col-head">' + esc(m.c2) + '</div>' +
      '<div class="row-head">' + esc(m.r1) + '</div>' + mcell(m.vals[0], 0, m.eq) + mcell(m.vals[1], 1, m.eq) +
      '<div class="row-head">' + esc(m.r2) + '</div>' + mcell(m.vals[2], 2, m.eq) + mcell(m.vals[3], 3, m.eq) +
      '</div>' +
      (m.caption ? '<div class="payoff-caption">' + esc(m.caption) + '</div>' : '') +
      '<div class="payoff-legend"><span>👤 行（甲）收益在前，列（乙）收益在后</span>' +
      (m.eq && m.eq.length ? '<span>🟩 <b>纳什均衡</b></span>' : '') + '</div>' +
      '</div>';
  }
  function mcell(v, idx, eq) {
    const isEq = eq && eq.indexOf(idx) >= 0;
    const note = v[2] ? v[2] : '';
    const eqTag = v[3] ? v[3] : '';
    return '<div class="cell ' + (isEq ? 'eq' : '') + '"><div class="pay">' + v[0] + '，' + v[1] + '</div>' +
      '<div class="who">' + esc(note) + (eqTag ? ' · ' + eqTag : '') + '</div></div>';
  }

  function markupText(s) {
    let out = esc(s);
    out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    out = out.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    return out;
  }

  /* ============================================================
     博弈模拟器
     ============================================================ */
  function launchSim(type) {
    const sims = {
      prisoner: simPrisoner,
      auction: simAuction,
      boxedpigs: simBoxedPigs,
      chicken: simChicken,
      battle: simBattle,
      ultimatum: simUltimatum,
      repeated: simRepeated,
    };
    const fn = sims[type];
    if (fn) fn();
  }

  function simShell(title, desc, bodyHtml, back) {
    return '<div class="quiz-shell"><div class="quiz-top">' +
      '<button class="back" id="sim-back">✕</button>' +
      '<div style="font-weight:900;font-size:17px">🎮 ' + esc(title) + '</div></div>' +
      '<div class="sim-card"><h3>' + esc(title) + '</h3>' +
      '<p class="sim-desc">' + esc(desc) + '</p>' + bodyHtml + '</div></div>';
  }

  function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function el(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  function rewardSim(u, win, xp, gem) {
    u.simsPlayed = (u.simsPlayed || 0) + 1;
    if (win) u.simsWon = (u.simsWon || 0) + 1;
    U.updateDailyTask(u, 'sim', 1);
    U.updateDailyTask(u, 'xp', xp);
    const newly = U.claimAchievements(u);
    Auth.saveUser(u);
    if (newly.length) newly.forEach(a => setTimeout(() => { SFX.play('achievement'); U.toast('🏅 ' + a.name); }, 400));
  }

  /* -- 囚犯困境 -- */
  function simPrisoner() {
    const app = el('app');
    const title = '囚犯困境';
    const desc = '你和同伙被抓了，警察分开关押。坦白=配合警察，抗拒=配合同伙。你的同伙（AI）已经先想好了策略。你选择？';
    function render(result) {
      let body;
      if (result) {
        body = '<div class="sim-result">' +
          '<div class="big">' + result.title + '</div>' +
          '<div class="sub">' + result.desc + '</div>' +
          '<div class="payout-row"><span>你：<b>' + result.you + ' 年</b></span>' +
          '<span>同伙：<b>' + result.them + ' 年</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + result.lesson + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
      } else {
        body = '<div class="sim-choices">' +
          '<button class="sim-choice" data-act="confess"><span class="emoji">😈</span>坦白</button>' +
          '<button class="sim-choice" data-act="silent"><span class="emoji">😇</span>抗拒</button>' +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); render(null); });
      document.querySelectorAll('.sim-choice').forEach(b => b.addEventListener('click', () => {
        const u = Auth.currentUser();
        const me = b.getAttribute('data-act');
        const them = Math.random() < 0.5 ? 'confess' : 'silent';
        SFX.play('reveal');
        let r;
        if (me === 'confess' && them === 'confess') r = { title: '都坦白', desc: '各坐 3 年', you: 3, them: 3, lesson: '这就是占优策略均衡——但不是好结果。' };
        if (me === 'confess' && them === 'silent') r = { title: '你坦白，他抗拒', desc: '你被释放，同伙坐 5 年', you: 0, them: 5, lesson: '你的收益建立在同伙的巨大损失上。' };
        if (me === 'silent' && them === 'confess') r = { title: '你抗拒，他坦白', desc: '你坐 5 年，同伙被释放', you: 5, them: 0, lesson: '最惨的情况——你为信任付出了代价。' };
        if (me === 'silent' && them === 'silent') r = { title: '都抗拒', desc: '各坐 0.5 年', you: 0.5, them: 0.5, lesson: '最优结果！你们合作成功，警察失望了。' };
        const win = me === 'silent' && them === 'silent';
        rewardSim(u, win, win ? 12 : 4, win ? 6 : 2);
        SFX.play(win ? 'win' : 'lose');
        render(r);
      }));
    }
    render(null);
  }

  /* -- 万元陷阱拍卖 -- */
  function simAuction() {
    const app = el('app');
    const title = '万元陷阱';
    const desc = '拍卖 100 元！出价最高者以所出价格得到它，出价第二高者也要付所出价格。你和 AI 轮流加价（每次+10元）。能停就停！';
    let myBid = 0, aiBid = 0, myTurn = true, round = 0;
    function render(result) {
      let body;
      if (result) {
        body = '<div class="sim-result">' +
          '<div class="big">' + result.title + '</div>' +
          '<div class="sub">' + result.desc + '</div>' +
          '<div class="payout-row"><span>你：<b>' + result.you + ' 元</b></span>' +
          '<span>AI：<b>' + result.them + ' 元</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + result.lesson + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
      } else {
        body = '<div class="vs-wrap">' +
          '<div class="vs-chip"><span class="face">😎</span><span class="name">你</span><span class="act" id="my-act">' + (myBid ? myBid + ' 元' : '—') + '</span></div>' +
          '<div class="vs-vs">VS</div>' +
          '<div class="vs-chip"><span class="face">🤖</span><span class="name">AI</span><span class="act" id="ai-act">' + (aiBid ? aiBid + ' 元' : '—') + '</span></div>' +
          '</div>' +
          '<div class="sim-choices">' +
          (myTurn
            ? '<button class="sim-choice" data-a="bid"><span class="emoji">💰</span>加价 +10</button>' +
              '<button class="sim-choice" data-a="quit"><span class="emoji">🛑</span>放弃</button>'
            : '<button class="sim-choice" style="border-color:var(--purple);cursor:wait"><span class="emoji">🤖</span>AI 思考中…</button>') +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); myBid = aiBid = 0; myTurn = true; round = 0; render(null); });
      document.querySelectorAll('.sim-choice').forEach(b => b.addEventListener('click', () => {
        const action = b.getAttribute('data-a');
        if (action === 'bid') {
          SFX.play('deal');
          myTurn = false;
          myBid += 10;
          round++;
          render(null);
          // AI 决定
          setTimeout(() => {
            const u = Auth.currentUser();
            // AI 策略：若自己已经亏太多或有得赚概率低则放弃；否则加价
            const aiLoses = aiBid > 100;
            const myLead = myBid <= aiBid;
            const quit = !myLead && (Math.random() < 0.4 || aiBid >= 90);
            if (quit) {
              const youPay = myBid, aiPay = aiBid;
              const youNet = youPay <= 100 ? 100 - youPay : -youPay;
              const aiNet = -aiPay;
              const win = youNet >= 0;
              rewardSim(u, win, 8, 4);
              SFX.play(win ? 'win' : 'lose');
              render({ title: 'AI 放弃了！', desc: '你花了 ' + youPay + ' 元得到 100 元，净收益 ' + youNet + ' 元；AI 赔了 ' + aiPay + ' 元。', you: youNet, them: aiNet, lesson: youNet >= 0 ? '你及时停手，赢了！' : '你也亏了——这局没有赢家。' });
            } else {
              aiBid += 10;
              myTurn = true;
              SFX.play('deal');
              render(null);
            }
          }, 700);
        } else if (action === 'quit') {
          const u = Auth.currentUser();
          const youPay = myBid, aiNet = aiBid <= 100 ? 100 - aiBid : -aiBid;
          const youNet = -youPay;
          const win = aiNet < 0 && youNet > aiNet;
          rewardSim(u, win, 6, 3);
          SFX.play(win ? 'win' : 'lose');
          render({ title: '你放弃了', desc: '你赔了 ' + youPay + ' 元；AI 花了 ' + aiBid + ' 元得到 100 元，净收益 ' + aiNet + ' 元。', you: youNet, them: aiNet, lesson: '止损也是一种智慧——避免陷得更深。' });
        }
      }));
    }
    render(null);
  }

  /* -- 智猪博弈 -- */
  function simBoxedPigs() {
    const app = el('app');
    const title = '智猪博弈';
    const desc = '你是小猪！按按钮会出 10 份食物，但按按钮要消耗 2 份。大猪（AI）和你会怎么选？记住：小猪的策略分析已经告诉你答案了。';
    function render(result) {
      let body;
      if (result) {
        body = '<div class="sim-result">' +
          '<div class="big">' + result.title + '</div>' +
          '<div class="sub">' + result.desc + '</div>' +
          '<div class="payout-row"><span>你（小猪）：<b>' + result.you + ' 份</b></span>' +
          '<span>大猪：<b>' + result.them + ' 份</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + result.lesson + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
      } else {
        body = '<div class="sim-choices">' +
          '<button class="sim-choice" data-act="press"><span class="emoji">🐖</span>按按钮</button>' +
          '<button class="sim-choice" data-act="wait"><span class="emoji">😌</span>等着吃</button>' +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); render(null); });
      document.querySelectorAll('.sim-choice').forEach(b => b.addEventListener('click', () => {
        const u = Auth.currentUser();
        const me = b.getAttribute('data-act');
        // 大猪理性：小猪按则大猪等（9），小猪等则大猪按（4）
        const big = me === 'press' ? 'wait' : 'press';
        SFX.play('reveal');
        let r;
        if (me === 'press' && big === 'wait') r = { title: '你按，大猪等', desc: '你吃1-2=-1份（亏了），大猪吃9份', you: -1, them: 9, lesson: '小猪按按钮是亏本的——这不是你的占优策略。' };
        if (me === 'wait' && big === 'press') r = { title: '你等，大猪按', desc: '你吃4份，大猪吃6-2=4份', you: 4, them: 4, lesson: '正确选择！均衡（4,4）——搭便车成功。' };
        const win = me === 'wait' && big === 'press';
        rewardSim(u, win, win ? 12 : 4, win ? 6 : 2);
        SFX.play(win ? 'win' : 'lose');
        render(r);
      }));
    }
    render(null);
  }

  /* -- 懦夫博弈 -- */
  function simChicken() {
    const app = el('app');
    const title = '懦夫博弈';
    const desc = '你和 AI 各开一辆车冲向对方。谁先躲开谁就输面子（0分），都躲开各得5分，都冲则两败俱伤（-10分），你冲他躲你得10分。冲？还是躲？';
    function render(result) {
      let body;
      if (result) {
        body = '<div class="sim-result">' +
          '<div class="big">' + result.title + '</div>' +
          '<div class="sub">' + result.desc + '</div>' +
          '<div class="payout-row"><span>你：<b>' + result.you + ' 分</b></span>' +
          '<span>AI：<b>' + result.them + ' 分</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + result.lesson + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
      } else {
        body = '<div class="sim-choices">' +
          '<button class="sim-choice" data-act="charge"><span class="emoji">😤</span>冲过去</button>' +
          '<button class="sim-choice" data-act="swerve"><span class="emoji">😨</span>躲开</button>' +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); render(null); });
      document.querySelectorAll('.sim-choice').forEach(b => b.addEventListener('click', () => {
        const u = Auth.currentUser();
        const me = b.getAttribute('data-act');
        // AI 有时强硬有时退缩
        const aiCharge = Math.random() < 0.55;
        SFX.play('reveal');
        let r;
        if (me === 'charge' && aiCharge) r = { title: '都冲！', desc: '两败俱伤，各 -10 分', you: -10, them: -10, lesson: '懦夫博弈最惨的结局——谁都不让。' };
        if (me === 'charge' && !aiCharge) r = { title: '你冲，AI 躲', desc: '你得 10 分，AI 得 0 分', you: 10, them: 0, lesson: '你赢了！但记得：如果 AI 也这么想，悲剧就来了。' };
        if (me === 'swerve' && aiCharge) r = { title: '你躲，AI 冲', desc: '你得 0 分，AI 得 10 分', you: 0, them: 10, lesson: '你输了面子，但保住了安全——理性的选择。' };
        if (me === 'swerve' && !aiCharge) r = { title: '都躲开', desc: '各得 5 分', you: 5, them: 5, lesson: '双赢！都退一步海阔天空。' };
        const win = (me === 'charge' && !aiCharge) || (me === 'swerve' && !aiCharge);
        rewardSim(u, win, win ? 10 : 4, win ? 5 : 2);
        SFX.play(win ? 'win' : 'lose');
        render(r);
      }));
    }
    render(null);
  }

  /* -- 性别战 -- */
  function simBattle() {
    const app = el('app');
    const title = '性别战';
    const desc = '你和同伴（AI）要一起决定看球赛还是偶像剧。一起看=双赢，各看各的=都无聊。你会坚持自己的最爱，还是迁就对方？';
    function render(result) {
      let body;
      if (result) {
        body = '<div class="sim-result">' +
          '<div class="big">' + result.title + '</div>' +
          '<div class="sub">' + result.desc + '</div>' +
          '<div class="payout-row"><span>你：<b>' + result.you + ' 分</b></span>' +
          '<span>同伴：<b>' + result.them + ' 分</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + result.lesson + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
      } else {
        body = '<div class="sim-choices">' +
          '<button class="sim-choice" data-act="soccer"><span class="emoji">⚽</span>球赛</button>' +
          '<button class="sim-choice" data-act="drama"><span class="emoji">📺</span>偶像剧</button>' +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); render(null); });
      document.querySelectorAll('.sim-choice').forEach(b => b.addEventListener('click', () => {
        const u = Auth.currentUser();
        const me = b.getAttribute('data-act');
        // AI 随机会偏好球赛或偶像剧（偏好球赛概率略高，男性化假设）
        const aiPref = Math.random() < 0.5 ? 'soccer' : 'drama';
        SFX.play('reveal');
        let r;
        if (me === 'soccer' && aiPref === 'soccer') r = { title: '都看球赛！', desc: '你 2 分，同伴 1 分', you: 2, them: 1, lesson: '你偏好的均衡——先动或更强话语权获胜。' };
        if (me === 'drama' && aiPref === 'drama') r = { title: '都看偶像剧！', desc: '你 2 分，同伴 1 分', you: 2, them: 1, lesson: '你偏好的均衡——同伴迁就了你。' };
        if (me === 'soccer' && aiPref === 'drama') r = { title: '各看各的', desc: '都无聊，各 0 分', you: 0, them: 0, lesson: '坚持己见导致双输——一起看点什么更好。' };
        if (me === 'drama' && aiPref === 'soccer') r = { title: '各看各的', desc: '都无聊，各 0 分', you: 0, them: 0, lesson: '坚持己见导致双输——你们本可以双赢。' };
        const win = me === aiPref;
        rewardSim(u, win, win ? 10 : 4, win ? 5 : 2);
        SFX.play(win ? 'win' : 'lose');
        render(r);
      }));
    }
    render(null);
  }

  /* -- 最后通牒 -- */
  function simUltimatum() {
    const app = el('app');
    const title = '最后通牒';
    const desc = '你分 100 元，AI 只能接受或拒绝；拒绝则你们都得不到。你愿意给 AI 多少？';
    function render(result, sliderHtml) {
      let body;
      if (result) {
        body = '<div class="sim-result">' +
          '<div class="big">' + result.title + '</div>' +
          '<div class="sub">' + result.desc + '</div>' +
          '<div class="payout-row"><span>你：<b>' + result.you + ' 元</b></span>' +
          '<span>AI：<b>' + result.them + ' 元</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + result.lesson + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
      } else {
        body = (sliderHtml || '') +
          '<div class="sim-choices">' +
          '<button class="sim-choice" data-a="ok" style="min-width:200px"><span class="emoji">📨</span>提交分配方案</button>' +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); render(null); });
      const ok = el('sim-ok');
      if (ok) ok.addEventListener('click', () => {
        const u = Auth.currentUser();
        const give = parseInt(el('sim-slider').value);
        SFX.play('reveal');
        // AI 接受规则：给得少（<20）大概率拒绝
        const accept = give >= 40 || (give >= 20 && Math.random() < 0.6);
        const youGet = accept ? 100 - give : 0;
        const themGet = accept ? give : 0;
        const win = accept && give >= 40;
        rewardSim(u, win, accept ? 10 : 4, accept ? 5 : 2);
        SFX.play(win ? 'win' : (accept ? 'correctWarm' : 'lose'));
        render({
          title: accept ? 'AI 接受了！' : 'AI 拒绝了！',
          desc: accept ? '你们按方案分配。' : '一分钱都拿不到——公平感让 AI 宁可双输。',
          you: youGet, them: themGet,
          lesson: accept ? (give >= 40 ? '公平的方案换来双赢——实验中最常见。' : '给的少但 AI 接受了，你很幸运。') : '给得太少，被拒绝的概率很高（40~50%）！'
        });
      });
    }
    const slider = '<div style="margin:8px 0 16px">' +
      '<div style="display:flex;justify-content:space-between;font-weight:800"><span>你留 <b id="you-show">80</b> 元</span><span>给 AI <b id="them-show" style="color:var(--blue)">20</b> 元</span></div>' +
      '<input type="range" id="sim-slider" min="0" max="50" value="20" style="width:100%;accent-color:var(--green)">' +
      '</div>';
    const app2 = el('app');
    app2.innerHTML = simShell(title, desc, slider + '<div class="sim-choices"><button class="sim-choice" id="sim-ok" style="min-width:200px"><span class="emoji">📨</span>提交分配方案</button></div>');
    el('sim-back').addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
    const sliderEl = el('sim-slider');
    sliderEl.addEventListener('input', () => {
      const v = parseInt(sliderEl.value);
      el('you-show').textContent = 100 - v;
      el('them-show').textContent = v;
    });
    el('sim-ok').addEventListener('click', () => {
      const u = Auth.currentUser();
      const give = parseInt(sliderEl.value);
      SFX.play('reveal');
      const accept = give >= 40 || (give >= 20 && Math.random() < 0.6);
      const youGet = accept ? 100 - give : 0;
      const themGet = accept ? give : 0;
      const win = accept && give >= 40;
      rewardSim(u, win, accept ? 10 : 4, accept ? 5 : 2);
      SFX.play(win ? 'win' : (accept ? 'correctWarm' : 'lose'));
      render({
        title: accept ? 'AI 接受了！' : 'AI 拒绝了！',
        desc: accept ? '你们按方案分配。' : '一分钱都拿不到——公平感让 AI 宁可双输。',
        you: youGet, them: themGet,
        lesson: accept ? (give >= 40 ? '公平的方案换来双赢——实验中最常见。' : '给的少但 AI 接受了，你很幸运。') : '给得太少，被拒绝的概率很高（40~50%）！'
      });
    });
  }

  /* -- 重复博弈（与 AI 玩 20 轮） -- */
  function simRepeated() {
    const app = el('app');
    const title = '重复博弈 · 一报还一报';
    const desc = '和 AI 玩 20 轮"合作或背叛"。双合作各+3，双背叛各+1，一方背叛一方合作=5/0。看看你能不能让 AI 一直合作！';
    let myTotal = 0, aiTotal = 0, round = 0;
    let aiLast = 'coop';
    function render(finished, resultMsg) {
      let body;
      if (finished) {
        const win = myTotal >= aiTotal;
        body = '<div class="sim-result">' +
          '<div class="big">' + (win ? '你赢了！' : 'AI 赢了') + '</div>' +
          '<div class="sub">20 轮结束</div>' +
          '<div class="payout-row"><span>你：<b>' + myTotal + ' 分</b></span>' +
          '<span>AI：<b>' + aiTotal + ' 分</b></span></div>' +
          '<div class="sub" style="margin-top:8px">' + (win ? '🎉 合作至上！' : 'AI 用一报还一报让你明白：背叛没有好处。') + '</div>' +
          '</div><button class="btn btn-green btn-lg sim-btn" id="sim-again">🔁 再玩一次</button>';
        const u = Auth.currentUser();
        rewardSim(u, win, win ? 15 : 6, win ? 8 : 3);
      } else {
        body = '<div class="vs-wrap">' +
          '<div class="vs-chip"><span class="face">😎</span><span class="name">你</span><span class="act" id="my-sc">' + myTotal + ' 分</span></div>' +
          '<div class="vs-vs">' + (round + 1) + '/20</div>' +
          '<div class="vs-chip"><span class="face">🤖</span><span class="name">AI（一报还一报）</span><span class="act" id="ai-sc">' + aiTotal + ' 分</span></div>' +
          '</div>' +
          (resultMsg ? '<div class="sim-result" style="padding:12px">' + resultMsg + '</div>' : '') +
          '<div class="sim-choices">' +
          '<button class="sim-choice" data-act="coop"><span class="emoji">🤝</span>合作</button>' +
          '<button class="sim-choice" data-act="betray"><span class="emoji">😈</span>背叛</button>' +
          '</div>';
      }
      app.innerHTML = simShell(title, desc, body);
      const back = el('sim-back');
      if (back) back.addEventListener('click', () => { SFX.play('click'); APP.go('home'); });
      const again = el('sim-again');
      if (again) again.addEventListener('click', () => { SFX.play('click'); myTotal = aiTotal = 0; round = 0; aiLast = 'coop'; render(false, null); });
      document.querySelectorAll('.sim-choice').forEach(b => b.addEventListener('click', () => {
        const me = b.getAttribute('data-act');
        const ai = aiLast;
        // AI 下次采用一报还一报
        let myGain = 0, aiGain = 0, msg;
        if (me === 'coop' && ai === 'coop') { myGain = 3; aiGain = 3; msg = '🤝 双合作：各 +3'; }
        if (me === 'coop' && ai === 'betray') { myGain = 0; aiGain = 5; msg = '😖 你合作，AI 背叛：你 +0，AI +5'; }
        if (me === 'betray' && ai === 'coop') { myGain = 5; aiGain = 0; msg = '😈 你背叛，AI 合作：你 +5，AI +0'; }
        if (me === 'betray' && ai === 'betray') { myGain = 1; aiGain = 1; msg = '💥 双背叛：各 +1'; }
        myTotal += myGain; aiTotal += aiGain;
        aiLast = me; // 一报还一报
        round++;
        SFX.play(myGain >= aiGain ? 'correctWarm' : 'wrong');
        if (round >= 20) {
          render(true);
        } else {
          render(false, msg);
        }
      }));
    }
    render(false, null);
  }

  /* ============================================================
     学习游戏（复用原四款）
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

  function gameBinary(app, u) {
    const items = [
      { s: '两个人被抓后都选择坦白，结果都坐牢——这是囚犯困境。', safe: true },
      { s: '大猪按铃小猪白吃——这是智猪博弈（搭便车）。', safe: true },
      { s: '斑马线前双方都不让，酿成悲剧——这是懦夫博弈。', safe: true },
      { s: '为赢网游不断买装备，对手也跟进——这是万元陷阱。', safe: true },
      { s: '只要你把价格压低一点，就能让市场永远竞争——这是健康的博弈。', safe: false },
      { s: '在讨价还价中，越有耐心的人越能占便宜——这是对的。', safe: true },
      { s: '给出方案后对方拒绝，双方都得不到钱——这是最后通牒博弈。', safe: true },
      { s: '石头剪子布有固定的必胜策略，只要练习就能赢——这是对的。', safe: false },
      { s: '重复博弈中，一报还一报是很好的合作策略——这是对的。', safe: true },
      { s: '只要靠道德说教，就能解决所有囚犯困境——这是对的。', safe: false },
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
        '<div class="question-title">博弈思维，还是思维误区？</div>' +
        '<div class="question-sub">判断下面这句描述是<b>正确的博弈思维</b>还是<b>常见的思维误区</b></div>' +
        '<div class="binary-card" id="bc">' + esc(it.s) + '</div>' +
        '<div class="row" style="gap:10px;margin-top:16px">' +
        '<button class="btn btn-green btn-lg" id="b-inc" style="flex:1">正确 ✓</button>' +
        '<button class="btn btn-red btn-lg" id="b-dec" style="flex:1">误区 ✗</button></div></div>';
      el('gb').addEventListener('click', () => { SFX.play('click'); APP.go('games'); });
      const pick = (val) => {
        if (answered) return;
        answered = true;
        const good = val === it.safe;
        const card = el('bc');
        card.style.borderColor = good ? 'var(--green)' : 'var(--red)';
        card.style.background = good ? '#e6f5e4' : '#fde8e4';
        if (good) { SFX.play('correct'); correct++; } else SFX.play('wrong');
        setTimeout(() => { idx++; answered = false; render(); }, 900);
      };
      el('b-inc').addEventListener('click', () => pick(true));
      el('b-dec').addEventListener('click', () => pick(false));
    }
    render();
  }

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

  window.Learn = { startLesson, launchGame, launchSim };
  window.APP = window.APP || {};
  window.APP.startLesson = startLesson;
  window.APP.launchGame = launchGame;
  window.APP.launchSim = launchSim;
})();

