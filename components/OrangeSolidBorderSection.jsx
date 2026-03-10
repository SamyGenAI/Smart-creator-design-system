import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * OrangeSolidBorderSection
 * Figma node: 66:711 (orange-border-section)
 */
export default function OrangeSolidBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="orange"
      variant="solid"
      widthClass="w-[415px]"
      rootName="orange-border-section"
      nodeIds={{
        root: "66:711",
        header: "66:706",
        title: "66:707",
        badgeGroup: "66:708",
        badge: "66:709",
        number: "66:710",
      }}
    />
  )
}
