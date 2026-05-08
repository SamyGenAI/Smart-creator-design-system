import { renderSlide } from '../../components/SlideLayouts.jsx'
import { SLIDE_DATA_TEMPLATE } from './SlidesTemplate.data.js'

export default function SlidesTemplate({ slideData = SLIDE_DATA_TEMPLATE }) {
  return (
    <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
      {slideData.slides.map(renderSlide)}
    </div>
  )
}
