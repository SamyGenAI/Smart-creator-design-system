/**
 * InfographicFooter — navy pill bar at the bottom of every infographic.
 * Figma node: 54:894  (infographic-footer)
 *
 * Props:
 *   avatarSrc   string   — path to profile picture (e.g. "/assets/avatar/profile.jpg")
 *   name        string   — display name (default: "Samy Chouaf")
 *   className   string   — overrides dimensions/positioning
 */
export default function InfographicFooter({ avatarSrc = "/assets/avatar/profile.jpg", name = "Samy Chouaf", className }) {
  return (
    <div
      className={className || "h-[60px] relative w-[1048px]"}
      data-name="infographic-footer"
      data-node-id="54:894"
    >
      {/* Navy pill background */}
      <div
        className="absolute bg-[var(--color\/blue\/500,#092c69)] border-3 border-solid border-white inset-0 rounded-[40px]"
        data-node-id="I5:16215;5:15844"
      />

      {/* "Follow for more" label */}
      <div
        className="absolute flex flex-col font-['Montserrat',sans-serif] font-semibold inset-[30%_50.27%_21.67%_25.5%] justify-center leading-[0] text-[24px] text-white tracking-[-0.72px]"
        data-node-id="I5:16215;5:15845"
      >
        <p className="leading-[normal]">Follow for more</p>
      </div>

      {/* Creator name */}
      <div
        className="absolute flex flex-col font-['Montserrat',sans-serif] font-semibold inset-[28.33%_25.69%_23.33%_50.09%] justify-center leading-[0] text-[24px] text-white tracking-[-0.72px]"
        data-node-id="I5:16215;5:15846"
      >
        <p className="leading-[normal]">{name}</p>
      </div>

      {/* Avatar */}
      <div
        className="absolute aspect-[44/44] border-2 border-solid border-white left-[44.24%] right-[51.74%] rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[7px]"
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
