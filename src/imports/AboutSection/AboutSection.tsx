import svgPaths from "./svg-s1i9qf01my";
import imgImage from "./400481b24bdc692161b886edf58eada3268fa9ba.png";

function CtaLink() {
  return (
    <div className="absolute h-[24px] left-0 top-[462px] w-[241px]" data-name="CTA-Link">
      <div className="absolute h-[10px] left-[218px] top-[7px] w-[18px]" data-name="Vector">
        <div className="absolute inset-[-10%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 12">
            <path d="M19 6L14 1M19 6L14 11M19 6H1" id="Vector" stroke="var(--stroke-0, #015AAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-0 not-italic text-[#015aaa] text-[20px] top-[12px] tracking-[0.4px] whitespace-nowrap">
        <p className="leading-[normal]">Learn more about us</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[16.73%_12.49%_12.5%_16.67%]" data-name="Group">
      <div className="absolute inset-[-3.29%_-3.28%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.6877 48.6473">
          <g id="Group">
            <path d={svgPaths.pe5e6700} id="Vector" stroke="var(--stroke-0, #015AAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            <path d={svgPaths.p1ba05580} id="Vector_2" stroke="var(--stroke-0, #015AAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Hours() {
  return (
    <div className="-translate-x-1/2 absolute left-[calc(50%+0.25px)] overflow-clip size-[64.5px] top-[10.75px]" data-name="hours-24">
      <Group />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[166px] left-[419px] top-0 w-[116px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[54px] justify-center leading-[0] left-1/2 text-[18px] text-black text-center top-[139px] tracking-[0.36px] w-[116px]">
        <p className="leading-[normal] mb-0">24/7 Threat</p>
        <p className="leading-[normal]">Monitoring</p>
      </div>
      <Hours />
    </div>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <div className={className || "-translate-x-1/2 absolute h-[72px] left-[calc(50%+0.25px)] overflow-clip top-[12px] w-[64.5px]"} data-name="Shield_Check-Icon">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[53.54px] left-1/2 top-[calc(50%-0.23px)] w-[48px]" data-name="Vector">
        <div className="absolute inset-[-2.8%_-3.12%_-2.8%_-3.13%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 56.5404">
            <path d={svgPaths.p35f7eb80} id="Vector" stroke="var(--stroke-0, #015AAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[166px] left-[211px] top-0 w-[108px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Manrope:Bold',sans-serif] font-bold h-[54px] justify-center leading-[0] left-1/2 text-[18px] text-black text-center top-[139px] tracking-[0.36px] w-[108px]">
        <p className="leading-[normal] mb-0">Proactive</p>
        <p className="leading-[normal]">Protection</p>
      </div>
      <ShieldCheckIcon />
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <div className={className || "-translate-x-1/2 absolute h-[72px] left-[calc(50%-0.25px)] overflow-clip top-[12px] w-[64.5px]"} data-name="Users-Icon">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[45px] left-[calc(50%+0.38px)] top-1/2 w-[54px]" data-name="Vector">
        <div className="absolute inset-[-3.33%_-2.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57 48">
            <path d={svgPaths.p91c0280} id="Vector" stroke="var(--stroke-0, #015AAA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[166px] left-0 top-0 w-[111px]">
      <UsersIcon />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+0.5px)] text-[18px] text-black text-center top-[139px] tracking-[0.36px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">Expert-Led</p>
        <p className="leading-[normal]">Security</p>
      </div>
    </div>
  );
}

function ContentIcon() {
  return (
    <div className="absolute h-[166px] left-0 top-[276px] w-[535px]" data-name="Content+Icon">
      <div className="absolute flex h-[166px] items-center justify-center left-[369px] top-0 w-0" style={{ "--transform-inner-width": "285", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[166px]">
            <div className="absolute inset-[-1.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 1.5">
                <line id="Line 3" stroke="var(--stroke-0, #C6C6C6)" strokeLinecap="round" strokeWidth="1.5" x1="0.75" x2="165.25" y1="0.75" y2="0.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[166px] items-center justify-center left-[161px] top-0 w-0" style={{ "--transform-inner-width": "285", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="h-0 relative w-[166px]">
            <div className="absolute inset-[-1.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 1.5">
                <line id="Line 2" stroke="var(--stroke-0, #C6C6C6)" strokeLinecap="round" strokeWidth="1.5" x1="0.75" x2="165.25" y1="0.75" y2="0.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame2 />
      <Frame1 />
      <Frame />
    </div>
  );
}

function Content() {
  return (
    <div className="-translate-y-1/2 absolute h-[482px] left-[810px] top-[calc(50%+0.5px)] w-[535px]" data-name="Content">
      <CtaLink />
      <ContentIcon />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Manrope:Medium',sans-serif] font-medium justify-center leading-[0] left-0 text-[#6d6d6d] text-[20px] top-[196px] tracking-[0.4px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">NebulaSafeTech was founded by cybersecurity experts</p>
        <p className="leading-[normal] mb-0">with a mission to deliver enterprise-grade protection</p>
        <p className="leading-[normal] mb-0">through innovation, transparency, and relentless</p>
        <p className="leading-[normal]">dedication,</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Geist:Bold',sans-serif] font-bold justify-center leading-[0] left-0 text-[48px] text-black top-[88px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-none mb-0">Built by defenders,</p>
        <p className="leading-none">for defenders.</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[50px] not-italic text-[#015aaa] text-[20px] text-center top-[12px] tracking-[1.2px] whitespace-nowrap">
        <p className="leading-[normal]">About Us</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <div className="bg-white relative size-full" data-name="About-Section">
      <Content />
      <div className="-translate-y-1/2 absolute h-[499px] left-0 top-1/2 w-[770px]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[102.81%] left-0 max-w-none top-0 w-[99.94%]" src={imgImage} />
        </div>
      </div>
    </div>
  );
}