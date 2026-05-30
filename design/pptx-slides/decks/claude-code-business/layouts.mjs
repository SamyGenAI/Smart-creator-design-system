import { slide, rect, oval, textNode, imageNode } from '../../slide-engine.mjs'

export const layouts = {
  'bookend.hero': (p) => {
    return slide('bg', [
      rect({ x: 0.3, y: 0.5, w: 4.2, h: 4.3, fill: 'accent1', transparency: 88, radius: 0.25 }),
      rect({ x: 5.5, y: 0.5, w: 4.2, h: 4.3, fill: 'accent2', transparency: 88, radius: 0.25 }),
      imageNode({ x: 0.5, y: 0.6, w: 3.8, h: 3.8, src: p.leftImage ?? 'assets/illustrations/notion-style/oc-on-the-laptop.svg' }),
      rect({ x: 4.35, y: 2.15, w: 1.3, h: 0.65, fill: 'brand', radius: 0.1, shadow: true }),
      textNode({ x: 4.35, y: 2.15, w: 1.3, h: 0.65, content: '→', fontPx: 50, fill: 'onBrand', align: 'center', valign: 'middle', margin: 0 }),
      imageNode({ x: 5.7, y: 0.6, w: 3.8, h: 3.8, src: p.rightImage ?? 'assets/illustrations/brand-style/claude-code.png' }),
      textNode({ x: 0.5, y: 4.48, w: 9.0, h: 0.5, content: p.title, fontPx: 66, fill: 'brand', bold: true, align: 'center', valign: 'middle' }),
      textNode({ x: 0.5, y: 5.0, w: 9.0, h: 0.26, content: p.subtitle, fontPx: 26, fill: 'textSec', italic: true, align: 'center', valign: 'middle' }),
      rect({ x: 0, y: 5.4, w: 10, h: 0.225, fill: 'accent1' }),
      textNode({ x: 0.3, y: 5.4, w: 9.4, h: 0.225, content: p.author, fontPx: 18, fill: 'brand', bold: true, valign: 'middle', margin: 0 }),
    ])
  },

  'custom.compare-chat-vs-os': (p) => {
    const title = p.title ?? 'Chat apps help. Operating systems compound.'
    const subtitle = p.subtitle ?? 'The difference is whether the work survives the session.'
    const leftTitle = p.leftTitle ?? 'Chat app'
    const rightTitle = p.rightTitle ?? 'AI operating system'
    const leftIcon = p.leftIcon ?? 'assets/icons/business/copy-paste-clipboard--Streamline-Freehand.svg'
    const rightIcon = p.rightIcon ?? 'assets/icons/programming-apps-websites/database-settings--Streamline-Freehand.svg'
    const leftPoints = p.leftPoints ?? [
      'One-off prompts with no durable workflow',
      'Context gets rebuilt every time',
      'Manual copy/paste between tools',
    ]
    const rightPoints = p.rightPoints ?? [
      'Reusable workflows for recurring tasks',
      'Shared context across the whole team',
      'Outputs tied to business jobs to be done',
    ]

    const cardY = 1.28
    const cardH = 4.0
    const cardW = 4.28
    const leftX = 0.44
    const rightX = 5.0
    const bulletXs = [0.85, 5.41]
    const iconXs = [0.82, 5.38]
    const titleXs = [1.48, 6.04]
    const accentTokens = ['accent4', 'accent2']
    const icons = [leftIcon, rightIcon]
    const labels = [leftTitle, rightTitle]
    const bulletSets = [leftPoints, rightPoints]

    const nodes = [
      rect({ x: 0, y: 0, w: 10, h: 0.66, fill: 'brand' }),
      textNode({
        x: 0.42,
        y: 0.05,
        w: 8.65,
        h: 0.34,
        content: title,
        fontPx: 34,
        fill: 'onBrand',
        bold: true,
        valign: 'middle',
        margin: 0,
      }),
      textNode({
        x: 0.42,
        y: 0.39,
        w: 9.0,
        h: 0.22,
        content: subtitle,
        fontPx: 18,
        fill: 'onBrand',
        italic: true,
        valign: 'middle',
        margin: 0,
      }),
      rect({ x: leftX, y: cardY, w: cardW, h: cardH, fill: 'surface', radius: 0.24, shadow: true }),
      rect({ x: rightX, y: cardY, w: cardW, h: cardH, fill: 'surface', radius: 0.24, shadow: true }),
      rect({ x: leftX, y: cardY, w: cardW, h: 0.14, fill: 'accent4' }),
      rect({ x: rightX, y: cardY, w: cardW, h: 0.14, fill: 'accent2' }),
      rect({ x: 4.56, y: 2.62, w: 0.88, h: 0.5, fill: 'brand', radius: 0.14, shadow: true }),
      textNode({
        x: 4.56,
        y: 2.62,
        w: 0.88,
        h: 0.5,
        content: '→',
        fontPx: 42,
        fill: 'onBrand',
        bold: true,
        align: 'center',
        valign: 'middle',
        margin: 0,
      }),
    ]

    for (let index = 0; index < 2; index += 1) {
      const accent = accentTokens[index]
      const icon = icons[index]
      const label = labels[index]
      const bullets = bulletSets[index]
      const iconX = iconXs[index]
      const titleX = titleXs[index]
      const bulletX = bulletXs[index]
      const cardX = index === 0 ? leftX : rightX

      nodes.push(
        rect({ x: iconX - 0.02, y: cardY + 0.3, w: 0.72, h: 0.72, fill: accent, radius: 0.18 }),
        imageNode({ x: iconX + 0.06, y: cardY + 0.36, w: 0.6, h: 0.6, src: icon }),
        textNode({
          x: titleX,
          y: cardY + 0.34,
          w: 2.72,
          h: 0.32,
          content: label,
          fontPx: 28,
          fill: 'brand',
          bold: true,
          valign: 'middle',
        }),
        textNode({
          x: cardX + 0.3,
          y: cardY + 1.08,
          w: cardW - 0.6,
          h: 0.34,
          content: index === 0 ? 'What usually happens' : 'What the system changes',
          fontPx: 17,
          fill: 'textMute',
          italic: true,
          valign: 'middle',
        }),
      )

      for (let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex += 1) {
        const bulletY = cardY + 1.55 + bulletIndex * 0.72
        nodes.push(
          oval({ x: bulletX, y: bulletY + 0.09, w: 0.1, h: 0.1, fill: accent, transparency: 0 }),
          textNode({
            x: bulletX + 0.18,
            y: bulletY - 0.02,
            w: cardW - 0.58,
            h: 0.42,
            content: bullets[bulletIndex],
            fontPx: 16,
            fill: 'textSec',
            valign: 'top',
          }),
        )
      }
    }

    return slide('bg', nodes)
  },

  'custom.benefit-trio': (p) => {
    const title = p.title ?? 'What Claude Code unlocks for business'
    const subtitle = p.subtitle ?? 'Three leverage points that matter to a marketing team.'
    const cards = p.cards ?? [
      {
        accent: 'accent1',
        icon: 'assets/icons/business/time-stopwatch--Streamline-Freehand.svg',
        title: 'Speed',
        description: 'Turn repetitive work into a faster, repeatable flow so campaigns move sooner.',
      },
      {
        accent: 'accent2',
        icon: 'assets/icons/programming-apps-websites/database-settings--Streamline-Freehand.svg',
        title: 'Consistency',
        description: 'Keep the same context, prompts, and quality bars across the whole team.',
      },
      {
        accent: 'accent5',
        icon: 'assets/icons/work-office/task-list-clipboard-check--Streamline-Freehand.svg',
        title: 'Leverage',
        description: 'Reuse one well-built workflow many times instead of starting from scratch.',
      },
    ]

    const nodes = [
      oval({ x: -0.4, y: 0.12, w: 1.5, h: 1.5, fill: 'accent1', transparency: 88 }),
      oval({ x: 8.92, y: 0.22, w: 1.1, h: 1.1, fill: 'accent4', transparency: 88 }),
      textNode({
        x: 0.44,
        y: 0.32,
        w: 6.2,
        h: 0.42,
        content: title,
        fontPx: 34,
        fill: 'brand',
        bold: true,
      }),
      textNode({
        x: 0.46,
        y: 0.72,
        w: 6.4,
        h: 0.26,
        content: subtitle,
        fontPx: 18,
        fill: 'textSec',
        italic: true,
      }),
    ]

    const cardPositions = [0.45, 3.55, 6.65]
    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index]
      const x = cardPositions[index]
      nodes.push(
        rect({ x, y: 1.32, w: 2.9, h: 3.8, fill: 'surface', radius: 0.24, shadow: true }),
        rect({ x, y: 1.32, w: 2.9, h: 0.16, fill: card.accent }),
        rect({ x: x + 0.34, y: 1.62, w: 0.72, h: 0.72, fill: card.accent, radius: 0.18 }),
        imageNode({ x: x + 0.42, y: 1.7, w: 0.56, h: 0.56, src: card.icon }),
        textNode({
          x: x + 0.34,
          y: 2.48,
          w: 2.22,
          h: 0.28,
          content: card.title,
          fontPx: 26,
          fill: 'brand',
          bold: true,
          align: 'left',
        }),
        textNode({
          x: x + 0.34,
          y: 2.86,
          w: 2.22,
          h: 1.32,
          content: card.description,
          fontPx: 16,
          fill: 'textSec',
          valign: 'top',
        }),
      )
    }

    return slide('bg', nodes)
  },

  'custom.use-case-cards': (p) => {
    const title = p.title ?? 'Practical marketing workflows'
    const subtitle = p.subtitle ?? 'Start with work that repeats every week.'
    const cards = p.cards ?? [
      {
        accent: 'accent1',
        badge: '1',
        icon: 'assets/icons/business/calendar-grid--Streamline-Freehand.svg',
        title: 'Campaign planning',
        description: 'Draft launch plans, briefs, and asset outlines from a single team prompt.',
      },
      {
        accent: 'accent3',
        badge: '2',
        icon: 'assets/icons/design/content-brush-pen--Streamline-Freehand.svg',
        title: 'Content repurposing',
        description: 'Turn one source into posts, emails, hooks, and summaries without re-starting.',
      },
      {
        accent: 'accent5',
        badge: '3',
        icon: 'assets/icons/data/analytics-board-graph-line--Streamline-Freehand.svg',
        title: 'Reporting loops',
        description: 'Summarize performance, spot patterns, and prepare the next review faster.',
      },
    ]

    const positions = [0.45, 3.55, 6.65]
    const nodes = [
      textNode({
        x: 0.44,
        y: 0.3,
        w: 6.5,
        h: 0.4,
        content: title,
        fontPx: 34,
        fill: 'brand',
        bold: true,
      }),
      textNode({
        x: 0.46,
        y: 0.68,
        w: 7.0,
        h: 0.28,
        content: subtitle,
        fontPx: 18,
        fill: 'textSec',
        italic: true,
      }),
    ]

    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index]
      const x = positions[index]
      nodes.push(
        rect({ x, y: 1.3, w: 2.9, h: 4.0, fill: 'surface', radius: 0.24, shadow: true }),
        rect({ x, y: 1.3, w: 2.9, h: 0.42, fill: card.accent, radius: 0.24 }),
        rect({ x: x + 0.2, y: 1.44, w: 0.42, h: 0.42, fill: 'brand', radius: 0.12, shadow: true }),
        textNode({
          x: x + 0.2,
          y: 1.44,
          w: 0.42,
          h: 0.42,
          content: card.badge,
          fontPx: 20,
          fill: 'onBrand',
          bold: true,
          align: 'center',
          valign: 'middle',
          margin: 0,
        }),
        imageNode({ x: x + 2.1, y: 1.42, w: 0.42, h: 0.42, src: card.icon }),
        textNode({
          x: x + 0.22,
          y: 2.0,
          w: 2.46,
          h: 0.7,
          content: card.title,
          fontPx: 24,
          fill: 'brand',
          bold: true,
        }),
        textNode({
          x: x + 0.22,
          y: 2.9,
          w: 2.46,
          h: 1.4,
          content: card.description,
          fontPx: 16,
          fill: 'textSec',
          valign: 'top',
        }),
      )
    }

    return slide('bg', nodes)
  },

  'custom.vertical-timeline': (p) => {
    const title = p.title ?? 'How to roll it out'
    const subtitle = p.subtitle ?? 'Start small, then standardize, then measure.'
    const steps = p.steps ?? [
      {
        accent: 'accent1',
        title: '1. Pick one repeatable workflow',
        description: 'Start with a weekly task such as campaign briefs, repurposing, or reporting.',
      },
      {
        accent: 'accent3',
        title: '2. Turn it into a team standard',
        description: 'Package the context, prompts, and checks so anyone can run it the same way.',
      },
      {
        accent: 'accent5',
        title: '3. Tie it to business metrics',
        description: 'Track cycle time, output volume, and rework to prove the system is working.',
      },
    ]

    const summaryItems = p.summaryItems ?? ['Cycle time', 'Output volume', 'Reuse rate']

    const nodes = [
      textNode({
        x: 0.44,
        y: 0.3,
        w: 5.8,
        h: 0.4,
        content: title,
        fontPx: 34,
        fill: 'brand',
        bold: true,
      }),
      textNode({
        x: 0.46,
        y: 0.68,
        w: 6.2,
        h: 0.28,
        content: subtitle,
        fontPx: 18,
        fill: 'textSec',
        italic: true,
      }),
      rect({ x: 1.02, y: 1.32, w: 0.08, h: 3.1, fill: 'accent1', radius: 0.04 }),
      rect({ x: 6.95, y: 1.28, w: 2.55, h: 3.92, fill: 'surface', radius: 0.24, shadow: true }),
      rect({ x: 6.95, y: 1.28, w: 2.55, h: 0.18, fill: 'accent2', radius: 0.24 }),
      rect({ x: 7.2, y: 1.55, w: 0.7, h: 0.7, fill: 'accent3', radius: 0.18 }),
      imageNode({ x: 7.3, y: 1.64, w: 0.5, h: 0.5, src: 'assets/illustrations/brand-style/check-list.png' }),
      textNode({
        x: 7.98,
        y: 1.58,
        w: 1.18,
        h: 0.28,
        content: 'Measure',
        fontPx: 22,
        fill: 'brand',
        bold: true,
      }),
      textNode({
        x: 7.2,
        y: 2.38,
        w: 2.0,
        h: 0.28,
        content: 'What to watch',
        fontPx: 18,
        fill: 'textMute',
        italic: true,
      }),
    ]

    for (let index = 0; index < steps.length; index += 1) {
      const step = steps[index]
      const y = 1.4 + index * 1.05
      const badgeY = y + 0.05
      nodes.push(
        rect({ x: 0.82, y: badgeY, w: 0.4, h: 0.4, fill: step.accent, radius: 0.12, shadow: true }),
        textNode({
          x: 0.82,
          y: badgeY,
          w: 0.4,
          h: 0.4,
          content: String(index + 1),
          fontPx: 18,
          fill: 'brand',
          bold: true,
          align: 'center',
          valign: 'middle',
          margin: 0,
        }),
        textNode({
          x: 1.46,
          y,
          w: 5.0,
          h: 0.3,
          content: step.title,
          fontPx: 24,
          fill: 'brand',
          bold: true,
        }),
        textNode({
          x: 1.46,
          y: y + 0.34,
          w: 5.0,
          h: 0.44,
          content: step.description,
          fontPx: 16,
          fill: 'textSec',
          valign: 'top',
        }),
      )
    }

    for (let index = 0; index < summaryItems.length; index += 1) {
      const item = summaryItems[index]
      const y = 2.78 + index * 0.7
      const accent = index === 0 ? 'accent1' : index === 1 ? 'accent3' : 'accent5'
      nodes.push(
        rect({ x: 7.26, y, w: 0.22, h: 0.22, fill: accent, radius: 0.06 }),
        textNode({
          x: 7.56,
          y: y - 0.02,
          w: 1.4,
          h: 0.26,
          content: item,
          fontPx: 18,
          fill: 'textSec',
        }),
      )
    }

    nodes.push(
      rect({ x: 7.18, y: 4.72, w: 2.12, h: 0.4, fill: 'accent4', radius: 0.12 }),
      textNode({
        x: 7.18,
        y: 4.72,
        w: 2.12,
        h: 0.4,
        content: 'Track the system, not the prompts',
        fontPx: 15,
        fill: 'brand',
        bold: true,
        align: 'center',
        valign: 'middle',
        margin: 0,
      }),
    )

    return slide('bg', nodes)
  },

  'bookend.cta': (p) => {
    const title = p.title ?? 'The goal is leverage, not just answers.'
    const subtitle = p.subtitle ?? 'If Claude Code is in the workflow, the workflow can be repeated, delegated, and scaled.'
    const cta = p.cta ?? 'Start with one marketing task this week'
    const illustration = p.illustration ?? 'assets/illustrations/brand-style/rocket.png'
    const author = p.author ?? ''

    return slide('brand', [
      oval({ x: -0.28, y: 0.26, w: 1.8, h: 1.8, fill: 'accent1', transparency: 86 }),
      oval({ x: 8.48, y: 3.88, w: 1.8, h: 1.8, fill: 'accent5', transparency: 86 }),
      rect({ x: 0.55, y: 0.86, w: 8.9, h: 3.9, fill: 'surface', radius: 0.26, shadow: true }),
      rect({ x: 0.55, y: 0.86, w: 8.9, h: 0.16, fill: 'accent3' }),
      rect({ x: 0.86, y: 1.34, w: 2.8, h: 2.9, fill: 'accent1', radius: 0.22 }),
      imageNode({ x: 1.02, y: 1.5, w: 2.45, h: 2.55, src: illustration }),
      textNode({
        x: 4.0,
        y: 1.34,
        w: 4.8,
        h: 0.98,
        content: title,
        fontPx: 38,
        fill: 'brand',
        bold: true,
      }),
      textNode({
        x: 4.0,
        y: 2.3,
        w: 4.9,
        h: 0.92,
        content: subtitle,
        fontPx: 19,
        fill: 'textSec',
        valign: 'top',
      }),
      rect({ x: 4.0, y: 3.42, w: 3.0, h: 0.52, fill: 'accent3', radius: 0.14 }),
      textNode({
        x: 4.0,
        y: 3.42,
        w: 3.0,
        h: 0.52,
        content: cta,
        fontPx: 18,
        fill: 'brand',
        bold: true,
        align: 'center',
        valign: 'middle',
        margin: 0,
      }),
      textNode({
        x: 0.52,
        y: 5.08,
        w: 9.0,
        h: 0.3,
        content: author,
        fontPx: 16,
        fill: 'onBrand',
        bold: true,
        valign: 'middle',
      }),
    ])
  },
}
