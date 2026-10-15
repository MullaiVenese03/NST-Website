import { Users, ShieldCheck, Clock } from "lucide-react";

interface SecurityFeatureItem {
  icon: typeof Users;
  title: string;
}

const SECURITY_FEATURES: SecurityFeatureItem[] = [
  {
    icon: Users,
    title: "Expert-Led Security",
  },
  {
    icon: ShieldCheck,
    title: "Proactive Protection",
  },
  {
    icon: Clock,
    title: "24/7 Threat Monitoring",
  },
];

export interface SecurityFeaturesStripProps {
  className?: string;
}

export function SecurityFeaturesStrip({ className = "" }: SecurityFeaturesStripProps) {
  return (
    <div
      className={`w-full rounded-xl border border-slate-200/80 bg-white shadow-xs ${className}`}
      role="region"
      aria-label="Key security capabilities"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {SECURITY_FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-center gap-3 px-4 py-3 sm:px-3 sm:py-3.5 lg:px-4 lg:py-3.5 min-w-0"
            >
              <div
                className="w-8 h-8 rounded-lg bg-[#0056A7]/8 text-[#0056A7] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SecurityFeaturesStrip;
