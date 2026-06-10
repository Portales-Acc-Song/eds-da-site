import openModal from './modal.js';

// Callback widget (we3.phone / llamamegratis) opened in a modal.
// Links authored with href="#callback" trigger it. Loaded in the delayed phase
// because it is a non-critical, third-party integration.
const CALLBACK_URL = 'https://llamamegratis.es/unir/webphone-v4.html';

document.querySelectorAll('a[href$="#callback"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(`${CALLBACK_URL}#${window.location.href}`, '¿Te llamamos?');
  });
});
