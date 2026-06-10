/**
 * Opens a URL inside a lightweight, accessible modal (iframe).
 * Closes on the × button, on backdrop click, and on Escape.
 * @param {string} url URL to load in the modal iframe
 * @param {string} [label] Accessible label for the dialog
 * @returns {HTMLElement} the modal element
 */
export default function openModal(url, label = '') {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  if (label) modal.setAttribute('aria-label', label);
  modal.innerHTML = `
    <div class="modal-inner">
      <button class="modal-close" type="button" aria-label="Cerrar">&times;</button>
      <iframe src="${url}" title="${label}"></iframe>
    </div>`;

  const controller = new AbortController();
  const { signal } = controller;
  const close = () => {
    controller.abort();
    modal.remove();
  };

  modal.querySelector('.modal-close').addEventListener('click', close, { signal });
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); }, { signal });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { signal });

  document.body.append(modal);
  modal.querySelector('.modal-close').focus();
  return modal;
}
