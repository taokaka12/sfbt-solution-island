/* ============================================================
   系统之美 — art.js
   为每个单元（章）绘制 420x260 内联 SVG 横幅，并为每个小节
   提供关键词驱动的图标徽章。统一学术画风：
     - 纸感渐变背景 + 点状网格 + 细圆角描边
     - 品牌绿/蓝/紫/橙/粉 + 学术海军蓝
     - 顶部深色标题栏 + 底部小写说明
   ============================================================ */
(function () {
  'use strict';

  const C = {
    navy: '#1e293b', slate: '#64748b', paper: '#f6f8fb', line: '#dbe2ea',
    green: '#58cc02', greenD: '#2f8f01',
    blue: '#1cb0f6', blueD: '#0e7fb8',
    purple: '#ce82ff', purpleD: '#8b3fd6',
    orange: '#ff9600', orangeD: '#d97e00',
    pink: '#ff86c8', pinkD: '#c26ba1', gold: '#ffd700', goldD: '#c9a200',
    red: '#ff4b4b', white: '#ffffff',
  };

  const FONT = "font-family='Georgia, serif'";
  const FONT2 = "font-family='Segoe UI, sans-serif'";

  function frame(inner, label, opts) {
    opts = opts || {};
    const w = opts.w || 420, h = opts.h || 260;
    const back = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="22" fill="url(#bgGrad)"/>';
    const grid = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="22" fill="url(#dotGrid)" opacity="0.5"/>';
    const cap = label
      ? '<text x="' + (w / 2) + '" y="' + (h - 18) + '" text-anchor="middle" ' + FONT2 +
        ' font-size="12" font-weight="700" letter-spacing="3" fill="' + C.slate + '" opacity="0.85">' + label + '</text>'
      : '';
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (label || 'illustration') + '">' +
      defs() + back + grid + inner + cap + '</svg>';
  }

  function defs() {
    return '<defs>' +
      '<linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + C.paper + '"/><stop offset="1" stop-color="#eef4fb"/>' +
      '</linearGradient>' +
      '<pattern id="dotGrid" width="18" height="18" patternUnits="userSpaceOnUse">' +
      '<circle cx="1.5" cy="1.5" r="1.3" fill="' + C.slate + '" opacity="0.22"/></pattern>' +
      '<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="' + C.navy + '" flood-opacity="0.12"/>' +
      '</filter>' +
      '</defs>';
  }

  function tank(x, y, s, fill) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<rect x="-26" y="-18" width="52" height="44" rx="10" fill="' + (fill || C.blue) + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
      '<line x1="-26" y1="-2" x2="26" y2="-2" stroke="' + C.white + '" stroke-width="2.4" opacity="0.85"/>' +
      '<path d="M-26 12 q26 -16 52 0" stroke="' + C.white + '" stroke-width="2" fill="none" opacity="0.6"/>' +
      '</g>';
  }

  function gear(x, y, s, fill) {
    const r = 12 * s;
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<path d="M0 ' + (-r) + ' l2 -6 6 0 2 -6 6 2 5 -4 4 5 6 0 2 6 6 2 0 6 5 4 -4 5 2 6 -6 2 -2 6 -6 0 -5 4 -4 -5 -6 0 -2 -6 -6 -2 0 -6 -5 -4 4 -5 -2 -6 6 -2 Z" fill="' + (fill || C.blue) + '" stroke="' + C.navy + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<circle cx="0" cy="0" r="' + (r * 0.5) + '" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.6"/>' +
      '<circle cx="0" cy="0" r="' + (r * 0.22) + '" fill="' + C.navy + '"/>' +
      '</g>';
  }

  function arrowRight(x, y, len, col, w) {
    return '<path d="M' + x + ' ' + y + ' h' + len + ' m-8 -6 l8 6 l-8 6" stroke="' + (col || C.navy) + '" stroke-width="' + (w || 3) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function arrowDown(x, y, len, col) {
    return '<path d="M' + x + ' ' + y + ' v' + len + ' m-6 -8 l6 8 l6 -8" stroke="' + (col || C.navy) + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  function loopArc(x, y, r, col, flip) {
    const dir = flip ? -1 : 1;
    return '<path d="M' + x + ' ' + y + ' a' + r + ' ' + r + ' 0 1 ' + (flip ? 1 : 0) + ' 0 ' + (dir * r * 2) + '" stroke="' + (col || C.navy) + '" stroke-width="3.2" fill="none" stroke-linecap="round"/>';
  }

  function star(x, y, s, fill) {
    const p = '0,-9 2.6,-2.8 9,-2.3 3.9,1.9 5.8,-1.1 1.7,5.4 8.4,3.1 -6,6.5 2.5,8.1 -8.1,-2 -5.2,6.6 -6.3,-4.8 -8.8,2.8 -0.4,-8.9 -6.5,-6.1 7.6,-4.2';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<polygon points="' + p + '" fill="' + (fill || C.gold) + '" stroke="' + C.navy + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '</g>';
  }

  function fish(x, y, s, fill) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-16 0 q14 -14 30 0 q-14 14 -30 0 Z" fill="' + (fill || C.blue) + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
      '<path d="M14 0 l10 -8 v16 Z" fill="' + (fill || C.blue) + '" stroke="' + C.navy + '" stroke-width="2"/>' +
      '<circle cx="-4" cy="-3" r="2" fill="' + C.navy + '"/>' +
      '</g>';
  }

  function tree(x, y, s, fill) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<rect x="-3" y="0" width="6" height="14" rx="2" fill="' + C.navy + '"/>' +
      '<circle cx="0" cy="-8" r="16" fill="' + (fill || C.green) + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
      '<circle cx="-8" cy="-14" r="9" fill="' + C.greenD + '" opacity="0.6"/>' +
      '</g>';
  }

  function thought(x, y, w, h, fill) {
    return '<g><ellipse cx="' + (x + w / 2) + '" cy="' + (y + h / 2) + '" rx="' + (w / 2) + '" ry="' + (h / 2) + '" fill="' + (fill || C.white) + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
      '<circle cx="' + x + '" cy="' + (y + h) + '" r="4" fill="' + (fill || C.white) + '" stroke="' + C.navy + '" stroke-width="2"/>' +
      '<circle cx="' + (x - 8) + '" cy="' + (y + h + 9) + '" r="2.6" fill="' + (fill || C.white) + '" stroke="' + C.navy + '" stroke-width="1.8"/>' +
      '</g>';
  }

  function label(x, y, txt, col, size) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" ' + FONT2 + ' font-size="' + (size || 12) + '" font-weight="700" fill="' + (col || C.navy) + '">' + txt + '</text>';
  }

  /* ================= 单元横幅 ================= */
  const UNIT_ART = {
    1: function () { // 引言：机灵鬼
      return frame(
        '<g transform="translate(210 92)">' +
        '<path d="M0 -78 q40 -10 40 34 q0 24 -40 34 q-40 -10 -40 -34 q0 -44 40 -34 Z" fill="none" stroke="' + C.green + '" stroke-width="4"/>' +
        '<path d="M0 -78 q40 -10 40 34 q0 24 -40 34 q-40 -10 -40 -34 q0 -44 40 -34 Z" fill="' + C.green + '" opacity="0.14"/>' +
        '<circle cx="0" cy="-78" r="8" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="0" cy="82" r="8" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<path d="M-6 -30 q-14 22 0 42 q14 20 0 42 M6 -30 q14 22 0 42 q-14 20 0 42" stroke="' + C.navy + '" stroke-width="2" fill="none" opacity="0.4"/>' +
        '</g>' +
        arrowDown(80, 220, 26, C.slate) + arrowDown(340, 220, 26, C.slate) +
        label(210, 226, 'SLINKY · 结构决定行为', C.greenD, 13),
        '引言 · 系统多棱镜'
      );
    },
    2: function () { // 第1章：浴缸存量/流量 + 回路
      return frame(
        tank(105, 120, 1.6, C.blue) +
        '<path d="M60 118 q-14 0 -14 -16 v-22 q0 -12 14 -12 h8" stroke="' + C.navy + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M52 82 l-10 8 l10 6" stroke="' + C.navy + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M150 118 h16 v24 q0 10 -12 10 h-16" stroke="' + C.orange + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M170 152 l-10 -6 l10 -8" stroke="' + C.orange + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="64" y="64" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.navy + '">流入</text>' +
        '<text x="176" y="170" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">流出</text>' +
        '<text x="105" y="152" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">存量</text>' +
        loopArc(318, 130, 42, C.purple) +
        '<circle cx="318" cy="88" r="5" fill="' + C.purple + '"/>' +
        arrowRight(268, 176, 100, C.purple, 2.6) +
        label(318, 200, '反馈回路', C.purpleD, 11),
        '第1章 · 系统之基础'
      );
    },
    3: function () { // 第2章：温度调节器 / 渔场双存量
      return frame(
        '<g transform="translate(90 96)">' +
        '<rect x="0" y="0" width="64" height="120" rx="12" fill="' + C.navy + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<circle cx="32" cy="28" r="16" fill="' + (C.orange) + '" opacity="0.5"/>' +
        '<circle cx="32" cy="60" r="16" fill="' + (C.orange) + '" opacity="0.5"/>' +
        '<circle cx="32" cy="92" r="16" fill="' + C.green + '"/>' +
        '<text x="32" y="98" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.white + '">18°</text>' +
        '</g>' +
        '<text x="90" y="240" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">恒温目标</text>' +
        fish(210, 150, 1.4, C.blue) + fish(250, 120, 1.0, C.blue) + fish(236, 180, 0.9, C.blue) +
        '<path d="M300 96 q18 -20 36 0 M336 96 q-18 -20 -36 0" stroke="' + C.orange + '" stroke-width="3" fill="none"/>' +
        '<text x="300" y="86" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">船队</text>' +
        arrowRight(180, 214, 150, C.slate, 2.4) +
        label(210, 238, '双存量 · 渔场', C.blueD, 12),
        '第2章 · 系统大观园'
      );
    },
    4: function () { // 第3章：适应力（弹簧反弹）+ 层次
      return frame(
        '<path d="M90 200 v-60 q30 -30 30 0 q30 30 30 0 q30 30 30 0 v60" stroke="' + C.green + '" stroke-width="4.4" fill="none" stroke-linecap="round"/>' +
        '<rect x="78" y="196" width="84" height="10" rx="5" fill="' + C.navy + '"/>' +
        '<rect x="78" y="96" width="84" height="10" rx="5" fill="' + C.navy + '"/>' +
        arrowDown(120, 80, 16, C.orange) +
        '<text x="120" y="72" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">挤压</text>' +
        '<g transform="translate(300 150)">' +
        '<circle cx="0" cy="0" r="42" fill="' + C.blue + '" opacity="0.14" stroke="' + C.blue + '" stroke-width="2.4"/>' +
        '<circle cx="0" cy="0" r="28" fill="' + C.blue + '" opacity="0.2" stroke="' + C.blue + '" stroke-width="2.2"/>' +
        '<circle cx="0" cy="0" r="15" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<text x="0" y="5" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="800" fill="' + C.white + '">层级</text>' +
        '</g>' +
        label(120, 234, '适应力 · 弹性', C.greenD, 12),
        '第3章 · 系统之美'
      );
    },
    5: function () { // 第4章：指数增长与有限理性
      return frame(
        '<path d="M70 200 q20 -6 26 -20 q6 -14 20 -16 q14 -2 22 -20 q8 -18 22 -18 q12 0 22 -16 q8 -12 18 -14" stroke="' + C.green + '" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
        '<path d="M70 200 q40 -10 80 -20" stroke="' + C.slate + '" stroke-width="2.6" stroke-dasharray="5 5" fill="none"/>' +
        '<text x="70" y="226" text-anchor="start" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">指数增长</text>' +
        '<text x="168" y="226" text-anchor="start" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">线性思维</text>' +
        thought(260, 86, 120, 74, C.paper) +
        '<text x="320" y="112" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.navy + '">有限理性</text>' +
        '<text x="320" y="130" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.slate + '">只看到一部分</text>' +
        '<circle cx="320" cy="180" r="6" fill="' + C.navy + '"/><circle cx="304" cy="192" r="4" fill="' + C.navy + '" opacity="0.6"/>' +
        '<circle cx="336" cy="192" r="4" fill="' + C.navy + '" opacity="0.6"/>' +
        '<circle cx="292" cy="206" r="3" fill="' + C.navy + '" opacity="0.35"/>' +
        '<circle cx="348" cy="206" r="3" fill="' + C.navy + '" opacity="0.35"/>' +
        label(180, 76, '非线性世界', C.orangeD, 12),
        '第4章 · 系统之奇'
      );
    },
    6: function () { // 第5章：公地悲剧 草场
      return frame(
        '<rect x="52" y="70" width="316" height="120" rx="14" fill="' + C.green + '" opacity="0.12" stroke="' + C.green + '" stroke-width="2.2"/>' +
        '<g transform="translate(140 150)">' +
        '<rect x="-4" y="0" width="8" height="16" rx="2" fill="' + C.navy + '"/>' +
        '<circle cx="0" cy="-8" r="12" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="-5" cy="-8" r="3" fill="' + C.navy + '"/><circle cx="5" cy="-8" r="3" fill="' + C.navy + '"/>' +
        '<circle cx="-5" cy="-6" r="1" fill="' + C.white + '"/><circle cx="5" cy="-6" r="1" fill="' + C.white + '"/>' +
        '</g>' +
        '<g transform="translate(230 160)">' +
        '<rect x="-4" y="0" width="8" height="14" rx="2" fill="' + C.navy + '"/>' +
        '<circle cx="0" cy="-7" r="10" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="-4" cy="-7" r="2.6" fill="' + C.navy + '"/><circle cx="4" cy="-7" r="2.6" fill="' + C.navy + '"/>' +
        '</g>' +
        '<g transform="translate(290 172)">' +
        '<rect x="-3" y="0" width="6" height="10" rx="2" fill="' + C.navy + '"/>' +
        '<circle cx="0" cy="-5" r="7" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<circle cx="-3" cy="-5" r="1.8" fill="' + C.navy + '"/><circle cx="3" cy="-5" r="1.8" fill="' + C.navy + '"/>' +
        '</g>' +
        '<path d="M52 70 l6 -16 h52 l6 16 M316 70 l6 -16 h52 l6 16" fill="' + C.greenD + '" opacity="0.5"/>' +
        label(210, 238, '公地悲剧 · 草场', C.greenD, 13) +
        '<path d="M60 190 l0 -14 M340 190 l0 -14" stroke="' + C.orange + '" stroke-width="2.6" stroke-dasharray="3 4"/>' +
        '<text x="210" y="60" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.red + '">人人都多放牧 → 草场荒芜</text>',
        '第5章 · 8大陷阱与对策'
      );
    },
    7: function () { // 第6章：杠杆点阶梯
      return frame(
        '<g transform="translate(210 128)">' +
        '<rect x="-92" y="-96" width="52" height="20" rx="8" fill="' + C.slate + '" opacity="0.55"/>' +
        '<rect x="-92" y="-68" width="52" height="20" rx="8" fill="' + C.blue + '" opacity="0.6"/>' +
        '<rect x="-92" y="-40" width="52" height="20" rx="8" fill="' + C.purple + '" opacity="0.65"/>' +
        '<rect x="-92" y="-12" width="52" height="20" rx="8" fill="' + C.orange + '" opacity="0.7"/>' +
        '<rect x="-92" y="16" width="52" height="20" rx="8" fill="' + C.green + '" opacity="0.8"/>' +
        '<rect x="-92" y="44" width="52" height="20" rx="8" fill="' + C.gold + '"/>' +
        '<text x="-66" y="-82" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.white + '">参数</text>' +
        '<text x="-66" y="-54" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.white + '">缓冲器</text>' +
        '<text x="-66" y="-26" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.white + '">回路</text>' +
        '<text x="-66" y="2" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.white + '">信息流</text>' +
        '<text x="-66" y="30" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.white + '">目标</text>' +
        '<text x="-66" y="58" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.navy + '">范式</text>' +
        '<path d="M40 -70 l10 14 h8" stroke="' + C.navy + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="80" y="-40" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.orangeD + '">弱</text>' +
        '<text x="80" y="30" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.greenD + '">强</text>' +
        arrowDown(66, -30, 40, C.green) +
        '</g>' +
        '<g transform="translate(96 120)">' + gear(0, 0, 1.6, C.blue) + '</g>' +
        '<g transform="translate(120 120)">' + gear(0, 0, 1.1, C.purple) + '</g>' +
        label(210, 240, '12个杠杆点 · 从弱到强', C.navy, 13),
        '第6章 · 12大变革方式'
      );
    },
    8: function () { // 第7章：与系统共舞
      return frame(
        '<path d="M70 210 q30 -60 60 -20 q30 40 60 -10 q30 -50 60 10 q30 60 60 -20" stroke="' + C.blue + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<circle cx="82" cy="180" r="7" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="172" cy="130" r="7" fill="' + C.pink + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="262" cy="160" r="7" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="352" cy="120" r="7" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<g transform="translate(210 96)">' +
        '<circle cx="0" cy="0" r="34" fill="' + C.orange + '" opacity="0.15" stroke="' + C.orange + '" stroke-width="2.4"/>' +
        '<text x="0" y="8" text-anchor="middle" ' + FONT2 + ' font-size="26">🤝</text>' +
        '</g>' +
        label(210, 64, '与系统共舞', C.orangeD, 14) +
        '<text x="210" y="240" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">跟上节拍 · 谦逊 · 庆祝复杂性</text>',
        '第7章 · 15大生存法则'
      );
    },
  };

  /* ================= 小节图标 ================= */
  const GLYPHS = {
    prism: '<path d="M20 8 l12 8 -4 14 -16 0 -4 -14 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M8 22 h24 M12 14 q8 4 16 0" stroke="' + C.white + '" stroke-width="1.8" fill="none" opacity="0.85"/>',
    gear: '<path d="M20 8 l2 -4 h4 l2 4 l4 2 4 -2 l3 4 -2 4 2 4 -4 2 -2 4 h-4 l-2 4 -4 -2 -4 2 -2 -4 -4 -2 -2 -4 2 -4 -2 -4 4 -2 Z" fill="' + C.slate + '" stroke="' + C.navy + '" stroke-width="1.8"/><circle cx="20" cy="20" r="5" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    bathtub: '<path d="M8 28 h24 v6 a4 4 0 0 1 -4 4 h-16 a4 4 0 0 1 -4 -4 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M8 28 v-6 q0 -4 4 -4 M8 24 q12 -6 24 0" stroke="' + C.blue + '" stroke-width="2.4" fill="none"/>',
    loop: '<path d="M20 10 a12 12 0 1 1 0 20 M20 10 l-4 4 l4 4" stroke="' + C.red + '" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="30" y="16" width="8" height="12" rx="3" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    fish: '<path d="M20 16 q10 -8 16 0 q-6 8 0 8 q-10 8 -16 0 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M36 16 l6 -5 v10 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>',
    chart: '<rect x="6" y="10" width="28" height="34" rx="5" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M12 36 l6 -8 l5 4 l9 -12" stroke="' + C.white + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    tree: '<rect x="18" y="20" width="4" height="14" fill="' + C.navy + '"/><circle cx="20" cy="12" r="11" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.2"/><circle cx="14" cy="8" r="5" fill="' + C.greenD + '" opacity="0.6"/>',
    layer: '<rect x="8" y="12" width="24" height="8" rx="3" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="1.8"/><rect x="12" y="20" width="16" height="8" rx="3" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="1.8"/><rect x="16" y="28" width="8" height="6" rx="2" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    model: '<rect x="7" y="10" width="26" height="20" rx="5" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/><circle cx="14" cy="20" r="2" fill="' + C.navy + '"/><path d="M16 20 h10 M16 20 l4 -6 M20 20 l4 6" stroke="' + C.blue + '" stroke-width="2" fill="none"/><line x1="7" y1="30" x2="33" y2="30" stroke="' + C.orange + '" stroke-width="2.4"/>',
    growth: '<path d="M10 34 q8 -16 18 -10 q6 4 2 2 q-8 -8 0 -12" stroke="' + C.green + '" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="32" cy="12" r="4" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="1.6"/>',
    boundary: '<circle cx="20" cy="20" r="14" fill="none" stroke="' + C.orange + '" stroke-width="2.6" stroke-dasharray="6 4"/><circle cx="20" cy="20" r="8" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/><path d="M34 6 l8 8 M36 6 l8 8" stroke="' + C.slate + '" stroke-width="2" stroke-dasharray="3 3"/>',
    bottle: '<path d="M20 8 h4 l2 5 v21 a3 3 0 0 1 -3 3 h-6 a3 3 0 0 1 -3 -3 v-21 Z" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.2"/><line x1="13" y1="20" x2="27" y2="20" stroke="' + C.navy + '" stroke-width="2.4"/>',
    clock: '<circle cx="20" cy="22" r="14" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4"/><line x1="20" y1="22" x2="20" y2="12" stroke="' + C.blueD + '" stroke-width="2.6" stroke-linecap="round"/><line x1="20" y1="22" x2="27" y2="22" stroke="' + C.blueD + '" stroke-width="2.6" stroke-linecap="round"/><path d="M16 6 h8" stroke="' + C.navy + '" stroke-width="2.4" stroke-linecap="round"/>',
    brain: '<path d="M12 12 q-4 -10 6 -12 q4 2 2 8 q4 -6 10 -2 q3 5 -4 8 q4 2 0 8 q-3 5 -10 0 q-6 3 -10 -4 q-4 -8 6 -6 Z" fill="' + C.pink + '" stroke="' + C.navy + '" stroke-width="2.2"/>',
    trap: '<circle cx="20" cy="20" r="15" fill="none" stroke="' + C.navy + '" stroke-width="2.4" stroke-dasharray="5 3"/><path d="M12 12 l6 8 l-4 10 l10 -6 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2"/>',
    meadow: '<path d="M8 30 h24 v6 q-6 -4 -12 0 q-6 4 -12 0 Z" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2"/><path d="M14 22 q4 -6 8 0 q4 -6 8 0" stroke="' + C.green + '" stroke-width="2.4" fill="none"/>',
    scaleDown: '<polygon points="20,10 24,18 16,18" fill="' + C.navy + '"/><line x1="8" y1="22" x2="32" y2="22" stroke="' + C.navy + '" stroke-width="2.4"/><path d="M8 22 a5 5 0 0 0 10 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/><path d="M32 22 a5 5 0 0 0 -10 0 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    swords: '<path d="M12 10 l16 16 M28 10 l-16 16" stroke="' + C.slate + '" stroke-width="2.6"/><rect x="9" y="6" width="6" height="6" rx="2" fill="' + C.red + '" stroke="' + C.navy + '" stroke-width="1.6"/><rect x="25" y="28" width="6" height="6" rx="2" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="1.6"/>',
    crown: '<path d="M8 26 l-2 -12 l7 5 l7 -10 l7 10 l7 -5 l-2 12 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/><circle cx="8" cy="28" r="2.6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/><circle cx="32" cy="28" r="2.6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/>',
    medkit: '<rect x="10" y="14" width="20" height="20" rx="4" fill="' + C.red + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M15 14 v-4 a5 5 0 0 1 10 0 v4 M14 24 h12 M20 18 v12" stroke="' + C.white + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
    pill: '<rect x="8" y="14" width="24" height="12" rx="6" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 14 v12" stroke="' + C.navy + '" stroke-width="2"/><rect x="8" y="14" width="12" height="12" rx="6" fill="' + C.blue + '"/>',
    flag: '<line x1="12" y1="10" x2="12" y2="34" stroke="' + C.navy + '" stroke-width="2.6"/><path d="M12 10 h16 l-4 6 l4 6 h-16 Z" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2"/>',
    lever: '<line x1="8" y1="30" x2="32" y2="10" stroke="' + C.navy + '" stroke-width="2.8"/><circle cx="20" cy="20" r="5" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2"/><rect x="26" y="6" width="8" height="8" rx="2" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="1.6"/>',
    buffer: '<rect x="10" y="12" width="20" height="16" rx="4" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M16 12 v-6 h8 v6" stroke="' + C.navy + '" stroke-width="2" fill="none"/><line x1="14" y1="20" x2="26" y2="20" stroke="' + C.white + '" stroke-width="2"/>',
    delay: '<path d="M14 20 a6 6 0 0 0 12 0" stroke="' + C.slate + '" stroke-width="2.6" fill="none"/><circle cx="26" cy="20" r="8" fill="none" stroke="' + C.orange + '" stroke-width="2.4"/><line x1="26" y1="20" x2="26" y2="14" stroke="' + C.orangeD + '" stroke-width="2.2" stroke-linecap="round"/>',
    shield: '<path d="M20 6 l12 5 v10 q0 9 -12 13 q-12 -4 -12 -13 v-10 Z" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M15 19 l4 4 l7 -8" stroke="' + C.white + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    target: '<circle cx="20" cy="20" r="14" fill="' + C.blue + '" opacity="0.15" stroke="' + C.blue + '" stroke-width="2.2"/><circle cx="20" cy="20" r="8" fill="none" stroke="' + C.blue + '" stroke-width="2.2"/><circle cx="20" cy="20" r="3" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="1.6"/>',
    info: '<circle cx="20" cy="20" r="14" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><text x="20" y="26" text-anchor="middle" ' + FONT2 + ' font-size="16" font-weight="800" fill="' + C.white + '">i</text>',
    rules: '<rect x="8" y="8" width="24" height="24" rx="4" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/><line x1="13" y1="16" x2="27" y2="16" stroke="' + C.line + '" stroke-width="2.4"/><line x1="13" y1="22" x2="27" y2="22" stroke="' + C.line + '" stroke-width="2.4"/><line x1="13" y1="28" x2="22" y2="28" stroke="' + C.gold + '" stroke-width="2.6"/>',
    auto: '<path d="M14 22 q3 -4 6 0 q3 4 6 0" stroke="' + C.purple + '" stroke-width="2.4" fill="none"/><path d="M14 18 q3 -8 6 0 q3 8 6 0" stroke="' + C.purple + '" stroke-width="2.4" fill="none" opacity="0.55"/>',
    sun: '<circle cx="20" cy="20" r="8" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 6 v-3 M20 37 v-3 M6 20 h-3 M37 20 h-3 M10 10 l-2 -2 M32 32 l2 2 M30 10 l2 -2 M8 32 l-2 2" stroke="' + C.goldD + '" stroke-width="2.4" stroke-linecap="round"/>',
    wave: '<path d="M8 24 q6 -8 12 0 q6 8 12 0" stroke="' + C.blue + '" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 14 q4 -5 8 0 q4 5 8 0" stroke="' + C.purple + '" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.7"/>',
    compass: '<circle cx="20" cy="20" r="14" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4"/><polygon points="20,12 24,20 20,28 16,20" fill="' + C.red + '" stroke="' + C.navy + '" stroke-width="1.6"/><circle cx="20" cy="20" r="2" fill="' + C.navy + '"/>',
    heart: '<path d="M20 30 s-8 -5 -10 -9 c-2 -4 0 -8 4 -8 c2.4 0 4 1.5 6 4 c2 -2.5 3.6 -4 6 -4 c4 0 6 4 4 8 c-2 4 -10 9 -10 9 Z" fill="' + C.pink + '" stroke="' + C.navy + '" stroke-width="2.2"/>',
    learn: '<path d="M20 10 a7 7 0 0 0 -7 -2 h-6 v22 h6 a7 7 0 0 1 7 2 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 10 a7 7 0 0 1 7 -2 h6 v22 h-6 a7 7 0 0 1 -7 2 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>',
    wisdom: '<path d="M20 8 l12 5 v10 q0 9 -12 13 q-12 -4 -12 -13 v-10 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 14 l2 4 4 0 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 0 Z" fill="' + C.white + '" opacity="0.9"/>',
    clock2: '<circle cx="20" cy="20" r="14" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4"/><line x1="20" y1="20" x2="20" y2="12" stroke="' + C.orange + '" stroke-width="2.6" stroke-linecap="round"/><line x1="20" y1="20" x2="27" y2="20" stroke="' + C.orange + '" stroke-width="2.6" stroke-linecap="round"/><path d="M12 8 h16" stroke="' + C.navy + '" stroke-width="2" stroke-linecap="round"/>',
    scope: '<circle cx="20" cy="20" r="13" fill="none" stroke="' + C.green + '" stroke-width="2.4"/><circle cx="20" cy="20" r="6" fill="' + C.green + '" opacity="0.2" stroke="' + C.green + '" stroke-width="2"/><circle cx="20" cy="20" r="2" fill="' + C.navy + '"/><path d="M20 3 v5 M20 32 v5 M3 20 h5 M32 20 h5" stroke="' + C.navy + '" stroke-width="2.2" stroke-linecap="round"/>',
    broom: '<line x1="10" y1="30" x2="28" y2="12" stroke="' + C.navy + '" stroke-width="2.8"/><path d="M10 30 l-4 -4 l6 -6 l4 4 Z" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="1.6"/><line x1="24" y1="16" x2="30" y2="22" stroke="' + C.navy + '" stroke-width="2"/>',
    globe: '<circle cx="20" cy="20" r="14" fill="' + C.blue + '" opacity="0.15" stroke="' + C.blue + '" stroke-width="2.4"/><path d="M6 20 h28 M20 6 q-6 14 0 28 M20 6 q6 14 0 28" stroke="' + C.blue + '" stroke-width="2" fill="none"/>',
  };

  const KEYWORDS = [
    [/机灵鬼|无处|引言|多棱镜|发现更大|系统之美/i, 'prism'],
    [/总体|部分|游戏规则|要素|连接|功能|目标/i, 'gear'],
    [/存量|流量|动态性|浴缸|stock|flow/i, 'bathtub'],
    [/反馈|调节回路|增强回路|自动洄游|脱缰/i, 'loop'],
    [/温度|恒温|单存量/i, 'sun'],
    [/复利|人口|指数|增长/i, 'growth'],
    [/延迟|振荡|补货|时间/i, 'clock'],
    [/渔场|可再生|鱼|石油|双存量/i, 'fish'],
    [/适应力|弹性|resilience/i, 'wave'],
    [/自组织|涌现/i, 'auto'],
    [/层次|层级|subsystem/i, 'layer'],
    [/表象|模型|迷惑|心智模式|图景/i, 'model'],
    [/非线性|线性|指数|思维/i, 'chart'],
    [/边界|划定/i, 'boundary'],
    [/限制因素|瓶颈/i, 'bottle'],
    [/时间延迟|延迟/i, 'delay'],
    [/有限理性/i, 'brain'],
    [/政策阻力/i, 'rules'],
    [/公地悲剧|草场|公共资源/i, 'meadow'],
    [/目标侵蚀|标准/i, 'scaleDown'],
    [/竞争升级/i, 'swords'],
    [/富者愈富|竞争排斥|马太/i, 'crown'],
    [/转嫁负担|上瘾|根本解|症状解/i, 'medkit'],
    [/规避规则/i, 'broom'],
    [/目标错位|异化|指标/i, 'target'],
    [/杠杆|变革|干预/i, 'lever'],
    [/数字|参数|常数/i, 'info'],
    [/缓冲器|存量—流量/i, 'buffer'],
    [/信息流|信息/i, 'globe'],
    [/系统规则|规则|激励|惩罚/i, 'shield'],
    [/社会范式|范式|超越范式|谦卑|空/i, 'sun'],
    [/节拍|节奏/i, 'clock2'],
    [/心智模式|阳光|检验/i, 'model'],
    [/语言|信息|分享|相信/i, 'speech'],
    [/重要|衡量/i, 'scale'],
    [/整体利益|反馈政策/i, 'target'],
    [/智慧|职责|界定/i, 'wisdom'],
    [/谦逊|学习者|庆祝复杂|复杂性/i, 'learn'],
    [/时间|范围|清规戒律/i, 'compass'],
    [/善|标准|道德/i, 'heart'],
  ];

  // 补一个 GLYPHS 里可能没有但 KEYWORDS 引用的：
  GLYPHS.speech = '<rect x="6" y="10" width="30" height="20" rx="8" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M14 30 l-4 8 10 -6 Z" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="2.2"/><text x="21" y="25" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">言</text>';
  GLYPHS.scale = '<polygon points="20,10 24,18 16,18" fill="' + C.navy + '"/><line x1="8" y1="22" x2="32" y2="22" stroke="' + C.navy + '" stroke-width="2.4"/><path d="M8 22 a5 5 0 0 0 10 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/><path d="M32 22 a5 5 0 0 0 -10 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/>';

  function sectionIcon(unitId, title) {
    let glyph = 'learn';
    for (let i = 0; i < KEYWORDS.length; i++) {
      if (KEYWORDS[i][0].test(title)) { glyph = KEYWORDS[i][1]; break; }
    }
    const colors = [C.blue, C.green, C.purple, C.orange, C.pink, C.gold, C.red, C.teal || '#00cd9c'];
    const ring = colors[(unitId - 1) % colors.length];
    return '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" style="width:44px;height:44px">' +
      '<circle cx="20" cy="20" r="18" fill="' + C.white + '" stroke="' + ring + '" stroke-width="2.4"/>' +
      '<circle cx="20" cy="20" r="15" fill="' + ring + '" opacity="0.12"/>' +
      (GLYPHS[glyph] || GLYPHS.learn) + '</svg>';
  }

  window.Art = {
    unitArt: function (id) { return UNIT_ART[id] ? UNIT_ART[id]() : UNIT_ART[1](); },
    sectionIcon: sectionIcon,
    palette: C,
  };
})();

