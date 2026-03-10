import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * BlueWhiteBorderSection — white border + shadow variation using blue theme.
 * Derived from orange white-border section geometry/style (66:696).
 */
export default function BlueWhiteBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="blue"
      variant="white"
      widthClass="w-[600px]"
      rootName="blue-white-border-section"
    />
  )
}
