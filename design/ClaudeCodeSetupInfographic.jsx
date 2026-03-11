/**
 * ClaudeCodeSetupInfographic — 1080×1350px LinkedIn infographic.
 * Topic: "The 5 Layers of Claude Code Setup"
 *
 * LAYOUT — uses inline-grid stacking pattern (components layered via ml/mt offsets):
 *   Header    208px  (title + subtitle)
 *   gap       22px
 *   Row 1     257px  — Intro (321px) + Layer 1 Basic Install (633px)
 *   gap       22px
 *   Row 2     225px  — Layer 2 CLAUDE.md (full 977px)
 *   gap       22px
 *   Row 3     314px  — Layer 3 MCP (321px) + Layer 4 Agents (308px) + Layer 5 Hooks (308px)
 *   gap       22px
 *   Row 4     176px  — CTA full width (981px)
 *   Footer     60px
 *   Total:  1350px
 */

import InfographicHeader from '../components/InfographicHeader.jsx'
import SquareGridTexture from '../components/SquareGridTexture.jsx'
import GlassNavySection from '../components/GlassNavySection.jsx'
import InfographicFooter from '../components/InfographicFooter.jsx'
import NumberBullet from '../components/NumberBullet.jsx'
import Checklist from '../components/Checklist.jsx'
import IconBullet from '../components/IconBullet.jsx'
import TextBox from '../components/TextBox.jsx'
import ColoredTextBoxes from '../components/ColoredTextBoxes.jsx'

export default function ClaudeCodeSetupInfographic() {
  return (
    <div
      className="bg-[#fffceb] content-stretch flex gap-[10px] items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="ClaudeCodeSetupInfographic"
      data-node-id="5:15851"
    >
      <SquareGridTexture />

      {/* Main content column */}
      <div
        className="content-stretch flex flex-col gap-[22px] h-full items-center justify-center relative shrink-0 w-[981px]"
        data-name="Main"
        data-node-id="54:914"
      >

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="max-h-[208px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title="Claude Code Setup"
            highlightWord="Setup"
            subtitle="5 layers from zero to fully automated"
          />
        </div>

        {/* ── ROW 1 — Intro (321px) + Layer 1 Basic Install (633px) ────── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 1"
        >
          {/* Card Left — Intro 321×257 */}
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
            data-name="Intro"
          >
            <GlassNavySection
              title="What is Claude Code?"
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[257px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[321px]"
              titleSize="20px"
            />
            {/* Tagline pill */}
            <div className="col-1 ml-[18px] mt-[80px] relative row-1">
              <TextBox
                text="The AI coding CLI"
                color="var(--components\/card-title\/green,#d2ff9a)"
              />
            </div>
            {/* Body text */}
            <div className="col-1 ml-[18px] mt-[126px] relative row-1 w-[284px]">
              <p className="font-['Montserrat',sans-serif] font-medium text-[12px] text-black tracking-[-0.36px] leading-[1.5]">
                A terminal AI agent that reads your codebase, writes code, and runs tools — right in your project.
              </p>
            </div>
          </div>

          {/* Card Right — Layer 1: Basic Install 633×257 */}
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[344px] mt-0 place-items-start relative row-1"
            data-name="Layer 1"
          >
            <GlassNavySection
              title="Layer 1 — Basic Install"
              iconSrc="/assets/icons/programming-apps-websites/programming-keyboard-type--Streamline-Freehand.svg"
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[257px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[633px]"
              titleSize="20px"
            />
            {/* Checklist */}
            <div className="col-1 ml-[36px] mt-[58px] relative row-1">
              <Checklist
                items={['Install via npm globally', 'Run claude in any dir', 'Works best in a git repo']}
                className="col-1 h-[189px] ml-0 mt-0 relative row-1 w-[236px]"
              />
            </div>
            {/* Tip box */}
            <div className="col-1 ml-[340px] mt-[70px] relative row-1 w-[262px]">
              <p className="font-['Montserrat',sans-serif] font-bold text-[12px] text-black tracking-[-0.36px] leading-[1.5] mb-[6px]">
                Quick start:
              </p>
              <TextBox
                text="npm i -g @anthropic-ai/claude-code"
                color="var(--components\/card-title\/blue,#b4eaff)"
                className="h-[34px] relative w-[260px]"
              />
              <p className="font-['Montserrat',sans-serif] font-medium text-[11px] text-black tracking-[-0.33px] leading-[1.5] mt-[10px]">
                Then run <strong>claude</strong> in any git repo. No config needed.
              </p>
            </div>
          </div>
        </div>

        {/* ── ROW 2 — Layer 2: CLAUDE.md (full width 977×225) ─────────── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 2"
        >
          <GlassNavySection
            title="Layer 2 — CLAUDE.md"
            iconSrc="/assets/icons/programming-apps-websites/file-code-share-1--Streamline-Freehand.svg"
            className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[225px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[977px]"
            titleSize="20px"
          />
          {/* IconBullet — what goes in CLAUDE.md */}
          <div className="col-1 ml-[29px] mt-[68px] relative row-1">
            <IconBullet
              items={[
                { iconSrc: '/assets/icons/programming-apps-websites/programming-code-idea--Streamline-Freehand.svg', iconAlt: 'stack', text: 'Describe your stack & conventions' },
                { iconSrc: '/assets/icons/programming-apps-websites/security-shield-settings--Streamline-Freehand.svg', iconAlt: 'rules', text: "What Claude must never do" },
                { iconSrc: '/assets/icons/programming-apps-websites/module-three-boxes--Streamline-Freehand.svg', iconAlt: 'context', text: 'Key file paths & architecture' },
                { iconSrc: '/assets/icons/programming-apps-websites/programming-hold-code--Streamline-Freehand.svg', iconAlt: 'session', text: 'Read at every session start' },
              ]}
              accentColor="var(--components\/card-title\/amber,#fde68a)"
              className="col-1 h-[173px] ml-0 mt-0 relative row-1 w-[319px]"
            />
          </div>
          {/* Tip callout */}
          <div className="col-1 ml-[390px] mt-[72px] relative row-1 w-[560px]">
            <p className="font-['Montserrat',sans-serif] font-bold text-[13px] text-black tracking-[-0.39px] leading-[1.5] mb-[8px]">
              Pro tip — keep it under 200 lines
            </p>
            <p className="font-['Montserrat',sans-serif] font-medium text-[12px] text-black tracking-[-0.36px] leading-[1.6]">
              Claude reads CLAUDE.md at the start of every session. If it's too long, instructions get truncated. Be concise: stack, conventions, what to avoid, and key file paths.
            </p>
          </div>
        </div>

        {/* ── ROW 3 — Layers 3, 4, 5 (321px + 308px + 308px × 314px) ──── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 3"
        >
          {/* Card 1 — Layer 3: MCP Servers 321×314 */}
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
            data-name="Layer 3"
          >
            <GlassNavySection
              title="Layer 3 — MCP"
              iconSrc="/assets/icons/programming-apps-websites/plugin-jigsaw-puzzle--Streamline-Freehand.svg"
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[314px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[321px]"
              titleSize="20px"
            />
            <div className="col-1 ml-[18px] mt-[68px] relative row-1">
              <p className="font-['Montserrat',sans-serif] font-bold text-[12px] text-black tracking-[-0.36px] leading-[1.5] w-[280px] mb-[8px]">
                Connect external tools via MCP:
              </p>
            </div>
            <div className="col-1 ml-[18px] mt-[90px] relative row-1">
              <NumberBullet
                items={['Edit settings.json', 'Connect any API', 'Data stays local']}
                className="col-1 h-[138px] ml-0 mt-0 relative row-1 w-[179px]"
              />
            </div>
            <div className="col-1 ml-[18px] mt-[238px] relative row-1">
              <TextBox
                text="Figma · GitHub · Postgres"
                color="var(--components\/card-title\/green,#d2ff9a)"
                className="h-[34px] relative w-[280px]"
              />
            </div>
          </div>

          {/* Card 2 — Layer 4: Custom Agents 308×314 */}
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[344px] mt-0 place-items-start relative row-1"
            data-name="Layer 4"
          >
            <GlassNavySection
              title="Layer 4 — Agents"
              iconSrc="/assets/icons/programming-apps-websites/programming-user-code--Streamline-Freehand.svg"
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[314px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[308px]"
              titleSize="20px"
            />
            <div className="col-1 ml-[12px] mt-[68px] relative row-1 w-[280px]">
              <p className="font-['Montserrat',sans-serif] font-medium text-[11px] text-black tracking-[-0.33px] leading-[1.5] mb-[10px]">
                Define specialized subagents in <strong>.claude/agents/</strong>. Each has a name, model, and system prompt.
              </p>
            </div>
            <div className="col-1 ml-[12px] mt-[115px] relative row-1">
              <Checklist
                items={['Each has name + prompt', 'Agents can call agents', 'Chain: copy › design › QC']}
                className="col-1 h-[160px] ml-0 mt-0 relative row-1 w-[236px]"
              />
            </div>
          </div>

          {/* Card 3 — Layer 5: Hooks 308×314 */}
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[673px] mt-0 place-items-start relative row-1"
            data-name="Layer 5"
          >
            <GlassNavySection
              title="Layer 5 — Hooks"
              iconSrc="/assets/icons/programming-apps-websites/android-settings--Streamline-Freehand.svg"
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[314px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[308px]"
              titleSize="20px"
            />
            <div className="col-1 ml-[12px] mt-[68px] relative row-1 w-[280px]">
              <p className="font-['Montserrat',sans-serif] font-medium text-[11px] text-black tracking-[-0.33px] leading-[1.5] mb-[10px]">
                Shell commands triggered by Claude events. Exit non-zero to block Claude.
              </p>
            </div>
            <div className="col-1 ml-[12px] mt-[115px] relative row-1">
              <ColoredTextBoxes
                color="var(--components\/card-title\/blue,#b4eaff)"
                className="col-1 h-[98px] ml-0 mt-0 relative row-1 w-[172px]"
              />
            </div>
            <div className="col-1 ml-[12px] mt-[222px] relative row-1 w-[280px]">
              <p className="font-['Montserrat',sans-serif] font-medium text-[11px] text-black tracking-[-0.33px] leading-[1.4]">
                PreToolUse · PostToolUse · Stop
              </p>
            </div>
          </div>
        </div>

        {/* ── ROW 4 — CTA (full width 981×176) ────────────────────────── */}
        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 4"
        >
          <GlassNavySection
            title="Which layer are you on?"
            className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[176px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[981px]"
            titleSize="24px"
          />
          <div className="col-1 ml-[32px] mt-[68px] relative row-1 w-[900px]">
            <p className="font-['Montserrat',sans-serif] font-medium text-[14px] text-black tracking-[-0.42px] leading-[1.6]">
              Drop your number in the comments — 1 (just installed) to 5 (full hooks pipeline). Let's compare setups.
            </p>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <InfographicFooter
          avatarSrc="/assets/avatar/avatar-profile.png"
          name="Samy Chouaf"
          className="h-[60px] relative shrink-0 w-[1048px]"
        />

      </div>
    </div>
  )
}
