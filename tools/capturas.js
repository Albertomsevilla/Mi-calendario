// Genera las capturas de img/ con datos de ejemplo.
// Uso: npm i playwright && npx playwright install chromium && node tools/capturas.js
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const raiz = path.join(__dirname, '..');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.clock.setFixedTime(new Date('2026-10-30T13:28:00'));
  await page.addInitScript({ path: path.join(__dirname, 'datos-demo.js') });
  await page.goto('file://' + path.join(raiz, 'mi-calendario.html'));
  await page.waitForTimeout(3000);
  const img = (n) => path.join(raiz, 'img', n);

  await page.screenshot({ path: img('vista-mes.png') });

  await page.click('[data-v="today"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: img('mi-dia.png') });

  await page.click('[data-v="month"]');
  await page.click('#next');
  await page.click('#next');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: img('festivos-vacaciones.png') });

  await page.click('#today');
  await page.waitForTimeout(1000);
  const pregunta = '¿Qué tengo la semana que viene y cuándo puedo estudiar?';
  await page.fill('#askQ', pregunta);
  await page.click('#askGo');
  await page.waitForTimeout(1000);
  await page.fill('#askQ', pregunta);
  const aside = await page.locator('aside').boundingBox();
  const main = await page.locator('main').boundingBox();
  await page.screenshot({
    path: img('asistente.png'),
    clip: { x: aside.x - 20, y: main.y - 20, width: aside.width + 40, height: Math.min(900, aside.height + 40) },
  });

  await browser.close();
})();
