import { CREATOR_DISPLAY_NAME } from '../../../../src/creatorIdentity.js'
import { layouts } from './layouts.mjs'

export const meta = {
  title: 'AI Design System for YouTube Creators',
  author: CREATOR_DISPLAY_NAME,
  layout: 'LAYOUT_16x9',
}

export const slides = [
  {
    layout: 'custom.human-agent-transition',
    props: {
      leftImage: 'assets/illustrations/notion-style/oc-thinking.svg',
      rightImage: 'assets/illustrations/notion-style/notion-ai-agent.svg',
      leftLabel: 'Human creator',
      rightLabel: 'AI design agent',
    },
  },
  {
    layout: 'bookend.chapter-divider',
    props: {
      partLabel: 'PART 1',
      title: 'How to build your design system',
      icon: 'assets/icons/design/design-tool-brush-ruler--Streamline-Freehand.svg',
      orbAccent: 'accent1',
      badgeAccent: 'accent1',
      pillAccent: 'accent3',
    },
  },
  {
    layout: 'custom.ai-slop-showcase',
    props: {
      header: "You really don't want that for your brand",
      caption: 'AI slop: inconsistent, generic, off-brand',
      leftImage: 'public/screenshots/powerpoint/YT - AI Design system/slide 02 - 1.png',
      rightImage: 'public/screenshots/powerpoint/YT - AI Design system/slide 02 - 2.png',
    },
  },
  {
    layout: 'bookend.chapter-divider',
    props: {
      partLabel: 'PART 2',
      title: 'Design your first templates',
      icon: 'assets/icons/design/layers-stacked-1--Streamline-Freehand.svg',
      orbAccent: 'accent5',
      badgeAccent: 'accent5',
      pillAccent: 'accent1',
    },
  },
  {
    layout: 'custom.platform-size-guide',
    props: {
      title: 'Social Media Asset Size Guide',
      colHeaders: ['Carousel', 'Infographic', 'Slides'],
      colHeaderAccents: ['accent1', 'accent3', 'accent5'],
      platforms: [
        {
          name: 'LinkedIn',
          logo: 'assets/logos/app/linkedin.svg',
          accentToken: 'accent1',
          cells: [
            { dim: '1080 × 1350', note: 'PDF carousel pages' },
            { dim: '1080 × 1350', note: 'Tall feed infographic' },
            { dim: '1920 × 1080', note: '16:9 video / webinar' },
          ],
        },
        {
          name: 'Instagram',
          logo: 'assets/logos/app/instagram.com.png',
          accentToken: 'accent4',
          cells: [
            { dim: '1080 × 1350', note: 'Portrait carousel' },
            { dim: '1080 × 1350', note: 'Feed infographic' },
            { dim: '1920 × 1080', note: 'Reel cover / story frame' },
          ],
        },
        {
          name: 'YouTube',
          logo: 'assets/logos/app/youtube.com.png',
          accentToken: 'accent5',
          cells: [
            { dim: '1280 × 720', note: 'Thumbnail sequence' },
            { dim: '1080 × 1080', note: 'Community visual' },
            { dim: '1920 × 1080', note: 'Presentation / video' },
          ],
        },
      ],
    },
  },
]

export default { meta, slides, layouts }
