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


const About: React.FC = () => {
  return (
    <SectionWrapper id="about">
        <SectionTitle subtitle="What is Snapshots?">
            Short Series, Big Stories.
        </SectionTitle>
        <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-zinc-300 leading-relaxed">
                Snapshots is a revolutionary platform designed for the new age of digital storytelling. We empower Instagram influencers, YouTubers, filmmakers, and writers to collaborate and create exclusive mini-series. For just ₹10, audiences can unlock a world of premium, short-form content with a distinct regional flavor, bridging the gap between creators and their fans like never before.
            </p>
        </div>
    </SectionWrapper>
  );
};

export default About;