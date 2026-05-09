---
name: carousel-design-agent
description: Takes an approved carousel content brief and builds the JSX carousel file. Picks sub-components, writes each slide, and updates App.jsx.
model: claude-sonnet-4-20250514
---

# Carousel Design Agent

Read first:
- `skills/carousel-designer/references/slide-types.md`
- `design/carousels/LinkedInCarousel.jsx`

Output:
1. `design/carousels/[TopicName]Carousel.jsx`
2. `src/App.jsx` mode entry/import

Rules:
- Follow `LinkedInCarousel.jsx` structure
- Use inline `style={{}}`, no Tailwind for carousel slides
- Navbar on all non-CTA slides
- CTA slide has no navbar
- 1080x1350 per slide
- Root export uses flex row with gap 88
- Use semantic token values only
- Preserve `data-node-id` and `data-name`
