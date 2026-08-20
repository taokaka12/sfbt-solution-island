/* ============================================================
   博弈思维 — art.js
   - 每个单元（章）420x260 内联 SVG 横幅
   - 每个小节 40px 关键词图标
   - 收益矩阵渲染器（payoff matrix，可点击高亮均衡）
   画风：棋盘深绿 + 奶油纸感 + 收益单元格
   ============================================================ */
(function () {
  'use strict';

  const C = {
    board: '#1e2b25', board2: '#283a30', paper: '#fffdf8',
    ink: '#232019', slate: '#8a8577', line: '#dcd6c8',
    green: '#2e9e4f', greenD: '#1c6b32',
    blue: '#2a7de1', blueD: '#2268bd',
    purple: '#8f6bd8', purpleD: '#5b3fb0',
    orange: '#f59f2a', orangeD: '#c97f0f',
    pink: '#e26aa5', pinkD: '#b34d82',
    gold: '#d9a520', red: '#e24b3f', teal: '#17a396',
  };

  const FONT = "font-family='Georgia, serif'";
  const FONT2 = "font-family='Segoe UI, sans-serif'";

  function frame(inner, label, opts) {
    opts = opts || {};
    const w = opts.w || 420, h = opts.h || 260;
    const back = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="22" fill="url(#bgGrad)"/>';
    const grid = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="22" fill="url(#dotGrid)" opacity="0.5"/>';
    const cap = label
      ? '<text x="' + (w / 2) + '" y="' + (h - 16) + '" text-anchor="middle" ' + FONT2 +
        ' font-size="12" font-weight="700" letter-spacing="3" fill="' + C.slate + '" opacity="0.85">' + label + '</text>'
      : '';
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (label || 'illustration') + '">' +
      defs() + back + grid + inner + cap + '</svg>';
  }

  function defs() {
    return '<defs>' +
      '<linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + C.paper + '"/><stop offset="1" stop-color="#eef2e8"/>' +
      '</linearGradient>' +
      '<pattern id="dotGrid" width="18" height="18" patternUnits="userSpaceOnUse">' +
      '<circle cx="1.5" cy="1.5" r="1.3" fill="' + C.slate + '" opacity="0.18"/></pattern>' +
      '<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="' + C.board + '" flood-opacity="0.14"/>' +
      '</filter>' +
      '</defs>';
  }

  function label(x, y, txt, col, size, anchor) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" ' + FONT2 +
      ' font-size="' + (size || 12) + '" font-weight="700" fill="' + (col || C.ink) + '">' + txt + '</text>';
  }
  function arrowRight(x, y, len, col, w) {
    return '<path d="M' + x + ' ' + y + ' h' + len + ' m-8 -6 l8 6 l-8 6" stroke="' + (col || C.board) + '" stroke-width="' + (w || 3) + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function arrowDown(x, y, len, col) {
    return '<path d="M' + x + ' ' + y + ' v' + len + ' m-6 -8 l6 8 l6 -8" stroke="' + (col || C.board) + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function payMatrix(x, y, s, r1, r2, c1, c2, vals, hi) {
    // 一个 2x2 收益矩阵
    const cw = 58 * s, ch = 42 * s;
    let out = '';
    const heads = [['', c1, c2], [r1, vals[0], vals[1]], [r2, vals[2], vals[3]]];
    for (let r = 0; r < 3; r++) {
      for (let col = 0; col < 3; col++) {
        const px = x + col * cw, py = y + r * ch;
        const isCorner = r === 0 && col === 0;
        const isHead = r === 0 || col === 0;
        const isHi = hi && hi.indexOf((r - 1) * 2 + (col - 1)) >= 0;
        let fill = isCorner ? C.board2 : (isHead ? C.board2 : (isHi ? '#d9f2d0' : C.paper));
        out += '<rect x="' + px + '" y="' + py + '" width="' + cw + '" height="' + ch + '" rx="4" fill="' + fill + '" stroke="' + C.board + '" stroke-width="1.6"/>';
        if (isHi) {
          out += '<rect x="' + px + '" y="' + py + '" width="' + cw + '" height="' + ch + '" rx="4" fill="none" stroke="' + C.green + '" stroke-width="3"/>';
        }
        if (isCorner) {
          out += '<text x="' + (px + cw / 2) + '" y="' + (py + ch / 2 + 4) + '" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.paper + '">博弈</text>';
        } else if (isHead) {
          const t = r === 0 ? c1 : c2;
          const isCol = r === 0;
          const tx = isCol ? (px + cw / 2) : (px + 6);
          const ty = isCol ? (py + ch / 2 + 4) : (py + ch / 2 + 4);
          out += '<text x="' + tx + '" y="' + ty + '" text-anchor="' + (isCol ? 'middle' : 'start') + '" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.paper + '">' + t + '</text>';
        } else {
          out += '<text x="' + (px + cw / 2) + '" y="' + (py + ch / 2 + 4) + '" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="900" fill="' + C.ink + '">' + vals[(r - 1) * 2 + (col - 1)] + '</text>';
        }
      }
    }
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + out + '</g>';
  }

  /* ================= 单元横幅 ================= */
  const UNIT_ART = {
    1: function () { // 狮子故事
      return frame(
        '<g transform="translate(210 118)">' +
        '<circle cx="0" cy="0" r="40" fill="' + C.orange + '" opacity="0.14" stroke="' + C.orange + '" stroke-width="2.4"/>' +
        '<text x="0" y="14" text-anchor="middle" ' + FONT + ' font-size="44">🦁</text>' +
        '</g>' +
        '<g transform="translate(84 150)">' + '<text x="0" y="0" text-anchor="middle" font-size="30">🏃</text>' +
        '<text x="0" y="24" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">跑得快</text></g>' +
        '<g transform="translate(316 150)">' + '<text x="0" y="0" text-anchor="middle" font-size="30">🏃‍♂️</text>' +
        '<text x="0" y="24" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.orangeD + '">跑得慢</text></g>' +
        arrowRight(120, 165, 76, C.board, 2.6) +
        arrowRight(224, 165, 76, C.board, 2.6) +
        '<path d="M150 200 q30 -14 60 0 q30 14 60 0" stroke="' + C.green + '" stroke-width="2.4" fill="none" stroke-dasharray="4 4"/>' +
        label(210, 84, '只需胜汝，不必胜狮', C.greenD, 13),
        '第1章 · 何为「博弈」'
      );
    },
    2: function () { // 发展简史：从围棋到理论
      return frame(
        '<g transform="translate(210 92)">' +
        '<circle cx="0" cy="0" r="52" fill="' + C.board + '"/>' +
        '<circle cx="0" cy="0" r="52" fill="none" stroke="' + C.green + '" stroke-width="2.4"/>' +
        '<path d="M-52 0 h104 M0 -52 v104 M-36 -36 h72 M-36 36 h72" stroke="' + C.green + '" stroke-width="1.6" opacity="0.5"/>' +
        '<circle cx="-18" cy="-18" r="4" fill="' + C.ink + '"/><circle cx="10" cy="-10" r="4" fill="' + C.ink + '"/>' +
        '<circle cx="20" cy="22" r="4" fill="' + C.ink + '"/><circle cx="-6" cy="18" r="4" fill="' + C.ink + '"/>' +
        '<circle cx="2" cy="-30" r="4" fill="' + C.ink + '"/>' +
        '</g>' +
        '<text x="150" y="188" text-anchor="end" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">田忌赛马</text>' +
        arrowRight(160, 184, 40, C.blue, 2.2) +
        '<text x="214" y="184" text-anchor="start" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">1944 博弈论奠基</text>' +
        label(210, 220, '从传说故事到一门科学', C.board, 12),
        '第2章 · 发展简史'
      );
    },
    3: function () { // 六要素
      return frame(
        '<g transform="translate(210 96)">' +
        '<circle cx="0" cy="0" r="44" fill="' + C.purple + '" opacity="0.14" stroke="' + C.purple + '" stroke-width="2.4"/>' +
        '<text x="0" y="8" text-anchor="middle" ' + FONT + ' font-size="40">🗝️</text>' +
        '</g>' +
        '<g transform="translate(66 74)">' + chip('参与者', C.blue) + '</g>' +
        '<g transform="translate(176 54)">' + chip('信息', C.green) + '</g>' +
        '<g transform="translate(286 74)">' + chip('行动', C.orange) + '</g>' +
        '<g transform="translate(66 168)">' + chip('策略', C.purple) + '</g>' +
        '<g transform="translate(176 190)">' + chip('损益', C.red) + '</g>' +
        '<g transform="translate(286 168)">' + chip('均衡', C.teal) + '</g>' +
        label(210, 236, '博弈六要素', C.board, 13),
        '第3章 · 术语解读'
      );
    },
    4: function () { // 基本假设：理性 + 共同知识
      return frame(
        '<g transform="translate(110 122)">' +
        '<circle cx="0" cy="0" r="40" fill="' + C.blue + '" opacity="0.14" stroke="' + C.blue + '" stroke-width="2.4"/>' +
        '<text x="0" y="12" text-anchor="middle" ' + FONT + ' font-size="38">🧠</text>' +
        '<text x="0" y="64" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">理性假设</text>' +
        '</g>' +
        '<g transform="translate(310 122)">' +
        '<circle cx="0" cy="0" r="40" fill="' + C.green + '" opacity="0.14" stroke="' + C.green + '" stroke-width="2.4"/>' +
        '<text x="0" y="12" text-anchor="middle" ' + FONT + ' font-size="38">👁️</text>' +
        '<text x="0" y="64" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">共同知识</text>' +
        '</g>' +
        '<text x="210" y="48" text-anchor="middle" ' + FONT + ' font-size="26">🧩</text>' +
        '<path d="M150 122 q60 18 120 0" stroke="' + C.orange + '" stroke-width="2.4" fill="none" stroke-dasharray="4 4"/>' +
        label(210, 200, '两个假设，撑起整个博弈论', C.orangeD, 12),
        '第4章 · 基本假设'
      );
    },
    5: function () { // 囚犯困境
      return frame(
        '<g transform="translate(70 66)">' +
        '<rect x="0" y="0" width="150" height="86" rx="8" fill="' + C.paper + '" stroke="' + C.board + '" stroke-width="2.4"/>' +
        '<text x="75" y="18" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.slate + '">囚犯A \\ 囚犯B</text>' +
        '<text x="42" y="38" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.board + '">坦白</text>' +
        '<text x="112" y="38" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.board + '">抗拒</text>' +
        '<text x="14" y="58" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.board + '">坦白</text>' +
        '<text x="14" y="78" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.board + '">抗拒</text>' +
        '<text x="42" y="58" text-anchor="middle" font-size="12" font-weight="900" fill="' + C.red + '">3,3</text>' +
        '<text x="112" y="58" text-anchor="middle" font-size="12" font-weight="900" fill="' + C.ink + '">0,5</text>' +
        '<text x="42" y="78" text-anchor="middle" font-size="12" font-weight="900" fill="' + C.ink + '">5,0</text>' +
        '<text x="112" y="78" text-anchor="middle" font-size="12" font-weight="900" fill="' + C.greenD + '">0.5,0.5</text>' +
        '<rect x="28" y="48" width="28" height="20" rx="3" fill="none" stroke="' + C.red + '" stroke-width="2.6"/>' +
        '</g>' +
        '<g transform="translate(284 66)">' +
        '<text x="0" y="30" text-anchor="middle" font-size="44">⛓️</text>' +
        '<text x="0" y="52" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.red + '">都是理性，都选坦白</text>' +
        '<text x="0" y="70" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.slate + '">却是最差结局</text>' +
        '</g>' +
        arrowRight(228, 100, 50, C.board, 2.4) +
        label(210, 208, '个体理性 ≠ 集体理性', C.red, 13) +
        '<text x="210" y="228" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.slate + '">（坦白，坦白）是占优策略均衡</text>',
        '第5章 · 囚犯困境及原因'
      );
    },
    6: function () { // 真实世界囚犯困境
      return frame(
        '<g transform="translate(210 110)">' +
        '<circle cx="0" cy="0" r="48" fill="' + C.green + '" opacity="0.12" stroke="' + C.green + '" stroke-width="2.4"/>' +
        '<text x="0" y="16" text-anchor="middle" ' + FONT + ' font-size="40">🐏</text>' +
        '<text x="-26" y="30" text-anchor="middle" font-size="14">🐏</text>' +
        '<text x="22" y="-14" text-anchor="middle" font-size="14">🐏</text>' +
        '</g>' +
        '<text x="210" y="196" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">公地悲剧：人人多放牧 → 草场荒芜</text>' +
        '<text x="80" y="70" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">大萧条</text>' +
        '<text x="340" y="70" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">价格战</text>' +
        label(210, 234, '困境就在身边', C.board, 12),
        '第6章 · 真实世界的囚犯困境'
      );
    },
    7: function () { // 破解囚犯困境
      return frame(
        '<g transform="translate(210 108)">' +
        '<rect x="-78" y="-30" width="156" height="54" rx="10" fill="' + C.paper + '" stroke="' + C.board + '" stroke-width="2.2"/>' +
        '<text x="0" y="-2" text-anchor="middle" font-size="24">🔓</text>' +
        '<text x="0" y="18" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.greenD + '">破局</text>' +
        '</g>' +
        '<g transform="translate(70 188)">' + '<text x="0" y="0" text-anchor="middle" font-size="26">❤️</text>' +
        '<text x="0" y="22" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.red + '">道德教化</text></g>' +
        '<g transform="translate(210 188)">' + '<text x="0" y="0" text-anchor="middle" font-size="26">🏠</text>' +
        '<text x="0" y="22" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">产权私有</text></g>' +
        '<g transform="translate(350 188)">' + '<text x="0" y="0" text-anchor="middle" font-size="26">📚</text>' +
        '<text x="0" y="22" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.orangeD + '">温故知新</text></g>' +
        '<path d="M210 120 v34" stroke="' + C.green + '" stroke-width="2.4" stroke-dasharray="4 4"/>' +
        label(210, 60, '三条破局之路', C.greenD, 13),
        '第7章 · 如何破解囚犯困境'
      );
    },
    8: function () { // 万元陷阱
      return frame(
        '<g transform="translate(210 108)">' +
        '<circle cx="0" cy="0" r="44" fill="' + C.gold + '" opacity="0.18" stroke="' + C.gold + '" stroke-width="2.6"/>' +
        '<text x="0" y="10" text-anchor="middle" font-size="40">💵</text>' +
        '</g>' +
        '<g transform="translate(210 108)">' +
        '<path d="M-30 -58 q30 -20 60 0 q30 20 60 0" stroke="' + C.red + '" stroke-width="2.4" fill="none"/>' +
        '<path d="M-90 -58 q30 -20 60 0 q30 20 60 0" stroke="' + C.orange + '" stroke-width="2.4" fill="none"/>' +
        '<path d="M-150 -58 q30 -20 60 0 q30 20 60 0" stroke="' + C.slate + '" stroke-width="2.4" fill="none"/>' +
        '</g>' +
        '<text x="210" y="184" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.red + '">越陷越深</text>' +
        arrowDown(210, 150, 20, C.red) +
        label(210, 228, '出价第二高也要付钱', C.board, 12),
        '第8章 · 万元陷阱'
      );
    },
    9: function () { // 智猪博弈
      return frame(
        '<g transform="translate(210 120)">' +
        '<rect x="-70" y="20" width="140" height="50" rx="12" fill="' + C.paper + '" stroke="' + C.board + '" stroke-width="2.2"/>' +
        '<rect x="-34" y="-20" width="68" height="44" rx="8" fill="' + C.orange + '" opacity="0.8" stroke="' + C.board + '" stroke-width="2.2"/>' +
        '<text x="0" y="8" text-anchor="middle" font-size="24">🔘</text>' +
        '<text x="0" y="-34" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.orangeD + '">按钮</text>' +
        '<g transform="translate(-40 30)">' + '<text x="0" y="0" text-anchor="middle" font-size="30">🐷</text>' +
        '<text x="0" y="22" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.board + '">大猪按铃</text></g>' +
        '<g transform="translate(44 34)">' + '<text x="0" y="0" text-anchor="middle" font-size="22">🐖</text>' +
        '<text x="0" y="18" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.slate + '">小猪白吃</text></g>' +
        '</g>' +
        label(210, 214, '搭便车，也是理性选择', C.board, 12),
        '第9章 · 智猪博弈'
      );
    },
    10: function () { // 懦夫博弈
      return frame(
        '<g transform="translate(210 118)">' +
        '<path d="M-60 34 L60 34 M-60 34 L-16 10 M60 34 L16 10 M-16 10 L0 -14 M16 10 L0 -14" stroke="' + C.board + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<text x="-34" y="0" text-anchor="middle" font-size="30">🐓</text>' +
        '<text x="34" y="0" text-anchor="middle" font-size="30">🐓</text>' +
        '<text x="-34" y="-22" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.orangeD + '">进攻？</text>' +
        '<text x="34" y="-22" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">退让？</text>' +
        '<path d="M0 -14 l0 -30 m-5 24 l5 6 l5 -6" stroke="' + C.green + '" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</g>' +
        label(210, 206, '狭路相逢：谁先退？', C.board, 13),
        '第10章 · 懦夫博弈'
      );
    },
    11: function () { // 性别战
      return frame(
        '<g transform="translate(210 96)">' +
        '<text x="-54" y="0" text-anchor="middle" font-size="34">👨</text>' +
        '<text x="54" y="0" text-anchor="middle" font-size="34">👩</text>' +
        '<text x="-54" y="30" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">球赛 ⚽</text>' +
        '<text x="54" y="30" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.pinkD + '">偶像剧 📺</text>' +
        '<text x="0" y="58" text-anchor="middle" ' + FONT + ' font-size="26">💞</text>' +
        '<path d="M-52 6 q52 -28 104 0" stroke="' + C.gold + '" stroke-width="2.6" fill="none" stroke-dasharray="5 4"/>' +
        '</g>' +
        label(210, 196, '想一起，但看谁的呢？', C.board, 13) +
        '<text x="210" y="220" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.slate + '">两个均衡都在对角线上</text>',
        '第11章 · 性别战'
      );
    },
    12: function () { // 信任博弈
      return frame(
        '<g transform="translate(210 108)">' +
        '<circle cx="-40" cy="0" r="34" fill="' + C.pink + '" opacity="0.14" stroke="' + C.pink + '" stroke-width="2.4"/>' +
        '<text x="-40" y="10" text-anchor="middle" font-size="30">👸</text>' +
        '<circle cx="40" cy="0" r="34" fill="' + C.blue + '" opacity="0.14" stroke="' + C.blue + '" stroke-width="2.4"/>' +
        '<text x="40" y="10" text-anchor="middle" font-size="30">🤴</text>' +
        '<path d="M-14 -8 L14 -8 M-14 8 L14 8 M0 -8 L0 8" stroke="' + C.green + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="0" cy="-16" r="6" fill="' + C.gold + '" stroke="' + C.board + '" stroke-width="1.8"/>' +
        '</g>' +
        label(210, 188, '利益一致，是信任的基础', C.greenD, 13),
        '第12章 · 信任博弈'
      );
    },
    13: function () { // 混合策略
      return frame(
        '<g transform="translate(210 110)">' +
        '<path d="M-40 30 L0 -30 L40 30 Z" fill="' + C.paper + '" stroke="' + C.board + '" stroke-width="2.4"/>' +
        '<path d="M-40 30 L-40 -26 L0 -30 L40 -26 L40 30 Z" fill="' + C.blue + '" opacity="0.08"/>' +
        '<text x="0" y="10" text-anchor="middle" font-size="28">🪨</text>' +
        '<text x="-52" y="-6" text-anchor="middle" font-size="22">✂️</text>' +
        '<text x="52" y="-6" text-anchor="middle" font-size="22">📄</text>' +
        '<text x="0" y="46" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">石头剪子布</text>' +
        '</g>' +
        '<circle cx="318" cy="74" r="6" fill="' + C.orange + '"/><circle cx="336" cy="92" r="4" fill="' + C.orange + '" opacity="0.6"/>' +
        '<circle cx="352" cy="110" r="3" fill="' + C.orange + '" opacity="0.35"/>' +
        '<text x="318" y="150" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">随机 = 无法预测</text>' +
        label(210, 210, '混合策略 · 概率制胜', C.board, 12),
        '第13章 · 混合策略'
      );
    },
    14: function () { // 监督博弈
      return frame(
        '<g transform="translate(210 104)">' +
        '<text x="-50" y="0" text-anchor="middle" font-size="30">🧑‍💼</text>' +
        '<text x="-50" y="26" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">雇员</text>' +
        '<text x="50" y="0" text-anchor="middle" font-size="30">🕵️</text>' +
        '<text x="50" y="26" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.orangeD + '">雇主</text>' +
        '<circle cx="0" cy="-8" r="10" fill="' + C.gold + '" stroke="' + C.board + '" stroke-width="2"/>' +
        '<text x="0" y="-3" text-anchor="middle" font-size="10">?</text>' +
        '<path d="M-40 10 q40 24 80 0" stroke="' + C.board + '" stroke-width="2.2" fill="none" stroke-dasharray="5 4"/>' +
        '</g>' +
        label(210, 176, '偷懒 or 检查，全看概率', C.board, 12) +
        '<text x="210" y="200" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.slate + '">高薪养廉 · 乱世用重典</text>',
        '第14章 · 监督博弈'
      );
    },
    15: function () { // 最后通牒
      return frame(
        '<g transform="translate(210 110)">' +
        '<rect x="-34" y="-50" width="68" height="100" rx="10" fill="' + C.paper + '" stroke="' + C.board + '" stroke-width="2.4"/>' +
        '<rect x="-28" y="-36" width="56" height="44" rx="6" fill="' + C.green + '" opacity="0.85"/>' +
        '<text x="0" y="-8" text-anchor="middle" ' + FONT2 + ' font-size="16" font-weight="900" fill="' + C.paper + '">提方案</text>' +
        '<rect x="-28" y="12" width="56" height="26" rx="6" fill="' + C.blue + '" opacity="0.85"/>' +
        '<text x="0" y="30" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="900" fill="' + C.paper + '">接受 / 拒绝</text>' +
        '<text x="0" y="76" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.red + '">拒绝 → 双输</text>' +
        '</g>' +
        label(210, 214, '60:40 还是 99:1？', C.board, 12),
        '第15章 · 最后通牒'
      );
    },
    16: function () { // 讨价还价
      return frame(
        '<g transform="translate(210 108)">' +
        '<circle cx="0" cy="0" r="46" fill="' + C.gold + '" opacity="0.16" stroke="' + C.gold + '" stroke-width="2.6"/>' +
        '<path d="M0 -46 A46 46 0 0 1 46 0 A46 46 0 0 1 0 46 Z" fill="' + C.gold + '" opacity="0.55"/>' +
        '<text x="20" y="10" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="900" fill="' + C.board + '">65%</text>' +
        '<path d="M0 -10 A46 46 0 0 1 46 0 L0 0 Z" fill="' + C.orange + '" opacity="0.7"/>' +
        '<text x="-14" y="24" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="900" fill="' + C.board + '">35%</text>' +
        '</g>' +
        '<text x="210" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">先出价者占优 · 耐心定胜负</text>' +
        label(210, 224, '讨价还价 · 分蛋糕', C.board, 12),
        '第16章 · 讨价还价'
      );
    },
    17: function () { // 承诺与威胁
      return frame(
        '<g transform="translate(210 104)">' +
        '<circle cx="-46" cy="0" r="36" fill="' + C.red + '" opacity="0.12" stroke="' + C.red + '" stroke-width="2.4"/>' +
        '<text x="-46" y="8" text-anchor="middle" font-size="30">😡</text>' +
        '<text x="-46" y="44" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.red + '">威胁</text>' +
        '<circle cx="46" cy="0" r="36" fill="' + C.green + '" opacity="0.12" stroke="' + C.green + '" stroke-width="2.4"/>' +
        '<text x="46" y="8" text-anchor="middle" font-size="30">🤝</text>' +
        '<text x="46" y="44" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.greenD + '">承诺</text>' +
        '<path d="M-12 -8 L12 -8 M-12 8 L12 8 M0 -8 L0 8" stroke="' + C.board + '" stroke-width="3" fill="none"/>' +
        '</g>' +
        '<text x="210" y="184" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">可信度 = 食言成本</text>' +
        label(210, 212, '商鞅立木，为的是承诺', C.greenD, 12),
        '第17章 · 承诺与威胁'
      );
    },
    18: function () { // 重复博弈
      return frame(
        '<g transform="translate(210 112)">' +
        '<circle cx="0" cy="0" r="40" fill="' + C.teal + '" opacity="0.12" stroke="' + C.teal + '" stroke-width="2.4"/>' +
        '<path d="M-20 0 A20 20 0 1 1 20 0" stroke="' + C.teal + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M12 -16 l8 0 0 8" stroke="' + C.teal + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="0" y="8" text-anchor="middle" font-size="20">🤝</text>' +
        '<path d="M0 -40 q30 -18 60 0 M0 40 q30 18 60 0" stroke="' + C.board + '" stroke-width="2" fill="none" stroke-dasharray="4 4"/>' +
        '</g>' +
        '<g transform="translate(120 196)">' + '<text x="0" y="0" text-anchor="middle" font-size="22">🙂</text>' +
        '<text x="0" y="18" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.greenD + '">上次合作</text></g>' +
        '<g transform="translate(300 196)">' + '<text x="0" y="0" text-anchor="middle" font-size="22">😠</text>' +
        '<text x="0" y="18" text-anchor="middle" ' + FONT2 + ' font-size="9" font-weight="700" fill="' + C.red + '">上次背叛</text></g>' +
        arrowRight(150, 204, 20, C.green, 2.2) + arrowRight(210, 204, 40, C.red, 2.2) +
        label(210, 84, '一报还一报', C.teal, 14),
        '第18章 · 重复博弈'
      );
    },
    19: function () { // 制度建设
      return frame(
        '<g transform="translate(210 104)">' +
        '<rect x="-56" y="-34" width="112" height="68" rx="10" fill="' + C.board + '"/>' +
        '<rect x="-40" y="-22" width="34" height="30" rx="4" fill="' + C.blue + '" opacity="0.9"/>' +
        '<rect x="4" y="-22" width="34" height="30" rx="4" fill="' + C.green + '" opacity="0.9"/>' +
        '<rect x="-40" y="12" width="34" height="30" rx="4" fill="' + C.orange + '" opacity="0.9"/>' +
        '<rect x="4" y="12" width="34" height="30" rx="4" fill="' + C.purple + '" opacity="0.9"/>' +
        '<text x="0" y="-30" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.paper + '">制度</text>' +
        '</g>' +
        '<g transform="translate(74 176)">' + '<text x="0" y="0" text-anchor="middle" font-size="24">📝</text>' +
        '<text x="0" y="20" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">规则</text></g>' +
        '<g transform="translate(210 176)">' + '<text x="0" y="0" text-anchor="middle" font-size="24">⚖️</text>' +
        '<text x="0" y="20" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.orangeD + '">结果</text></g>' +
        '<g transform="translate(346 176)">' + '<text x="0" y="0" text-anchor="middle" font-size="24">🤝</text>' +
        '<text x="0" y="20" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.greenD + '">共赢</text></g>' +
        '<path d="M84 168 L196 172 M224 172 L336 168" stroke="' + C.board + '" stroke-width="2.2" fill="none"/>' +
        label(210, 64, '从选策略，到建制度', C.board, 13),
        '第19章 · 从策略选择到制度建设'
      );
    },
  };

  function chip(txt, col) {
    return '<rect x="-34" y="-13" width="68" height="26" rx="13" fill="' + col + '" opacity="0.85"/>' +
      '<text x="0" y="5" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="800" fill="#fff">' + txt + '</text>';
  }

  /* ================= 小节图标 ================= */
  const GLYPHS = {
    lion: '<circle cx="20" cy="20" r="15" fill="' + C.orange + '" opacity="0.15" stroke="' + C.orange + '" stroke-width="2.4"/><text x="20" y="26" text-anchor="middle" font-size="16">🐆</text>',
    go: '<circle cx="20" cy="20" r="15" fill="' + C.blue + '" opacity="0.15" stroke="' + C.blue + '" stroke-width="2.4"/><text x="20" y="26" text-anchor="middle" font-size="16">♟️</text>',
    book: '<path d="M20 10 a7 7 0 0 0 -7 -2 h-6 v22 h6 a7 7 0 0 1 7 2 Z" fill="' + C.blue + '" stroke="' + C.board + '" stroke-width="2.2"/><path d="M20 10 a7 7 0 0 1 7 -2 h6 v22 h-6 a7 7 0 0 1 -7 2 Z" fill="' + C.green + '" stroke="' + C.board + '" stroke-width="2.2"/>',
    history: '<circle cx="20" cy="20" r="14" fill="' + C.purple + '" opacity="0.15" stroke="' + C.purple + '" stroke-width="2.2"/><path d="M20 20 m-10 0 a10 10 0 1 1 20 0 a10 10 0 1 1 -20 0 M20 20 l8 -6 M18 20 l0 -8" stroke="' + C.purple + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
    key: '<circle cx="16" cy="20" r="7" fill="' + C.gold + '" stroke="' + C.board + '" stroke-width="2.2"/><path d="M21 25 l10 10 M26 30 l4 -4 M29 27 l4 -4" stroke="' + C.board + '" stroke-width="2.6" stroke-linecap="round"/>',
    strategy: '<path d="M20 6 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="' + C.green + '" stroke="' + C.board + '" stroke-width="2"/>',
    balance: '<polygon points="20,8 24,16 16,16" fill="' + C.board + '"/><line x1="8" y1="20" x2="32" y2="20" stroke="' + C.board + '" stroke-width="2.4"/><path d="M8 20 a5 5 0 0 0 10 0 Z" fill="' + C.orange + '" stroke="' + C.board + '" stroke-width="1.8"/><path d="M32 20 a5 5 0 0 0 -10 0 Z" fill="' + C.green + '" stroke="' + C.board + '" stroke-width="1.8"/>',
    grid: '<rect x="8" y="8" width="24" height="24" rx="4" fill="' + C.blue + '" opacity="0.12" stroke="' + C.blue + '" stroke-width="2.2"/><line x1="20" y1="8" x2="20" y2="32" stroke="' + C.blue + '" stroke-width="2"/><line x1="8" y1="20" x2="32" y2="20" stroke="' + C.blue + '" stroke-width="2"/>',
    brain: '<path d="M12 12 q-4 -10 6 -12 q4 2 2 8 q4 -6 10 -2 q3 5 -4 8 q4 2 0 8 q-3 5 -10 0 q-6 3 -10 -4 q-4 -8 6 -6 Z" fill="' + C.pink + '" stroke="' + C.board + '" stroke-width="2.2"/>',
    eye: '<path d="M6 20 Q20 8 34 20 Q20 32 6 20 Z" fill="' + C.blue + '" opacity="0.12" stroke="' + C.blue + '" stroke-width="2.2"/><circle cx="20" cy="20" r="5" fill="' + C.blue + '" stroke="' + C.board + '" stroke-width="1.8"/>',
    chain: '<path d="M14 26 L26 14" stroke="' + C.board + '" stroke-width="4" stroke-linecap="round"/><path d="M14 26 a5 5 0 1 1 -7 0 a5 5 0 0 1 7 0 Z" fill="' + C.red + '" stroke="' + C.board + '" stroke-width="2"/><path d="M26 14 a5 5 0 1 1 7 0 a5 5 0 0 1 -7 0 Z" fill="' + C.orange + '" stroke="' + C.board + '" stroke-width="2"/>',
    hand: '<path d="M12 26 L12 16 M16 26 L16 12 M20 26 L20 14 M24 26 L24 16 M12 22 L8 20 M24 22 L28 16 M28 16 l-4 -8 M28 16 l4 -2" stroke="' + C.orange + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
    pig: '<circle cx="14" cy="22" r="9" fill="' + C.pink + '" stroke="' + C.board + '" stroke-width="2.2"/><circle cx="26" cy="22" r="6" fill="' + C.pink + '" stroke="' + C.board + '" stroke-width="2"/><circle cx="11" cy="19" r="1.6" fill="' + C.board + '"/><circle cx="17" cy="19" r="1.6" fill="' + C.board + '"/>',
    bird: '<path d="M12 12 l8 8 8 -8 M20 20 l0 -10" stroke="' + C.blue + '" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M20 20 a8 8 0 1 0 0 16 a8 8 0 0 0 0 -16 Z" fill="none" stroke="' + C.orange + '" stroke-width="2.4"/>',
    heart: '<path d="M20 30 s-8 -5 -10 -9 c-2 -4 0 -8 4 -8 c2.4 0 4 1.5 6 4 c2 -2.5 3.6 -4 6 -4 c4 0 6 4 4 8 c-2 4 -10 9 -10 9 Z" fill="' + C.pink + '" stroke="' + C.board + '" stroke-width="2.2"/>',
    trust: '<path d="M20 6 l12 5 v10 q0 9 -12 13 q-12 -4 -12 -13 v-10 Z" fill="' + C.teal + '" stroke="' + C.board + '" stroke-width="2.2"/><path d="M15 19 l4 4 l7 -8" stroke="' + C.paper + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    dice: '<rect x="8" y="8" width="24" height="24" rx="5" fill="' + C.purple + '" stroke="' + C.board + '" stroke-width="2.2"/><circle cx="15" cy="15" r="2" fill="' + C.paper + '"/><circle cx="25" cy="25" r="2" fill="' + C.paper + '"/><circle cx="25" cy="15" r="2" fill="' + C.paper + '"/>',
    detective: '<circle cx="20" cy="18" r="9" fill="' + C.blue + '" opacity="0.15" stroke="' + C.blue + '" stroke-width="2.2"/><circle cx="20" cy="18" r="5" fill="none" stroke="' + C.blue + '" stroke-width="2.2"/><circle cx="20" cy="18" r="2" fill="' + C.board + '"/><path d="M20 5 v-2 M20 33 v-2 M5 18 h-2 M35 18 h-2" stroke="' + C.board + '" stroke-width="2.2" stroke-linecap="round"/>',
    ultimatum: '<rect x="10" y="10" width="20" height="20" rx="4" fill="' + C.orange + '" opacity="0.15" stroke="' + C.orange + '" stroke-width="2.2"/><text x="20" y="26" text-anchor="middle" font-size="14" font-weight="900" fill="' + C.orangeD + '">!</text>',
    scale: '<polygon points="20,8 24,16 16,16" fill="' + C.board + '"/><line x1="8" y1="20" x2="32" y2="20" stroke="' + C.board + '" stroke-width="2.4"/><path d="M8 20 a5 5 0 0 0 10 0 Z" fill="' + C.gold + '" stroke="' + C.board + '" stroke-width="1.8"/><path d="M32 20 a5 5 0 0 0 -10 0 Z" fill="' + C.gold + '" stroke="' + C.board + '" stroke-width="1.8"/>',
    horn: '<path d="M20 10 l14 0 l-3 6 q-5 -2 -8 2 l-3 -8 Z" fill="' + C.orange + '" stroke="' + C.board + '" stroke-width="2"/><circle cx="20" cy="10" r="2.4" fill="' + C.board + '"/>',
    repeat: '<path d="M12 16 a8 8 0 1 1 0 8 M12 14 l-4 4 l4 4" stroke="' + C.teal + '" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 24 a8 8 0 0 1 -8 8" stroke="' + C.teal + '" stroke-width="2.2" fill="none" stroke-dasharray="3 3"/>',
    trophy: '<path d="M8 8 h24 v3 c0 4 -3 7 -8 8 v5 h8 v3 H8 v-3 h8 v-5 c-5 -1 -8 -4 -8 -8 Z" fill="' + C.gold + '" stroke="' + C.board + '" stroke-width="2"/>',
    ruler: '<rect x="7" y="10" width="26" height="20" rx="4" fill="' + C.blue + '" opacity="0.12" stroke="' + C.blue + '" stroke-width="2.2"/><line x1="12" y1="16" x2="12" y2="24" stroke="' + C.blue + '" stroke-width="2.2"/><line x1="17" y1="16" x2="17" y2="24" stroke="' + C.blue + '" stroke-width="2.2"/><line x1="22" y1="16" x2="22" y2="24" stroke="' + C.blue + '" stroke-width="2.2"/><line x1="27" y1="16" x2="27" y2="24" stroke="' + C.blue + '" stroke-width="2.2"/>',
    castle: '<path d="M8 30 V18 l5 5 v-8 l4 4 v-6 l3 3 v6 l4 -4 v8 l5 -5 v12 Z" fill="' + C.green + '" stroke="' + C.board + '" stroke-width="2" stroke-linejoin="round"/>',
  };

  const KEYWORDS = [
    [/狮子|故事|何为|博弈/i, 'lion'],
    [/渊源|围棋|文字|简史/i, 'go'],
    [/学习|收益|当局者/i, 'book'],
    [/古诺|寡头|最初/i, 'history'],
    [/诞生|发展|冯|纳什/i, 'history'],
    [/六要素|术语|规则|参与者|信息/i, 'key'],
    [/策略|损益|均衡|行动/i, 'strategy'],
    [/分类|公共危机|静态|动态|零和|正和|负和/i, 'grid'],
    [/理性/i, 'brain'],
    [/共同知识/i, 'eye'],
    [/囚犯|坦白|抗拒/i, 'chain'],
    [/原因|根源|损人/i, 'balance'],
    [/大萧条|公地悲剧/i, 'hand'],
    [/价格战|出头鸟|禁烟|排队|闯红灯/i, 'pig'],
    [/民主|暴政/i, 'trophy'],
    [/利用|破解/i, 'key'],
    [/道德|产权|温故|破解/i, 'heart'],
    [/万元|美元|拍卖|陷阱/i, 'dice'],
    [/网游|行贿|实例/i, 'dice'],
    [/智猪|大猪|小猪|按钮/i, 'pig'],
    [/山寨|搭便车|扩展/i, 'pig'],
    [/懦夫|斗鸡|公鸡/i, 'bird'],
    [/斑马线|责任分散|电话|实例/i, 'bird'],
    [/性别战|电视|看什么/i, 'heart'],
    [/语言|左右行|麦琪|均衡/i, 'trust'],
    [/信任|危机/i, 'trust'],
    [/信与不信|利益一致|公主/i, 'trust'],
    [/混合|随机|概率/i, 'dice'],
    [/点球|教授|混合策略|实例/i, 'dice'],
    [/监督|检查|偷懒|雇主/i, 'detective'],
    [/假冒|伪劣|监管/i, 'detective'],
    [/最后通牒|通牒/i, 'ultimatum'],
    [/独裁者|实验结果|公平/i, 'scale'],
    [/讨价|还价|贴现|耐心/i, 'scale'],
    [/拆迁|征地/i, 'castle'],
    [/承诺|威胁/i, 'horn'],
    [/可信|绑架|立木|海盗|婚姻/i, 'horn'],
    [/重复|阶段|长期/i, 'repeat'],
    [/爱克斯罗德|一报还一报|冷酷/i, 'repeat'],
    [/规则|投票|船费|制度|匿名|离岸/i, 'ruler'],
    [/产权|经济增长|国家/i, 'castle'],
  ];

  // 收益矩阵渲染器（用于课程学习页，可点击均衡高亮）
  function payoffMatrix(opts) {
    opts = opts || {};
    const r1 = opts.r1 || '甲合作';
    const r2 = opts.r2 || '甲背叛';
    const c1 = opts.c1 || '乙合作';
    const c2 = opts.c2 || '乙背叛';
    const vals = opts.vals || [[3,3],[0,5],[5,0],[1,1]];
    const eq = opts.eq || [];
    const caption = opts.caption || '';
    const cellHtml = (r, cc) => {
      const idx = r * 2 + cc;
      const v = vals[idx];
      const isEq = eq.indexOf(idx) >= 0;
      const cls = isEq ? 'cell eq' : 'cell';
      return '<div class="' + cls + '" data-cell="' + idx + '"><div class="pay">' + v[0] + '，' + v[1] + '</div>' +
        '<div class="who">' + v[2] + '</div>' + (isEq ? '<div class="eq-tag">均衡</div>' : '') + '</div>';
    };
    return '<div class="payoff-wrap">' +
      '<div class="payoff">' +
      '<div class="corner">对局</div>' +
      '<div class="col-head">' + c1 + '</div>' +
      '<div class="col-head">' + c2 + '</div>' +
      '<div class="row-head">' + r1 + '</div>' + cellHtml(0,0) + cellHtml(0,1) +
      '<div class="row-head">' + r2 + '</div>' + cellHtml(1,0) + cellHtml(1,1) +
      '</div>' +
      (caption ? '<div class="payoff-caption">' + caption + '</div>' : '') +
      '<div class="payoff-legend"><span>👤 甲（左）收益在前，乙（右）收益在后</span>' +
      (eq.length ? '<span>🟩 <b>纳什均衡</b></span>' : '') + '</div>' +
      '</div>';
  }

  function sectionIcon(unitId, title) {
    let glyph = 'strategy';
    for (let i = 0; i < KEYWORDS.length; i++) {
      if (KEYWORDS[i][0].test(title)) { glyph = KEYWORDS[i][1]; break; }
    }
    const colors = [C.green, C.blue, C.purple, C.orange, C.pink, C.gold, C.teal, C.red];
    const ring = colors[(unitId - 1) % colors.length];
    return '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" style="width:44px;height:44px">' +
      '<circle cx="20" cy="20" r="18" fill="' + C.paper + '" stroke="' + ring + '" stroke-width="2.4"/>' +
      '<circle cx="20" cy="20" r="15" fill="' + ring + '" opacity="0.12"/>' +
      (GLYPHS[glyph] || GLYPHS.strategy) + '</svg>';
  }

  window.Art = {
    unitArt: function (id) { return UNIT_ART[id] ? UNIT_ART[id]() : UNIT_ART[1](); },
    sectionIcon: sectionIcon,
    payoffMatrix: payoffMatrix,
    palette: C,
  };
})();

