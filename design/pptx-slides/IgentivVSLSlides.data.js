// design/pptx-slides/IgentivVSLSlides.data.js
export const SLIDE_DATA = {
  meta: {
    title: 'Igentiv VSL',
    authorName: 'Samy Chouaf',
  },
  slides: [
    // s1 — Cover (unchanged)
    {
      id: 's1',
      layout: 'cover',
      title: 'B2B Expertise, Built for Revenue',
      subtitle: 'Consultant turned content strategist',
      illustration: '/assets/illustrations/notion-style/oc-handshake.svg',
      accentWord: 'Revenue',
    },
    // s2 — The problem (custom layout with visual icons)
    { id: 's2', layout: 'custom-problem' },
    // s3 — The solution (custom 2-card layout)
    { id: 's3', layout: 'custom-solution' },
    // s4 — How it works (bullets)
    {
      id: 's4',
      layout: 'bullets',
      title: 'How We Do It',
      bullets: [
        {
          icon: '/assets/icons/design/layers-stacked-1--Streamline-Freehand.svg',
          label: 'Brand System',
          desc: 'Design system, voice, structured context built first.',
        },
        {
          icon: '/assets/icons/design/content-brush-pen--Streamline-Freehand.svg',
          label: 'Weekly Content',
          desc: 'AI + human systems. Your audience can\'t tell.',
        },
        {
          icon: '/assets/icons/data/analytics-graph-bar-horizontal--Streamline-Freehand.svg',
          label: 'Fresh Leads',
          desc: 'Matched to your ICP, filtered by intent signals.',
        },
      ],
    },
    // s5 — Bold closing statement
    {
      id: 's5',
      layout: 'statement',
      statement: 'We position you as the expert, find the leads, you close.',
      accent: 'you close',
      sub: 'Book a 15-min call. No pitch, just conversation.',
    },
    // s6 — End CTA
    {
      id: 's6',
      layout: 'end',
      authorName: 'Samy Chouaf',
    },
  ],
}
