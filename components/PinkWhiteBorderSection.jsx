import BrandBorderSectionBase from "./BrandBorderSectionBase"

/**
 * PinkWhiteBorderSection — white border + shadow variation using pink theme.
 * Derived from orange white-border section geometry/style (66:696).
 */
export default function PinkWhiteBorderSection(props) {
  return (
    <BrandBorderSectionBase
      {...props}
      theme="pink"
      variant="white"
      widthClass="w-[600px]"
      rootName="pink-white-border-section"
    />
  )
}
