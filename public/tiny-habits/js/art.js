/* ============================================================
   Tiny Habits — art.js
   行为科学实验室风：深色内联 SVG 单元横幅、小节图标、
   植物成长插画。无外部图片文件。
   ============================================================ */
(function () {
  'use strict';

  const C = {
    bg: '#0a0e17', card: '#121a29', card2: '#0e1524',
    ink: '#e6edf3', muted: '#7d8aa0', line: '#1f2a3f', line2: '#2a3a57',
    green: '#34d399', greenD: '#1d7a5c',
    blue: '#60a5fa', blueD: '#2563eb',
    purple: '#a78bfa', purpleD: '#7c5ce0',
    orange: '#fbbf24', orangeD: '#d99e11',
    pink: '#f472b6', gold: '#facc15', red: '#f87171', teal: '#2dd4bf',
    white: '#e6edf3',
  };

  const FONT = "font-family='Georgia, serif'";
  const FONT2 = "font-family='Segoe UI, sans-serif'";
  const MONO = "font-family='Consolas, monospace'";

  function defs() {
    return '<defs>' +
      '<linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#121a29"/><stop offset="1" stop-color="#0d1420"/>' +
      '</linearGradient>' +
      '<pattern id="dotGrid" width="18" height="18" patternUnits="userSpaceOnUse">' +
      '<circle cx="1.5" cy="1.5" r="1.2" fill="#7d8aa0" opacity="0.18"/></pattern>' +
      '<filter id="glow" x="-30%" y="-30%" width="160%" height="160%">' +
      '<feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#34d399" flood-opacity="0.45"/>' +
      '</filter>' +
      '<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.5"/>' +
      '</filter>' +
      '</defs>';
  }

  function frame(inner, label, opts) {
    opts = opts || {};
    const w = opts.w || 420, h = opts.h || 260;
    const back = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="20" fill="url(#bgGrad)"/>';
    const grid = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="20" fill="url(#dotGrid)" opacity="0.6"/>';
    const topBar = '<rect x="2" y="2" width="' + (w - 4) + '" height="26" rx="20" fill="#0a0e17" opacity="0.7"/>' +
      '<circle cx="18" cy="15" r="4" fill="#f87171" opacity="0.85"/>' +
      '<circle cx="32" cy="15" r="4" fill="#fbbf24" opacity="0.85"/>' +
      '<circle cx="46" cy="15" r="4" fill="#34d399" opacity="0.85"/>';
    const cap = label
      ? '<text x="' + (w / 2) + '" y="' + (h - 16) + '" text-anchor="middle" ' + MONO +
        ' font-size="12" font-weight="700" letter-spacing="3" fill="' + C.muted + '">' + label + '</text>'
      : '';
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (label || 'illustration') + '">' +
      defs() + back + grid + topBar + inner + cap + '</svg>';
  }

  /* 曲线 / 生长线 */
  function growthCurve(x, y, w, h, col) {
    return '<path d="M' + x + ' ' + (y + h) + ' C' + (x + w * 0.3) + ' ' + (y + h) + ',' +
      (x + w * 0.6) + ' ' + y + ',' + (x + w) + ' ' + y + '" stroke="' + (col || C.green) + '" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#glow)"/>';
  }

  function dot(x, y, col, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 5) + '" fill="' + (col || C.green) + '"/>';
  }

  /* ================= 单元横幅 ================= */
  const UNIT_ART = {
    1: frame(
      '<text x="210" y="86" text-anchor="middle" ' + FONT2 + ' font-size="26" font-weight="800" fill="' + C.green + '">TINY HABITS</text>' +
      '<text x="210" y="112" text-anchor="middle" ' + FONT2 + ' font-size="13" fill="' + C.muted + '">微小改变 · 改变一切</text>' +
      '<g transform="translate(60 150)">' + seedGlyph(C.green, 1) + '</g>' +
      '<g transform="translate(120 128)">' + sproutGlyph(C.blue, 1) + '</g>' +
      '<g transform="translate(180 106)">' + leafGlyph(C.teal, 1) + '</g>' +
      '<g transform="translate(250 120)">' + flowerGlyph(C.pink, 1) + '</g>' +
      growthCurve(60, 210, 300, 60, C.green) +
      '<circle cx="210" cy="200" r="3" fill="' + C.green + '"/>',
      'UNIT 1 · INTRODUCTION', { w: 420, h: 260 }
    ),
    2: frame(
      '<text x="210" y="80" text-anchor="middle" ' + FONT2 + ' font-size="24" font-weight="800" fill="' + C.blue + '">B = MAP</text>' +
      '<text x="210" y="104" text-anchor="middle" ' + MONO + ' font-size="14" fill="' + C.muted + '">Behavior = M × A × P</text>' +
      axisLines(110, 120, 300, 130) +
      '<path d="M110 250 L410 120" stroke="' + C.blue + '" stroke-width="3" stroke-dasharray="8 6" fill="none" stroke-linecap="round"/>' +
      dot(150, 210, C.green, 6) + dot(260, 150, C.orange, 6) + dot(360, 190, C.purple, 6) +
      '<text x="115" y="120" ' + MONO + ' font-size="11" fill="' + C.muted + '">动机 M</text>' +
      '<text x="300" y="256" ' + MONO + ' font-size="11" fill="' + C.muted + '">能力 A →</text>',
      'UNIT 2 · THE ELEMENTS OF BEHAVIOR', { w: 420, h: 260 }
    ),
  };

  function axisLines(x, y, w, h) {
    return '<line x1="' + x + '" y1="' + (y + h) + '" x2="' + (x + w) + '" y2="' + (y + h) + '" stroke="' + C.line2 + '" stroke-width="2"/>' +
      '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + h) + '" stroke="' + C.line2 + '" stroke-width="2"/>';
  }

  /* ================= 小节图标 ================= */
  function seedGlyph(col, s) {
    s = s || 1;
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="20" cy="24" rx="7" ry="9" fill="' + (col || C.green) + '" opacity="0.85"/>' +
      '<path d="M20 15 Q20 5 27 3 Q24 12 20 15 Z" fill="' + (col || C.green) + '" opacity="0.6"/>' +
      '</svg>';
  }
  function sproutGlyph(col, s) {
    s = s || 1;
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 38 Q20 22 20 14" stroke="' + (col || C.blue) + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M20 20 Q10 16 8 8 Q20 10 20 20 Z" fill="' + (col || C.blue) + '" opacity="0.7"/>' +
      '<path d="M20 16 Q30 12 32 4 Q20 6 20 16 Z" fill="' + (col || C.teal) + '" opacity="0.7"/>' +
      '</svg>';
  }
  function leafGlyph(col, s) {
    s = s || 1;
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 38 Q20 18 34 4 Q22 8 20 38 Z" fill="' + (col || C.teal) + '" opacity="0.8"/>' +
      '<path d="M18 30 Q10 24 6 18" stroke="' + (col || C.teal) + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  function flowerGlyph(col, s) {
    s = s || 1;
    const sc = s || 1;
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="20" cy="20" r="4" fill="' + C.gold + '"/>' +
      [0, 60, 120, 180, 240, 300].map(a => {
        const rad = a * Math.PI / 180;
        const x = 20 + 8 * Math.cos(rad), y = 20 + 8 * Math.sin(rad);
        return '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + (col || C.pink) + '" opacity="0.85"/>';
      }).join('') +
      '<path d="M20 24 Q20 34 20 38" stroke="' + C.green + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  function treeGlyph(col, s) {
    s = s || 1;
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 38 L20 22" stroke="#7c5ce0" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="20" cy="18" r="9" fill="' + (col || C.green) + '" opacity="0.85"/>' +
      '<circle cx="20" cy="18" r="3" fill="' + C.greenD + '"/>' +
      '<circle cx="27" cy="22" r="3" fill="' + C.greenD + '" opacity="0.6"/>' +
      '<circle cx="13" cy="22" r="3" fill="' + C.greenD + '" opacity="0.6"/>' +
      '</svg>';
  }
  function anchorGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 36 Q14 36 12 30 Q20 34 28 30 Q26 36 20 36 Z" fill="' + (col || C.blue) + '"/>' +
      '<path d="M20 6 L20 30" stroke="' + (col || C.blue) + '" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="20" cy="8" r="4" fill="none" stroke="' + (col || C.blue) + '" stroke-width="2.5"/>' +
      '</svg>';
  }
  function celebrateGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 24 L16 30 L22 22 L30 32 L34 20" stroke="' + (col || C.orange) + '" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="8" cy="10" r="2.5" fill="' + C.orange + '"/>' +
      '<circle cx="32" cy="8" r="2.5" fill="' + C.pink + '"/>' +
      '<circle cx="20" cy="4" r="2.5" fill="' + C.teal + '"/>' +
      '</svg>';
  }
  function brainGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="20" cy="20" rx="13" ry="10" fill="none" stroke="' + (col || C.purple) + '" stroke-width="3"/>' +
      '<path d="M20 10 Q20 20 20 30" stroke="' + (col || C.purple) + '" stroke-width="2.5" fill="none"/>' +
      '<path d="M10 16 Q20 14 30 16" stroke="' + (col || C.purple) + '" stroke-width="2" fill="none" opacity="0.6"/>' +
      '</svg>';
  }
  function promptGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="6" y="10" width="28" height="20" rx="4" fill="none" stroke="' + (col || C.teal) + '" stroke-width="3"/>' +
      '<circle cx="20" cy="18" r="4" fill="' + (col || C.teal) + '"/>' +
      '<path d="M14 30 L20 26 L26 30" stroke="' + (col || C.teal) + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  function shrinkGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="10" y="10" width="20" height="20" rx="4" fill="' + (col || C.green) + '" opacity="0.9"/>' +
      '<path d="M16 24 L16 22 L18 22 L10 14 L13 14 L13 12 L15 12 L15 10 L20 10 L20 12 L22 12 L22 14 L24 14 L24 16 L26 16 L26 18 L24 18 L24 20 L22 20 L22 22 L20 22 L20 24 Z" fill="' + C.card + '"/>' +
      '</svg>';
  }
  function emotionGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="20" cy="20" r="14" fill="' + (col || C.pink) + '" opacity="0.25"/>' +
      '<circle cx="14" cy="16" r="2.5" fill="' + (col || C.pink) + '"/>' +
      '<circle cx="26" cy="16" r="2.5" fill="' + (col || C.pink) + '"/>' +
      '<path d="M13 23 Q20 30 27 23" stroke="' + (col || C.pink) + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  function groupGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="12" cy="14" r="5" fill="' + (col || C.blue) + '" opacity="0.85"/>' +
      '<circle cx="28" cy="14" r="5" fill="' + (col || C.teal) + '" opacity="0.85"/>' +
      '<circle cx="20" cy="22" r="5" fill="' + (col || C.purple) + '" opacity="0.85"/>' +
      '<path d="M6 34 Q8 26 12 25 Q16 26 18 34 Z" fill="' + (col || C.blue) + '" opacity="0.7"/>' +
      '<path d="M22 34 Q24 26 28 25 Q32 26 34 34 Z" fill="' + (col || C.teal) + '" opacity="0.7"/>' +
      '<path d="M14 34 Q16 27 20 26 Q24 27 26 34 Z" fill="' + (col || C.purple) + '" opacity="0.7"/>' +
      '</svg>';
  }
  function settingsGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="20" cy="20" r="7" fill="none" stroke="' + (col || C.muted) + '" stroke-width="3"/>' +
      '<circle cx="20" cy="20" r="2.5" fill="' + (col || C.muted) + '"/>' +
      [0, 90, 180, 270].map(a => {
        const rad = a * Math.PI / 180;
        return '<path d="M' + (20 + 10 * Math.cos(rad)) + ' ' + (20 + 10 * Math.sin(rad)) +
          ' L' + (20 + 15 * Math.cos(rad)) + ' ' + (20 + 15 * Math.sin(rad)) + '" stroke="' + (col || C.muted) + '" stroke-width="3" stroke-linecap="round"/>';
      }).join('') +
      '</svg>';
  }
  function statsGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="6" y1="34" x2="34" y2="34" stroke="' + (col || C.blue) + '" stroke-width="3"/>' +
      '<rect x="8" y="22" width="5" height="12" fill="' + (col || C.blue) + '" opacity="0.8"/>' +
      '<rect x="17" y="16" width="5" height="18" fill="' + (col || C.teal) + '" opacity="0.8"/>' +
      '<rect x="26" y="10" width="5" height="24" fill="' + (col || C.green) + '" opacity="0.8"/>' +
      '</svg>';
  }
  function labGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M14 8 L26 8 L26 14 L32 24 L32 32 L8 32 L8 24 L14 14 Z" fill="none" stroke="' + (col || C.purple) + '" stroke-width="3" stroke-linejoin="round"/>' +
      '<path d="M12 20 L28 20" stroke="' + (col || C.purple) + '" stroke-width="2" opacity="0.5"/>' +
      '<circle cx="16" cy="26" r="2" fill="' + (col || C.purple) + '"/>' +
      '<circle cx="23" cy="28" r="2" fill="' + C.green + '"/>' +
      '</svg>';
  }
  function recipeGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="8" y="6" width="24" height="30" rx="3" fill="' + (col || C.orange) + '" opacity="0.2"/>' +
      '<rect x="12" y="10" width="16" height="3" rx="1.5" fill="' + (col || C.orange) + '"/>' +
      '<rect x="12" y="17" width="16" height="3" rx="1.5" fill="' + (col || C.orange) + '" opacity="0.7"/>' +
      '<rect x="12" y="24" width="10" height="3" rx="1.5" fill="' + (col || C.orange) + '" opacity="0.7"/>' +
      '</svg>';
  }
  function gardenGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="6" y="32" width="28" height="3" rx="1.5" fill="' + (col || C.green) + '" opacity="0.6"/>' +
      '<path d="M12 32 Q12 20 20 20 Q28 20 28 32" fill="none" stroke="' + (col || C.green) + '" stroke-width="2.5"/>' +
      '<path d="M20 20 Q18 10 24 6 Q24 16 20 20 Z" fill="' + (col || C.green) + '" opacity="0.7"/>' +
      '</svg>';
  }
  function worldGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="20" cy="20" r="14" fill="none" stroke="' + (col || C.teal) + '" stroke-width="3"/>' +
      '<ellipse cx="20" cy="20" rx="7" ry="14" fill="none" stroke="' + (col || C.teal) + '" stroke-width="1.8" opacity="0.6"/>' +
      '<line x1="6" y1="20" x2="34" y2="20" stroke="' + (col || C.teal) + '" stroke-width="1.8" opacity="0.6"/>' +
      '</svg>';
  }
  function starGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M20 4 L23 15 L34 15 L25 22 L28 34 L20 27 L12 34 L15 22 L6 15 L17 15 Z" fill="' + (col || C.gold) + '"/>' +
      '</svg>';
  }
  function cardGlyph(col) {
    return '<svg viewBox="0 0 40 40" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="7" y="10" width="26" height="20" rx="4" fill="none" stroke="' + (col || C.blue) + '" stroke-width="3"/>' +
      '<path d="M11 18 L18 25 L29 12" stroke="' + (col || C.green) + '" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  /* 关键词 → 图标 */
  const KEYWORD_GLYPHS = [
    { re: /maui|maui习惯|美好一天|起床|三秒/, fn: starGlyph },
    { re: /行为设计|b=map|行为模型|公式|b\s*=\s*map/, fn: brainGlyph },
    { re: /补偿|行动线|越线|能力|容易|难|门槛|缩小/, fn: shrinkGlyph },
    { re: /提示|锚点|配方|触发|排错/, fn: promptGlyph },
    { re: /情绪|庆祝|感受|乐观|成功感/, fn: celebrateGlyph },
    { re: /成长|长大|增长|倍增|身份/, fn: sproutGlyph },
    { re: /破解|坏习惯|停止|替换/, fn: settingsGlyph },
    { re: /一起|群体|团队|我们/, fn: groupGlyph },
    { re: /世界|眼光|眼镜|看世界/, fn: worldGlyph },
    { re: /环境/, fn: leafGlyph },
  ];
  const GLYPH_FALLBACK = { seed: seedGlyph, sprout: sproutGlyph, leaf: leafGlyph, flower: flowerGlyph, tree: treeGlyph, celebrate: celebrateGlyph, brain: brainGlyph, prompt: promptGlyph, anchor: anchorGlyph, shrink: shrinkGlyph, emotion: emotionGlyph, group: groupGlyph, settings: settingsGlyph, stats: statsGlyph, lab: labGlyph, recipe: recipeGlyph, garden: gardenGlyph, world: worldGlyph, star: starGlyph, card: cardGlyph };

  function sectionIcon(unitId, title) {
    const t = String(title);
    for (let i = 0; i < KEYWORD_GLYPHS.length; i++) {
      if (KEYWORD_GLYPHS[i].re.test(t)) return KEYWORD_GLYPHS[i].fn(UNITS_COLORS[unitId] || C.green);
    }
    return seedGlyph(C.green);
  }

  const UNITS_COLORS = { 1: C.green, 2: C.blue };

  /* ================= 植物成长插画 ================= */
  function plant(stage) {
    const svgs = [
      seedGlyph(C.green),
      sproutGlyph(C.blue),
      leafGlyph(C.teal),
      flowerGlyph(C.pink),
      treeGlyph(C.green),
      treeGlyph(C.gold),
    ];
    return svgs[Math.min(stage, svgs.length - 1)] || svgs[0];
  }

  /* ================= 单元横幅 API ================= */
  function unitArt(unitId) {
    return UNIT_ART[unitId] || UNIT_ART[1];
  }

  /* ================= 小节内容配图（内联 SVG） ================= */
  function sectionFigure(unitId, sectionTitle) {
    const glyph = sectionIcon(unitId, sectionTitle);
    return '<div class="fig-svg">' +
      '<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="0" y="0" width="420" height="200" fill="#0e1524"/>' +
      '<rect x="0" y="0" width="420" height="200" fill="url(#dotGrid)" opacity="0.5"/>' +
      '<g transform="translate(170 40) scale(2.4)">' + glyph.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '') + '</g>' +
      '</svg></div>';
  }

  window.Art = { unitArt, sectionIcon, sectionFigure, plant, frame };
})();

