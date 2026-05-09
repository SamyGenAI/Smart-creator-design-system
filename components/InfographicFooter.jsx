/**
 * InfographicFooter — primary brand pill bar at the bottom of every infographic.
 * Figma node: 54:894  (infographic-footer)
 *
 * Props:
 *   avatarSrc   string   — path to profile picture (e.g. "/assets/avatar/avatar-profile.png")
 *   name        string   — display name (default: "Your Full Name" until @setup replaces it)
 *   className   string   — overrides dimensions/positioning
 */
const COLOR_PRIMARY = "var(--theme-color-primary)"
const COLOR_ON_PRIMARY = "var(--theme-color-on-primary)"
const FONT_TITLE = "var(--font\\/family\\/title)"
const SHADOW_CARD = "var(--theme-shadow-card)"

export default function InfographicFooter({
  avatarSrc = "/assets/avatar/avatar-profile.png",
  name = "Your Full Name",
  className,
}) {
  return (
    <div
      className={className || "h-[60px] relative w-[1048px]"}
      data-name="infographic-footer"
      data-node-id="54:894"
    >
      {/* Primary pill background */}
      <div
        className="absolute border-3 border-solid inset-0 rounded-[40px]"
        style={{ backgroundColor: COLOR_PRIMARY, borderColor: COLOR_ON_PRIMARY }}
        data-node-id="I5:16215;5:15844"
      />

      {/* "Follow for more" label */}
      <div
        className="absolute flex flex-col font-semibold inset-[30%_50.27%_21.67%_25.5%] justify-center leading-[0] text-[24px] tracking-[-0.72px]"
        style={{ color: COLOR_ON_PRIMARY, fontFamily: FONT_TITLE }}
        data-node-id="I5:16215;5:15845"
      >
        <p className="leading-[normal]">Follow for more</p>
      </div>

      {/* Creator name */}
      <div
        className="absolute flex flex-col font-semibold inset-[28.33%_25.69%_23.33%_50.09%] justify-center leading-[0] text-[24px] tracking-[-0.72px]"
        style={{ color: COLOR_ON_PRIMARY, fontFamily: FONT_TITLE }}
        data-node-id="I5:16215;5:15846"
      >
        <p className="leading-[normal]">{name}</p>
      </div>

      {/* Avatar */}
      <div
        className="absolute aspect-[44/44] border-2 border-solid left-[44.24%] right-[51.74%] rounded-[40px] top-[7px]"
        style={{ boxShadow: SHADOW_CARD, borderColor: COLOR_ON_PRIMARY }}
        data-name="avatar"
        data-node-id="I5:16215;5:15847"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[40px]">
          {avatarSrc && (
            <img alt={name} className="absolute left-0 max-w-none size-full top-0 object-cover" src={avatarSrc} />
          )}
        </div>
      </div>
    </div>
  )
}
