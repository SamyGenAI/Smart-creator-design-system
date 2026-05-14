/**
 * NotionAIPipelineInfographic — 1080×1350px LinkedIn infographic.
 * Topic: How to Build a LinkedIn Content System in Notion AI
 *
 * LAYOUT:
 *   Header   ~114px  — "Notion AI Pipeline" highlight "Notion AI" + subtitle
 *   gap        22px
 *   Row 1     190px  — Step 0: Open Notion AI (981×190, glass, lead + flow)
 *   gap        22px
 *   Row 2     300px  — Step 1 Organise (481px, primary) + Step 2 Calendar (483px, accent)
 *   gap        22px
 *   Row 3     300px  — Step 3 Database (481px, support) + Step 4 Tracker (483px, success)
 *   gap        22px
 *   Row 4     210px  — Final Result (981×210, glass, 2-col summary)
 *   gap        22px
 *   Footer     60px
 *   Total:  114+22+190+22+300+22+300+22+210+22+60 = 1284 ≤ 1350 ✓
 *
 * Adjacent header-color check:
 *   Row 2: primary ≠ accent ✓
 *   Row 3: support ≠ success ✓
 */

import InfographicCanvas from '../../components/InfographicCanvas.jsx'
import InfographicHeader from '../../components/InfographicHeader.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import BrandBorderSectionBase from '../../components/BrandBorderSectionBase.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'

const FONT = 'var(--font\\/family\\/body)'
const C_TEXT = 'var(--theme-color-text-primary)'
const C_TEXT_SEC = 'var(--theme-color-text-secondary)'

/* ── Sub-components ──────────────────────────────────────────────────────── */

function NotionMark() {
  return (
    <div
      style={{
        width: 68,
        height: 68,
        borderRadius: 12,
        background: 'var(--theme-color-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: 'var(--theme-shadow-card)',
      }}
    >
      {/* Stylised "N" letterform using theme tokens only */}
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <path
          d="M8 8h4.5L25 27.5V8H29v22h-4.5L12 10.5V30H8V8z"
          fill="var(--theme-color-on-primary)"
        />
      </svg>
    </div>
  )
}

function FlowArrow() {
  return (
    <svg width="30" height="18" viewBox="0 0 30 18" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M0 9h26M20 3l6 6-6 6"
        stroke="var(--theme-color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FlowBox({ children }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--theme-surface-glass-strong)',
        border: '1.5px solid var(--theme-border-1)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '10px 14px',
        minHeight: 68,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: 600,
          color: C_TEXT,
          lineHeight: '18px',
        }}
      >
        {children}
      </span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="10" cy="10" r="10" fill="var(--theme-accent-2)" />
      <path
        d="M6 10.5l2.8 2.8 5.2-5.6"
        stroke="var(--check-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CheckRow({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <CheckIcon />
      <span
        style={{
          fontFamily: FONT,
          fontSize: 13,
          fontWeight: 500,
          color: C_TEXT,
          lineHeight: '18px',
        }}
      >
        {text}
      </span>
    </div>
  )
}

function PromptCallout({ text }) {
  return (
    <div
      style={{
        background: 'var(--theme-surface-layer-4)',
        border: '1px solid var(--theme-border-1)',
        borderRadius: 8,
        padding: '8px 10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <div
          style={{
            background: 'var(--theme-accent-1)',
            borderRadius: 4,
            padding: '2px 8px',
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 10,
              color: C_TEXT,
              letterSpacing: '0.3px',
            }}
          >
            Prompt
          </span>
        </div>
      </div>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 11,
          fontWeight: 500,
          color: C_TEXT_SEC,
          lineHeight: '15px',
          margin: 0,
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
    </div>
  )
}

function StepBody({ lead, checks, prompt }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%' }}>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 700,
          color: C_TEXT,
          lineHeight: '16px',
          margin: 0,
        }}
      >
        {lead}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {checks.map((c, i) => (
          <CheckRow key={i} text={c} />
        ))}
      </div>
      <PromptCallout text={prompt} />
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────────────────── */

export default function NotionAIPipelineInfographic() {
  return (
    <InfographicCanvas data-name="NotionAIPipelineInfographic">
      <div
        className="content-stretch flex flex-col gap-[22px] h-full items-center justify-center relative shrink-0 w-[981px]"
        data-name="Main"
      >

        {/* ── HEADER ───────────────────────────────────────────────────── */}
        <div className="max-h-[208px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title="Notion AI Pipeline"
            highlightWord="Notion AI"
            subtitle="Build your LinkedIn content pipeline"
          />
        </div>

        {/* ── ROW 1 — Step 0: Open Notion AI (981×190, glass) ──────────── */}
        {/*
          Visual: lead sentence + horizontal flow (logo → 3 boxes + arrows)
          Body: 190−51=139px · lead 18px + gap 8px + flow 74px = 100px → fill 72% ✓
        */}
        <PrimaryGlassSection
          title="Step 0: Open Notion AI"
          className="h-[190px] w-[981px] shrink-0"
          titleSize="24px"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: '10px 20px 14px',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 13,
                fontWeight: 600,
                color: C_TEXT_SEC,
                lineHeight: '18px',
                margin: 0,
                textAlign: 'center',
              }}
            >
              Everything starts with a single Notion page and the AI button.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <NotionMark />
              <FlowArrow />
              <FlowBox>Go to notion.so and open a new page</FlowBox>
              <FlowArrow />
              <FlowBox>Click the Notion AI button</FlowBox>
              <FlowArrow />
              <FlowBox>Your entire content system starts here</FlowBox>
            </div>
          </div>
        </PrimaryGlassSection>

        {/* ── ROW 2 — Steps 1 & 2 (300px, two side-by-side cards) ──────── */}
        {/*
          Card body: 300−51−10=239px · content ~195px → fill 82% ✓
        */}
        <div className="flex flex-row gap-[17px] w-full shrink-0">
          <BrandBorderSectionBase
            theme="primary"
            variant="solid"
            number="1"
            title="Organise Your Ideas"
            widthClass="w-[481px]"
            heightClass="h-[300px]"
          >
            <StepBody
              lead="Dump everything in. Notion AI sorts it all out."
              checks={[
                'Paste raw ideas and voice notes',
                'AI groups by topic and format',
              ]}
              prompt="Here are all my raw content ideas [paste]. Organise these into a clean table with three columns — Topic, Format (text, carousel, infographic), and a one-line brief."
            />
          </BrandBorderSectionBase>

          <BrandBorderSectionBase
            theme="accent"
            variant="solid"
            number="2"
            title="Content Calendar"
            widthClass="w-[483px]"
            heightClass="h-[300px]"
          >
            <StepBody
              lead="Turn organised ideas into a weekly posting plan."
              checks={[
                'Assigns one post per day',
                'Balances formats across the week',
              ]}
              prompt="Take these organised ideas and build a 4-week content calendar. One post per day, Mon–Fri. Include topic, format, and a one-line brief for each slot."
            />
          </BrandBorderSectionBase>
        </div>

        {/* ── ROW 3 — Steps 3 & 4 (300px, two side-by-side cards) ──────── */}
        <div className="flex flex-row gap-[17px] w-full shrink-0">
          <BrandBorderSectionBase
            theme="support"
            variant="solid"
            number="3"
            title="Content Database"
            widthClass="w-[481px]"
            heightClass="h-[300px]"
          >
            <StepBody
              lead="Every post gets its own row, tracked in one place."
              checks={[
                'Topic and format assigned to each post',
                'Status: Idea → In Progress → Live',
              ]}
              prompt="Create a Notion database with columns: Post Title, Topic, Format, Status (Idea, In Progress, Designing, Scheduled, Live), and Publish Date."
            />
          </BrandBorderSectionBase>

          <BrandBorderSectionBase
            theme="success"
            variant="solid"
            number="4"
            title="Weekly Tracker"
            widthClass="w-[483px]"
            heightClass="h-[300px]"
          >
            <StepBody
              lead="Start each week knowing where every post stands."
              checks={[
                'Filter by status to see what needs action',
                'Review live posts and plan next week',
              ]}
              prompt="Look at my content database. Flag anything stuck in the same stage for 3+ days and tell me what needs to move forward this week."
            />
          </BrandBorderSectionBase>
        </div>

        {/* ── ROW 4 — Final Result (981×210, glass, 2-col) ─────────────── */}
        {/*
          Body: 210−51=159px · left statement ~90px, right 4 checks ~116px → fill ~73% ✓
        */}
        <PrimaryGlassSection
          title="Final Result"
          className="h-[210px] w-[981px] shrink-0"
          titleSize="24px"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 0,
              padding: '12px 20px',
              flex: 1,
              width: '100%',
            }}
          >
            {/* Left: bold statement */}
            <div
              style={{
                flex: '0 0 310px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                paddingRight: 20,
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 18,
                  fontWeight: 700,
                  color: C_TEXT,
                  lineHeight: '24px',
                  margin: 0,
                }}
              >
                One Notion workspace.
              </p>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 500,
                  color: C_TEXT_SEC,
                  lineHeight: '20px',
                  margin: 0,
                }}
              >
                Your entire content pipeline — ideas, calendar, database, and tracker — in one place.
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 1.5,
                alignSelf: 'stretch',
                background: 'var(--theme-border-1)',
                flexShrink: 0,
                borderRadius: 2,
              }}
            />

            {/* Right: 4 outcomes */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 11,
                paddingLeft: 22,
              }}
            >
              {[
                'Raw ideas organised into a clean table',
                '4-week content calendar ready to go',
                'Full database with status tracking',
                'Weekly review built into the system',
              ].map((item, i) => (
                <CheckRow key={i} text={item} />
              ))}
            </div>
          </div>
        </PrimaryGlassSection>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <InfographicFooter className="h-[60px] relative shrink-0 w-[1048px]" name="Smart Creator" />

      </div>
    </InfographicCanvas>
  )
}
