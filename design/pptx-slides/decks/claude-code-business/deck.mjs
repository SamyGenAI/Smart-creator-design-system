import { CREATOR_DISPLAY_NAME } from '../../../../src/creatorIdentity.js'
import { layouts } from './layouts.mjs'

export const meta = {
  title: 'Claude Code for Business',
  author: CREATOR_DISPLAY_NAME,
  layout: 'LAYOUT_16x9',
}

export const slides = [
  {
    layout: 'bookend.hero',
    props: {
      title: 'Claude Code for Business',
      subtitle: 'Turn AI from chat into a repeatable operating system for marketing teams',
      author: CREATOR_DISPLAY_NAME,
      leftImage: 'assets/illustrations/notion-style/Chatting.svg',
      rightImage: 'assets/illustrations/brand-style/claude-code.png',
    },
  },
  {
    layout: 'custom.compare-chat-vs-os',
    props: {
      title: 'Chat apps help. Operating systems compound.',
      subtitle: 'The difference is whether the work survives the session.',
      leftTitle: 'Chat app',
      rightTitle: 'AI operating system',
      leftPoints: [
        'One-off prompts with no durable workflow',
        'Context gets rebuilt every time',
        'Manual copy/paste between tools',
      ],
      rightPoints: [
        'Reusable workflows for recurring tasks',
        'Shared context across the whole team',
        'Outputs tied to business jobs to be done',
      ],
    },
  },
  {
    layout: 'custom.benefit-trio',
    props: {
      title: 'What Claude Code unlocks for business',
      subtitle: 'Three leverage points that matter to a marketing team.',
    },
  },
  {
    layout: 'custom.use-case-cards',
    props: {
      title: 'Practical marketing workflows',
      subtitle: 'Start with work that repeats every week.',
    },
  },
  {
    layout: 'custom.vertical-timeline',
    props: {
      title: 'How to roll it out',
      subtitle: 'Start small, then standardize, then measure.',
    },
  },
  {
    layout: 'bookend.cta',
    props: {
      title: 'The goal is leverage, not just answers.',
      subtitle: 'If Claude Code is in the workflow, the workflow can be repeated, delegated, and scaled.',
      cta: 'Start with one marketing task this week',
      illustration: 'assets/illustrations/brand-style/rocket.png',
      author: CREATOR_DISPLAY_NAME,
    },
  },
]

export default { meta, slides, layouts }
