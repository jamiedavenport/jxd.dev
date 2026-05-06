const INK = '#18181b' // zinc-900
const CANVAS = '#ffffff'
const MUTE = '#71717a' // zinc-500
const HAIR = '#a1a1aa' // zinc-400
const PAD = 80

function Frame({ children }: { children: React.ReactNode }) {
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
      {children}
    </div>
  )
}

function Wordmark() {
  return (
    <div
      style={{
        display: 'flex',
        fontFamily: 'Geist Mono',
        fontSize: 20,
        color: HAIR,
      }}
    >
      jxd.dev
    </div>
  )
}

function Shoulder({ text }: { text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        fontFamily: 'Geist Mono',
        fontSize: 20,
        color: HAIR,
      }}
    >
      {text}
    </div>
  )
}

function titleSize(text: string): number {
  if (text.length > 80) return 60
  if (text.length > 60) return 72
  if (text.length > 40) return 84
  return 96
}

export type PageCardProps = {
  eyebrow: string
  title: string
  footer: string
}

export function pageCard({ eyebrow, title, footer }: PageCardProps) {
  return (
    <Frame>
      <Wordmark />
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {eyebrow ? <Shoulder text={eyebrow} /> : <div style={{ display: 'flex' }} />}
        <div
          style={{
            display: 'flex',
            marginTop: eyebrow ? 16 : 0,
            fontSize: titleSize(title),
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: INK,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        {footer ? (
          <div
            style={{
              display: 'flex',
              marginTop: 32,
              fontSize: 22,
              color: MUTE,
              maxWidth: 940,
            }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </Frame>
  )
}

export type PostCardProps = {
  tag: string
  title: string
  author: string
  date: string
  readingTime: string
}

export function postCard({ tag, title, author, date, readingTime }: PostCardProps) {
  const shoulder = tag && tag.toLowerCase() !== 'post' ? `// ${tag.toLowerCase()}` : '// writing'
  return (
    <Frame>
      <Wordmark />
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Shoulder text={shoulder} />
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: titleSize(title),
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: INK,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
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
          <span style={{ display: 'flex' }}>{author}</span>
          <span style={{ display: 'flex', color: HAIR }}>·</span>
          <span style={{ display: 'flex' }}>{date}</span>
          {readingTime ? (
            <>
              <span style={{ display: 'flex', color: HAIR }}>·</span>
              <span style={{ display: 'flex' }}>{readingTime}</span>
            </>
          ) : null}
        </div>
      </div>
    </Frame>
  )
}
