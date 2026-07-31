// Generates the OG share images in public/og/ - run `node scripts/gen-og.mjs`.
// Renders one 1200x630 card per route with headless Chrome. When routes or
// page copy change, update the `cards` list below and rerun. Blog cards are
// derived from content/posts frontmatter - rerun after adding a post.
import { execFileSync } from 'node:child_process'
import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const repoRoot = new URL('..', import.meta.url).pathname
const chrome =
  process.env.CHROME ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const gemsSource = readFileSync(join(repoRoot, 'src/components/gems.tsx'), 'utf8')
const objSource = gemsSource.slice(
  gemsSource.indexOf('const gems = {') + 'const gems ='.length,
  gemsSource.indexOf('\n}\n') + 2,
)
// eslint-disable-next-line no-eval
const gems = eval(`(${objSource})`)

function gemSvg(name, size) {
  const gem = gems[name]
  const polys = gem.polys
    .map(
      (p) =>
        `<polygon points="${p.points}" fill="${p.fill}" fill-opacity="${p.fillOpacity}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" stroke-linejoin="round"/>`,
    )
    .join('')
  return `<svg viewBox="${gem.viewBox}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${polys}</svg>`
}

// Products with their own logo render it instead of a gem. The markup is
// lifted from the component so the card cannot drift from the site.
const productLogos = { stet: 'src/components/products/stet.tsx' }

function productLogoSvg(name, width) {
  const source = readFileSync(join(repoRoot, productLogos[name]), 'utf8')
  const svg = source
    .slice(source.indexOf('<svg'), source.indexOf('</svg>') + 6)
    .replace('className={className}', '')
  const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/)
  return svg.replace(
    '<svg',
    `<svg width="${width}" height="${Math.round((width * h) / w)}"`,
  )
}

const logo = `<svg viewBox="0 0 16 16" width="44" height="44" xmlns="http://www.w3.org/2000/svg"><path fill="#0a0a0a" d="M0 0h8v8H0zM0 8h16v8H0z"/><path fill="#dc2626" d="M8 0h8v8H8z"/></svg>`

// One card per route. `name` is the file in public/og/ and must match the
// slug seo() derives from the route path ('/' -> 'home', '/' -> '-').
const cards = [
  { name: 'home', eyebrow: 'No bullshit. Just results.', title: 'Weeks, not quarters.', path: 'jxd.dev' },
  { name: 'work', eyebrow: 'Work', title: 'Proof, not promises.', path: '/work' },
  { name: 'work-auvia', eyebrow: 'Work / Build', title: 'A working bot to a live product in one week', path: '/work/auvia', size: 'md' },
  { name: 'how-we-work', eyebrow: 'Process', title: 'Rigour, visible weekly.', path: '/how-we-work' },
  { name: 'products', eyebrow: 'Products', title: 'The tooling behind our speed.', path: '/products' },
  { name: 'products-onyx', eyebrow: 'Products / Full-stack template', title: 'Onyx', path: '/products/onyx', gem: 'onyx' },
  { name: 'products-quartz', eyebrow: 'Products / Product management suite', title: 'Quartz', path: '/products/quartz', gem: 'quartz' },
  { name: 'products-garnet', eyebrow: 'Products / Data compliance framework', title: 'Garnet', path: '/products/garnet', gem: 'garnet' },
  { name: 'products-sapphire', eyebrow: 'Products / AI simulation engine', title: 'Sapphire', path: '/products/sapphire', gem: 'sapphire' },
  { name: 'products-amber', eyebrow: 'Products / REST client and test suite', title: 'Amber', path: '/products/amber', gem: 'amber' },
  { name: 'products-stet', eyebrow: 'Products / Open-source CMS', title: 'Stet', path: '/products/stet', logo: 'stet' },
  { name: 'about', eyebrow: 'About', title: 'Small. On purpose.', path: '/about' },
  { name: 'contact', eyebrow: 'Contact', title: 'Start with a conversation.', path: '/contact' },
  { name: 'privacy', eyebrow: 'Legal', title: 'Privacy policy.', path: '/privacy' },
  { name: 'cookies', eyebrow: 'Legal', title: 'Cookie policy.', path: '/cookies' },
  { name: 'blog', eyebrow: 'Blog', title: 'Notes from the workshop.', path: '/blog' },
]

// One card per post, named blog-<slug> to match what seo() derives from the
// route path. Titles come from frontmatter, so escape them for the template.
const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const postsDir = join(repoRoot, 'content/posts')
for (const file of readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '')
  const frontmatter = readFileSync(join(postsDir, file), 'utf8').match(
    /^---\n([\s\S]*?)\n---/,
  )[1]
  const field = (key) => {
    const match = frontmatter.match(new RegExp(`^${key}: *(.+)$`, 'm'))
    if (!match) throw new Error(`${file}: missing frontmatter field "${key}"`)
    return match[1].trim().replace(/^"(.*)"$/, '$1')
  }
  const title = field('title')
  cards.push({
    name: `blog-${slug}`,
    eyebrow: `Blog / ${escapeHtml(field('lane'))}`,
    title: escapeHtml(title),
    path: `/blog/${slug}`,
    size: title.length > 70 ? 'sm' : 'md',
  })
}

function html(card) {
  const titleSize =
    card.size === 'sm' ? '64px' : card.size === 'md' ? '76px' : '96px'
  const mark = card.gem
    ? gemSvg(card.gem, 320)
    : card.logo
      ? productLogoSvg(card.logo, 320)
      : ''
  const aside = mark
    ? `<div style="position:absolute; right:72px; top:50%; transform:translateY(-50%);">${mark}</div>`
    : ''
  const titleMax = mark ? '620px' : '860px'
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Mona+Sans:wdth,wght@75..125,200..900&display=block">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background: #fff;
    color: #0a0a0a;
    background-image:
      linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px);
    background-size: 64px 64px;
    font-family: 'Mona Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 64px 72px;
  }
  .brand { display: flex; align-items: center; gap: 18px; font-size: 34px; font-weight: 600; font-variation-settings: 'wdth' 125; }
  .middle { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .eyebrow { font-family: 'Geist Mono', monospace; font-size: 26px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: #dc2626; }
  .title { margin-top: 28px; font-size: ${titleSize}; font-weight: 600; font-variation-settings: 'wdth' 125; letter-spacing: -0.025em; line-height: 1.05; max-width: ${titleMax}; text-wrap: balance; }
  .footer { display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid rgb(10 10 10 / 0.1); padding-top: 28px; font-family: 'Geist Mono', monospace; font-size: 24px; text-transform: uppercase; letter-spacing: 0.05em; color: #737373; }
</style>
</head>
<body>
  <div class="brand">${logo} JXD</div>
  <div class="middle">
    <p class="eyebrow">${card.eyebrow}</p>
    <h1 class="title">${card.title}</h1>
  </div>
  ${aside}
  <div class="footer"><span>jxd.dev</span><span>${card.path === 'jxd.dev' ? 'London' : card.path}</span></div>
</body>
</html>`
}

const workDir = join(tmpdir(), `jxd-og-${process.pid}`)
const outDir = join(repoRoot, 'public/og')
mkdirSync(workDir, { recursive: true })
mkdirSync(outDir, { recursive: true })

for (const card of cards) {
  const page = join(workDir, `${card.name}.html`)
  const png = join(outDir, `${card.name}.png`)
  writeFileSync(page, html(card))
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1200,630',
    // Lets remote fonts finish loading before the capture.
    '--virtual-time-budget=8000',
    `--screenshot=${png}`,
    `file://${page}`,
  ])
  console.log(`public/og/${card.name}.png`)
}

// Fallback image for routes without their own card (see seo()).
copyFileSync(join(outDir, 'home.png'), join(outDir, 'default.png'))
console.log('public/og/default.png')
