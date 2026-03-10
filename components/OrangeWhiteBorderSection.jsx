import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * OrangeWhiteBorderSection
 * Figma node: 66:696 (orange-white-border-section)
 */
export default function OrangeWhiteBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="orange"
      variant="white"
      widthClass="w-[600px]"
      rootName="orange-white-border-section"
      nodeIds={{
        root: "66:696",
        header: "66:666",
        title: "66:667",
        badgeGroup: "66:693",
        badge: "66:686",
        number: "66:688",
      }}
    />
  )
}
