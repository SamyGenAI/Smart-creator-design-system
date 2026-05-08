/**
 * Grid8CompanyLogos — 4×2 grid of company logo cards with white backgrounds.
 * Figma node: 51:342  (grid-8-company-logos)
 *
 * Props:
 *   logos       {src, alt}[8]  — array of exactly 8 logo objects
 *                                app icons → assets/logos/app/{domain}.png
 *                                wordmarks → assets/logos/text/{domain}.svg
 *   className   string         — overrides dimensions/positioning
 *
 * IMAGE CONTAINMENT PATTERN — do not change:
 *   Each cell div is the absolute-positioned container (inset via style).
 *   The img inside uses w-full h-full object-contain so it fills the cell.
 *   Never wrap cell children in display:contents — it breaks the bounding box
 *   and object-contain has nothing to constrain against.
 */
export default function Grid8CompanyLogos({
  logos = [
    { src: "/assets/logos/app/notion.com.png",           alt: "Notion" },
    { src: "/assets/logos/app/figma.com.png",            alt: "Figma" },
    { src: "/assets/logos/app/hubspot.com.png",          alt: "HubSpot" },
    { src: "/assets/logos/app/atlassian.com.png",        alt: "Atlassian" },
    { src: "/assets/logos/app/drive.google.com.png",     alt: "Google Drive" },
    { src: "/assets/logos/app/calendar.google.com.png",  alt: "Google Calendar" },
    { src: "/assets/logos/app/mail.google.com.png",      alt: "Gmail" },
    { src: "/assets/logos/app/google.com.png",           alt: "Google" },
  ],
  className,
}) {
  const cells = [
    { inset: "0_81.62%_55.36%_0" },
    { inset: "0_54.41%_55.36%_27.21%" },
    { inset: "0_27.21%_55.36%_54.41%" },
    { inset: "0_0_55.36%_81.62%" },
    { inset: "55.36%_81.62%_0_0" },
    { inset: "55.36%_54.41%_0_27.21%" },
    { inset: "55.36%_27.21%_0_54.41%" },
    { inset: "55.36%_0_0_81.62%" },
  ]

  return (
    <div
      className={className || "h-[112px] relative w-[272px]"}
      data-name="grid-8-company-logos"
      data-node-id="51:342"
    >
      {cells.map((cell, i) => {
        const logo = logos[i]
        return (
          <div
            key={i}
            className="absolute bg-white rounded-[5px] shadow-card flex items-center justify-center p-1"
            style={{ inset: cell.inset.split('_').join(' ') }}
          >
            {logo?.src && (
              <img
                alt={logo?.alt || ""}
                className="w-full h-full object-contain pointer-events-none"
                src={logo.src}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
