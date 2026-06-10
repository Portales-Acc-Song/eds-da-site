/**
 * Opens content inside a lightweight, accessible modal.
 * Closes on the × button, on backdrop click, and on Escape.
 * @param {string|Node} content A URL (loaded in an iframe) or a DOM node to embed
 * @param {object} [opts]
 * @param {string} [opts.label] Accessible label for the dialog
 * @param {string} [opts.className] Extra class on the modal (e.g. "modal-video")
 * @returns {HTMLElement} the modal element
 */
export default function openModal(content, { label = '', className = '' } = {}) {
  const modal = document.createElement('div');
  modal.className = ['modal', className].filter(Boolean).join(' ');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  if (label) modal.setAttribute('aria-label', label);

  const inner = document.createElement('div');
  inner.className = 'modal-inner';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'modal-close';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.innerHTML = '&times;';
  inner.append(closeBtn);

  if (typeof content === 'string') {
    const iframe = document.createElement('iframe');
    iframe.src = content;
    iframe.title = label;
    inner.append(iframe);
  } else {
    inner.append(content);
  }
  modal.append(inner);

  const controller = new AbortController();
  const { signal } = controller;
  const close = () => {
    controller.abort();
    modal.remove();
  };

  closeBtn.addEventListener('click', close, { signal });
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); }, { signal });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { signal });

  document.body.append(modal);
  closeBtn.focus();
  return modal;
}
