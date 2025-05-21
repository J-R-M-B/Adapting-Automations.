import { NewsSection as OriginalNewsSection } from '../NewsSection';

export function NewsSection() {
  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-[#17255A] to-[#1a1a2e]">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.05),transparent_80%)] animate-[energyFlow_30s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_80%)] animate-[energyFlow_40s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_70%)] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OriginalNewsSection />
      </div>
    </div>
  );
}