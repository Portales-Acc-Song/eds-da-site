/**
 * JAECOO Savings Calculator block — interactive PHEV savings estimator.
 *
 * DA rows (all optional — sensible defaults baked in):
 *   Row 1: eyebrow text
 *   Row 2: heading
 *   Row 3: intro / subtitle text
 *   Row 4: fuel price per litre in € (default "1.75")
 *   Row 5: electricity price per kWh in € (default "0.18")
 *   Row 6: CTA label | CTA href
 *
 * Calculation model:
 *   Reference ICE:       7.5 L/100km at authored fuel price
 *   JAECOO SHS-P:        17 kWh/100km (electric) + 6.5 L/100km (hybrid fallback)
 *   User-controlled sliders:
 *     km/month   (500 – 3 000, step 100, default 1 500)
 *     % charged  (0 – 100 %, step 10, default 60) = proportion driven in EV mode
 */
export default function decorate(block) {
  const rows = [...block.children];
  const text = (row) => row?.querySelector(':scope > div')?.textContent?.trim() || '';
  const cells = (row) => [...(row?.children || [])].map((c) => c.innerHTML.trim());

  const eyebrow = text(rows[0]);
  const heading = text(rows[1]) || 'Cuánto puedes ahorrar';
  const intro = text(rows[2]) || 'Ajusta tus hábitos y calcula el ahorro real frente a un vehículo de gasolina equivalente.';
  const fuelPrice = parseFloat(text(rows[3])) || 1.75;
  const elecPrice = parseFloat(text(rows[4])) || 0.18;
  const [ctaLabel = 'Solicitar mi oferta', ctaHref = '#contacto'] = cells(rows[5]);

  block.innerHTML = `
    <div class="jsc-wrap">
      <div class="jsc-header">
        ${eyebrow ? `<p class="jsc-eyebrow">${eyebrow}</p>` : ''}
        <h2 class="jsc-heading">${heading}</h2>
        <p class="jsc-intro">${intro}</p>
      </div>

      <div class="jsc-body">
        <div class="jsc-sliders">
          <div class="jsc-field">
            <label for="jsc-km" class="jsc-label">
              Kilómetros al mes
              <span class="jsc-val" id="jsc-km-val">1.500 km</span>
            </label>
            <input type="range" id="jsc-km" class="jsc-range" min="500" max="3000" step="100" value="1500" aria-valuetext="1.500 km">
            <div class="jsc-range-marks">
              <span>500 km</span><span>3.000 km</span>
            </div>
          </div>

          <div class="jsc-field">
            <label for="jsc-pct" class="jsc-label">
              Tiempo que cargas en casa
              <span class="jsc-val" id="jsc-pct-val">60%</span>
            </label>
            <input type="range" id="jsc-pct" class="jsc-range" min="0" max="100" step="10" value="60" aria-valuetext="60%">
            <div class="jsc-range-marks">
              <span>0%</span><span>100%</span>
            </div>
          </div>
        </div>

        <div class="jsc-results">
          <div class="jsc-result jsc-result--main">
            <span class="jsc-result-val" id="jsc-annual"></span>
            <span class="jsc-result-label">ahorro anual estimado</span>
          </div>
          <div class="jsc-result">
            <span class="jsc-result-val" id="jsc-5yr"></span>
            <span class="jsc-result-label">ahorro en 5 años</span>
          </div>
          <div class="jsc-result">
            <span class="jsc-result-val" id="jsc-co2"></span>
            <span class="jsc-result-label">kg CO₂ menos/año</span>
          </div>
        </div>

        <p class="jsc-disclaimer">Estimación orientativa basada en precios medios. Carburante: ${fuelPrice.toFixed(2)} €/L · Electricidad: ${elecPrice.toFixed(2)} €/kWh.</p>
        <a class="jsc-cta jaecoo-btn jaecoo-btn-fill" href="${ctaHref}" data-goal="savings_cta">${ctaLabel}</a>
      </div>
    </div>
  `;

  const kmSlider = block.querySelector('#jsc-km');
  const pctSlider = block.querySelector('#jsc-pct');
  const kmVal = block.querySelector('#jsc-km-val');
  const pctVal = block.querySelector('#jsc-pct-val');
  const annualEl = block.querySelector('#jsc-annual');
  const yr5El = block.querySelector('#jsc-5yr');
  const co2El = block.querySelector('#jsc-co2');

  const ICE_L100 = 7.5;
  const EV_KWH100 = 17;
  const HYB_L100 = 6.5;
  const ICE_CO2_PER_L = 2.31;
  const GRID_CO2_PER_KWH = 0.18;

  const fmt = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(n);

  function calculate() {
    const km = parseInt(kmSlider.value, 10);
    const pct = parseInt(pctSlider.value, 10) / 100;

    kmVal.textContent = `${fmt(km)} km`;
    pctVal.textContent = `${pctSlider.value}%`;
    kmSlider.setAttribute('aria-valuetext', `${fmt(km)} km`);
    pctSlider.setAttribute('aria-valuetext', `${pctSlider.value}%`);

    const kmYear = km * 12;
    const costICE = kmYear * ICE_L100 / 100 * fuelPrice;
    const costEV = pct * kmYear * EV_KWH100 / 100 * elecPrice;
    const costHyb = (1 - pct) * kmYear * HYB_L100 / 100 * fuelPrice;
    const costSHSP = costEV + costHyb;
    const annual = Math.max(0, costICE - costSHSP);

    const co2ICE = kmYear * ICE_L100 / 100 * ICE_CO2_PER_L;
    const co2EV = pct * kmYear * EV_KWH100 / 100 * GRID_CO2_PER_KWH;
    const co2Hyb = (1 - pct) * kmYear * HYB_L100 / 100 * ICE_CO2_PER_L;
    const co2Saved = Math.max(0, co2ICE - co2EV - co2Hyb);

    annualEl.textContent = `${fmt(annual)} €`;
    yr5El.textContent = `${fmt(annual * 5)} €`;
    co2El.textContent = `${fmt(co2Saved)} kg`;
  }

  kmSlider.addEventListener('input', calculate);
  pctSlider.addEventListener('input', calculate);
  calculate();
}
