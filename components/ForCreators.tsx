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
    <div className="text-center mb-12">
        <span className="text-cyan-400 font-semibold uppercase tracking-wider">{subtitle}</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-2">{children}</h2>
    </div>
);

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center">
        <div className="flex justify-center items-center mb-6 w-16 h-16 mx-auto bg-cyan-900/50 text-cyan-400 rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400">{description}</p>
    </div>
);


const ForCreators: React.FC = () => {
  return (
    <SectionWrapper id="creators">
      <SectionTitle subtitle="For Creators">Your Stage, Your Rules.</SectionTitle>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard 
            title="Collaborate & Create"
            description="Team up with writers, editors, and videographers to bring your vision to life. Our platform makes collaboration seamless."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
         <FeatureCard 
            title="Direct Monetization"
            description="Upload your series and earn directly from your audience. No complex algorithms, just a straightforward revenue share for every unlock."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
         <FeatureCard 
            title="Own Your Audience"
            description="Build a dedicated fanbase that supports your work directly. Get insights, connect with viewers, and grow your community."
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
        />
      </div>
    </SectionWrapper>
  );
};

export default ForCreators;