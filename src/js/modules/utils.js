export function setFooterYear() {
  document.querySelectorAll('#footerYear').forEach(el => el.textContent = new Date().getFullYear());
}

export function debounce(fn, delay = 250) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

export function throttle(fn, interval = 200) {
  let lastCall = 0;
  return (...args) => { const now = Date.now(); if (now - lastCall >= interval) { lastCall = now; fn(...args); } };
}

export function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0], last = focusable[focusable.length - 1];
  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
  }
  container.addEventListener('keydown', handler);
  first?.focus();
  return () => container.removeEventListener('keydown', handler);
}

export function announceToScreenReader(message, priority = 'polite') {
  const id = `sr-announcer-${priority}`;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id; el.setAttribute('aria-live', priority); el.setAttribute('aria-atomic', 'true');
    el.className = 'visually-hidden'; document.body.appendChild(el);
  }
  el.textContent = '';
  requestAnimationFrame(() => { el.textContent = message; });
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function lazyImport(eventNames, importFn, target = document) {
  let loaded = false;
  const load = async () => {
    if (loaded) return; loaded = true; await importFn();
    eventNames.forEach(ev => target.removeEventListener(ev, load));
  };
  eventNames.forEach(ev => target.addEventListener(ev, load, { passive: true }));
}
