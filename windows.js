/* Local window movement only; positions reset when the page reloads. */
(() => {
  'use strict';
  const workspace = document.getElementById('workspace');
  const panes = [...workspace.querySelectorAll('.window')];
  const states = new Map(panes.map(pane => [pane, { x: 0, y: 0 }]));
  const mobile = window.matchMedia('(max-width: 720px)');
  let layer = 1;
  let drag = null;

  function paint(pane) {
    const { x, y } = states.get(pane);
    pane.style.transform = `translate(${x}px, ${y}px)`;
  }
  function move(pane, x, y) {
    const state = states.get(pane);
    if (mobile.matches) { state.x = 0; state.y = 0; paint(pane); return; }
    const area = workspace.getBoundingClientRect();
    const box = pane.getBoundingClientRect();
    const originX = box.left - area.left - state.x;
    const originY = box.top - area.top - state.y;
    // Keep the entire window inside the desktop, including its title bar.
    const minX = -originX;
    const minY = -originY;
    state.x = Math.max(minX, Math.min(x, Math.max(minX, area.width - originX - box.width)));
    state.y = Math.max(minY, Math.min(y, Math.max(minY, area.height - originY - box.height)));
    paint(pane);
  }
  function raise(pane) { pane.style.zIndex = String(++layer); }
  function finish(cancel = false) {
    if (!drag) return;
    const current = drag; drag = null;
    if (cancel) move(current.pane, current.startX, current.startY);
    current.pane.classList.remove('is-dragging');
    if (current.handle.hasPointerCapture(current.pointerId)) current.handle.releasePointerCapture(current.pointerId);
  }
  function sync() {
    finish();
    for (const pane of panes) {
      pane.querySelector('[data-window-handle]').tabIndex = mobile.matches ? -1 : 0;
      const { x, y } = states.get(pane); move(pane, x, y);
    }
  }
  for (const pane of panes) {
    const handle = pane.querySelector('[data-window-handle]');
    pane.addEventListener('pointerdown', () => { if (!mobile.matches) raise(pane); });
    handle.addEventListener('pointerdown', event => {
      if (mobile.matches || event.button !== 0 || !event.isPrimary) return;
      event.preventDefault();
      finish();
      const { x, y } = states.get(pane);
      drag = { pane, handle, pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY, startX: x, startY: y };
      handle.setPointerCapture(event.pointerId);
      handle.focus({ preventScroll: true });
      pane.classList.add('is-dragging');
    });
    handle.addEventListener('pointermove', event => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      move(pane, drag.startX + event.clientX - drag.clientX, drag.startY + event.clientY - drag.clientY);
    });
    handle.addEventListener('pointerup', event => { if (drag?.pointerId === event.pointerId) finish(); });
    handle.addEventListener('pointercancel', event => { if (drag?.pointerId === event.pointerId) finish(true); });
    handle.addEventListener('lostpointercapture', event => { if (drag?.handle === handle && drag.pointerId === event.pointerId) finish(); });
    handle.addEventListener('keydown', event => {
      if (mobile.matches) return;
      if (event.key === 'Escape' && drag) { event.preventDefault(); finish(true); return; }
      if (event.key === 'Home') { event.preventDefault(); finish(); move(pane, 0, 0); return; }
      const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault(); raise(pane);
      const step = event.shiftKey ? 40 : 10;
      const { x, y } = states.get(pane);
      move(pane, x + direction[0] * step, y + direction[1] * step);
    });
  }
  document.getElementById('reset-windows').addEventListener('click', () => {
    finish(); panes.forEach(pane => move(pane, 0, 0));
  });
  window.addEventListener('resize', sync);
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => { if (!drag) sync(); });
    observer.observe(workspace); panes.forEach(pane => observer.observe(pane));
  }
  sync();
})();
