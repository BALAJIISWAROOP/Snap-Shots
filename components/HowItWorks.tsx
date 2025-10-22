import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SectionWrapper: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      id={id}
      className={`py-20 md:py-28 transition-all duration-700 ease-out ${animationClasses}`}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ subtitle: string; children: React.ReactNode; }> = ({ subtitle, children }) => (
    <div className="text-center mb-16">
        <span className="text-cyan-400 font-semibold uppercase tracking-wider">{subtitle}</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-2">{children}</h2>
    </div>
);

const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
    <div className="text-center relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 text-cyan-400 text-2xl font-bold rounded-full">
            {number}
        </div>
        <div className="pt-12 px-6 pb-8 bg-zinc-900/50 rounded-lg border border-zinc-800 h-full">
             <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
             <p className="text-zinc-400">{description}</p>
        </div>
    </div>
);

const HowItWorks: React.FC = () => {
  return (
    <SectionWrapper id="how-it-works">
      <SectionTitle subtitle="Simple & Transparent">How It Works</SectionTitle>
      <div className="grid md:grid-cols-4 gap-x-8 gap-y-16 max-w-7xl mx-auto">
        <Step number="1" title="Create" description="Bring your story to life. Collaborate with a team or go solo to produce your mini-series." />
        <Step number="2" title="Upload" description="Share your finished series on the Snapshots platform with our easy-to-use creator tools." />
        <Step number="3" title="Unlock" description="Viewers discover your work and unlock it for just ₹10, getting instant access to all episodes." />
        <Step number="4" title="Earn" description="You receive a direct share of the revenue for every single unlock your series gets. Simple as that." />
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;