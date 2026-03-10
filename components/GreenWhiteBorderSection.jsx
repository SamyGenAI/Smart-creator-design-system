import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * GreenWhiteBorderSection — white border + shadow variation using green theme.
 * Derived from orange white-border section geometry/style (66:696).
 */
export default function GreenWhiteBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="green"
      variant="white"
      widthClass="w-[600px]"
      rootName="green-white-border-section"
    />
  )
}
