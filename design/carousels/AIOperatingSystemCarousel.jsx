import { CarouselNavbarEdge, CarouselSlideShell } from '../../components/CarouselPrimitives.jsx'
import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

/**
 * LinkedIn Carousel — "How to build your AI Operating System"
 * 13 slides: Cover + 2 Story + 9 Steps + CTA
 * 1080×1350px · tokenized · Montserrat
 */

const CARD_SHADOW = 'var(--theme-shadow-card)'
const TEXT_PRIMARY = 'var(--theme-color-text-primary)'
const TEXT_SECONDARY = 'var(--theme-color-text-secondary)'
const BACKGROUND_PRIMARY = 'var(--theme-surface-canvas)'
const SURFACE_CARD = 'var(--theme-color-on-primary)'
const FONT = "var(--font\\/family\\/title, 'Montserrat', sans-serif)"
const BRAND_BG = 'var(--color\\/bg\\/brand)'
const ACCENT_1 = 'var(--theme-accent-1)'
const ACCENT_2 = 'var(--theme-accent-2)'
const ACCENT_3 = 'var(--theme-accent-3)'
const ACCENT_4 = 'var(--theme-accent-4)'
const ON_PRIMARY = 'var(--theme-color-on-primary)'

const NAVBAR = <CarouselNavbarEdge textColor={TEXT_PRIMARY} fontFamily={FONT} />

function Slide({ children, nodeId, name, withNavbar = true }) {
  return (
    <CarouselSlideShell
      nodeId={nodeId}
      name={name}
      withNavbar={withNavbar}
      navbar={NAVBAR}
      background={BACKGROUND_PRIMARY}
      fontFamily={FONT}
    >
      {children}
    </CarouselSlideShell>
  )
}

function StepLabel({ number, text }) {
  return (
    <div style={{
      position: 'absolute', left: 56, top: 130, width: 968,
      display: 'flex', alignItems: 'flex-start',
    }}>
      <span style={{
        fontSize: 64, fontWeight: 500, lineHeight: '70px',
        color: ACCENT_2, minWidth: 96, flexShrink: 0,
      }}>
        {number}.
      </span>
      <p style={{ margin: 0, fontSize: 64, fontWeight: 500, lineHeight: '70px', color: TEXT_PRIMARY }}>
        {text}
      </p>
    </div>
  )
}

function ScreenPlaceholder({ top, height = 544, left = 31, width = 1017, label = '[ screen goes here ]' }) {
  return (
    <div style={{
      position: 'absolute', left, top, width, height, borderRadius: 20,
      boxShadow: CARD_SHADOW,
      background: 'var(--theme-surface-layer-1)',
      border: '2px dashed var(--theme-color-text-secondary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 28, color: TEXT_SECONDARY, fontWeight: 500 }}>
        {label}
      </p>
    </div>
  )
}

function BottomNote({ text, top }) {
  return (
    <div style={{
      position: 'absolute', left: 39, top,
      width: 1001, minHeight: 152,
      background: SURFACE_CARD, borderRadius: 40,
      padding: '28px 40px', boxShadow: CARD_SHADOW,
      boxSizing: 'border-box', display: 'flex', alignItems: 'center',
    }}>
      <p style={{ margin: 0, fontSize: 32, fontWeight: 500, lineHeight: '48px', color: TEXT_PRIMARY }}>
        {text}
      </p>
    </div>
  )
}

function CornerTag({ label, bg, color = TEXT_PRIMARY, style = {} }) {
  return (
    <div style={{
      position: 'absolute', top: 16, right: 16,
      background: bg, borderRadius: 8,
      padding: '6px 14px',
      ...style,
    }}>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color, lineHeight: '24px' }}>
        {label}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════════════════════════════

function SlideCover() {
  return (
    <Slide nodeId="carousel:cover" name="Slide-cover" withNavbar={false}>
      <div style={{
        position: 'absolute',
        left: 240, top: 110,
        width: 600, height: 76,
        border: `3px solid ${TEXT_PRIMARY}`, borderRadius: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ margin: 0, fontSize: 40, fontWeight: 500, color: TEXT_PRIMARY, lineHeight: '50px', whiteSpace: 'nowrap' }}>
          9 steps
        </p>
      </div>

      <div style={{ position: 'absolute', left: 60, top: 220, width: 960 }}>
        <p style={{
          margin: 0, fontSize: 128, fontWeight: 700,
          lineHeight: '130px', textAlign: 'center', color: TEXT_PRIMARY,
        }}>
          How to build your AI Operating System
        </p>
      </div>

      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 500,
        width: 900,
        margin: 0,
        fontSize: 28, fontWeight: 500,
        lineHeight: '40px', textAlign: 'center',
        color: TEXT_SECONDARY,
      }}>
        From zero to a full AI OS that runs your GTM, designs your content, and works while you sleep.
      </p>

      <img
        src="/assets/illustrations/brand-style/claude-code.png"
        alt=""
        style={{ position: 'absolute', left: 290, top: 780, width: 500, height: 400, objectFit: 'contain' }}
      />
    </Slide>
  )
}

function SlideStory1() {
  return (
    <Slide nodeId="carousel:story-1" name="Slide-story-1">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 260,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        Scattered prompts. Re-pasting brand voice. Re-explaining your audience. AI that doesn&apos;t remember you.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-time-flies.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 700, width: 520, height: 440, objectFit: 'contain' }}
      />
    </Slide>
  )
}

function SlideStory2() {
  return (
    <Slide nodeId="carousel:story-2" name="Slide-story-2">
      <p style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
        top: 260,
        width: 860,
        fontSize: 80, fontWeight: 700,
        lineHeight: '96px', textAlign: 'center',
        color: TEXT_PRIMARY, margin: 0,
      }}>
        Top operators don&apos;t use AI tools. They build AI systems that compound.
      </p>

      <img
        src="/assets/illustrations/notion-style/oc-thinking.svg"
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 700, width: 520, height: 440, objectFit: 'contain' }}
      />
    </Slide>
  )
}

function SlideStep1() {
  const bulletsCowork = [
    'Browser-based, zero setup',
    'Good for exploration',
    'Locked into Anthropic',
    'No deep MCP',
  ]
  const bulletsCode = [
    'Terminal-first, lives in your codebase',
    'Connects to any model',
    'Vendor agnostic',
    'Full MCP & pipeline automation',
  ]

  return (
    <Slide nodeId="carousel:step-1" name="Slide-step-1">
      <StepLabel number={1} text="Choose your interface" />

      <div style={{ position: 'absolute', left: 56, top: 216, width: 472, height: 540 }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          background: SURFACE_CARD, borderRadius: 20, boxShadow: CARD_SHADOW,
          padding: '24px 28px', boxSizing: 'border-box',
        }}>
          <CornerTag label="Locked in" bg={ACCENT_4} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <img src="/assets/logos/app/claude.ai.png" alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: '36px' }}>
              Claude.ai Cowork
            </p>
          </div>
          <ul style={{ margin: 0, paddingLeft: 24, listStyle: 'disc' }}>
            {bulletsCowork.map((item) => (
              <li key={item} style={{ fontSize: 22, fontWeight: 500, lineHeight: '34px', color: TEXT_PRIMARY, marginBottom: 8 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 552, top: 216, width: 472, height: 540 }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          background: BRAND_BG, borderRadius: 20, boxShadow: CARD_SHADOW,
          padding: '24px 28px', boxSizing: 'border-box',
        }}>
          <CornerTag label="Recommended" bg={ACCENT_2} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <img src="/assets/logos/app/claude_code_logo.png" alt="" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: ON_PRIMARY, lineHeight: '36px' }}>
              Claude Code
            </p>
          </div>
          <ul style={{ margin: 0, paddingLeft: 24, listStyle: 'disc' }}>
            {bulletsCode.map((item) => (
              <li key={item} style={{ fontSize: 22, fontWeight: 500, lineHeight: '34px', color: ON_PRIMARY, marginBottom: 8 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BottomNote
        text="Claude.ai Cowork or Claude Code? The code path is yours. The Cowork path belongs to the platform."
        top={772}
      />
    </Slide>
  )
}

function SlideStep2() {
  const tiles = [
    { label: 'VS Code extension', icon: '/assets/logos/app/cursor.png' },
    { label: 'Cursor', icon: '/assets/logos/app/cursor.png' },
    { label: 'Standalone app', icon: '/assets/logos/app/claude_code_logo.png' },
  ]

  return (
    <Slide nodeId="carousel:step-2" name="Slide-step-2">
      <StepLabel number={2} text="Install Claude Code" />

      <div style={{
        position: 'absolute', left: 56, top: 216, width: 968,
        display: 'flex', gap: 24,
      }}>
        {tiles.map(({ label, icon }) => (
          <div key={label} style={{
            flex: 1, position: 'relative',
            background: SURFACE_CARD, borderRadius: 16, boxShadow: CARD_SHADOW,
            padding: '20px 16px', boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            minHeight: 120,
          }}>
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: ACCENT_1, borderRadius: 6, padding: '4px 10px',
            }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: TEXT_PRIMARY }}>Install</p>
            </div>
            <div style={{ width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: TEXT_PRIMARY, textAlign: 'center', lineHeight: '28px' }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <ScreenPlaceholder
        top={352}
        left={56}
        width={968}
        height={220}
        label="[ step-2-open-project.png ]"
      />

      <p style={{
        position: 'absolute', left: 56, top: 588,
        width: 968, margin: 0,
        fontSize: 24, fontWeight: 500, lineHeight: '32px',
        textAlign: 'center', color: TEXT_SECONDARY,
      }}>
        Open the folder, not a single file.
      </p>

      <BottomNote
        text="Your AI terminal, the shell of your OS. This is where every command, every agent, every skill will run."
        top={640}
      />
    </Slide>
  )
}

function SlideStep3() {
  const checklist = [
    'Who you are & what you sell',
    'Your workflow map',
    'Rules every subagent respects',
    'Pointers to skills & context',
  ]

  return (
    <Slide nodeId="carousel:step-3" name="Slide-step-3">
      <StepLabel number={3} text="Write your CLAUDE.md" />

      <ScreenPlaceholder
        top={216}
        left={56}
        width={460}
        height={380}
        label="[ step-3-claude-md.png ]"
      />

      <div style={{ position: 'absolute', left: 540, top: 216, width: 484 }}>
        {checklist.map((item, i) => (
          <div key={item} style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            marginBottom: i < checklist.length - 1 ? 20 : 0,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: ACCENT_2, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 4,
            }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1 }}>✓</span>
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '38px', color: TEXT_PRIMARY }}>
              {item}
            </p>
          </div>
        ))}
      </div>

      <BottomNote
        text="One file. Persistent across every session. This is what separates a chatbot from an operating system."
        top={612}
      />
    </Slide>
  )
}

function SlideStep4() {
  const ports = [
    { icon: '/assets/logos/app/figma.com.png', text: 'Figma MCP → push designs into Figma' },
    { icon: '/assets/logos/app/linkedin.svg', text: 'LinkedIn API → pull engagers as warm leads' },
    { icon: '/assets/logos/text/notion.com.svg', text: 'Notion MCP → read/write your knowledge base' },
    { icon: '/assets/logos/app/github.com.png', text: 'GitHub MCP → manage code & PRs from chat' },
  ]

  return (
    <Slide nodeId="carousel:step-4" name="Slide-step-4">
      <StepLabel number={4} text="Connect your MCP servers" />

      <div style={{
        position: 'absolute', left: 56, top: 216, width: 968,
        background: ACCENT_1, borderRadius: 12,
        padding: '16px 24px', boxSizing: 'border-box',
      }}>
        <p style={{ margin: 0, fontSize: 24, fontWeight: 500, lineHeight: '34px', color: TEXT_PRIMARY }}>
          MCP = the standard way AI connects to external tools. Same idea as APIs, but the AI drives.
        </p>
      </div>

      <div style={{
        position: 'absolute', left: 56, top: 296, width: 968,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
      }}>
        {ports.map(({ icon, text }) => (
          <div key={text} style={{
            background: SURFACE_CARD, borderRadius: 16, boxShadow: CARD_SHADOW,
            border: `3px solid ${ACCENT_1}`,
            padding: '20px 24px', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', gap: 16, minHeight: 100,
          }}>
            <div style={{ width: 48, height: 48, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 500, lineHeight: '30px', color: TEXT_PRIMARY }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      <BottomNote
        text="MCPs are your OS ports to the outside world. The more ports you open, the more your OS can do without you touching another tool."
        top={712}
      />
    </Slide>
  )
}

function SlideStep5() {
  const codeLines = `/setup        → onboards your ICP and positioning
/find-leads   → searches the web for prospects
/score-leads  → rates each lead 0-100
/infographic  → generates a pixel-perfect LinkedIn visual
/slides       → writes & designs a full slide deck`

  return (
    <Slide nodeId="carousel:step-5" name="Slide-step-5">
      <StepLabel number={5} text="Build your Skills library" />

      <div style={{
        position: 'absolute', left: 56, top: 216, width: 968,
        background: BRAND_BG, borderRadius: 12,
        padding: '28px 32px', boxSizing: 'border-box',
      }}>
        <pre style={{
          margin: 0, fontSize: 24, fontWeight: 500, lineHeight: '38px',
          color: ON_PRIMARY, fontFamily: FONT, whiteSpace: 'pre-wrap',
        }}>
          {codeLines}
        </pre>
      </div>

      <BottomNote
        text="Skills = reusable AI programs triggered by /slash commands. One command. The AI knows the whole workflow. No re-explaining."
        top={592}
      />
    </Slide>
  )
}

function SlideStep6() {
  const pipelines = [
    { tag: 'Design', tagBg: ACCENT_4, flow: 'copy-agent → design-agent → qc-agent' },
    { tag: 'Lead gen', tagBg: ACCENT_1, flow: 'Haiku scorer → Haiku + web search → personalized DMs' },
  ]

  return (
    <Slide nodeId="carousel:step-6" name="Slide-step-6">
      <StepLabel number={6} text="Spin up specialized subagents" />

      <div style={{ position: 'absolute', left: 56, top: 216, width: 968, display: 'flex', flexDirection: 'column', gap: 32 }}>
        {pipelines.map(({ tag, tagBg, flow }) => (
          <div key={tag} style={{
            background: SURFACE_CARD, borderRadius: 16, boxShadow: CARD_SHADOW,
            padding: '24px 28px', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', gap: 20,
          }}>
            <div style={{
              background: tagBg, borderRadius: 8, padding: '8px 16px', flexShrink: 0,
            }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }}>{tag}</p>
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '36px', color: TEXT_PRIMARY }}>
              {flow}
            </p>
          </div>
        ))}
      </div>

      <BottomNote
        text="Don't use one AI. Build a team of subagents. Each agent reads the master CLAUDE.md. You review, they execute."
        top={750}
      />
    </Slide>
  )
}

function SlideStep7() {
  const contextItems = [
    'Your ICP',
    'Your offer & positioning',
    'Your brand voice & tone rules',
    'Your competitor map',
    'Your design tokens (colors, fonts, shadows)',
  ]

  return (
    <Slide nodeId="carousel:step-7" name="Slide-step-7">
      <StepLabel number={7} text="Build your context, memory layer" />

      <img
        src="/assets/illustrations/notion-style/oc-taking-note.svg"
        alt=""
        style={{ position: 'absolute', left: 56, top: 216, width: 420, height: 380, objectFit: 'contain' }}
      />

      <div style={{ position: 'absolute', left: 500, top: 216, width: 524 }}>
        <p style={{
          margin: '0 0 24px', fontSize: 32, fontWeight: 700,
          lineHeight: '40px', color: TEXT_PRIMARY,
        }}>
          What goes in /context
        </p>
        {contextItems.map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
              background: ACCENT_4, marginTop: 10,
            }} />
            <p style={{ margin: 0, fontSize: 24, fontWeight: 500, lineHeight: '34px', color: TEXT_PRIMARY }}>
              {item}
            </p>
          </div>
        ))}
      </div>

      <BottomNote
        text="Feed /context once: ICP, offer, brand voice, competitor map. This is what makes the AI write DMs that sound like you."
        top={850}
      />
    </Slide>
  )
}

function SlideStep8() {
  const tree = `assets/
├── avatar/profile.jpg
├── icons/
├── logos/app/
├── logos/text/
├── illustrations/
└── textures/`

  return (
    <Slide nodeId="carousel:step-8" name="Slide-step-8">
      <StepLabel number={8} text="Build your assets folder" />

      <div style={{
        position: 'absolute', left: 56, top: 216, width: 968,
        background: BRAND_BG, borderRadius: 12,
        padding: '28px 32px', boxSizing: 'border-box',
      }}>
        <pre style={{
          margin: 0, fontSize: 26, fontWeight: 500, lineHeight: '40px',
          color: ON_PRIMARY, fontFamily: FONT, whiteSpace: 'pre',
        }}>
          {tree.split('\n').map((line, i) => {
            const isFolder = line.includes('/') || line.startsWith('├──') || line.startsWith('└──')
            const folderName = line.match(/([\w/]+)/)?.[0]
            if (i === 0) {
              return (
                <span key={line} style={{ color: ACCENT_3 }}>{line}{'\n'}</span>
              )
            }
            if (isFolder && folderName) {
              const parts = line.split(/(avatar|icons|logos|illustrations|textures|profile\.jpg|app\/|text\/)/)
              return (
                <span key={line}>
                  {line.includes('avatar') || line.includes('icons') || line.includes('logos') || line.includes('illustrations') || line.includes('textures') ? (
                    <>
                      {line.slice(0, line.search(/avatar|icons|logos|illustrations|textures|profile/))}
                      <span style={{ color: ACCENT_3 }}>
                        {line.match(/(avatar\/profile\.jpg|icons\/|logos\/app\/|logos\/text\/|illustrations\/|textures\/)/)?.[0] || ''}
                      </span>
                      {line.replace(/.*?(avatar\/profile\.jpg|icons\/|logos\/app\/|logos\/text\/|illustrations\/|textures\/)/, '').replace(/^(avatar\/profile\.jpg|icons\/|logos\/app\/|logos\/text\/|illustrations\/|textures\/)/, '')}
                      {'\n'}
                    </>
                  ) : (
                    <>{line}{'\n'}</>
                  )}
                </span>
              )
            }
            return <span key={line}>{line}{'\n'}</span>
          })}
        </pre>
      </div>

      <div style={{
        position: 'absolute', left: 56, top: 520, width: 968,
        background: SURFACE_CARD, borderRadius: 12,
        border: `3px solid ${ACCENT_2}`,
        padding: '16px 24px', boxSizing: 'border-box',
      }}>
        <p style={{
          margin: 0, fontSize: 22, fontWeight: 500, lineHeight: '32px',
          color: TEXT_PRIMARY, fontFamily: FONT,
        }}>
          node scripts/fetch-app-logo.mjs notion.com
        </p>
      </div>

      <BottomNote
        text="Give your OS eyes. Your profile picture goes in once. Every future infographic footer signs itself."
        top={800}
      />
    </Slide>
  )
}

function SlideStep8Tree() {
  const lines = [
    { text: 'assets/', accent: true },
    { text: '├── avatar/profile.jpg', accentPart: 'avatar/profile.jpg' },
    { text: '├── icons/', accentPart: 'icons/' },
    { text: '├── logos/app/', accentPart: 'logos/app/' },
    { text: '├── logos/text/', accentPart: 'logos/text/' },
    { text: '├── illustrations/', accentPart: 'illustrations/' },
    { text: '└── textures/', accentPart: 'textures/' },
  ]

  return (
    <>
      {lines.map(({ text, accent, accentPart }) => (
        <div key={text} style={{ lineHeight: '40px' }}>
          {accent ? (
            <span style={{ color: ACCENT_3 }}>{text}</span>
          ) : (
            <>
              <span style={{ color: ON_PRIMARY }}>{text.slice(0, text.indexOf(accentPart))}</span>
              <span style={{ color: ACCENT_3 }}>{accentPart}</span>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default function AIOperatingSystemCarousel() {
  return (
    <div
      data-node-id="carousel:ai-operating-system"
      data-name="AIOperatingSystemCarousel"
      style={{ display: 'flex', gap: 88, alignItems: 'flex-start' }}
    >
      <SlideCover />
      <SlideStory1 />
      <SlideStory2 />
      <SlideStep1 />
      <SlideStep2 />
      <SlideStep3 />
      <SlideStep4 />
      <SlideStep5 />
      <SlideStep6 />
      <SlideStep7 />
      <SlideStep8 />
    </div>
  )
}
