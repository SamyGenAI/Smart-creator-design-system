import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

export const SLIDE_DATA_TEMPLATE = {
  meta: {
    title: 'Template Deck Title',
    authorName: CREATOR_DISPLAY_NAME,
  },
  slides: [
    {
      id: 's1',
      layout: 'cover',
      title: 'Template Cover Title',
      subtitle: 'Template subtitle',
      accentWord: 'Template',
      illustration: '/assets/illustrations/notion-style/oc-on-the-laptop.svg',
    },
    {
      id: 's2',
      layout: 'content',
      title: 'One clear idea',
      body: [
        'Paragraph one for context.',
        'Paragraph two for details.',
      ],
    },
    {
      id: 's3',
      layout: 'end',
      authorName: CREATOR_DISPLAY_NAME,
    },
  ],
}
