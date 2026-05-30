import { CREATOR_DISPLAY_NAME } from '../../src/creatorIdentity.js'

export const meta = {
  title: 'Your AI Design System',
  author: CREATOR_DISPLAY_NAME,
  layout: 'LAYOUT_16x9',
}

export const slides = [
  {
    layout: 'bookend.hero',
    props: {
      title: 'Your AI Design System',
      subtitle: 'Build once. Generate forever.',
      author: CREATOR_DISPLAY_NAME,
    },
  },
  {
    layout: 'bookend.chapter-divider',
    props: {
      partLabel: 'PART 1',
      title: 'How to Build Your Design System',
      icon: 'assets/icons/design/layers-stacked-1--Streamline-Freehand.svg',
      orbAccent: 'accent1',
      badgeAccent: 'accent1',
      pillAccent: 'accent3',
    },
  },
  {
    layout: 'custom.ai-slop-showcase',
    props: {
      header: "You really don't want that for your brand",
      leftImage: 'public/screenshots/powerpoint/YT - AI Design system/slide-02-01.png',
      rightImage: 'public/screenshots/powerpoint/YT - AI Design system/slide-02-02.png',
    },
  },
  {
    layout: 'bookend.chapter-divider',
    props: {
      partLabel: 'PART 2',
      title: 'Design Your First Templates',
      icon: 'assets/icons/design/design-tool-magic-wand--Streamline-Freehand.svg',
      orbAccent: 'accent2',
      badgeAccent: 'accent2',
      pillAccent: 'accent2',
    },
  },
  {
    layout: 'custom.platform-size-guide',
    props: {
      platforms: [
        {
          name: 'LinkedIn',
          logo: 'assets/logos/app/linkedin.svg',
          accentToken: 'accent1',
          cells: [
            { dim: '1080 × 1080 px', note: 'Square carousel' },
            { dim: '1080 × 1350 px', note: 'Portrait format' },
            { dim: '1280 × 720 px', note: '16:9 presentation' },
          ],
        },
        {
          name: 'Instagram',
          logo: 'assets/logos/app/instagram.com.png',
          accentToken: 'accent4',
          cells: [
            { dim: '1080 × 1080 px', note: 'Square carousel' },
            { dim: '1080 × 1350 px', note: 'Portrait format' },
            { dim: '1080 × 1080 px', note: 'Square for Stories' },
          ],
        },
        {
          name: 'YouTube',
          logo: 'assets/logos/app/youtube.com.png',
          accentToken: 'accent5',
          cells: [
            { dim: 'N/A', note: 'Not a native format' },
            { dim: '1280 × 720 px', note: 'Thumbnail size' },
            { dim: '1280 × 720 px', note: '16:9 presentation' },
          ],
        },
      ],
    },
  },
]

export default { meta, slides }
