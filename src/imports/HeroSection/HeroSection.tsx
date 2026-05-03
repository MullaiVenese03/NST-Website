import svgPaths from "./svg-3kvcnifylj";

function Product() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex items-center justify-center left-[calc(50%+378px)] overflow-clip px-[45px] py-[10px] rounded-[50px]" data-name="Product">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center tracking-[1.08px] whitespace-nowrap">
        <p className="leading-[normal]">Product</p>
      </div>
    </div>
  );
}

function EduTech() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex items-center justify-center left-[calc(50%+182px)] overflow-clip px-[45px] py-[10px] rounded-[50px]" data-name="EduTech">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center tracking-[1.08px] whitespace-nowrap">
        <p className="leading-[normal]">EdTech</p>
      </div>
    </div>
  );
}

function Clients() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex items-center justify-center left-[calc(50%-9.5px)] overflow-clip px-[45px] py-[10px] rounded-[50px]" data-name="Clients">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center tracking-[1.08px] whitespace-nowrap">
        <p className="leading-[normal]">Clients</p>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex items-center justify-center left-[calc(50%-201px)] overflow-clip px-[45px] py-[10px] rounded-[50px]" data-name="Services">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black text-center tracking-[1.08px] whitespace-nowrap">
        <p className="leading-[normal]">Services</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#015aaa] bottom-0 content-stretch flex items-center justify-center left-[calc(50%-387.5px)] overflow-clip px-[45px] py-[10px] rounded-[50px]" data-name="About">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white tracking-[1.08px] whitespace-nowrap">
        <p className="leading-[normal]">About</p>
      </div>
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute bg-[rgba(207,207,207,0.2)] h-[44px] left-[296px] rounded-[50px] top-[928px] w-[920px]" data-name="Bottom-Navigation">
      <Product />
      <EduTech />
      <Clients />
      <Services />
      <About />
    </div>
  );
}

function WarningShieldCheck({ className }: { className?: string }) {
  return (
    <div className={className || "absolute left-[64px] overflow-clip size-[12px] top-[697px]"} data-name="Warning / Shield_Check">
      <div className="absolute inset-[12.5%_16.67%_13.14%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5.6%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9.92341">
            <path d={svgPaths.p31b6e600} id="Vector" stroke="var(--stroke-0, #015AAA)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TrustIcon() {
  return (
    <div className="absolute contents left-[64px] top-[697px]" data-name="Trust-Icon">
      <WarningShieldCheck />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Satoshi:Medium',sans-serif] justify-center leading-[0] left-[152px] not-italic text-[#6d6d6d] text-[9px] text-center top-[703px] tracking-[0.18px] whitespace-nowrap">
        <p className="leading-none">Trusted by enterprises Worldwide</p>
      </div>
    </div>
  );
}

function CtaButton() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#015aaa] content-stretch flex items-center justify-between overflow-clip px-[12px] py-[10px] right-0 rounded-[8px] top-1/2 w-[129px]" data-name="CTA-Button">
      <div className="flex flex-col font-['Satoshi:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white tracking-[0.36px] w-[85px]">
        <p className="leading-none">Contact</p>
      </div>
      <div className="h-[10px] relative shrink-0 w-[18px]" data-name="Vector">
        <div className="absolute inset-[-7.5%_-4.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 11.5">
            <path d={svgPaths.p3c346e80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function NstLogo() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[58.046px] left-[calc(50%-664px)] top-[calc(50%+0.02px)] w-[56px]" data-name="NST-Logo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 58.0457">
        <g id="NST-Logo">
          <path d={svgPaths.pa90df80} fill="var(--fill-0, #015AAA)" id="Vector" />
          <path d={svgPaths.p3959b800} fill="var(--fill-0, #015AAA)" id="Vector_2" />
          <path d={svgPaths.p3b6ed900} fill="var(--fill-0, #015AAA)" id="Vector_3" />
          <path d={svgPaths.p36cd8100} fill="var(--fill-0, #015AAA)" id="Vector_4" />
          <path d={svgPaths.p35314300} fill="var(--fill-0, #015AAA)" id="Vector_5" />
          <path d={svgPaths.p33416100} fill="var(--fill-0, #015AAA)" id="Vector_6" />
          <path d={svgPaths.p3ac0a900} fill="var(--fill-0, #015AAA)" id="Vector_7" />
          <path d={svgPaths.p12afe570} fill="var(--fill-0, #015AAA)" id="Vector_8" />
          <path d={svgPaths.p206f9980} fill="var(--fill-0, #015AAA)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function TopNavigation() {
  return (
    <div className="-translate-x-1/2 absolute h-[68px] left-1/2 top-[20px] w-[1384px]" data-name="Top-Navigation">
      <CtaButton />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Overcame_Demo:Bold',sans-serif] justify-center leading-[0] left-[187.5px] not-italic text-[#030108] text-[28px] text-center top-[calc(50%+5px)] tracking-[1.68px] whitespace-nowrap">
        <p className="leading-[normal]">NebulaSafeTech</p>
      </div>
      <NstLogo />
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative size-full" data-name="Hero-Section">
      <div className="absolute h-[982px] right-0 top-0 w-[1746px]" data-name="Hero-Background-Video">
        <video autoPlay className="absolute max-w-none object-cover size-full" controlsList="nodownload" loop playsInline>
          <source src="/_videos/v1/3f5012300191fce7a8d7f2f86578d11b53c13433" />
        </video>
      </div>
      <BottomNavigation />
      <TrustIcon />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Geist:Bold',sans-serif] font-bold justify-center leading-[0] left-[64px] text-[#6d6d6d] text-[20px] top-[645px] tracking-[-0.4px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">Cybersecurity and IT solutions built to protect what</p>
        <p className="leading-[normal]">matters most - your data, your systems, your future.</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Geist:Bold',sans-serif] font-bold justify-center leading-[0] left-[64px] text-[80px] text-black top-[457px] tracking-[-1.6px] whitespace-nowrap">
        <p className="mb-0">
          <span className="leading-[normal] text-[#015aaa]">One</span>
          <span className="leading-[normal]">{` Entry.`}</span>
        </p>
        <p className="mb-0">
          <span className="leading-[normal] text-[#015aaa]">One</span>
          <span className="leading-[normal]">{` Device.`}</span>
        </p>
        <p>
          <span className="leading-[normal] text-[#015aaa]">One</span>
          <span className="leading-[normal]">{` Purpose.`}</span>
        </p>
      </div>
      <TopNavigation />
    </div>
  );
}