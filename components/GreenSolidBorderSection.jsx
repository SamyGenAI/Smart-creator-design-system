import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * GreenSolidBorderSection
 * Figma node: 66:753 (green-border-section)
 */
export default function GreenSolidBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="green"
      variant="solid"
      widthClass="w-[470px]"
      rootName="green-border-section"
      nodeIds={{
        root: "66:753",
        header: "66:748",
        title: "66:749",
        badgeGroup: "66:750",
        badge: "66:751",
        number: "66:752",
      }}
    />
  )
}
