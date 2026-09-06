/**
 * SocialListeningThumbnail — 420×300 newsletter thumbnail.
 * Topic: "Social Listening routine" · Visual: empty (grid texture only)
 *
 * Reference implementation of the newsletter-thumbnail format — matches the
 * Figma source (Newsletter-thumbnail 27:123).
 */
import NewsletterThumbnailCanvas from '../../components/newsletter-thumbnail/NewsletterThumbnailCanvas.jsx'
import NewsletterThumbnailTitle from '../../components/newsletter-thumbnail/NewsletterThumbnailTitle.jsx'
import NewsletterThumbnailVisual from '../../components/newsletter-thumbnail/NewsletterThumbnailVisual.jsx'

export default function SocialListeningThumbnail() {
  return (
    <NewsletterThumbnailCanvas>
      <NewsletterThumbnailTitle
        title="Social Listening routine"
        highlightWord="Social Listening"
      />
      <NewsletterThumbnailVisual variant="empty" />
    </NewsletterThumbnailCanvas>
  )
}
