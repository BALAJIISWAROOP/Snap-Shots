import React from 'react';
import Carousel from './Carousel';
import { trendingSeries, featuredCreators } from '../constants';
import { Series, Creator } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CommunityProps {
    onSelectSeries: (series: Series) => void;
    onSelectCreator: (creator: Creator) => void;
}

const SectionWrapper: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { ref, animationClasses } = useScrollAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      id={id}
      className={`py-20 md:py-28 bg-zinc-900 transition-all duration-700 ease-out ${animationClasses}`}
    >
        {children}
    </div>
  );
};

const SectionTitle: React.FC<{ subtitle: string; children: React.ReactNode; }> = ({ subtitle, children }) => (
    <div className="text-center mb-12 container mx-auto px-6">
        <span className="text-cyan-400 font-semibold uppercase tracking-wider">{subtitle}</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-2">{children}</h2>
    </div>
);

const CreatorPill: React.FC<{creator: Creator, onSelectCreator: (creator: Creator) => void;}> = ({ creator, onSelectCreator }) => (
    <button 
        onClick={() => onSelectCreator(creator)}
        className="flex items-center bg-zinc-800 p-2 rounded-full border border-zinc-700 hover:bg-zinc-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105"
    >
        <img src={creator.imageUrl} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="ml-3 text-left">
            <p className="font-semibold text-white text-sm">{creator.name}</p>
            <p className="text-zinc-400 text-xs">{creator.handle}</p>
        </div>
    </button>
);

const Community: React.FC<CommunityProps> = ({ onSelectSeries, onSelectCreator }) => {

    const teluguHits = trendingSeries.filter(s => s.genre.includes('Telugu'));
    const shortFilms = trendingSeries.filter(s => s.genre === 'Short Film');

    return (
        <SectionWrapper id="community">
            <SectionTitle subtitle="Our Community">
                Featured Creators & Series
            </SectionTitle>
             <div className="container mx-auto px-6 mb-16">
                <div className="flex flex-wrap justify-center gap-4">
                    {featuredCreators.map(creator => <CreatorPill key={creator.id} creator={creator} onSelectCreator={onSelectCreator} />)}
                </div>
             </div>

            <div className="space-y-12">
                <Carousel title="Trending Now" series={trendingSeries} onSelectSeries={onSelectSeries} />
                <Carousel title="Telugu Hits" series={teluguHits} onSelectSeries={onSelectSeries} />
                <Carousel title="Must-Watch Short Films" series={shortFilms} onSelectSeries={onSelectSeries} />
            </div>
        </SectionWrapper>
    )
}

export default Community;