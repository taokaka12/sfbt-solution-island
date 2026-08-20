/* ============================================================
   Tiny Habits — bmap.js
   交互式 B=MAP 行为模型图：拖拽行为点，观察行动线。
   横轴=能力（右=容易），纵轴=动机（上=高），曲线=行动线。
   采用"原地更新"策略：只更新点位置与读数，不重建 SVG。
   ============================================================ */
(function () {
  'use strict';

  const W = 560, H = 380;
  const PAD = 46;             // 边距
  const AX_W = W - PAD * 2;   // 轴宽 468
  const AX_H = H - PAD * 2;   // 轴高 288
  const CURVE = 0.55;         // 行动线弯曲程度

  /* 能力(0..1 右大=容易) 动机(0..1 上大=高) → 像素 */
  function toXY(m, a) {
    const x = PAD + a * AX_W;
    const y = PAD + AX_H - m * AX_H;
    return { x: x, y: y };
  }
  function toMA(x, y) {
    const a = Math.min(1, Math.max(0, (x - PAD) / AX_W));
    const m = Math.min(1, Math.max(0, (PAD + AX_H - y) / AX_H));
    return { m: m, a: a };
  }
  /* 行动线：在给定 x（能力）处，判断行为是否发生 */
  function actionLineY(x) {
    const t = (x - PAD) / AX_W;
    const m = 1 - CURVE * t;
    return PAD + AX_H - m * AX_H;
  }
  function aboveLine(x, y) {
    return y < actionLineY(x);   // 越往上（y 越小）动机越高，越可能发生
  }

  function buildSvg() {
    const actionPts = [];
    for (let i = 0; i <= 24; i++) {
      const x = PAD + (i / 24) * AX_W;
      actionPts.push(x.toFixed(1) + ',' + actionLineY(x).toFixed(1));
    }
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" id="bmap-svg">' +
      /* 底色 */
      '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#0e1524"/>' +
      '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="url(#dotGrid)" opacity="0.4"/>' +
      /* 行动线上下区域染色 */
      '<path d="M' + PAD + ' ' + (PAD + AX_H) + ' L' + actionPts.join(' L') + ' L' + (W - PAD) + ' ' + (PAD + AX_H) + ' Z" fill="#34d399" opacity="0.06"/>' +
      /* 坐标轴 */
      '<line x1="' + PAD + '" y1="' + (PAD + AX_H) + '" x2="' + (W - PAD) + '" y2="' + (PAD + AX_H) + '" stroke="#2a3a57" stroke-width="2"/>' +
      '<line x1="' + PAD + '" y1="' + PAD + '" x2="' + PAD + '" y2="' + (PAD + AX_H) + '" stroke="#2a3a57" stroke-width="2"/>' +
      /* 行动线 */
      '<path d="M' + PAD + ' ' + (PAD + AX_H) + ' L' + actionPts.join(' L') + '" stroke="#60a5fa" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<text x="' + (W - PAD) + '" y="' + (actionLineY(W - PAD) - 10) + '" text-anchor="end" font-family="Consolas,monospace" font-size="12" fill="#60a5fa">ACTION LINE</text>' +
      /* 轴标签 */
      '<text x="' + PAD + '" y="' + (PAD - 14) + '" font-family="Consolas,monospace" font-size="13" fill="#7d8aa0">动机 M（高 ↑）</text>' +
      '<text x="' + (W - PAD) + '" y="' + (H - 14) + '" text-anchor="end" font-family="Consolas,monospace" font-size="13" fill="#7d8aa0">能力 A（容易 →）</text>' +
      /* 状态标签 */
      '<text x="' + (W - PAD - 8) + '" y="' + (PAD + 20) + '" text-anchor="end" font-family="Consolas,monospace" font-size="12" fill="#34d399" opacity="0.9">▲ 会发生</text>' +
      '<text x="' + (PAD + 8) + '" y="' + (PAD + AX_H - 16) + '" font-family="Consolas,monospace" font-size="12" fill="#f87171" opacity="0.9">▼ 不会发生</text>' +
      /* 行为点 */
      '<g id="bmap-dot" style="cursor:grab">' +
      '<circle id="bmap-dot-halo" r="22" fill="#34d399" opacity="0.18"/>' +
      '<circle id="bmap-dot-core" r="10" fill="#34d399" stroke="#0e1524" stroke-width="3"/>' +
      '</g>' +
      '</svg>';
  }

  function render(mountId, readoutId) {
    const u = Auth.currentUser();
    const bmap = (u && u.bmap) || { m: 0.6, a: 0.4 };
    let m = bmap.m, a = bmap.a;
    const mount = document.getElementById(mountId);
    const readout = document.getElementById(readoutId);
    if (!mount) return;

    mount.innerHTML = buildSvg();
    const svg = mount.querySelector('#bmap-svg');
    const dot = mount.querySelector('#bmap-dot');
    const halo = mount.querySelector('#bmap-dot-halo');
    const core = mount.querySelector('#bmap-dot-core');

    let dragging = false;

    function update(mVal, aVal, save) {
      mVal = Math.min(1, Math.max(0, mVal));
      aVal = Math.min(1, Math.max(0, aVal));
      m = mVal; a = aVal;
      const pt = toXY(m, a);
      const occurred = aboveLine(pt.x, pt.y);
      dot.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
      const col = occurred ? '#34d399' : '#f87171';
      halo.setAttribute('fill', col);
      core.setAttribute('fill', col);
      if (readout) {
        readout.innerHTML = 'B = M(' + m.toFixed(2) + ') × A(' + a.toFixed(2) + ') + P(有)  →  ' +
          (occurred ? '✅ 行为会发生' : '⚠️ 行为不会发生') +
          '<br><span style="font-size:11px;color:#7d8aa0">' +
          (occurred
            ? '它在行动线之上：动机或能力已经足够。'
            : '它在行动线之下：提高动机（向上拖）或降低难度（向右拖），让行为越过行动线。') +
          '</span>';
      }
      if (save) {
        const u2 = Auth.currentUser();
        if (u2) { u2.bmap = { m, a }; Auth.saveUser(u2); }
      }
    }

    function posFrom(e) {
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      const x = (e.clientX - rect.left) * (W / rect.width);
      const y = (e.clientY - rect.top) * (H / rect.height);
      return toMA(x, y);
    }

    svg.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const p = posFrom(e);
      if (!p) return;
      dragging = true;
      try { svg.setPointerCapture(e.pointerId); } catch (err) {}
      update(p.m, p.a, false);
    });
    svg.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      e.preventDefault();
      const p = posFrom(e);
      if (!p) return;
      update(p.m, p.a, false);
    });
    ['pointerup', 'pointercancel'].forEach(evt => {
      svg.addEventListener(evt, (e) => {
        if (!dragging) return;
        dragging = false;
        try { svg.releasePointerCapture(e.pointerId); } catch (err) {}
        update(m, a, true);
        SFX.play('pop');
      });
    });

    // 初始绘制
    update(m, a, false);
  }

  window.BehaviorMap = { render };
})();

