import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * PinkSolidBorderSection
 * Figma node: 66:739 (pink-border-section)
 */
export default function PinkSolidBorderSection({ widthClass, ...props }) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="pink"
      variant="solid"
      widthClass={widthClass || "w-[470px]"}
      rootName="pink-border-section"
      nodeIds={{
        root: "66:739",
        header: "66:734",
        title: "66:735",
        badgeGroup: "66:736",
        badge: "66:737",
        number: "66:738",
      }}
    />
  )
}
