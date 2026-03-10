import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * BlueSolidBorderSection
 * Figma node: 66:725 (blue-border-section)
 */
export default function BlueSolidBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="blue"
      variant="solid"
      widthClass="w-[415px]"
      rootName="blue-border-section"
      nodeIds={{
        root: "66:725",
        header: "66:720",
        title: "66:721",
        badgeGroup: "66:722",
        badge: "66:723",
        number: "66:724",
      }}
    />
  )
}
