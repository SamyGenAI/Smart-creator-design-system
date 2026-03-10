/**
 * Table — 3-column data table with amber header and alternating amber rows.
 * Figma node: 47:1203  (Table)
 * Layout: 3 columns × 4 rows (1 header + 3 data rows).
 *
 * Props:
 *   headers     string[3]    — column header labels
 *   rows        string[3][3] — 3 data rows × 3 columns
 *   className   string       — overrides dimensions/positioning
 */
export default function Table({
  headers = ["xxxxxxx", "xxxxxxx", "xxxxxxx"],
  rows = [
    ["xxxxxxx", "xxxxxxx", "xxxxxxx"],
    ["xxxxxxx", "xxxxxxx", "xxxxxxx"],
    ["xxxxxxx", "xxxxxxx", "xxxxxxx"],
  ],
  className,
}) {
  // Row vertical insets from Figma (top, bottom as %)
  const rowBgInsets = [
    "0_0_74.02%_0",      // header row bg
    "23.62%_0_50.39%_0", // row 1 bg
    "48.82%_0_25.2%_0",  // row 2 bg
    "74.02%_0_0_0",      // row 3 bg
  ]

  // Column text horizontal insets [left%, right%]
  const colTextH = [
    { left: "6.41%", right: "70.26%" },  // col 1
    { left: "42.82%", right: "33.85%" }, // col 2
    { left: "73.59%", right: "3.08%" },  // col 3
  ]

  // Header row text vertical insets
  const headerV = { top: "6.02%", bottom: "81.2%" }

  // Data row text vertical insets
  const dataRowV = [
    { top: "30.08%", bottom: "57.14%" },
    { top: "54.89%", bottom: "32.33%" },
    { top: "78.95%", bottom: "8.27%" },
  ]

  return (
    <div
      className={className || "h-[133px] relative w-[390px]"}
      data-name="Table"
      data-node-id="47:1203"
    >
      {/* Row backgrounds */}
      <div className="absolute bg-[var(--components\/card-title\/amber,#fde68a)] border border-black border-solid" style={{ inset: rowBgInsets[0].split('_').join(' ') }} data-node-id="47:1151" />
      {[1, 2, 3].map(i => (
        <div key={i} className="absolute bg-[var(--components\/card\/amber,#fef3c7)] border border-black border-solid" style={{ inset: rowBgInsets[i].split('_').join(' ') }} data-node-id={`47:${1151 + i * 2}`} />
      ))}

      {/* Vertical column dividers */}
      <div className="absolute flex inset-[0_32.05%_0_67.95%] items-center justify-center">
        <div className="flex-none h-px rotate-90 w-[133px]">
          <div className="relative size-full border-t border-black" data-node-id="47:1174" />
        </div>
      </div>
      <div className="absolute flex inset-[0_64.74%_0_35.26%] items-center justify-center">
        <div className="flex-none h-px rotate-90 w-[133px]">
          <div className="relative size-full border-t border-black" data-node-id="47:1173" />
        </div>
      </div>

      {/* Header text */}
      {headers.map((h, ci) => (
        <div
          key={`h${ci}`}
          className="absolute flex flex-col font-['Montserrat',sans-serif] font-semibold justify-center leading-[0] text-[14px] text-black tracking-[-0.42px]"
          style={{ inset: `${headerV.top} ${colTextH[ci].right} ${headerV.bottom} ${colTextH[ci].left}` }}
          data-node-id={`47:${1183 + ci * 2}`}
        >
          <p className="leading-[normal]">{h}</p>
        </div>
      ))}

      {/* Data rows */}
      {rows.slice(0, 3).map((row, ri) =>
        row.slice(0, 3).map((cell, ci) => (
          <div
            key={`r${ri}c${ci}`}
            className="absolute flex flex-col font-['Montserrat',sans-serif] font-medium justify-center leading-[0] text-[14px] text-black tracking-[-0.42px]"
            style={{ inset: `${dataRowV[ri].top} ${colTextH[ci].right} ${dataRowV[ri].bottom} ${colTextH[ci].left}` }}
            data-node-id={`47:${1189 + ri * 3 + ci}`}
          >
            <p className="leading-[normal]">{cell}</p>
          </div>
        ))
      )}
    </div>
  )
}
