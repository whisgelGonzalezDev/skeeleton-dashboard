// Author tooling — captures marketing screenshots into docs/.
// Drives the locally-installed Microsoft Edge via playwright-core (no browser
// download). Not a product dependency; install it on demand:
//
//   npm install -D playwright-core
//   npm run dev                          # in one terminal
//   node scripts/capture-screenshots.mjs # in another
//
// Override defaults with EDGE_PATH and BASE_URL env vars if needed.
//
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs')
const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const EDGE =
  process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

const SESSION = JSON.stringify({
  id: '1',
  name: 'Admin User',
  email: 'admin@skeeleton.dev',
  role: 'admin',
})

const SHOTS = [
  { route: '/auth/login', auth: false, name: 'login' },
  { route: '/sales', auth: true, name: 'sales' },
  { route: '/analytics', auth: true, name: 'analytics' },
  { route: '/users', auth: true, name: 'users' },
]

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EDGE, headless: true })

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: theme,
  })

  for (const shot of SHOTS) {
    await context.addInitScript(
      ([theme, session, withAuth]) => {
        localStorage.setItem('skeeleton_theme', theme)
        if (withAuth) localStorage.setItem('skeeleton_session', session)
        else localStorage.removeItem('skeeleton_session')
      },
      [theme, SESSION, shot.auth],
    )

    const page = await context.newPage()
    await page.goto(`${BASE}${shot.route}`, { waitUntil: 'networkidle' })
    // Let the mock API latency (simulateApiDelay), lazy chunks and chart
    // mount animations resolve before the shot.
    await page.waitForTimeout(3500)

    const file = join(OUT, `${shot.name}-${theme}.png`)
    await page.screenshot({ path: file })
    console.log(`✓ ${file}`)
    await page.close()
  }

  await context.close()
}

await browser.close()
console.log('Done.')
