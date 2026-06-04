// Author tooling — renders a 1200x630 Open Graph banner into public/og-image.png.
// Uses the locally-installed Microsoft Edge via playwright-core (no browser
// download). Not a product dependency; install it on demand:
//
//   npm install -D playwright-core
//   node scripts/generate-og.mjs
//
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public')
const EDGE =
  process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; flex-direction: column;
    justify-content: center; gap: 28px; padding: 80px;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: radial-gradient(1200px 600px at 80% -10%, #1c2620 0%, #09090b 55%);
    color: #fafafa;
  }
  .brand { display: flex; align-items: center; gap: 16px; }
  .logo { width: 56px; height: 56px; border-radius: 14px; background: #18181b;
    display: flex; align-items: flex-end; gap: 5px; padding: 13px; }
  .bar { width: 7px; border-radius: 3px; }
  .b1 { height: 16px; background: #34d399; }
  .b2 { height: 26px; background: #34d399; }
  .b3 { height: 34px; background: #a1a1aa; }
  .brand span { font-size: 26px; font-weight: 600; letter-spacing: -0.01em; }
  .brand span b { color: #71717a; font-weight: 600; }
  h1 { font-size: 76px; font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
  h1 em { font-style: normal; color: #34d399; }
  p { font-size: 30px; color: #a1a1aa; max-width: 880px; line-height: 1.35; }
  .tags { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
  .tag { font-size: 20px; color: #d4d4d8; background: #18181b;
    border: 1px solid #27272a; padding: 8px 16px; border-radius: 999px; }
</style></head><body>
  <div class="brand">
    <div class="logo"><div class="bar b1"></div><div class="bar b2"></div><div class="bar b3"></div></div>
    <span>skeeleton<b>-base</b></span>
  </div>
  <h1>Production-ready<br>React <em>admin dashboard</em></h1>
  <p>Auth, dark mode, i18n, analytics charts and a clean feature-based architecture — out of the box.</p>
  <div class="tags">
    <div class="tag">React 18</div><div class="tag">Vite</div><div class="tag">TypeScript</div>
    <div class="tag">Tailwind CSS</div><div class="tag">TanStack Query</div><div class="tag">Recharts</div>
  </div>
</body></html>`

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EDGE, headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: join(OUT, 'og-image.png') })
await browser.close()
console.log(`✓ ${join(OUT, 'og-image.png')}`)
