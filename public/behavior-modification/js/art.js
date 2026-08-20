/* ============================================================
   BehaviorMod Pro — art.js
   Academic-style vector illustrations for every unit, plus
   keyword-driven icons for every section. Everything is drawn
   as inline SVG with ONE unified palette and style system:
     - canvas: 420 x 260 (banners) or 64 x 64 (section badges)
     - colors: brand green/blue/purple/orange/pink/gold +
               academic navy & slate
     - texture: soft dot-grid background + thin rounded strokes
     - labels: small-caps scientific captions
   ============================================================ */
(function () {
  'use strict';

  const C = {
    navy: '#1e293b', slate: '#64748b', paper: '#f6f8fb', line: '#dbe2ea',
    green: '#58cc02', greenD: '#2f8f01',
    blue: '#1cb0f6', blueD: '#0e7fb8',
    purple: '#ce82ff', purpleD: '#8b3fd6',
    orange: '#ff9600', orangeD: '#d97e00',
    pink: '#ff86c8', gold: '#ffd700', goldD: '#c9a200',
    red: '#ff4b4b', white: '#ffffff',
  };

  /* ---------- shared style helpers ---------- */
  const FONT = "font-family='Georgia, serif'";
  const FONT2 = "font-family='Segoe UI, sans-serif'";

  // Canvas with soft background + optional dot grid + optional caption label
  function frame(inner, label, opts) {
    opts = opts || {};
    const w = opts.w || 420, h = opts.h || 260;
    const bg = opts.bg || 'grad';
    let back;
    if (bg === 'grad') {
      back = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="22" fill="url(#bgGrad)"/>';
    } else {
      back = '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 4) + '" rx="22" fill="' + bg + '"/>';
    }
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
      '<pattern id="stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="4" height="8" fill="' + C.slate + '" opacity="0.12"/></pattern>' +
      '<filter id="soft" x="-20%" y="-20%" width="140%" height="140%">' +
      '<feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="' + C.navy + '" flood-opacity="0.12"/>' +
      '</filter>' +
      '</defs>';
  }

  /* ---------- reusable elements ---------- */
  function owl(x, y, s, opts) {
    opts = opts || {};
    const cap = opts.cap !== false;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<ellipse cx="0" cy="12" rx="22" ry="20" fill="' + (opts.body || C.green) + '"/>' +
      '<ellipse cx="0" cy="8" rx="19" ry="14" fill="' + (opts.belly || '#c9f2a3') + '"/>' +
      '<circle cx="-9" cy="2" r="6.5" fill="' + C.white + '"/><circle cx="9" cy="2" r="6.5" fill="' + C.white + '"/>' +
      '<circle cx="-9" cy="3" r="3" fill="' + C.navy + '"/><circle cx="9" cy="3" r="3" fill="' + C.navy + '"/>' +
      '<circle cx="-9" cy="3" r="1.2" fill="' + C.white + '"/><circle cx="9" cy="3" r="1.2" fill="' + C.white + '"/>' +
      '<polygon points="-4,13 0,18 4,13" fill="' + (opts.beak || C.orange) + '"/>' +
      '<path d="M-14 22 q4 4 8 0" stroke="' + C.navy + '" stroke-width="1.6" fill="none"/>' +
      '<path d="M14 22 q-4 4 -8 0" stroke="' + C.navy + '" stroke-width="1.6" fill="none"/>' +
      (cap ? '<path d="M-16 -6 q16 -14 32 0 q-16 -5 -32 0 Z" fill="' + (opts.capColor || C.blue) + '"/>' +
        '<circle cx="0" cy="-18" r="3" fill="' + C.gold + '"/>' : '') +
      '</g>';
  }

  function brain(x, y, s, fill) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-20 -6 q-12 -20 2 -26 q8 -3 18 6 q4 -10 16 -4 q8 4 2 14 q6 4 2 12 q-5 9 -16 4 q-12 6 -18 -2 q-10 -7 -6 -4 Z" fill="' + (fill || C.pink) + '" stroke="' + C.navy + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M0 -22 q-3 10 0 20 M-10 -18 q-2 8 0 14 M10 -16 q0 8 2 12" stroke="' + C.navy + '" stroke-width="1.8" fill="none" opacity="0.5"/>' +
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

  function star(x, y, s, fill) {
    const p = '0,-9 2.6,-2.8 9,-2.3 3.9,1.9 5.8,-1.1 1.7,5.4 8.4,3.1 -6,6.5 2.5,8.1 -8.1,-2 -5.2,6.6 -6.3,-4.8 -8.8,2.8 -0.4,-8.9 -6.5,-6.1 7.6,-4.2';
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<polygon points="' + p + '" fill="' + (fill || C.gold) + '" stroke="' + C.navy + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '</g>';
  }

  function person(x, y, s, opts) {
    opts = opts || {};
    const shirt = opts.shirt || C.blue;
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<circle cx="0" cy="-20" r="10" fill="' + (opts.skin || '#f3c39a') + '" stroke="' + C.navy + '" stroke-width="1.8"/>' +
      '<path d="M-2 -24 q2 -3 4 0" stroke="' + C.navy + '" stroke-width="1.5" fill="none"/>' +
      '<path d="M-17 -8 q17 -12 34 0 l6 34 q-8 6 -16 0 l-4 -24 M17 -8 l-4 24 M1 -8 l-6 26" fill="' + shirt + '" stroke="' + C.navy + '" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<circle cx="0" cy="-12" r="2" fill="' + (opts.skin || '#f3c39a') + '" stroke="' + C.navy + '" stroke-width="1.2"/>' +
      '</g>';
  }

  function thought(x, y, w, h, fill) {
    return '<g><ellipse cx="' + (x + w / 2) + '" cy="' + (y + h / 2) + '" rx="' + (w / 2) + '" ry="' + (h / 2) + '" fill="' + (fill || C.white) + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
      '<circle cx="' + x + '" cy="' + (y + h) + '" r="4" fill="' + (fill || C.white) + '" stroke="' + C.navy + '" stroke-width="2"/>' +
      '<circle cx="' + (x - 8) + '" cy="' + (y + h + 9) + '" r="2.6" fill="' + (fill || C.white) + '" stroke="' + C.navy + '" stroke-width="1.8"/>' +
      '</g>';
  }

  function graph(x, y, w, h, points, opts) {
    opts = opts || {};
    const pts = points.map(p => (x + p[0]) + ',' + (y + p[1])).join(' ');
    return '<g>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + (opts.bg || 'url(#bgGrad)') + '" stroke="' + C.line + '" stroke-width="1.6"/>' +
      '<path d="M' + (x + 10) + ' ' + (y + h - 10) + ' L' + (x + w - 10) + ' ' + (y + h - 10) + ' M' + (x + 10) + ' ' + (y + h - 10) + ' L' + (x + 10) + ' ' + (y + 10) + '" stroke="' + C.slate + '" stroke-width="1.4" opacity="0.6"/>' +
      '<polyline points="' + pts + '" fill="none" stroke="' + (opts.stroke || C.green) + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      points.map(p => '<circle cx="' + (x + p[0]) + '" cy="' + (y + p[1]) + '" r="3.4" fill="' + C.white + '" stroke="' + (opts.stroke || C.green) + '" stroke-width="2.4"/>').join('') +
      '</g>';
  }

  function arrowRight(x, y, len, fill) {
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<path d="M0 0 L' + (len - 12) + ' 0 M' + (len - 20) + ' -8 L' + len + ' 0 L' + (len - 20) + ' 8" stroke="' + (fill || C.navy) + '" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</g>';
  }

  function arrowDown(x, y, len, fill) {
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<path d="M0 0 L0 ' + (len - 12) + ' M-8 ' + (len - 20) + ' L0 ' + len + ' L8 ' + (len - 20) + '" stroke="' + (fill || C.navy) + '" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</g>';
  }

  function bubble(x, y, w, h, text, opts) {
    opts = opts || {};
    return '<g>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="' + (opts.fill || C.white) + '" stroke="' + (opts.stroke || C.navy) + '" stroke-width="2"/>' +
      '<path d="M' + (x + 12) + ' ' + (y + h) + ' l-6 8 l8 -4 Z" fill="' + (opts.fill || C.white) + '" stroke="' + (opts.stroke || C.navy) + '" stroke-width="2" stroke-linejoin="round"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 5) + '" text-anchor="middle" ' + FONT2 + ' font-size="' + (opts.size || 13) + '" font-weight="700" fill="' + (opts.color || C.navy) + '">' + text + '</text>' +
      '</g>';
  }

  function caption(x, y, text, color) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" letter-spacing="2" fill="' + (color || C.navy) + '">' + text + '</text>';
  }

  /* ============================================================
     UNIT ILLUSTRATIONS — 25 chapters, one banner each
  ============================================================ */

  const UNIT_ART = {
    1: function () {
      return frame(
        gear(118, 104, 2.2, C.blue) + gear(164, 96, 1.5, C.purple) +
        brain(236, 92, 2.1, C.pink) +
        owl(150, 150, 1.0, { capColor: C.green }) +
        '<circle cx="118" cy="150" r="46" fill="none" stroke="' + C.blue + '" stroke-width="2" stroke-dasharray="5 6" opacity="0.5"/>' +
        '<circle cx="164" cy="140" r="30" fill="none" stroke="' + C.purple + '" stroke-width="2" stroke-dasharray="5 6" opacity="0.5"/>' +
        '<text x="210" y="70" text-anchor="middle" ' + FONT2 + ' font-size="16" font-weight="800" letter-spacing="4" fill="' + C.navy + '">BEHAVIOR</text>' +
        '<text x="210" y="90" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="600" letter-spacing="5" fill="' + C.slate + '">SCIENCE OF CHANGE</text>',
        'INTRODUCTION TO BEHAVIOR MODIFICATION'
      );
    },
    2: function () {
      const tally = '<g><text x="205" y="120" ' + FONT2 + ' font-size="15" font-weight="800" fill="' + C.navy + '" opacity="0.9">IIII</text>' +
        '<line x1="205" y1="124" x2="243" y2="124" stroke="' + C.navy + '" stroke-width="3"/></g>';
      return frame(
        '<rect x="150" y="52" width="120" height="150" rx="12" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4" filter="url(#soft)"/>' +
        '<rect x="190" y="36" width="40" height="22" rx="6" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<line x1="168" y1="86" x2="252" y2="86" stroke="' + C.line + '" stroke-width="2"/>' +
        '<line x1="168" y1="100" x2="240" y2="100" stroke="' + C.line + '" stroke-width="2"/>' +
        '<line x1="168" y1="114" x2="230" y2="114" stroke="' + C.line + '" stroke-width="2"/>' +
        tally +
        '<line x1="168" y1="150" x2="252" y2="150" stroke="' + C.line + '" stroke-width="2"/>' +
        '<line x1="168" y1="164" x2="244" y2="164" stroke="' + C.line + '" stroke-width="2"/>' +
        '<line x1="168" y1="178" x2="236" y2="178" stroke="' + C.line + '" stroke-width="2"/>' +
        '<circle cx="96" cy="120" r="34" fill="none" stroke="' + C.green + '" stroke-width="5"/>' +
        '<circle cx="96" cy="120" r="34" fill="' + C.green + '" opacity="0.15"/>' +
        '<line x1="96" y1="120" x2="96" y2="104" stroke="' + C.greenD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="96" y1="120" x2="110" y2="126" stroke="' + C.greenD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="96" y1="120" x2="128" y2="120" stroke="' + C.greenD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M96 120 L128 132" stroke="' + C.slate + '" stroke-width="3" stroke-dasharray="4 5"/>' +
        '<rect x="290" y="140" width="26" height="90" rx="6" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<path d="M286 150 L322 150" stroke="' + C.navy + '" stroke-width="3"/>' +
        '<rect x="298" y="210" width="10" height="24" fill="' + C.slate + '" opacity="0.5"/>',
        'OBSERVING & RECORDING BEHAVIOR'
      );
    },
    3: function () {
      return frame(
        '<text x="76" y="80" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.blueD + '">A · BASELINE</text>' +
        '<text x="336" y="80" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">B · TREATMENT</text>' +
        graph(40, 100, 130, 110, [[10, 88], [30, 80], [50, 84], [70, 74], [90, 78], [110, 66]], { stroke: C.blue }) +
        graph(250, 100, 130, 110, [[10, 78], [30, 58], [50, 44], [70, 34], [90, 24], [110, 14]], { stroke: C.green }) +
        '<line x1="176" y1="86" x2="246" y2="86" stroke="' + C.slate + '" stroke-width="2.6" stroke-dasharray="6 5"/>' +
        '<path d="M200 92 L210 86 L200 80" fill="none" stroke="' + C.slate + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M290 108 L270 60" stroke="' + C.greenD + '" stroke-width="2.4" stroke-dasharray="5 4" opacity="0.6"/>',
        'GRAPHING & MEASURING CHANGE'
      );
    },
    4: function () {
      return frame(
        '<rect x="120" y="40" width="180" height="180" rx="16" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.6" filter="url(#soft)"/>' +
        '<rect x="140" y="64" width="140" height="96" rx="8" fill="' + C.paper + '" stroke="' + C.line + '" stroke-width="2"/>' +
        '<rect x="152" y="80" width="40" height="26" rx="6" fill="' + C.orange + '" opacity="0.85"/>' +
        '<rect x="200" y="80" width="40" height="26" rx="6" fill="' + C.purple + '" opacity="0.85"/>' +
        '<rect x="248" y="80" width="40" height="26" rx="6" fill="' + C.green + '" opacity="0.85"/>' +
        '<rect x="152" y="114" width="40" height="26" rx="6" fill="' + C.pink + '" opacity="0.85"/>' +
        '<rect x="200" y="114" width="40" height="26" rx="6" fill="' + C.blue + '" opacity="0.85"/>' +
        '<rect x="248" y="114" width="40" height="26" rx="6" fill="' + C.gold + '" opacity="0.85"/>' +
        '<rect x="196" y="176" width="28" height="34" rx="8" fill="' + C.greenD + '"/>' +
        '<path d="M210 176 l-16 14 l32 0 Z" fill="' + C.green + '"/>' +
        '<circle cx="86" cy="120" r="20" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<text x="86" y="126" text-anchor="middle" ' + FONT2 + ' font-size="17" font-weight="800" fill="' + C.navy + '">+</text>' +
        '<path d="M96 102 L120 92 M120 92 l-8 -6 M120 92 l-4 9" stroke="' + C.goldD + '" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M116 120 l-14 26 M102 146 l-10 18" stroke="' + C.slate + '" stroke-width="2.6" stroke-dasharray="4 5"/>' +
        '<path d="M122 120 l-14 26 M108 146 l-10 18" stroke="' + C.slate + '" stroke-width="2.6" stroke-dasharray="4 5" opacity="0.4"/>' +
        '<text x="306" y="110" ' + FONT2 + ' font-size="26" font-weight="800" fill="' + C.green + '">+</text>' +
        '<text x="306" y="140" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">behavior</text>' +
        '<text x="306" y="156" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">increases</text>',
        'REINFORCEMENT'
      );
    },
    5: function () {
      return frame(
        '<path d="M210 50 a70 70 0 0 1 70 70" stroke="' + C.slate + '" stroke-width="2.6" stroke-dasharray="6 6" fill="none" opacity="0.5"/>' +
        star(214, 122, 2.6, C.gold) +
        star(196, 166, 2.0, C.gold) +
        '<g opacity="0.45">' + star(178, 200, 1.6, C.gold) + '</g>' +
        '<g opacity="0.22">' + star(166, 226, 1.2, C.gold) + '</g>' +
        arrowDown(296, 96, 110, C.greenD) +
        '<text x="296" y="86" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">REWARD STOPS</text>' +
        '<circle cx="90" cy="120" r="46" fill="none" stroke="' + C.red + '" stroke-width="4"/>' +
        '<line x1="58" y1="88" x2="122" y2="152" stroke="' + C.red + '" stroke-width="6" stroke-linecap="round"/>' +
        '<text x="90" y="192" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" letter-spacing="2" fill="' + C.red + '">NO REWARD</text>' +
        '<text x="210" y="236" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.slate + '">behavior fades… then stops</text>',
        'EXTINCTION'
      );
    },
    6: function () {
      return frame(
        '<polygon points="210,40 244,58 244,96 210,116 176,96 176,58" fill="' + C.red + '" stroke="' + C.navy + '" stroke-width="2.6" filter="url(#soft)"/>' +
        '<text x="210" y="84" text-anchor="middle" ' + FONT2 + ' font-size="26" font-weight="800" fill="' + C.white + '">−</text>' +
        '<text x="210" y="130" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" letter-spacing="2" fill="' + C.red + '">DECREASE</text>' +
        '<rect x="60" y="150" width="300" height="56" rx="12" fill="' + C.white + '" stroke="' + C.line + '" stroke-width="2"/>' +
        '<line x1="80" y1="178" x2="150" y2="178" stroke="' + C.slate + '" stroke-width="3.4" stroke-linecap="round"/>' +
        '<circle cx="180" cy="178" r="12" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<text x="180" y="183" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.navy + '">→</text>' +
        '<line x1="216" y1="178" x2="286" y2="178" stroke="' + C.slate + '" stroke-width="3.4" stroke-linecap="round"/>' +
        '<circle cx="316" cy="178" r="12" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<text x="316" y="183" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.white + '">↓</text>' +
        '<text x="180" y="236" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">behavior</text>' +
        '<text x="316" y="236" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">less likely</text>',
        'PUNISHMENT'
      );
    },
    7: function () {
      const light = function (x, on) {
        const col = on ? C.green : C.red;
        return '<g transform="translate(' + x + ' 60)">' +
          '<rect x="0" y="0" width="56" height="130" rx="12" fill="' + C.navy + '" stroke="' + C.navy + '" stroke-width="2"/>' +
          '<circle cx="28" cy="26" r="15" fill="' + (on ? C.slate : C.red) + '" opacity="0.35"/>' +
          '<circle cx="28" cy="65" r="15" fill="' + (on ? C.gold : C.slate) + '" opacity="0.35"/>' +
          '<circle cx="28" cy="104" r="15" fill="' + (on ? C.green : C.slate) + '" opacity="' + (on ? 1 : 0.35) + '"/>' +
          '</g>';
      };
      return frame(
        light(60, false) + light(180, true) +
        '<g transform="translate(300 128)">' +
        '<rect x="0" y="0" width="78" height="44" rx="18" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<circle cx="30" cy="22" r="14" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<circle cx="30" cy="22" r="6" fill="' + C.navy + '"/>' +
        '<rect x="60" y="4" width="8" height="12" rx="3" fill="' + C.navy + '"/>' +
        '<path d="M8 30 l12 0 M8 36 l12 0" stroke="' + C.white + '" stroke-width="2.4" stroke-linecap="round"/>' +
        '</g>' +
        '<text x="120" y="230" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.red + '">SΔ · STOP</text>' +
        '<text x="208" y="230" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">SD · GO</text>' +
        arrowRight(250, 120, 44, C.navy) +
        '<text x="340" y="200" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">cue → action</text>',
        'STIMULUS CONTROL'
      );
    },
    8: function () {
      return frame(
        '<path d="M150 90 q30 -38 60 0" stroke="' + C.goldD + '" stroke-width="2.6" fill="none"/>' +
        '<circle cx="180" cy="92" r="8" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.8"/>' +
        '<path d="M150 90 a30 30 0 0 1 60 0 l8 26 q-38 22 -76 0 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<rect x="150" y="122" width="60" height="10" rx="4" fill="' + C.navy + '"/>' +
        '<circle cx="180" cy="142" r="9" fill="' + C.navy + '"/>' +
        '<path d="M180 132 q34 -30 64 4" stroke="' + C.blue + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="248" cy="132" r="5" fill="' + C.blue + '"/><circle cx="260" cy="128" r="4" fill="' + C.blue + '" opacity="0.7"/><circle cx="270" cy="125" r="3" fill="' + C.blue + '" opacity="0.45"/>' +
        '<g transform="translate(300 150) scale(1.1)">' +
        '<ellipse cx="0" cy="10" rx="20" ry="14" fill="' + C.pink + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<ellipse cx="-8" cy="8" rx="5" ry="4" fill="' + C.pinkD + '"/>' +
        '<ellipse cx="7" cy="6" rx="4.5" ry="3.6" fill="' + C.pinkD + '"/>' +
        '<ellipse cx="0" cy="22" rx="4" ry="3" fill="' + C.pinkD + '"/>' +
        '</g>' +
        '<rect x="62" y="120" width="70" height="56" rx="12" fill="' + C.white + '" stroke="' + C.line + '" stroke-width="2"/>' +
        '<path d="M82 176 l-8 22 l24 -16 Z" fill="' + C.white + '" stroke="' + C.line + '" stroke-width="2"/>' +
        '<path d="M86 140 q10 8 22 0 M86 156 q10 8 22 0" stroke="' + C.slate + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        '<text x="300" y="216" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">CS</text>' +
        '<text x="96" y="212" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">US</text>' +
        '<text x="180" y="70" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.goldD + '">BELL + FOOD</text>' +
        arrowRight(240, 196, 40, C.navy),
        'RESPONDENT CONDITIONING'
      );
    },
    9: function () {
      return frame(
        '<rect x="70" y="176" width="56" height="28" rx="4" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<rect x="130" y="152" width="56" height="52" rx="4" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<rect x="190" y="128" width="56" height="76" rx="4" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<rect x="250" y="104" width="56" height="100" rx="4" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<path d="M98 178 q6 -12 0 -22 M158 154 q6 -12 0 -22 M218 130 q6 -12 0 -22" stroke="' + C.white + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M278 106 l-8 -16 M270 90 l-10 -4 M284 88 l-4 -11" stroke="' + C.white + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        star(320, 84, 2.0, C.gold) +
        '<text x="96" y="226" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">step 1</text>' +
        '<text x="278" y="226" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">step 4</text>' +
        '<text x="320" y="70" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.goldD + '">GOAL</text>' +
        arrowRight(338, 150, 36, C.navy),
        'SHAPING — SUCCESSIVE APPROXIMATIONS'
      );
    },
    10: function () {
      return frame(
        '<g transform="translate(120 128) scale(1.15)">' +
        '<circle cx="0" cy="0" r="26" fill="none" stroke="' + C.navy + '" stroke-width="5"/>' +
        '<circle cx="62" cy="0" r="26" fill="none" stroke="' + C.navy + '" stroke-width="5"/>' +
        '<path d="M0 0 h62 M31 -26 v26 M14 -4 l-14 -34 M48 -4 l14 -34 M14 -4 l14 16 M48 -4 l-14 16" stroke="' + C.navy + '" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<line x1="62" y1="-18" x2="88" y2="-34" stroke="' + C.navy + '" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="-26" cy="20" r="10" fill="none" stroke="' + C.slate + '" stroke-width="3.4" stroke-dasharray="4 5"/>' +
        '</g>' +
        '<text x="120" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">training wheels fading…</text>' +
        arrowRight(250, 120, 44, C.greenD) +
        '<g transform="translate(310 116)">' +
        '<circle cx="0" cy="0" r="26" fill="none" stroke="' + C.greenD + '" stroke-width="5"/>' +
        '<circle cx="56" cy="0" r="26" fill="none" stroke="' + C.greenD + '" stroke-width="5"/>' +
        '<path d="M0 0 h56 M28 -26 v26 M12 -4 l-12 -34 M44 -4 l12 -34 M12 -4 l12 16 M44 -4 l-12 16" stroke="' + C.greenD + '" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</g>' +
        '<text x="338" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">rides alone!</text>' +
        '<text x="210" y="60" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.navy + '">HELP → INDEPENDENT</text>',
        'PROMPTING & FADING'
      );
    },
    11: function () {
      const link = function (x, y) {
        return '<path d="M' + x + ' ' + y + ' a16 16 0 0 1 26 0 l-4 10 a16 16 0 0 1 -18 0 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2" transform="rotate(90 ' + x + ' ' + y + ')"/>';
      };
      return frame(
        link(96, 130) + link(150, 130) + link(204, 130) + link(258, 130) +
        '<text x="96" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">R1 → S1</text>' +
        '<text x="150" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">R2 → S2</text>' +
        '<text x="204" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">R3 → S3</text>' +
        '<text x="258" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.blueD + '">… → DONE</text>' +
        '<path d="M204 96 q30 -20 54 -2" stroke="' + C.green + '" stroke-width="2.6" fill="none" stroke-dasharray="5 5"/>' +
        star(272, 84, 1.4, C.gold) +
        '<text x="210" y="70" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.navy + '">ONE BEHAVIOR = MANY LINKS</text>',
        'CHAINING'
      );
    },
    12: function () {
      return frame(
        '<polygon points="60,120 60,80 96,100 60,120" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<path d="M70 96 q40 -6 60 -34 M70 104 q40 -6 66 -30 M70 112 q40 -6 60 -34" stroke="' + C.orangeD + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        person(196, 120, 1.15, { shirt: C.blue }) +
        person(292, 120, 1.15, { shirt: C.green }) +
        '<path d="M230 84 q8 -10 18 -8 M232 78 q10 -12 22 -8" stroke="' + C.purple + '" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
        bubble(176, 40, 52, 30, 'MODEL', { fill: C.purple, color: C.white, size: 12 }) +
        '<text x="96" y="66" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">INSTRUCT</text>' +
        '<text x="244" y="30" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">SHOW · PRACTICE · FEEDBACK</text>' +
        '<text x="120" y="220" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">1</text>' +
        '<text x="208" y="220" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">2 · 3</text>' +
        '<text x="300" y="220" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">4</text>',
        'BEHAVIORAL SKILLS TRAINING'
      );
    },
    13: function () {
      return frame(
        '<circle cx="210" cy="120" r="78" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.6"/>' +
        '<path d="M150 76 h120 v88 l-24 24 h-96 Z" fill="none"/>' +
        '<path d="M210 76 v112 M150 120 h120" stroke="' + C.line + '" stroke-width="1.6"/>' +
        '<rect x="152" y="78" width="56" height="40" fill="' + C.blue + '" opacity="0.8"/><text x="180" y="104" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">ATT</text>' +
        '<rect x="212" y="78" width="56" height="40" fill="' + C.orange + '" opacity="0.8"/><text x="240" y="104" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">ESC</text>' +
        '<rect x="152" y="122" width="56" height="40" fill="' + C.green + '" opacity="0.8"/><text x="180" y="148" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">TOY</text>' +
        '<rect x="212" y="122" width="56" height="40" fill="' + C.purple + '" opacity="0.8"/><text x="240" y="148" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">AUTO</text>' +
        '<g transform="translate(318 78)"><circle cx="0" cy="0" r="22" fill="none" stroke="' + C.green + '" stroke-width="5"/><line x1="0" y1="0" x2="0" y2="-12" stroke="' + C.greenD + '" stroke-width="4" stroke-linecap="round"/><line x1="0" y1="0" x2="10" y2="8" stroke="' + C.greenD + '" stroke-width="4" stroke-linecap="round"/><path d="M0 22 L0 46" stroke="' + C.slate + '" stroke-width="5"/></g>' +
        '<text x="210" y="228" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">WHY does the behavior happen?</text>',
        'FUNCTIONAL ASSESSMENT'
      );
    },
    14: function () {
      return frame(
        '<rect x="180" y="130" width="60" height="70" rx="10" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.6"/>' +
        '<path d="M188 130 v-14 q2 -20 32 -22 q30 2 32 22 v14" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.6"/>' +
        '<path d="M210 104 a12 12 0 0 0 0 6 M224 100 a18 18 0 0 0 0 8" stroke="' + C.orangeD + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<path d="M192 92 q4 -10 10 -10 M220 86 q6 -12 14 -10" stroke="' + C.slate + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
        '<line x1="168" y1="70" x2="252" y2="70" stroke="' + C.red + '" stroke-width="6" stroke-linecap="round"/>' +
        '<circle cx="94" cy="140" r="42" fill="none" stroke="' + C.red + '" stroke-width="4"/>' +
        '<line x1="64" y1="110" x2="124" y2="170" stroke="' + C.red + '" stroke-width="6" stroke-linecap="round"/>' +
        '<text x="94" y="206" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.red + '">reward cut off</text>' +
        '<text x="298" y="140" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.greenD + '">attention</text>' +
        '<text x="298" y="158" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.greenD + '">withheld</text>' +
        '<path d="M282 148 l16 0 l-8 -8 M298 156 l16 0 l-8 8" stroke="' + C.greenD + '" stroke-width="3" fill="none"/>' +
        '<text x="210" y="236" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.slate + '">the flame dies out</text>',
        'APPLYING EXTINCTION'
      );
    },
    15: function () {
      return frame(
        '<polygon points="210,60 226,96 194,96" fill="' + C.navy + '"/>' +
        '<line x1="80" y1="140" x2="340" y2="140" stroke="' + C.navy + '" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M80 140 a22 22 0 0 0 44 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<path d="M296 140 a22 22 0 0 0 44 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<path d="M102 118 l0 -30 q14 -12 28 0 l0 30" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        star(116, 88, 1.5, C.gold) +
        '<text x="116" y="76" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.goldD + '">reward</text>' +
        '<path d="M318 118 l0 -46 q14 -12 28 0 l0 46" fill="' + C.red + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<text x="332" y="70" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.red + '">problem</text>' +
        '<text x="210" y="86" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.greenD + '">reward the RIGHT behavior</text>' +
        '<text x="210" y="226" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.slate + '">reinforce alternative · ignore problem</text>',
        'DIFFERENTIAL REINFORCEMENT'
      );
    },
    16: function () {
      return frame(
        '<rect x="70" y="70" width="120" height="130" rx="10" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4" filter="url(#soft)"/>' +
        '<rect x="82" y="82" width="96" height="106" rx="6" fill="' + C.paper + '"/>' +
        '<rect x="94" y="94" width="44" height="34" rx="6" fill="' + C.orange + '" opacity="0.9"/>' +
        '<rect x="94" y="136" width="44" height="34" rx="6" fill="' + C.blue + '" opacity="0.9"/>' +
        '<rect x="146" y="94" width="20" height="76" rx="6" fill="' + C.green + '" opacity="0.9"/>' +
        '<g transform="translate(232 66) rotate(-20)">' +
        '<rect x="0" y="0" width="70" height="46" rx="20" fill="' + C.white + '" stroke="' + C.slate + '" stroke-width="2.6"/>' +
        '<rect x="6" y="6" width="58" height="34" rx="16" fill="' + C.green + '"/>' +
        '<circle cx="52" cy="23" r="11" fill="' + C.white + '"/><circle cx="52" cy="23" r="6" fill="' + C.navy + '"/>' +
        '</g>' +
        '<path d="M232 46 q10 -26 40 -26 M272 20 h14" stroke="' + C.orangeD + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        '<text x="232" y="30" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.orangeD + '">switch!</text>' +
        '<text x="320" y="120" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">make the good</text>' +
        '<text x="320" y="138" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">behavior EASY</text>' +
        '<text x="210" y="230" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">change the BEFORE → change the behavior</text>',
        'ANTECEDENT INTERVENTIONS'
      );
    },
    17: function () {
      return frame(
        '<circle cx="104" cy="118" r="52" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="3"/>' +
        '<circle cx="104" cy="118" r="42" fill="none" stroke="' + C.line + '" stroke-width="2"/>' +
        '<line x1="104" y1="118" x2="104" y2="88" stroke="' + C.blueD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="104" y1="118" x2="130" y2="118" stroke="' + C.blueD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="104" y="80" width="5" height="5" fill="' + C.blueD + '"/>' +
        '<text x="104" y="196" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.blueD + '">TIME-OUT</text>' +
        '<text x="104" y="212" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">leave the fun</text>' +
        '<circle cx="296" cy="96" r="30" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.6"/>' +
        '<text x="296" y="102" text-anchor="middle" ' + FONT2 + ' font-size="18" font-weight="800" fill="' + C.navy + '">$</text>' +
        '<text x="296" y="138" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.navy + '">−</text>' +
        '<circle cx="344" cy="140" r="22" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.4" opacity="0.5"/>' +
        '<text x="344" y="146" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.navy + '">−</text>' +
        '<circle cx="318" cy="170" r="14" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2" opacity="0.25"/>' +
        '<text x="318" y="175" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.navy + '">−</text>' +
        '<text x="316" y="212" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.orangeD + '">RESPONSE COST</text>' +
        '<path d="M172 128 q16 0 24 -12 M178 140 q26 0 34 -14" stroke="' + C.slate + '" stroke-width="2.6" stroke-dasharray="4 5" fill="none"/>' +
        '<text x="210" y="62" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.navy + '">REMOVE THE FUN → BEHAVIOR DECREASES</text>',
        'TIME-OUT & RESPONSE COST'
      );
    },
    18: function () {
      return frame(
        '<path d="M210 46 l74 26 v56 q0 48 -74 72 q-74 -24 -74 -72 v-56 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.8" filter="url(#soft)"/>' +
        '<path d="M210 72 l46 16 v42 q0 34 -46 52 q-46 -18 -46 -52 v-42 Z" fill="' + C.white + '" opacity="0.25"/>' +
        '<path d="M182 118 l20 20 l34 -38" stroke="' + C.white + '" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="210" y="190" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" letter-spacing="2" fill="' + C.blueD + '">ETHICS · SAFETY</text>' +
        '<g transform="translate(84 118) scale(0.8)">' +
        '<rect x="-4" y="0" width="42" height="14" rx="7" fill="' + C.white + '" stroke="' + C.slate + '" stroke-width="2"/>' +
        '<rect x="6" y="-16" width="22" height="16" rx="4" fill="' + C.white + '" stroke="' + C.slate + '" stroke-width="2"/>' +
        '</g>' +
        '<g transform="translate(336 118) scale(0.8)">' +
        '<rect x="-4" y="0" width="42" height="14" rx="7" fill="' + C.white + '" stroke="' + C.slate + '" stroke-width="2"/>' +
        '<rect x="6" y="-16" width="22" height="16" rx="4" fill="' + C.white + '" stroke="' + C.slate + '" stroke-width="2"/>' +
        '</g>' +
        '<circle cx="84" cy="108" r="26" fill="none" stroke="' + C.green + '" stroke-width="3.4"/>' +
        '<text x="84" y="114" text-anchor="middle" ' + FONT2 + ' font-size="16" font-weight="800" fill="' + C.greenD + '">✓</text>' +
        '<circle cx="336" cy="108" r="26" fill="none" stroke="' + C.green + '" stroke-width="3.4"/>' +
        '<text x="336" y="114" text-anchor="middle" ' + FONT2 + ' font-size="16" font-weight="800" fill="' + C.greenD + '">✓</text>' +
        '<text x="84" y="180" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">reviewed</text>' +
        '<text x="336" y="180" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">supervised</text>',
        'POSITIVE PUNISHMENT & ETHICS'
      );
    },
    19: function () {
      return frame(
        '<path d="M210 96 q-70 -52 -140 6 q70 14 140 -6 M210 96 q70 -52 140 6 q-70 14 -140 -6" stroke="' + C.green + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<line x1="210" y1="100" x2="210" y2="190" stroke="' + C.navy + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M210 190 q-14 14 -8 28 M210 190 q14 14 8 28" stroke="' + C.navy + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<circle cx="70" cy="70" r="20" fill="' + C.blue + '" opacity="0.9" stroke="' + C.navy + '" stroke-width="2"/><text x="70" y="75" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="800" fill="' + C.white + '">school</text>' +
        '<circle cx="118" cy="58" r="16" fill="' + C.orange + '" opacity="0.9" stroke="' + C.navy + '" stroke-width="2"/><text x="118" y="63" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.white + '">park</text>' +
        '<circle cx="302" cy="58" r="16" fill="' + C.purple + '" opacity="0.9" stroke="' + C.navy + '" stroke-width="2"/><text x="302" y="63" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.white + '">home</text>' +
        '<circle cx="350" cy="70" r="20" fill="' + C.pink + '" opacity="0.9" stroke="' + C.navy + '" stroke-width="2"/><text x="350" y="75" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="800" fill="' + C.white + '">store</text>' +
        '<text x="210" y="236" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">skill works EVERYWHERE, not just one room</text>',
        'PROMOTING GENERALIZATION'
      );
    },
    20: function () {
      return frame(
        person(120, 130, 1.2, { shirt: C.blue }) +
        '<circle cx="120" cy="118" r="56" fill="none" stroke="' + C.navy + '" stroke-width="5"/>' +
        '<line x1="120" y1="118" x2="120" y2="86" stroke="' + C.blueD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="120" y1="118" x2="144" y2="112" stroke="' + C.blueD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="120" y1="118" x2="104" y2="138" stroke="' + C.blueD + '" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="120" cy="118" r="9" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        graph(240, 96, 150, 110, [[10, 90], [40, 72], [70, 76], [100, 44], [130, 22]], { stroke: C.green }) +
        '<text x="315" y="86" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.greenD + '">my progress</text>' +
        '<text x="120" y="226" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.blueD + '">you steer</text>' +
        '<text x="315" y="226" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">you track</text>' +
        '<text x="210" y="52" text-anchor="middle" ' + FONT2 + ' font-size="14" font-weight="800" fill="' + C.navy + '">BE YOUR OWN SCIENTIST</text>',
        'SELF-MANAGEMENT'
      );
    },
    21: function () {
      return frame(
        '<path d="M210 90 a70 70 0 1 1 -1 0 M210 90 l-18 -2 l10 14 Z" fill="none" stroke="' + C.red + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M210 90 l-18 -2 l10 14 Z" fill="' + C.red + '"/>' +
        '<text x="210" y="118" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.red + '">habit loop</text>' +
        '<rect x="284" y="76" width="66" height="54" rx="12" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.6" filter="url(#soft)"/>' +
        '<text x="317" y="103" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">BREAK IT</text>' +
        '<text x="317" y="120" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.white + '">competing</text>' +
        '<text x="317" y="132" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.white + '">response</text>' +
        arrowRight(262, 96, 18, C.navy) +
        '<text x="120" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">notice it</text>' +
        '<text x="210" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">block it</text>' +
        '<text x="300" y="196" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">reward the win</text>' +
        '<circle cx="90" cy="120" r="18" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.4"/><text x="90" y="126" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">1</text>' +
        '<circle cx="210" cy="142" r="18" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.4"/><text x="210" y="148" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">2</text>' +
        '<circle cx="330" cy="120" r="18" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.4"/><text x="330" y="126" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">3</text>',
        'HABIT REVERSAL'
      );
    },
    22: function () {
      return frame(
        '<path d="M120 190 q-30 0 -40 -20 l40 20 M120 190 q30 0 40 -20 l-40 20" stroke="' + C.navy + '" stroke-width="4" fill="none" stroke-linejoin="round"/>' +
        '<rect x="96" y="120" width="96" height="72" rx="10" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="3"/>' +
        '<rect x="108" y="132" width="72" height="34" rx="6" fill="' + C.white + '" opacity="0.35"/>' +
        '<rect x="108" y="108" width="72" height="16" rx="5" fill="' + C.blueD + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<circle cx="112" cy="172" r="6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/><circle cx="128" cy="180" r="6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/><circle cx="144" cy="172" r="6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/>' +
        '<circle cx="160" cy="180" r="6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/><circle cx="176" cy="172" r="6" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/>' +
        '<path d="M144 96 q-8 -14 -26 -14 q20 -2 26 14 M144 96 q8 -14 26 -14 q-20 -2 -26 14" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<circle cx="144" cy="78" r="5" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/>' +
        '<circle cx="250" cy="96" r="24" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.6"/>' +
        '<text x="250" y="102" text-anchor="middle" ' + FONT2 + ' font-size="15" font-weight="800" fill="' + C.navy + '">★</text>' +
        '<circle cx="296" cy="120" r="20" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.4"/>' +
        '<text x="296" y="126" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="800" fill="' + C.navy + '">★</text>' +
        '<circle cx="330" cy="148" r="16" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2"/>' +
        '<text x="330" y="154" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="800" fill="' + C.navy + '">★</text>' +
        '<path d="M274 104 q10 -6 16 -6 M316 128 q10 -4 14 -6" stroke="' + C.slate + '" stroke-width="2.4" stroke-dasharray="4 5" fill="none"/>' +
        '<text x="210" y="60" text-anchor="middle" ' + FONT2 + ' font-size="13" font-weight="700" fill="' + C.navy + '">EARN TOKENS → SPEND THEM</text>' +
        '<text x="144" y="226" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">bank</text>' +
        '<text x="296" y="226" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.slate + '">backup rewards</text>',
        'THE TOKEN ECONOMY'
      );
    },
    23: function () {
      return frame(
        '<rect x="150" y="44" width="130" height="168" rx="10" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.6" filter="url(#soft)"/>' +
        '<rect x="162" y="56" width="106" height="12" rx="3" fill="' + C.line + '"/>' +
        '<line x1="162" y1="82" x2="252" y2="82" stroke="' + C.line + '" stroke-width="2.4"/>' +
        '<line x1="162" y1="98" x2="252" y2="98" stroke="' + C.line + '" stroke-width="2.4"/>' +
        '<line x1="162" y1="114" x2="232" y2="114" stroke="' + C.line + '" stroke-width="2.4"/>' +
        '<line x1="162" y1="148" x2="228" y2="148" stroke="' + C.line + '" stroke-width="2.6"/>' +
        '<text x="162" y="144" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.slate + '">Signature:</text>' +
        '<path d="M196 184 q20 -6 40 0 q14 3 20 -6" stroke="' + C.blueD + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<rect x="288" y="120" width="66" height="14" rx="7" fill="' + C.green + '"/>' +
        '<text x="321" y="130" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.white + '">if … then …</text>' +
        '<rect x="286" y="150" width="70" height="14" rx="7" fill="' + C.orange + '"/>' +
        '<text x="321" y="160" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.white + '">reward</text>' +
        '<rect x="286" y="180" width="70" height="14" rx="7" fill="' + C.slate + '"/>' +
        '<text x="321" y="190" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="800" fill="' + C.white + '">penalty</text>' +
        '<path d="M150 200 q-16 4 -26 -6 M150 208 q-22 6 -32 -6" stroke="' + C.navy + '" stroke-width="2.6" fill="none"/>' +
        '<text x="210" y="240" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">a WRITTEN deal changes behavior</text>',
        'BEHAVIORAL CONTRACTS'
      );
    },
    24: function () {
      return frame(
        '<rect x="90" y="70" width="52" height="22" rx="5" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<rect x="146" y="94" width="52" height="22" rx="5" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<rect x="202" y="118" width="52" height="22" rx="5" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<rect x="258" y="142" width="52" height="22" rx="5" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.2"/>' +
        '<path d="M116 66 l0 -10 M172 90 l0 -10 M228 114 l0 -10" stroke="' + C.slate + '" stroke-width="2.4" stroke-dasharray="4 4"/>' +
        '<circle cx="116" cy="56" r="4" fill="' + C.orange + '"/><circle cx="172" cy="80" r="4" fill="' + C.orange + '"/><circle cx="228" cy="104" r="4" fill="' + C.orange + '"/>' +
        person(116, 96, 0.8, { shirt: C.blue }) +
        '<text x="116" y="140" text-anchor="middle" ' + FONT2 + ' font-size="10" font-weight="700" fill="' + C.blueD + '">step down</text>' +
        '<circle cx="330" cy="96" r="34" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.6"/>' +
        '<circle cx="330" cy="96" r="22" fill="none" stroke="' + C.goldD + '" stroke-width="2.4"/>' +
        '<path d="M322 88 l6 8 l12 -12" stroke="' + C.navy + '" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<text x="330" y="152" text-anchor="middle" ' + FONT2 + ' font-size="11" font-weight="700" fill="' + C.goldD + '">calm</text>' +
        '<text x="210" y="216" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.navy + '">face it gradually · stay until calm</text>',
        'FEAR & ANXIETY REDUCTION'
      );
    },
    25: function () {
      return frame(
        person(120, 132, 1.2, { shirt: C.purple }) +
        thought(170, 60, 190, 96, C.white) +
        brain(224, 78, 1.7, C.pink) +
        '<text x="265" y="140" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.slate + '">\"I can handle this\"</text>' +
        '<path d="M120 40 q-8 -18 10 -20 q-4 10 8 12 q-8 4 -2 10 q-10 -2 -16 -2 Z" fill="' + C.orange + '" opacity="0.8"/>' +
        '<text x="120" y="236" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.purpleD + '">change the THOUGHT</text>' +
        '<text x="265" y="236" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="700" fill="' + C.greenD + '">→ change the ACTION</text>',
        'COGNITIVE BEHAVIOR MODIFICATION'
      );
    },
  };

  /* ============================================================
     SECTION ICONS — small badges driven by section keywords
  ============================================================ */
  const GLYPHS = {
    coin: '<circle cx="20" cy="20" r="15" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.4"/><text x="20" y="25" text-anchor="middle" ' + FONT2 + ' font-size="16" font-weight="800" fill="' + C.navy + '">+</text>',
    fade: '<path d="M20 8 l3 7 7 1 6 5 -5 6 1 7 -7 -2 -6 5 -1 -7 -6 -5 6 -5 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M12 20 l5 5 l7 -9" stroke="' + C.navy + '" stroke-width="2.4" fill="none"/>',
    stop: '<polygon points="20,6 29,12 33,22 27,32 13,32 7,22 11,12" fill="' + C.red + '" stroke="' + C.navy + '" stroke-width="2.2"/><text x="20" y="24" text-anchor="middle" ' + FONT2 + ' font-size="14" font-weight="800" fill="' + C.white + '">−</text>',
    chart: '<rect x="6" y="10" width="28" height="34" rx="5" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M12 36 l6 -8 l5 4 l9 -12" stroke="' + C.white + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="20" r="2.6" fill="' + C.white + '"/>',
    clip: '<rect x="10" y="6" width="20" height="38" rx="4" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/><rect x="17" y="2" width="6" height="8" rx="2" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="1.6"/><line x1="14" y1="16" x2="26" y2="16" stroke="' + C.line + '" stroke-width="2.4"/><line x1="14" y1="24" x2="26" y2="24" stroke="' + C.line + '" stroke-width="2.4"/><line x1="14" y1="32" x2="22" y2="32" stroke="' + C.line + '" stroke-width="2.4"/>',
    bell: '<path d="M12 30 a8 8 0 0 0 16 0 Z" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 8 l0 6 M8 30 q12 -8 24 0" stroke="' + C.navy + '" stroke-width="2.4" fill="none"/><circle cx="20" cy="6" r="3" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="1.6"/>',
    stairs: '<rect x="6" y="30" width="9" height="6" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="1.6"/><rect x="17" y="24" width="9" height="12" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="1.6"/><rect x="28" y="18" width="9" height="18" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="1.6"/><path d="M35 10 l2 -4 M37 8 l4 1 M34 6 l-1 4" stroke="' + C.gold + '" stroke-width="2" fill="none"/>',
    chain: '<path d="M12 20 a7 7 0 0 1 12 0 l-2 5 a7 7 0 0 1 -8 0 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/><path d="M28 20 a7 7 0 0 1 -12 0 l2 -5 a7 7 0 0 1 8 0 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>',
    speech: '<rect x="6" y="10" width="30" height="20" rx="8" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M14 30 l-4 8 10 -6 Z" fill="' + C.purple + '" stroke="' + C.navy + '" stroke-width="2.2"/><text x="21" y="25" text-anchor="middle" ' + FONT2 + ' font-size="12" font-weight="800" fill="' + C.white + '">OK</text>',
    puzzle: '<path d="M14 8 h12 a4 4 0 0 1 0 8 a4 4 0 0 0 0 8 h-12 a4 4 0 0 1 0 -8 a4 4 0 0 0 0 -8 Z" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.2"/><circle cx="30" cy="8" r="4" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2"/>',
    scale: '<polygon points="20,10 24,18 16,18" fill="' + C.navy + '"/><line x1="8" y1="22" x2="32" y2="22" stroke="' + C.navy + '" stroke-width="2.4"/><path d="M8 22 a5 5 0 0 0 10 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/><path d="M32 22 a5 5 0 0 0 -10 0 Z" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    switch: '<rect x="8" y="14" width="26" height="22" rx="11" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/><circle cx="25" cy="18" r="6" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    timer: '<circle cx="20" cy="22" r="14" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.4"/><line x1="20" y1="22" x2="20" y2="12" stroke="' + C.blueD + '" stroke-width="2.6" stroke-linecap="round"/><line x1="20" y1="22" x2="27" y2="22" stroke="' + C.blueD + '" stroke-width="2.6" stroke-linecap="round"/><path d="M16 6 h8" stroke="' + C.navy + '" stroke-width="2.4" stroke-linecap="round"/>',
    shield: '<path d="M20 6 l12 5 v10 q0 9 -12 13 q-12 -4 -12 -13 v-10 Z" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M15 19 l4 4 l7 -8" stroke="' + C.white + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    umbrella: '<path d="M20 26 q-11 -14 -22 0 q22 4 22 -2 M20 26 q11 -14 22 0 q-22 4 -22 -2" stroke="' + C.green + '" stroke-width="3" fill="none"/><line x1="20" y1="28" x2="20" y2="38" stroke="' + C.navy + '" stroke-width="2.6"/>',
    mirror: '<ellipse cx="20" cy="20" rx="13" ry="16" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><ellipse cx="17" cy="17" rx="4" ry="5" fill="' + C.white + '"/><line x1="27" y1="27" x2="32" y2="34" stroke="' + C.navy + '" stroke-width="2.2"/>',
    loop: '<path d="M20 10 a12 12 0 1 1 0 20 M20 10 l-4 4 l4 4" stroke="' + C.red + '" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="30" y="16" width="8" height="12" rx="3" fill="' + C.green + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    chest: '<rect x="8" y="24" width="24" height="12" rx="4" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M10 24 q10 -10 20 0" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><text x="20" y="16" text-anchor="middle" ' + FONT2 + ' font-size="12" fill="' + C.gold + '">★</text>',
    contract: '<rect x="6" y="8" width="24" height="34" rx="4" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="2.2"/><line x1="10" y1="16" x2="26" y2="16" stroke="' + C.line + '" stroke-width="2"/><line x1="10" y1="24" x2="22" y2="24" stroke="' + C.line + '" stroke-width="2"/><line x1="10" y1="34" x2="24" y2="34" stroke="' + C.blueD + '" stroke-width="2.4"/><path d="M30 14 l-8 14 l-4 -6" stroke="' + C.green + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
    calm: '<circle cx="20" cy="20" r="13" fill="' + C.gold + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M15 20 l4 4 l7 -7" stroke="' + C.navy + '" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    brain: '<path d="M12 12 q-4 -10 6 -12 q4 2 2 8 q4 -6 10 -2 q3 5 -4 8 q4 2 0 8 q-3 5 -10 0 q-6 3 -10 -4 q-4 -8 6 -6 Z" fill="' + C.pink + '" stroke="' + C.navy + '" stroke-width="2.2"/>',
    book: '<path d="M20 10 a7 7 0 0 0 -7 -2 h-6 v22 h6 a7 7 0 0 1 7 2 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 10 a7 7 0 0 1 7 -2 h6 v22 h-6 a7 7 0 0 1 -7 2 Z" fill="' + C.blue + '" stroke="' + C.navy + '" stroke-width="2.2"/>',
    gear: '<path d="M20 8 l2 -4 h4 l2 4 l4 2 4 -2 l3 4 -2 4 2 4 -4 2 -2 4 h-4 l-2 4 -4 -2 -4 2 -2 -4 -4 -2 -2 -4 2 -4 -2 -4 4 -2 Z" fill="' + C.slate + '" stroke="' + C.navy + '" stroke-width="1.8"/><circle cx="20" cy="20" r="5" fill="' + C.white + '" stroke="' + C.navy + '" stroke-width="1.8"/>',
    light: '<polygon points="20,6 33,13 30,30 10,30 7,13" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.2"/><rect x="17" y="30" width="6" height="8" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="1.8"/><path d="M10 34 q-5 0 -5 5 h30 q0 -5 -5 -5" stroke="' + C.navy + '" stroke-width="1.8" fill="none"/>',
    hand: '<path d="M12 34 v-14 a4 4 0 0 1 8 0 v-6 a4 4 0 0 1 8 0 v6 a4 4 0 0 1 8 0 v14 Z" fill="' + C.pink + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M12 34 h24" stroke="' + C.navy + '" stroke-width="2.4"/>',
    megaphone: '<polygon points="6,16 6,26 12,26 20,34 20,8 12,16" fill="' + C.orange + '" stroke="' + C.navy + '" stroke-width="2.2"/><path d="M20 14 q10 2 10 8 q0 6 -10 8" stroke="' + C.orangeD + '" stroke-width="2.4" fill="none"/>',
  };

  const KEYWORDS = [
    [/reinforc|reward|schedule|ratio|interval|reinforcer/i, 'coin'],
    [/extinct|fade|burst|spontaneous/i, 'fade'],
    [/punish|punish|punisher|aversive|time-out|response cost|misconception/i, 'stop'],
    [/graph|chart|level|trend|variab|baseline|design|measure/i, 'chart'],
    [/record|observ|record|reactiv|agreement|target|direct|indirect|instrument|logistic|sampl/i, 'clip'],
    [/respondent|condition|pavlov|neutral|stimulus|elicited|emotional|higher-order/i, 'bell'],
    [/shap|approximation|successive/i, 'stairs'],
    [/chain|task analysis|link/i, 'chain'],
    [/skills|training|model|rehears|feedback|instruction|in situ/i, 'speech'],
    [/function|assessment|analysis|problem|behavior.*why/i, 'puzzle'],
    [/differential|alternative|other behavior|low rates|DRA|DRO|DRL/i, 'scale'],
    [/antecedent|discriminat|motivating|effort|cue|operation/i, 'switch'],
    [/fear|anxiety|relax|exposure|desensit|phobia/i, 'calm'],
    [/cognitive|thought|restruct|coping|acceptance|self-instruction/i, 'brain'],
    [/generaliz/i, 'umbrella'],
    [/self-manage/i, 'mirror'],
    [/habit|tic|stutter/i, 'loop'],
    [/token|economy/i, 'chest'],
    [/contract|negotiat/i, 'contract'],
    [/ethic|supervis|peer review|accountab/i, 'shield'],
    [/introduction|history|structure|modification.*defin/i, 'book'],
    [/prompt|fading|transfer|verbal/i, 'hand'],
    [/stimulus control|discrimination|three-term|equivalence/i, 'light'],
    [/self-manage/i, 'mirror'],
    [/game|challenge|competition/i, 'gear'],
  ];

  function sectionIcon(unitId, title) {
    let glyph = 'book';
    for (let i = 0; i < KEYWORDS.length; i++) {
      if (KEYWORDS[i][0].test(title)) { glyph = KEYWORDS[i][1]; break; }
    }
    // unit color coding
    const colors = [C.blue, C.green, C.purple, C.orange, C.pink];
    const ring = colors[(unitId - 1) % colors.length];
    return '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img" style="width:44px;height:44px">' +
      '<circle cx="20" cy="20" r="18" fill="' + C.white + '" stroke="' + ring + '" stroke-width="2.4"/>' +
      '<circle cx="20" cy="20" r="15" fill="' + ring + '" opacity="0.12"/>' +
      (GLYPHS[glyph] || GLYPHS.book) + '</svg>';
  }

  window.Art = {
    unitArt: function (id) { return UNIT_ART[id] ? UNIT_ART[id]() : UNIT_ART[1](); },
    sectionIcon: sectionIcon,
    palette: C,
  };
})();

