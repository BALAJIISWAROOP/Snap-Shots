import React from 'react';
import { Series } from '../types';

interface SeriesCardProps {
  series: Series;
  onSelectSeries: (series: Series) => void;
}

const SeriesCard: React.FC<SeriesCardProps> = ({ series, onSelectSeries }) => {
  return (
    <div 
        className="flex-shrink-0 w-40 md:w-52 lg:w-60 group cursor-pointer"
        onClick={() => onSelectSeries(series)}
    >
        <div className="relative rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg">
            <img 
                src={series.imageUrl.replace('/800/1200', '/400/600')} // Use smaller image for cards
                alt={series.title} 
                className="w-full h-auto aspect-[2/3] object-cover" 
            />
            {/* Play Icon Overlay (appears on hover) */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 md:p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            {/* Title Overlay (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="text-white font-bold text-sm md:text-base truncate">{series.title}</h3>
                <p className="text-xs text-zinc-300">{series.creator}</p>
            </div>
        </div>
    </div>
  );
};

export default SeriesCard;