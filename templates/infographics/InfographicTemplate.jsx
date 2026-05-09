/**
 * InfographicTemplate — 1080×1350px LinkedIn infographic template.
 * Mirrors the "The ultimate Claude guide" layout from Figma exactly.
 * Figma node: 5:15871
 */

import InfographicHeader from '../../components/InfographicHeader.jsx'
import SquareGridTexture from '../../components/SquareGridTexture.jsx'
import PrimaryGlassSection from '../../components/PrimaryGlassSection.jsx'
import InfographicFooter from '../../components/InfographicFooter.jsx'
import PastelShadowBorderCard from '../../components/PastelShadowBorderCard.jsx'
import NumberBullet from '../../components/NumberBullet.jsx'
import Checklist from '../../components/Checklist.jsx'
import IconBullet from '../../components/IconBullet.jsx'
import Table from '../../components/Table.jsx'
import Grid8CompanyLogos from '../../components/Grid8CompanyLogos.jsx'
import TextBox from '../../components/TextBox.jsx'
import ColoredTextBoxes from '../../components/ColoredTextBoxes.jsx'

export default function InfographicTemplate({ data = {} }) {
  const {
    title = "Your Title Here",
    highlightWord = null,
    subtitle = null,
    row1 = {},
    row2 = {},
    row3 = {},
    row4 = {},
    footer = {},
  } = data

  return (
    <div
      className="bg-[#fffceb] content-stretch flex gap-[10px] items-center justify-center relative"
      style={{ width: '1080px', height: '1350px', flexShrink: 0, overflow: 'hidden' }}
      data-name="Infographic"
      data-node-id="5:15871"
    >
      <SquareGridTexture />

      <div
        className="content-stretch flex flex-col gap-[22px] h-full items-center justify-center relative shrink-0 w-[981px]"
        data-name="Main"
        data-node-id="54:914"
      >
        <div className="max-h-[208px] overflow-hidden shrink-0 w-full">
          <InfographicHeader
            title={title}
            highlightWord={highlightWord}
            subtitle={subtitle}
          />
        </div>

        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 1"
          data-node-id="48:489"
        >
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
            data-name="Card 1"
            data-node-id="50:487"
          >
            <PrimaryGlassSection
              title={row1.card1?.title || "xxx"}
              iconSrc={row1.card1?.iconSrc || null}
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[257px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[321px]"
              data-node-id="41:421"
            />
            <div
              className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[36px] mt-[58px] place-items-start relative row-1"
              data-node-id="50:488"
            >
              <Checklist
                title={row1.card1?.checklist?.title || null}
                items={row1.card1?.checklist?.items || ["xxx", "xxx", "xxx"]}
                className="col-1 h-[189px] ml-0 mt-0 relative row-1 w-[236px]"
              />
            </div>
          </div>

          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[344px] mt-0 place-items-start relative row-1"
            data-name="Card 2"
            data-node-id="50:485"
          >
            <PrimaryGlassSection
              title={row1.card2?.title || "xxx"}
              iconSrc={row1.card2?.iconSrc || null}
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[257px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[633px]"
              data-node-id="41:400"
            />
            {row1.card2?.imageSrc && (
              <div
                className="border border-[#e6e6e6] border-solid col-1 h-[169px] ml-[331px] mt-[70px] relative rounded-[8px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[275px]"
                data-name="image 2"
                data-node-id="50:383"
              >
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={row1.card2.imageSrc} />
              </div>
            )}
            <div
              className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[29px] mt-[66px] place-items-start relative row-1"
              data-node-id="50:486"
            >
              <IconBullet
                items={row1.card2?.iconBullet?.items || []}
                accentColor="var(--components\\/card-title\\/accent-1,var(--theme-accent-1))"
                className="col-1 h-[173px] ml-0 mt-0 relative row-1 w-[319px]"
              />
            </div>
          </div>
        </div>

        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 2"
          data-node-id="41:497"
        >
          <PrimaryGlassSection
            title={row2.title || "xxx"}
            iconSrc={row2.iconSrc || null}
            className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[225px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[977px]"
            data-node-id="41:440"
          />
          <IconBullet
            items={row2.iconBullet?.items || []}
            accentColor="var(--components\\/card-title\\/accent-3,var(--theme-accent-3))"
            className="col-1 h-[173px] ml-[29px] mt-[68px] relative row-1 w-[319px]"
            data-node-id="41:543"
          />
          {row2.imageSrc && (
            <div
              className="col-1 h-[137px] ml-[724px] mt-[68px] relative rounded-[8px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[232px]"
              data-name="image 3"
              data-node-id="5:15964"
            >
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={row2.imageSrc} />
            </div>
          )}
          <Table
            headers={row2.table?.headers || ["xxxxxxx", "xxxxxxx", "xxxxxxx"]}
            rows={row2.table?.rows || [["xxxxxxx", "xxxxxxx", "xxxxxxx"], ["xxxxxxx", "xxxxxxx", "xxxxxxx"], ["xxxxxxx", "xxxxxxx", "xxxxxxx"]]}
            className="col-1 h-[133px] ml-[304px] mt-[70px] relative row-1 w-[389px]"
          />
        </div>

        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 3"
          data-node-id="50:257"
        >
          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1"
            data-name="Card 1"
            data-node-id="50:340"
          >
            <PrimaryGlassSection
              title={row3.card1?.title || "xxx"}
              iconSrc={row3.card1?.iconSrc || null}
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[314px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[321px]"
              data-node-id="50:196"
            />
            {row3.card1?.sectionTitle && (
              <div className="col-1 flex flex-col font-['Montserrat',sans-serif] font-bold justify-center ml-[18px] mt-[82px] relative row-1 text-[14px] text-[color:var(--text\/primary,black)] tracking-[-0.42px] w-[158px]" data-node-id="50:256">
                <p className="leading-[normal]">{row3.card1.sectionTitle}</p>
              </div>
            )}
            <NumberBullet
              items={row3.card1?.numberBullet?.items || ["xxxxxxx", "xxxxxx", "xxxxxx"]}
              className="col-1 h-[138px] ml-[18px] mt-[135px] relative row-1 w-[179px]"
            />
          </div>

          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[344px] mt-0 place-items-start relative row-1"
            data-name="Card 2"
            data-node-id="50:339"
          >
            <PrimaryGlassSection
              title={row3.card2?.title || "xxx"}
              iconSrc={row3.card2?.iconSrc || null}
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[314px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[308px]"
              data-node-id="50:258"
            />
            {row3.card2?.sectionTitle && (
              <div className="col-1 flex flex-col font-['Montserrat',sans-serif] font-bold h-[18px] justify-center ml-[18px] mt-[85px] relative row-1 text-[14px] text-[color:var(--text\/primary,black)] tracking-[-0.42px] w-[164px]" data-node-id="50:334">
                <p className="leading-[normal]">{row3.card2.sectionTitle}</p>
              </div>
            )}
            <Grid8CompanyLogos
              logos={row3.card2?.logos}
              className="col-1 h-[112px] ml-[18px] mt-[185px] relative row-1 w-[272px]"
            />
          </div>

          <div
            className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[673px] mt-0 place-items-start relative row-1"
            data-name="Card 3"
            data-node-id="53:544"
          >
            <PrimaryGlassSection
              title={row3.card3?.title || "xxx"}
              iconSrc={row3.card3?.iconSrc || null}
              className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[314px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[308px]"
              data-node-id="50:526"
            />
            {row3.card3?.sectionTitle && (
              <div className="col-1 flex flex-col font-['Montserrat',sans-serif] font-bold justify-center ml-[12px] mt-[68px] relative row-1 text-[14px] text-[color:var(--text\/primary,black)] tracking-[-0.42px] w-[144px]" data-node-id="53:622">
                <p className="leading-[normal]">{row3.card3.sectionTitle}</p>
              </div>
            )}
            <div className="border-2 border-black border-dashed col-1 h-[123px] ml-[12px] mt-[122px] rounded-[12px] row-1 w-[271px]" data-node-id="5:16128" />
            <ColoredTextBoxes
              color={row3.card3?.colorBoxColor || "var(--components\\/card-title\\/accent-2,var(--theme-accent-2))"}
              className="col-1 h-[98px] ml-[19px] mt-[135px] relative row-1 w-[172px]"
            />
            <TextBox
              text=""
              className="col-1 h-[34px] ml-[212px] mt-[135px] relative row-1 w-[56px]"
            />
            <TextBox
              text=""
              className="col-1 h-[34px] ml-[212px] mt-[199px] relative row-1 w-[56px]"
            />
            {row3.card3?.highlightText && (
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[113px] mt-[261px] place-items-start relative row-1" data-name="text-highlight" data-node-id="53:543">
                <div className="col-1 h-[35.197px] ml-0 mt-0 relative row-1 w-[107px] bg-[var(--theme-accent-1)] rounded-[4px]" data-node-id="5:15873" />
                <div className="col-1 flex flex-col font-['Montserrat',sans-serif] font-bold justify-center ml-[2.82px] mt-[4.22px] relative row-1 text-[19.711px] text-[color:var(--text\/primary,black)] tracking-[-0.5913px] w-[104.184px]" data-node-id="5:16106">
                  <p className="leading-[normal]">{row3.card3.highlightText}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0"
          data-name="Row 4"
          data-node-id="54:830"
        >
          <PrimaryGlassSection
            title={row4.title || "xxx"}
            iconSrc={row4.iconSrc || null}
            className="bg-[rgba(255,255,255,0.1)] border-3 border-solid border-white col-1 content-stretch flex flex-col gap-[10px] h-[176px] items-start ml-0 mt-0 relative rounded-[20px] row-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[981px]"
            data-node-id="53:545"
          />
          {row4.sectionTitle && (
            <div className="col-1 flex flex-col font-['Montserrat',sans-serif] font-medium justify-center ml-[32px] mt-[65px] relative row-1 text-[14px] text-black tracking-[-0.42px] w-[144px]" data-node-id="5:16137">
              <p className="leading-[normal]">{row4.sectionTitle}</p>
            </div>
          )}
          <PastelShadowBorderCard
            text={row4.pastelCard?.text || "xxx"}
            className="col-1 h-[161px] ml-[258px] mt-[61px] relative row-1 w-[381px]"
          />
          <div className="col-1 h-[136px] ml-[479px] mt-[61px] relative row-1 w-[236px]" data-name="Checklist" data-node-id="53:575">
            <Checklist
              title={row4.checklist1?.title || null}
              items={row4.checklist1?.items || ["xxx", "xxx"]}
              className="h-full w-full relative"
            />
          </div>
          <div className="col-1 h-[136px] ml-[715px] mt-[61px] relative row-1 w-[236px]" data-name="Checklist" data-node-id="53:602">
            <Checklist
              title={null}
              items={row4.checklist2?.items || ["xxx", "xxx"]}
              className="h-full w-full relative"
            />
          </div>
        </div>

        <InfographicFooter
          avatarSrc={footer.avatarSrc || "/assets/avatar/avatar-profile.png"}
          name={footer.name || "Samy Chouaf"}
          className="h-[60px] relative shrink-0 w-[1048px]"
        />
      </div>
    </div>
  )
}
