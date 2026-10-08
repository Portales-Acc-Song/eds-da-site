/**
 * JAECOO Lead Form block.
 *
 * Authored columns (in DA) — all rows are optional with sensible defaults:
 *   Row 1: eyebrow text          (default: "Da el paso")
 *   Row 2: heading text          (default: "Solicita tu oferta")
 *   Row 3: intro text            (default: "Un concesionario oficial de tu zona preparará tu oferta.")
 *   Row 4: WhatsApp number       (default: "34600000000")
 *   Row 5: Privacy policy URL    (default: "https://www.omodajaecoo.es/politicas-de-privacidad-web")
 *   Row 6: Submit button label   (default: "Solicitar oferta")
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cell = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';

  const eyebrow = cell(rows[0]) || 'Da el paso';
  const heading = cell(rows[1]) || 'Solicita tu oferta';
  const intro = cell(rows[2]) || 'Un concesionario oficial de tu zona preparará tu oferta. Sin compromiso.';
  const waNumber = cell(rows[3]) || '34600000000';
  const privacyUrl = cell(rows[4]) || 'https://www.omodajaecoo.es/politicas-de-privacidad-web';
  const submitLabel = cell(rows[5]) || 'Solicitar oferta';

  block.innerHTML = `
    <div class="jlf-wrap">
      <p class="jlf-eyebrow">${eyebrow}</p>
      <h2 class="jlf-heading">${heading}</h2>
      <p class="jlf-intro">${intro}</p>

      <form class="jlf-form" id="jaecooLeadForm" novalidate>
        <input type="hidden" name="intencion" class="jlf-intencion" value="oferta">

        <div class="jlf-field">
          <label>¿Compras como particular o para tu empresa?*</label>
          <div class="jlf-radio-group">
            <label class="jlf-radio"><input type="radio" name="tipo" value="particular" checked> Particular</label>
            <label class="jlf-radio"><input type="radio" name="tipo" value="empresa"> Empresa</label>
          </div>
        </div>

        <div class="jlf-field">
          <label>¿Qué motorización te interesa?*</label>
          <div class="jlf-radio-group">
            <label class="jlf-radio"><input type="radio" name="motorizacion" value="enchufable" checked> Híbrido enchufable (SHS-P)</label>
            <label class="jlf-radio"><input type="radio" name="motorizacion" value="convencional"> Híbrido convencional (SHS-H)</label>
          </div>
        </div>

        <div class="jlf-field-row">
          <div class="jlf-field">
            <label for="jlf-nombre">Nombre*</label>
            <input id="jlf-nombre" name="nombre" type="text" placeholder="Nombre" autocomplete="given-name" autocapitalize="words">
            <small class="jlf-err" data-for="jlf-nombre"></small>
          </div>
          <div class="jlf-field">
            <label for="jlf-apellido">Apellidos*</label>
            <input id="jlf-apellido" name="apellido" type="text" placeholder="Apellidos" autocomplete="family-name" autocapitalize="words">
            <small class="jlf-err" data-for="jlf-apellido"></small>
          </div>
        </div>

        <div class="jlf-field">
          <label for="jlf-tel">Teléfono*</label>
          <div class="jlf-tel-row">
            <select id="jlf-prefijo" name="prefijo" aria-label="Prefijo">
              <option value="+34" selected>ES +34</option>
              <option value="+351">PT +351</option>
              <option value="+33">FR +33</option>
              <option value="+44">UK +44</option>
            </select>
            <input id="jlf-tel" name="tel" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="600 000 000">
          </div>
          <small class="jlf-err" data-for="jlf-tel"></small>
        </div>

        <div class="jlf-field">
          <label for="jlf-email">Email*</label>
          <input id="jlf-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="nombre@email.com">
          <small class="jlf-err" data-for="jlf-email"></small>
        </div>

        <div class="jlf-field">
          <label for="jlf-cp">Código postal*</label>
          <input id="jlf-cp" name="cp" inputmode="numeric" maxlength="5" placeholder="28001" autocomplete="postal-code">
          <small class="jlf-hint">Escribe tu código postal para asignarte el concesionario más cercano.</small>
          <small class="jlf-err" data-for="jlf-cp"></small>
        </div>

        <div class="jlf-consent">
          <label class="jlf-check">
            <input type="checkbox" id="jlf-privacy" name="privacidad">
            <span>He leído y acepto la <a href="${privacyUrl}" target="_blank" rel="noopener">política de privacidad</a>*</span>
          </label>
          <small class="jlf-err" data-for="jlf-privacy"></small>
          <label class="jlf-check">
            <input type="checkbox" id="jlf-comms" name="comunicaciones">
            <span>Deseo recibir comunicaciones comerciales</span>
          </label>
        </div>

        <p class="jlf-trust">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Te contactaremos en menos de 24 h · Sin compromiso.
        </p>

        <button class="jlf-submit" type="submit" data-goal="lead_submit">${submitLabel}</button>

        <p class="jlf-legal">Tus datos se compartirán con el concesionario asignado. Consulta la <a href="${privacyUrl}" target="_blank" rel="noopener">política de privacidad</a>.</p>
      </form>

      <div class="jlf-success" hidden>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
        <h3>Solicitud recibida</h3>
        <p class="jlf-ok-text">El siguiente paso es una breve conversación donde te daremos más detalles y resolveremos cualquier duda.</p>
        <a class="jlf-wa-btn" href="https://wa.me/${waNumber}" target="_blank" rel="noopener" data-goal="whatsapp_click">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.29-.15-1.71-.84-1.97-.94-.26-.1-.46-.15-.65.15-.19.29-.75.94-.92 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.51.07-.77.36-.26.29-1.01.99-1.01 2.41 0 1.42 1.03 2.79 1.18 2.98.15.19 2.04 3.11 4.94 4.36.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c-.01 5.18-4.22 9.4-9.4 9.4zm8-17.4A11.3 11.3 0 0 0 12.03 1C5.8 1 .74 6.06.73 12.28c0 1.97.52 3.9 1.5 5.6L.63 23.5l5.75-1.51a11.24 11.24 0 0 0 5.65 1.44h.01c6.23 0 11.29-5.06 11.3-11.28a11.2 11.2 0 0 0-3.3-7.99z"/></svg>
          Continuar por WhatsApp
        </a>
      </div>
    </div>
  `;

  // Update intent hidden field when actionbar CTAs are clicked
  document.querySelectorAll('[data-intent]').forEach((el) => {
    el.addEventListener('click', () => {
      const intent = el.dataset.intent;
      block.querySelector('.jlf-intencion').value = intent;
      const heading2 = block.querySelector('.jlf-heading');
      if (heading2) heading2.textContent = intent === 'prueba' ? 'Solicita una prueba' : 'Solicita tu oferta';
      const btn = block.querySelector('.jlf-submit');
      if (btn) btn.textContent = intent === 'prueba' ? 'Reservar prueba' : submitLabel;
    });
  });

  // Validation helpers
  const validators = {
    'jlf-nombre': (v) => v.trim().length >= 2,
    'jlf-apellido': (v) => v.trim().length >= 2,
    'jlf-tel': (v) => /^[6-9]\d{8}$/.test(v.replace(/\s/g, '')),
    'jlf-email': (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    'jlf-cp': (v) => /^\d{5}$/.test(v.trim()),
  };

  const messages = {
    'jlf-nombre': 'Introduce tu nombre.',
    'jlf-apellido': 'Introduce tus apellidos.',
    'jlf-tel': 'Introduce un teléfono válido (9 dígitos).',
    'jlf-email': 'Introduce un email válido.',
    'jlf-cp': 'Introduce un código postal de 5 dígitos.',
  };

  const setErr = (id, msg) => {
    const el = block.querySelector(`.jlf-err[data-for="${id}"]`);
    const input = block.querySelector(`#${id}`);
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle('jlf-err--show', !!msg);
    if (input) input.classList.toggle('jlf-input--invalid', !!msg);
  };

  const validateField = (id) => {
    const input = block.querySelector(`#${id}`);
    if (!input) return true;
    const ok = validators[id]?.(input.value) ?? true;
    setErr(id, ok ? '' : messages[id]);
    return ok;
  };

  // Inline validation on blur
  Object.keys(validators).forEach((id) => {
    const el = block.querySelector(`#${id}`);
    if (el) el.addEventListener('blur', () => validateField(id));
  });

  // Form submit
  block.querySelector('.jlf-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let ok = Object.keys(validators).every((id) => validateField(id));

    const privacy = block.querySelector('#jlf-privacy');
    if (!privacy.checked) {
      setErr('jlf-privacy', 'Debes aceptar la política de privacidad.');
      ok = false;
    } else {
      setErr('jlf-privacy', '');
    }

    if (!ok) {
      block.querySelector('.jlf-input--invalid')?.focus();
      return;
    }

    const btn = block.querySelector('.jlf-submit');
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    const intent = block.querySelector('.jlf-intencion').value;
    if (window.dataLayer) window.dataLayer.push({ event: 'lead_submit', intencion: intent });

    // Simulate async submit — replace with real endpoint
    setTimeout(() => {
      block.querySelector('.jlf-form').hidden = true;
      const success = block.querySelector('.jlf-success');
      const okText = success.querySelector('.jlf-ok-text');
      if (intent === 'prueba') okText.textContent = 'El siguiente paso, para reservar tu prueba del JAECOO 7, es una breve conversación por WhatsApp.';
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
  });
}
