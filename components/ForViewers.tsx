import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SectionWrapper: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      id={id}
      className={`py-20 md:py-28 bg-zinc-900 transition-all duration-700 ease-out ${animationClasses}`}
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

const ForViewers: React.FC = () => {
  return (
    <SectionWrapper id="viewers">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="pr-0 md:pr-12">
             <SectionTitle subtitle="For Viewers">
                Premium Content, Pocket-Friendly.
            </SectionTitle>
            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                Discover a universe of binge-worthy short films and web series from your favorite creators. From gripping thrillers to hilarious comedies with a local Telugu touch, Snapshots brings you exclusive stories you won't find anywhere else.
            </p>
            <ul className="space-y-4">
                <li className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-zinc-200">Unlock any series for just ₹10.</span>
                </li>
                 <li className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-zinc-200">Support creators directly.</span>
                </li>
                 <li className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-zinc-200">New exclusive drops every week.</span>
                </li>
            </ul>
        </div>
        <div>
            <img src="https://picsum.photos/seed/viewers/1000/800" alt="Viewers watching content" className="rounded-lg shadow-2xl shadow-cyan-900/20" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ForViewers;