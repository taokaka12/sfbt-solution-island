/* ============================================================
   Tiny Habits — data.js
   课程清单、测验题库、庆祝方式、植物成长阶段。
   单元 = 书的章（引言 + 8 章 + 结论）；小节 = 每章的知识点。
   每个小节 key: "U<unit>-S<idx>"。
   ============================================================ */
(function () {
  'use strict';

  const PARTS = [
    { name: '引言 · 改变可以很简单', color: '#2dd4bf' },
    { name: '第一部分 · 行为设计原理', color: '#60a5fa' },
  ];

  const UNIT_HOOKS = {
    1: 'Fogg 在斯坦福实验室带 4 万人做过试验：人们想要的改变（减肥、运动、早睡）几乎都在想和做之间有一条巨大的鸿沟。这本书的起点就是：这不是你的错，是方法错了。',
    2: '"行为"这个词听起来很平常，但它有一个精确的科学定义：行为是你可以观察和测量的动作。区分愿望、结果和行为，是行为设计的第一步。',
    3: 'Juni 拥有超越一切人的动机——她的母亲和两个姐妹都患上了糖尿病。但她戒糖依然一次次失败。动机是变化无常的"状态"，不是可靠的引擎。',
    4: '一个人早餐想吃得更健康：他买好燕麦和水果（能力提高），把水果放在最显眼的台面上（提示），然后每吃一口都给自己一点小肯定（情绪）。行为就真的发生了。',
    5: 'Amy 想创业却总是拖延，后来她每天送完孩子上学，在路边停下车，只写一张便利贴、完成一个任务。一个微小的动作，引爆了一整天的连锁反应。',
    6: '每次你刷牙后，对着镜子里的自己笑一下。这个不到三秒钟的动作，就是"锚点+微行为+庆祝"三件套的完整示范。',
    7: 'Fogg 说：如果你想停止一个坏习惯，先别急着和它搏斗。找出它的提示，移除它；找出它的能力链，打断它。设计，而不是对抗。',
    8: '一个人很难改变，一群人一起改变就容易得多。Ringleader（主角）和 Ninja（忍者）两种角色，能让整个团队一起长出好习惯。',
    9: '最后回到全书的核心：Tiny is mighty。微小改变，改变一切。',
    10: '那三个字，是全书每一节都在练习的动作：先做微小，再庆祝，最后长大。',
  };

  const UNITS = [
    /* ---- 单元1 · 引言 ---- */
    { id: 1, part: 0, icon: '🌱', title: '引言 · 改变可以很简单（也很有趣）', xp: 40, tagline: 'Tiny is mighty. 微小改变，改变一切。', color: '#2dd4bf',
      sections: [
        '为什么改变这么难',
        'Behavior Design 与信息-行动谬误',
        'Maui 习惯：三秒钟的美好一天',
        '为什么微小：快、能开始、安全',
        '微小能长大，不依赖动机',
      ] },
    /* ---- 单元2 · 第1章 行为的要素 ---- */
    { id: 2, part: 1, icon: '🧪', title: '第1章 · 行为的要素', xp: 50, tagline: '行为 = 动机 × 能力 × 提示', color: '#60a5fa',
      sections: [
        '清晰思考行为',
        'B=MAP：行为发生的公式',
        '动机与能力的补偿关系',
        '行动线：行为会发生的那条线',
        '用行为模型理解一切 + 三步排错',
        '用行为模型的眼光看世界',
      ] },
  ];

  let totalSections = 0;
  UNITS.forEach(u => { totalSections += u.sections.length; });

  /* ------------------------- 庆祝方式（书第五章） ------------------------- */
  const CELEBRATIONS = [
    { id: 'fist_pump',    name: '握拳轻挥',   emoji: '✊', desc: '双手握拳，向上轻轻一挥，心里默念"yes！"' },
    { id: 'smile_big',    name: '灿烂微笑',   emoji: '😊', desc: '刻意地把嘴角扬到最大，保持两三秒' },
    { id: 'imagine_child',name: '想象孩子鼓掌', emoji: '👏', desc: '想象你最爱的孩子正为你欢呼鼓掌' },
    { id: 'little_dance', name: '来一小段舞', emoji: '💃', desc: '原地轻轻跳两下，或者扭两下肩膀' },
    { id: 'clap_hands',   name: '鼓掌',       emoji: '👏', desc: '给自己鼓两下掌，像为别人喝彩一样' },
    { id: 'nod_head',     name: '坚定点头',   emoji: '👍', desc: '用力点两下头，眼神坚定' },
    { id: 'thumbs_up',    name: '竖大拇指',   emoji: '👍', desc: '给自己竖一个大拇指，最好带点笑' },
    { id: 'imagine_roar', name: '想象人群欢呼', emoji: '📣', desc: '想象赛场看台上人群的欢呼声为你而起' },
    { id: 'good_job',     name: '心里说干得好', emoji: '💬', desc: '在心里对自己说："干得好！"并感受这句话' },
    { id: 'deep_breath',  name: '深呼吸一口',  emoji: '🌬️', desc: '深吸一口气，缓缓呼出，肩膀放松' },
    { id: 'snap_fingers', name: '打个响指',   emoji: '🫰', desc: '啪地打个响指，或做个胜利手势' },
    { id: 'imagine_fireworks', name: '想象烟花', emoji: '🎆', desc: '想象夜空中为你绽放的烟花，双臂举成 V' },
  ];

  /* ------------------------- 植物成长阶段 ------------------------- */
  const PLANT_STAGES = [
    { stage: 0, name: '种子', min: 0 },
    { stage: 1, name: '发芽', min: 1 },
    { stage: 2, name: '幼苗', min: 3 },
    { stage: 3, name: '开花', min: 7 },
    { stage: 4, name: '结果', min: 14 },
    { stage: 5, name: '成株', min: 30 },
  ];

  /* ------------------------- 测验题库 -------------------------
     题型：mc（单选）、tf（判断）、type（填空）、match（连线）。
     每题：{ q, type, options, answer, pairs, text, hint, explain }
     每节至少 2 题，均出自本书真实内容。
     ------------------------------------------------------------ */
  const Q = {};

  /* ================= 单元1 · 引言 ================= */
  Q['U1-S0'] = [
    { q: 'Fogg 认为人们改变失败，真正的问题出在哪里？', type: 'mc',
      options: ['人们缺乏意志力', '改变的方法本身有缺陷，而不是人本身', '人们不够努力', '改变天生就非常困难'],
      answer: 1, hint: '书里说：问题出在方法（approach），不是出在你自己。',
      explain: 'Fogg 用"组装有缺陷的抽屉柜"做类比：说明书写错了、零件缺失，你不会怪自己，而会怪生产商。改变失败时，我们却总怪自己——这正是错的。' },
    { q: '判断：书中说"我们不是问题，我们的改变方法才是问题"，这是一种设计缺陷，而非个人缺陷。', type: 'tf', answer: true,
      hint: '这是全书的第一把钥匙。',
      explain: '对。Fogg 反复强调：把改变当成一个设计问题，而不是道德问题。' },
    { q: 'Fogg 给出的三条正确改变原则不包括以下哪项？', type: 'mc',
      options: ['停止评判自己', '把愿望拆成微小的行为', '把错误当发现，向前走', '用意志力硬扛到底'],
      answer: 3, hint: '书中说：不依赖意志力，是方法的基本前提。',
      explain: '三条原则是：停止评判自己；把愿望拆成微小的行为；把错误当发现并继续前进。依靠意志力恰恰是被否定的那一种。' },
  ];

  Q['U1-S1'] = [
    { q: 'Fogg 把"以为给了信息就能改变行为"的误区称作什么？', type: 'mc',
      options: ['知识就是力量', '信息-行动谬误', '认知失调', '光环效应'],
      answer: 1, hint: '信息先改变态度，态度再改变行为——这个链条被 Fogg 称为……',
      explain: 'Information-Action Fallacy：信息→态度→行为，这条链条在现实中几乎不成立。' },
    { q: '判断：Fogg 的研究认为，能带来持久改变的只有三种方式，其中之一是"获得顿悟（epiphany）"。', type: 'tf', answer: false,
      hint: 'Fogg 说顿悟"几乎不可能"，我们应当排除这个选项。',
      explain: '错误。三种方式是：改变环境、用微小的方式改变习惯、以及获得顿悟——但 Fogg 明确说顿悟几乎不可能，应排除。真正可行的是前两种。' },
    { q: 'Fogg 提到的三种持久改变方式，正确的一组是？', type: 'mc',
      options: ['顿悟、换环境、微习惯', '顿悟、意志力、奖励', '换环境、大目标、惩罚', '意志力、顿悟、奖励'],
      answer: 0, hint: '顿悟难求，环境可变，微习惯可学。',
      explain: '正确的三种：获得顿悟（几乎不可能）、改变环境、以微小方式改变习惯。' },
  ];

  Q['U1-S2'] = [
    { q: 'Maui 习惯的具体做法是？', type: 'mc',
      options: ['早起跑步三十分钟', '写下十条今日计划', '脚踩到地板后，立刻说"今天会是美好的一天"', '睡前冥想十分钟'],
      answer: 2, hint: '它只需要三秒钟，在你把脚放到地板的那一刻。',
      explain: 'Maui 习惯：早晨把双脚踩到地板上后，立刻说出"今天会是美好的一天"这七个字，并努力感受乐观。' },
    { q: 'Maui 习惯的配方（Recipe）格式是？', type: 'mc',
      options: ['"我每天要做……"', '"在我……之后，我会……"', '"我必须……"', '"别人……我就……"'],
      answer: 1, hint: '这是 Tiny Habits 的标准配方：锚点 + 微行为。',
      explain: '配方格式：After I [锚点], I will [微行为]。例如"在我把脚放到地板上之后，我会说：今天会是美好的一天。"' },
    { q: '判断：Fogg 建议即使在感觉不会美好的一天，也仍然说出这句话，最多加一句"以某种方式"。', type: 'tf', answer: true,
      hint: '哪怕带着疑问的语气说出来，也管用。',
      explain: '对。即使糟糕的日子也照样说："今天会是美好的一天——以某种方式。"' },
  ];

  Q['U1-S3'] = [
    { q: '"微小"能带来改变，以下哪个不是书中所说的理由？', type: 'mc',
      options: ['微小开始得快', '微小现在就能开始', '微小很安全、情绪风险低', '微小不需要任何思考'],
      answer: 3, hint: '书中给了三个理由，全都和"降低门槛"有关。',
      explain: '三个理由：Tiny is fast（快）、Tiny can start now（现在就能开始）、Tiny is safe（安全、风险低）。' },
    { q: '为什么"微小"能让人觉得安全？', type: 'mc',
      options: ['因为它不会失败，或失败代价极小', '因为它没人看得见', '因为它不用花钱', '因为它只需要一天'],
      answer: 0, hint: 'Fogg 说：在 Tiny Habits 里没有真正的失败，只有"习惯养成中"的小磕绊。',
      explain: '行为足够小、灵活、不引人注目，情绪风险被消除，爬起来再试的成本极低——这就是安全。' },
    { q: '判断：Fogg 建议，压力越大、时间越少的人，越适合从小习惯开始。', type: 'tf', answer: true,
      hint: '越忙越微小。',
      explain: '对。越是没时间、压力大，越应该从微小开始——微小是唯一可行的选项。' },
  ];

  Q['U1-S4'] = [
    { q: 'Amy 用便利贴启动自己创业的微习惯，这个习惯是？', type: 'mc',
      options: ['每天早上写十页商业计划', '送完孩子后，在路边停下车写一张便利贴、完成一个任务', '每天给投资人打电话', '每天工作十二小时'],
      answer: 1, hint: '一次只写一张便利贴，就写一个当天能完成的任务。',
      explain: 'Amy 每天送完孩子，在路边停下车，只写一张便利贴、一个马上能完成的任务。这份"感觉成功"驱动了一整天。' },
    { q: 'Juni 的故事说明了什么？', type: 'mc',
      options: ['动机足够强就一定能改变', '糖瘾要靠意志力硬戒', '动机不可靠，设计才能改变行为', '糖尿病无法预防'],
      answer: 2, hint: 'Juni 的动机强到可怕，但戒糖失败了一次又一次。',
      explain: 'Juni 失去了多位亲人、动机爆棚，但屡战屡败。后来她重设环境、用微习惯"crowd out"糖瘾——设计改变了行为，而不是动机。' },
    { q: '判断：书中认为动机和意志力是可靠的长期改变工具。', type: 'tf', answer: false,
      hint: '它们是"变幻莫测的临时状态"。',
      explain: '错误。动机和意志力像天气一样多变，不可靠。靠它们长期改变，必然失败。' },
  ];

  /* ================= 单元2 · 第1章 行为的要素 ================= */
  Q['U2-S0'] = [
    { q: '在行为设计里，"行为（Behavior）"的科学定义是什么？', type: 'mc',
      options: ['一个想法', '一个愿望', '可以观察和测量的动作', '一个结果'],
      answer: 2, hint: 'Fogg：Behavior is something you can observe and measure.',
      explain: '行为必须可观察、可测量。愿望（想减肥）和结果（瘦了5公斤）都不是行为本身。' },
    { q: '判断："我想变得更健康"是一个行为。', type: 'tf', answer: false,
      hint: '这是一个愿望（aspiration），不是行为。',
      explain: '错误。"想变得更健康"是愿望。对应行为如"每天晚饭后散步十分钟"。' },
    { q: '下面的描述中，哪一个是"行为"？', type: 'mc',
      options: ['我想要早起', '我睡得很好', '闹钟响后我坐起来并按下闹钟', '我精力充沛'],
      answer: 2, hint: '行为 = 可观察、可测量的动作。',
      explain: '"坐起来并按闹钟"是一个可观察、可测量的动作，其余都是愿望或结果。' },
  ];

  Q['U2-S1'] = [
    { q: 'Fogg 行为模型（B=MAP）中，B、M、A、P 分别代表？', type: 'mc',
      options: ['行为、动机、能力、提示', '信念、记忆、行动、计划', '行为、方法、态度、实践', '动机、行动、计划、耐心'],
      answer: 0, hint: 'Behavior = Motivation × Ability × Prompt',
      explain: 'B = Behavior（行为），M = Motivation（动机），A = Ability（能力），P = Prompt（提示）。' },
    { q: '行为要在什么时候才会发生？', type: 'mc',
      options: ['当动机足够高时', '当能力足够强时', '当动机、能力、提示三者同时出现时', '当有奖励时'],
      answer: 2, hint: '三个条件必须同时到位，缺一不可。',
      explain: 'Fogg 的公式：只有当 M、A、P 同时高于阈值，行为才会发生。任何一个为零，行为都不会出现。' },
    { q: '判断：按照 B=MAP，只要提示足够强，即使能力和动机都很低，行为也会发生。', type: 'tf', answer: false,
      hint: '提示再强，行为也要有足够的动机和能力。',
      explain: '错误。提示只是触发器，动机和能力必须同时在线，行为才会发生。' },
  ];

  Q['U2-S2'] = [
    { q: '动机和能力之间是什么关系？', type: 'mc',
      options: ['正比关系：动机越高，需要的能力越高', '补偿关系：能力越低，越需要高动机', '完全无关', '总是互相抵消'],
      answer: 1, hint: '一件事情越难做，你就越需要更多动机去推动。',
      explain: '动机和能力是补偿（compensatory）关系：行为越难，需要越高动机；把行为变容易，就不需要那么多动机。' },
    { q: '书中用"十个俯卧撑"和"一个俯卧撑"说明什么？', type: 'mc',
      options: ['十个俯卧撑更健康', '行为越容易，越不需要靠动机硬撑', '俯卧撑是唯一可行的习惯', '动机对俯卧撑无效'],
      answer: 1, hint: '把行为缩小，能力要求下降，动机门槛随之降低。',
      explain: '一个俯卧撑对能力要求极低，几乎不需要动机就能完成；十个俯卧撑则需要更多动机推动。' },
    { q: '判断：想靠提升动机来长期维持一个困难的行为，是可靠的做法。', type: 'tf', answer: false,
      hint: '动机不稳定，靠它不可靠。',
      explain: '错误。动机波动大，靠临时打鸡血维持困难行为，很容易在低谷期崩盘。更可靠的是把行为变容易。' },
  ];

  Q['U2-S3'] = [
    { q: '行动线（Action Line）是什么？', type: 'mc',
      options: ['一条跑步路线', '行为模型里区分"会发生"和"不会发生"的曲线', '每日待办清单', '一个营销术语'],
      answer: 1, hint: '在 B=MAP 图中，这条曲线把平面分成两半。',
      explain: '行动线是 Fogg 行为模型中的曲线：在曲线之上，行为会发生；在曲线之下，行为不会发生。' },
    { q: '当一个行为点在行动线之下，意味着什么？', type: 'mc',
      options: ['它会立即发生', '它不会发生，因为动机或能力不足', '它已经发生了', '它永远不会发生'],
      answer: 1, hint: '线下 = 条件不达标 = 不会发生。',
      explain: '行动线之下的点，说明当前动机×能力不足以让行为发生，需要提升其中一项。' },
    { q: '判断：想让一个行为从"不会发生"变成"会发生"，只需把它点移动到行动线之上。', type: 'tf', answer: true,
      hint: '提升动机或能力，直到越过行动线。',
      explain: '对。要么提高动机，要么（更可靠地）降低行为难度、提升能力，让点越过行动线。' },
  ];

  Q['U2-S4'] = [
    { q: '当一个行为没有发生时，Fogg 建议的三步排错顺序是？', type: 'mc',
      options: ['先查动机、再查能力、最后查提示', '先查提示、再查能力、最后查动机', '先换目标、再换环境、最后换人', '先奖励、再惩罚、最后妥协'],
      answer: 1, hint: 'Fogg 说：先确认有提示，再看能力够不够，最后才看动机。',
      explain: '排错顺序：1. 没有提示？2. 能力不够？3. 动机不足？先查提示最有效，因为提示最容易改变。' },
    { q: '判断：行为没有发生时，Fogg 建议先怀疑自己动机不够。', type: 'tf', answer: false,
      hint: '动机是最后才查的，因为它最不稳定。',
      explain: '错误。先查提示，再查能力，动机是最后一步——因为动机最不稳定，也最难直接控制。' },
    { q: '"提示"在三个要素中被认为最容易被设计，原因是？', type: 'mc',
      options: ['提示不需要成本', '提示是外部的、可设置的触发器', '提示比动机更有用', '提示可以替代能力'],
      answer: 1, hint: '你可以主动设置闹钟、便利贴、锚点。',
      explain: '提示通常是外部可操作的触发器（闹钟、便利贴、固定的锚点时刻），最容易被我们主动设计。' },
  ];

  Q['U2-S5'] = [
    { q: '用行为模型看世界，最大的好处是？', type: 'mc',
      options: ['可以预测星座运势', '分析任何行为为什么发生或没发生，而不是归咎于性格', '让所有问题自动消失', '证明意志力最重要'],
      answer: 1, hint: '它把"道德评判"换成"系统分析"。',
      explain: '行为模型帮我们把"他就是这样的人"换成"他在什么条件下会这么做"——不再归咎于性格，而是分析条件。' },
    { q: 'Fogg 认为，"一个人没做某事"通常是因为？', type: 'mc',
      options: ['他太懒', '他性格有问题', 'M、A、P 三者没有同时到位', '他不想'],
      answer: 2, hint: '行为模型给出了明确答案：三要素缺一不可。',
      explain: '行为不发生，几乎总是三个要素没凑齐：提示缺失、能力不足、或动机不够。' },
    { q: '判断：行为模型既能用于设计自己的习惯，也能用于设计别人（如产品用户）的行为。', type: 'tf', answer: true,
      hint: 'Fogg 最早用它设计产品，后来才转向个人习惯。',
      explain: '对。Fogg 的早期工作就是帮硅谷产品团队用行为模型设计用户行为，后转向个人习惯。' },
  ];

  /* ------------------------- BOPPPS 生成器 -------------------------
     由 content.js 教学文案 + 题库组合出每节七步课程：
       B 导入  O 目标  P 前测  P 参与式学习
       P 实践（新增）  P 后测  S 总结
     -------------------------------------------------------------- */
  function makeBOPPPS(unit, idx) {
    const section = unit.sections[idx];
    const questions = C.getQuestions(unit.id, idx);
    const key = C.getSectionKey(unit.id, idx);
    const SC = (typeof window !== 'undefined' && window.SectionContent) ? window.SectionContent : {};
    const sc = SC[key] || {};
    const hook = sc.bridge || (UNIT_HOOKS[unit.id] || ('单元 ' + unit.id + ' · ' + unit.title));
    const n = questions.length;
    const preQ = questions[0] || null;
    const bullets = questions.map((q) => {
      if (q.type === 'mc') return { k: q.q, v: q.options[q.answer] };
      if (q.type === 'tf') return { k: q.q, v: q.answer ? '正确' : '错误' };
      return { k: q.q, v: '' };
    });
    const objectives = (sc.objectives && sc.objectives.length)
      ? sc.objectives
      : [
        '用自己的话解释"' + section + '"的含义。',
        '识别本节中的关键概念，并能举出一个现实例子。',
        '把本节知识应用到书中或生活中的真实案例。',
      ];
    const practice = sc.practice || {
      type: 'celebration',
      prompt: '为你刚才学到的东西，做一次真实的庆祝。',
      celebrationHint: '选一个你喜欢的庆祝方式',
      done: '已完成庆祝',
    };
    return {
      section: section,
      unitId: unit.id,
      unitTitle: unit.title,
      unitIcon: unit.icon,
      hook: hook,
      objectives: objectives,
      preQ: preQ,
      bullets: bullets,
      preText: sc.pre || null,
      explain: sc.explain || null,
      vocab: sc.vocab || null,
      summary: sc.summary || ('本节金句："' + section + '"。让行为小到不可能失败，它才会真的发生。'),
      practice: practice,
      reflections: sc.reflections || [],
    };
  }

  /* ------------------------- 课程 API ------------------------- */
  const C = {
    PARTS,
    UNITS,
    Q,
    UNIT_HOOKS,
    CELEBRATIONS,
    PLANT_STAGES,
    totalSections,
    getUnit: (id) => UNITS.find(u => u.id === id) || null,
    getSectionKey: (unitId, idx) => 'U' + unitId + '-S' + idx,
    getQuestions: (unitId, idx) => {
      const key = C.getSectionKey(unitId, idx);
      return (Q[key] || []).slice();
    },
    getBOPPPS: makeBOPPPS,
  };

  window.Curriculum = C;
})();

