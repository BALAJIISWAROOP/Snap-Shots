import React, { useRef } from 'react';
import SeriesCard from './SeriesCard';
import { Series } from '../types';

interface CarouselProps {
  title: string;
  series: Series[];
  onSelectSeries: (series: Series) => void;
}

const CarouselArrow: React.FC<{direction: 'left' | 'right', onClick: () => void}> = ({ direction, onClick }) => {
    const icon = direction === 'left' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
    ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    );

    return (
        <button onClick={onClick} className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-2' : 'right-2'} z-20 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100`}>
            {icon}
        </button>
    )
}

const Carousel: React.FC<CarouselProps> = ({ title, series, onSelectSeries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  }

  return (
    <div className="container mx-auto px-6 lg:px-12 group relative">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
      <CarouselArrow direction="left" onClick={() => scroll('left')} />
      <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
        {series.map(s => (
          <SeriesCard key={s.id} series={s} onSelectSeries={onSelectSeries} />
        ))}
      </div>
      <CarouselArrow direction="right" onClick={() => scroll('right')} />
    </div>
  );
};

export default Carousel;