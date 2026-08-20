/* ============================================================
   Tiny Habits — research.js
   每章「最新研究进展」卡片 + 「建议阅读」清单。
   文献标注原则：作者/年份/来源齐全；2021 年之后且无法
   在本环境实时核实的条目，一律标注 [待复核]，不虚构来源。
   ============================================================ */
(function () {
  'use strict';

  const RESEARCH = {
    /* 引言：改变的本质 */
    1: [
      {
        claim: '书中：停止评判自己，才能开始改变。',
        evidence: '自我关怀（self-compassion）研究一致显示：对自己更友善的人，自我调节能力更强，也更愿意在挫折后重新开始。',
        authors: 'Terry & Leary', year: 2011, source: 'Self and Identity',
        takeaway: '先对自己好一点，改变才走得动。'
      },
      {
        claim: '书中：信息不能改变行为（信息-行动谬误）。',
        evidence: '大规模健康传播研究发现，仅靠教育性信息改变生活习惯的效果微乎其微；行为改变需要组合策略。',
        authors: 'Michie, Yardley, West 等', year: 2017, source: 'American Psychologist',
        takeaway: '别指望"知道"就能"做到"，要动手设计行为。'
      },
      {
        claim: '书中：改变环境比改变想法更可靠。',
        evidence: '"习惯不连续假说"（habit discontinuity hypothesis）显示：在搬家、换工作等环境剧变期，人们更容易养成新习惯。',
        authors: 'Verplanken 等', year: 2008, source: 'Journal of Environmental Psychology',
        takeaway: '想改变？善用人生转折点，那是环境给你的窗口。'
      },
      {
        claim: '书中：微小行为能撬动大改变。',
        evidence: '行为激活（behavioral activation）研究表明，把大目标拆成可操作的小步骤并立刻执行，对情绪与行动力都有正面作用。',
        authors: 'Ekers 等', year: 2014, source: 'PLOS ONE（元分析）',
        takeaway: '从小处动手，比空想大目标更能带来改变。'
      },
    ],
    /* 第1章：行为的要素 */
    2: [
      {
        claim: '书中：行为 = 动机 × 能力 × 提示。',
        evidence: '习惯形成研究支持"情境-线索"核心作用：在稳定的情境提示下重复，行为会逐渐自动化。',
        authors: 'Wood & Rünger', year: 2016, source: 'Annual Review of Psychology',
        takeaway: '提示（线索）是习惯自动化的地基，别只盯着动机。'
      },
      {
        claim: '书中：让行为变容易（提升能力）比打鸡血更可靠。',
        evidence: '关于"执行意图"（if-then 计划）的元分析显示：把行为绑定在特定情境中，能显著提高目标达成率。',
        authors: 'Gollwitzer & Sheeran', year: 2006, source: 'Advances in Experimental Social Psychology',
        takeaway: '"在 X 之后做 Y"（Fogg 配方）与 if-then 计划共享同一套证据。'
      },
      {
        claim: '书中：提示缺失是行为没发生的首要原因。',
        evidence: '移动应用研究显示，精心设计的"及时提醒"能显著提升用户坚持行为干预的比例。',
        authors: 'Stawarz, Cox & Blandford', year: 2015, source: 'CHI（ACM）',
        takeaway: '把提示（提醒）设计好，是成本最低的杠杆。'
      },
      {
        claim: '书中：B=MAP 同样适用于设计他人的行为。',
        evidence: '数字健康干预的证据综述确认：以理论（含行为模型）为基础的干预，比没有理论支撑的更有效。',
        authors: 'Michie 等', year: 2017, source: 'American Psychologist',
        takeaway: '无论设计自己还是设计产品，B=MAP 都是可靠框架。'
      },
    ],
  };

  const READING = {
    1: [
      { type: 'classic', title: '《Tiny Habits》', author: 'BJ Fogg', year: 2019, why: '本书原著，微习惯方法的完整出处。' },
      { type: 'classic', title: '《原子习惯》', author: 'James Clear', year: 2018, why: '习惯堆叠与身份改变的系统讲法，与 Fogg 互为印证。' },
      { type: 'classic', title: '《习惯的力量》', author: 'Charles Duhigg', year: 2012, why: '习惯回路的科普经典，讲清楚提示-行为-奖赏。' },
      { type: 'recent', title: 'Good Habits, Bad Habits', author: 'Wendy Wood', year: 2019, why: '习惯心理学权威，深入"情境决定自动行为"。' },
      { type: 'recent', title: 'Implementing intentions 元分析', author: 'Gollwitzer & Sheeran', year: 2006, why: 'if-then 计划的证据，支撑"配方"的科学基础。' },
    ],
    2: [
      { type: 'classic', title: 'The Power of Habit', author: 'Charles Duhigg', year: 2012, why: '习惯回路的科普经典。' },
      { type: 'classic', title: 'Behavior Change Techniques Taxonomy', author: 'Michie 等', year: 2013, why: '93 种行为改变技术的分类学，专业工具书。' },
      { type: 'recent', title: 'Good Habits, Bad Habits', author: 'Wendy Wood', year: 2019, why: 'B=MAP 中"提示/情境"维度的科学纵深。' },
      { type: 'recent', title: 'Habit formation 综述', author: 'Gardner, Lally & Wardle', year: 2012, why: '习惯形成研究的奠基综述。' },
    ],
  };

  window.Research = { RESEARCH, READING };
})();

