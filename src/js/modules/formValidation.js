import { Modal } from 'bootstrap';

function setLoadingState(btn) {
  btn.dataset.loading = 'true'; btn.disabled = true;
  btn.querySelector('.spinner-border')?.classList.remove('d-none');
}
function clearLoadingState(btn) {
  btn.dataset.loading = 'false'; btn.disabled = false;
  btn.querySelector('.spinner-border')?.classList.add('d-none');
}
function toggleAlert(id, show) {
  document.getElementById(id)?.classList.toggle('d-none', !show);
}

async function submitFormData(data) {
  if (data.get('website')) return { ok: false, reason: 'spam' };
  await new Promise(r => setTimeout(r, 1200));
  // Replace with: return fetch('/api/contact', { method: 'POST', body: data });
  return { ok: true };
}

function initEnrollForm() {
  const form   = document.getElementById('enrollForm');
  const submit = document.getElementById('enrollSubmitBtn');
  if (!form || !submit) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    setLoadingState(submit);
    const result = await submitFormData(new FormData(form));
    clearLoadingState(submit);
    if (result.ok) {
      Modal.getInstance(document.getElementById('enrollModal'))?.hide();
      form.reset(); form.classList.remove('was-validated');
      window.dispatchEvent(new CustomEvent('course:toast', {
        detail: { message: '🎉 Enrolled! Check your email for the syllabus.' }
      }));
    }
  });
}

function initContactForm() {
  const form   = document.getElementById('contactForm');
  const submit = document.getElementById('contactSubmit');
  if (!form || !submit) return;

  const msg = form.querySelector('#contactMessage');
  msg?.addEventListener('input', () => {
    msg.setCustomValidity(msg.validity.tooShort
      ? `Please write at least 20 characters (${msg.value.length} so far).` : '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); form.classList.add('was-validated');
    toggleAlert('formError', false); toggleAlert('formSuccess', false);
    if (!form.checkValidity()) {
      toggleAlert('formError', true);
      form.querySelector(':invalid')?.focus(); return;
    }
    setLoadingState(submit);
    const result = await submitFormData(new FormData(form));
    clearLoadingState(submit);
    if (result.ok || result.reason === 'spam') {
      toggleAlert('formSuccess', true);
      form.reset(); form.classList.remove('was-validated');
      document.getElementById('formSuccess')?.focus();
    } else { toggleAlert('formError', true); }
  });
}

export function initFormValidation() {
  initEnrollForm();
  initContactForm();
}
