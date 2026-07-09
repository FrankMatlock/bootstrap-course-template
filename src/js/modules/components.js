import { Tooltip, Popover, Toast, Modal } from 'bootstrap';

export function initTooltipsPopovers() {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el =>
    new Tooltip(el, { trigger: 'hover focus', delay: { show: 200, hide: 100 } })
  );
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el =>
    new Popover(el, { trigger: 'focus' })
  );
}

export function initToastDemo() {
  const demoBtn = document.getElementById('toastDemoBtn');
  const toastEl = document.getElementById('demoToast');
  if (demoBtn && toastEl) {
    const toast = new Toast(toastEl, { delay: 4000 });
    demoBtn.addEventListener('click', () => toast.show());
  }
  window.addEventListener('course:toast', (e) => showGlobalToast(e.detail?.message ?? 'Done!'));
}

export function showGlobalToast(message) {
  let container = document.querySelector('.toast-container.position-fixed');
  if (!container) {
    container = Object.assign(document.createElement('div'), {
      className: 'toast-container position-fixed bottom-0 end-0 p-3'
    });
    document.body.appendChild(container);
  }
  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-bg-success border-0';
  toastEl.setAttribute('role', 'status');
  toastEl.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto"
      data-bs-dismiss="toast" aria-label="Close"></button></div>`;
  container.appendChild(toastEl);
  const toast = new Toast(toastEl, { delay: 5000 });
  toast.show();
  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

export function openModalProgrammatically(targetId = 'enrollModal') {
  Modal.getOrCreateInstance(document.getElementById(targetId))?.show();
}

window.CourseDemo = { openModal: openModalProgrammatically, showToast: showGlobalToast, Toast, Modal };
