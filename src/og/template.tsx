import { defineOgTemplate, type OgTemplateFont } from '@jxdltd/tanstack/og'
import GeistRegular from './fonts/Geist-Regular.ttf?inline'
import GeistMedium from './fonts/Geist-Medium.ttf?inline'
import GeistBlack from './fonts/Geist-Black.ttf?inline'
import GeistMonoRegular from './fonts/GeistMono-Regular.ttf?inline'

declare module '@jxdltd/tanstack/og' {
  interface OgData {
    readingTime?: string
  }
}

const decode = (dataUrl: string) => Buffer.from(dataUrl.split(',')[1], 'base64')

const fonts: OgTemplateFont[] = [
  { name: 'Geist', data: decode(GeistRegular), weight: 400, style: 'normal' },
  { name: 'Geist', data: decode(GeistMedium), weight: 500, style: 'normal' },
  { name: 'Geist', data: decode(GeistBlack), weight: 900, style: 'normal' },
  { name: 'Geist Mono', data: decode(GeistMonoRegular), weight: 400, style: 'normal' },
]

const INK = '#18181b'
const CANVAS = '#ffffff'
const MUTE = '#71717a'
const HAIR = '#a1a1aa'
const PAD = 80

function titleSize(text: string): number {
  if (text.length > 80) return 60
  if (text.length > 60) return 72
  if (text.length > 40) return 84
  return 96
}

function formatDate(iso: string | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase()
}

export default defineOgTemplate({
  width: 1200,
  height: 630,
  fonts,
  render: ({ data }) => {
    const isArticle = data.type === 'article'
    const shoulder = isArticle
      ? data.tag && data.tag.toLowerCase() !== 'post'
        ? `// ${data.tag.toLowerCase()}`
        : '// writing'
      : ''
    const date = formatDate(data.date)

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: CANVAS,
          display: 'flex',
          flexDirection: 'column',
          padding: PAD,
          fontFamily: 'Geist',
          color: INK,
        }}
      >
        <div style={{ display: 'flex', fontFamily: 'Geist Mono', fontSize: 20, color: HAIR }}>
          jxd.dev
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          {shoulder ? (
            <div style={{ display: 'flex', fontFamily: 'Geist Mono', fontSize: 20, color: HAIR }}>
              {shoulder}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}

          <div
            style={{
              display: 'flex',
              marginTop: shoulder ? 16 : 0,
              fontSize: titleSize(data.title),
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: INK,
              maxWidth: 1040,
            }}
          >
            {data.title}
          </div>

          {isArticle ? (
            <div
              style={{
                display: 'flex',
                marginTop: 32,
                fontFamily: 'Geist Mono',
                fontSize: 20,
                color: MUTE,
                gap: 14,
              }}
            >
              {data.author ? <span style={{ display: 'flex' }}>{data.author}</span> : null}
              {data.author && date ? (
                <span style={{ display: 'flex', color: HAIR }}>·</span>
              ) : null}
              {date ? <span style={{ display: 'flex' }}>{date}</span> : null}
              {data.readingTime ? (
                <>
                  <span style={{ display: 'flex', color: HAIR }}>·</span>
                  <span style={{ display: 'flex' }}>{data.readingTime}</span>
                </>
              ) : null}
            </div>
          ) : data.description ? (
            <div style={{ display: 'flex', marginTop: 32, fontSize: 22, color: MUTE, maxWidth: 940 }}>
              {data.description}
            </div>
          ) : null}
        </div>
      </div>
    )
  },
})
