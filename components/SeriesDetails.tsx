import React, { useState, useMemo, useEffect } from 'react';
import { Series, Episode, Creator } from '../types';
import AIAssistant from './AIAssistant';
import Modal from './Modal';
import Carousel from './Carousel';
import StarRating from './StarRating';
import SubscriptionCTA from './SubscriptionCTA';

interface SeriesDetailsProps {
  series: Series;
  onBack: () => void;
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  allSeries: Series[];
  onSelectSeries: (series: Series) => void;
  onNavigate: () => void;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
);

const SeriesDetails: React.FC<SeriesDetailsProps> = ({ series, onBack, creators, onSelectCreator, allSeries, onSelectSeries, onNavigate }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showWatchlistConfirmation, setShowWatchlistConfirmation] = useState(false);
  const [displayRating, setDisplayRating] = useState({
      average: series.averageRating || 0,
      count: series.ratingCount || 0,
  });

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('snapshotsWatchlist') || '[]');
    setIsInWatchlist(watchlist.includes(series.id));
  }, [series.id]);

  const creator = creators.find(c => c.name === series.creator);

  const handleUnlock = () => {
    const paymentConfirmed = window.confirm(
      `Confirm unlocking "${series.title}" for ₹10?`
    );
    if (paymentConfirmed) {
      setIsUnlocked(true);
    }
  };

  const handleShare = () => {
    // In a real app, you'd use navigator.clipboard.writeText
    setShowShareConfirmation(true);
    setTimeout(() => {
        setShowShareConfirmation(false);
    }, 2500);
  };
  
  const handleToggleWatchlist = () => {
    const watchlist: number[] = JSON.parse(localStorage.getItem('snapshotsWatchlist') || '[]');
    const seriesIndex = watchlist.indexOf(series.id);

    if (seriesIndex > -1) {
      // Remove from watchlist
      watchlist.splice(seriesIndex, 1);
      setIsInWatchlist(false);
    } else {
      // Add to watchlist
      watchlist.push(series.id);
      setIsInWatchlist(true);
      setShowWatchlistConfirmation(true);
      setTimeout(() => {
        setShowWatchlistConfirmation(false);
      }, 2500);
    }

    localStorage.setItem('snapshotsWatchlist', JSON.stringify(watchlist));
  };


  const handlePlayEpisode = (episode: Episode) => {
    if (isUnlocked) {
      setSelectedEpisode(episode);
    }
  };

  const handleClosePlayer = () => {
    setSelectedEpisode(null);
  };

  const handleOpenTrailer = () => {
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };
  
  const handleRateSeries = (rating: number) => {
    if (!isUnlocked || userRating) return;

    setUserRating(rating);

    const newCount = displayRating.count + 1;
    const newAverage = ((displayRating.average * displayRating.count) + rating) / newCount;

    setDisplayRating({
        average: parseFloat(newAverage.toFixed(1)),
        count: newCount,
    });
  };

  const relatedSeries = useMemo(() => {
    if (!allSeries) return [];
    
    const byGenre = allSeries.filter(s => s.genre === series.genre && s.id !== series.id);
    const byCreator = allSeries.filter(s => s.creator === series.creator && s.id !== series.id);

    const combined = [...byGenre, ...byCreator];
    const uniqueSeries = Array.from(new Map(combined.map(s => [s.id, s])).values());
    
    return uniqueSeries;
  }, [series, allSeries]);


  return (
    <>
      <div className="animate-fade-in">
        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="fixed top-20 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-all duration-300"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-end text-white">
          <div className="absolute inset-0 bg-black">
            <img src={series.imageUrl} alt={series.title} className="w-full h-full object-cover object-top opacity-40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>

          <div className="relative z-10 container mx-auto px-6 pb-12 max-w-7xl">
            <span className="inline-block bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">{series.genre}</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-2 max-w-4xl">{series.title}</h1>
            <p className="text-lg text-zinc-300 mb-6">
              Created by {creator ? (
                <button onClick={() => onSelectCreator(creator)} className="font-bold hover:text-cyan-400 transition-colors underline-offset-4 hover:underline">{series.creator}</button>
              ) : (
                <span className="font-bold">{series.creator}</span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                <div className="flex flex-col w-full sm:w-auto">
                    <button 
                        onClick={handleUnlock}
                        disabled={isUnlocked}
                        className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:bg-zinc-700 disabled:cursor-not-allowed disabled:scale-100 w-full"
                    >
                        {isUnlocked ? '✓ Unlocked' : 'Unlock for ₹10'}
                    </button>
                    {!isUnlocked && (
                         <p className="text-sm text-zinc-400 mt-2 text-center sm:text-left">or use 1 <span className="font-bold text-cyan-400">Snapcoin</span></p>
                    )}
                </div>
              <button
                onClick={handleOpenTrailer}
                className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Watch Trailer
              </button>
               <button
                onClick={handleToggleWatchlist}
                className={`backdrop-blur-sm border font-bold py-3 px-8 rounded-lg text-lg hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto ${isInWatchlist ? 'bg-cyan-800/80 border-cyan-700 text-white' : 'bg-zinc-800/80 border-zinc-700 text-white'}`}
              >
                {isInWatchlist ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    In Watchlist
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add to Watchlist
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white font-bold p-3 rounded-lg hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Share series"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>
              </button>
               {showShareConfirmation && (
                    <div className="absolute bottom-full mb-3 right-0 bg-cyan-600 text-white text-xs font-semibold py-1.5 px-3 rounded-md animate-fade-in">
                        Link copied to clipboard!
                    </div>
                )}
                {showWatchlistConfirmation && (
                    <div className="absolute bottom-full mb-3 right-16 bg-cyan-600 text-white text-xs font-semibold py-1.5 px-3 rounded-md animate-fade-in">
                        Added to Watchlist!
                    </div>
                )}
            </div>
          </div>
        </section>

        {/* Details Section (Synopsis, Cast, Episodes) */}
        <section className="pt-16 bg-black">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Left Column: Synopsis & Episodes */}
              <div className="lg:col-span-2 space-y-16">
                 <div>
                    <h2 className="text-2xl font-bold mb-3 text-cyan-400">Synopsis</h2>
                    <p className="text-zinc-300 leading-relaxed">{series.synopsis}</p>
                 </div>

                 <div>
                    <h2 className="text-2xl font-bold mb-2 text-cyan-400">Episodes ({series.episodes.length})</h2>
                    {!isUnlocked && <p className="text-zinc-400 text-sm mb-4">Unlock the series to watch episodes.</p>}
                    <div className="border-t border-zinc-800">
                        <ul>
                        {series.episodes.map((episode, index) => (
                            <li 
                            key={episode.id} 
                            onClick={() => handlePlayEpisode(episode)}
                            className={`group flex items-center justify-between border-b border-zinc-800 ${isUnlocked ? 'hover:bg-zinc-900 cursor-pointer' : 'opacity-60'} transition-colors duration-300`}
                            aria-disabled={!isUnlocked}
                            role={isUnlocked ? 'button' : 'listitem'}
                            tabIndex={isUnlocked ? 0 : -1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                handlePlayEpisode(episode);
                                }
                            }}
                            >
                            <div className="flex items-center p-5">
                                <span className="text-2xl font-bold text-zinc-600 group-hover:text-cyan-400 transition-colors duration-300 mr-6 w-8 text-center">{index + 1}</span>
                                <h3 className="font-semibold text-white transition-transform duration-300 transform group-hover:translate-x-1">{episode.title}</h3>
                            </div>
                            <div className="flex items-center p-5">
                                {isUnlocked ? <PlayIcon /> : <LockIcon />}
                                <span className="text-sm text-zinc-400">{episode.duration}</span>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                 </div>
              </div>

              {/* Right Column: Cast & Rating */}
              <div className="lg:col-span-1 space-y-8">
                 <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
                    <h2 className="text-2xl font-bold mb-4 text-cyan-400">Cast</h2>
                    <ul className="space-y-2">
                        {series.cast.map(actor => (
                        <li key={actor} className="text-zinc-300 text-md">{actor}</li>
                        ))}
                    </ul>
                 </div>

                 <div>
                    <h2 className="text-2xl font-bold mb-4 text-cyan-400">Rating</h2>
                    <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 flex flex-col gap-4">
                        <div>
                            <p className="font-bold text-lg text-white">
                                {isUnlocked ? (userRating ? "Thanks for your rating!" : "Rate this series") : "Unlock to rate"}
                            </p>
                            <p className="text-sm text-zinc-400">Average based on {displayRating.count.toLocaleString()} reviews.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <StarRating 
                                rating={userRating || displayRating.average} 
                                onRate={handleRateSeries}
                                readOnly={!isUnlocked || !!userRating}
                            />
                            <span className="text-2xl font-bold text-yellow-400 pt-1">{displayRating.average.toFixed(1)}</span>
                        </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>
        
        {/* Subscription CTA */}
        <section className="py-16 bg-black">
            <div className="container mx-auto px-6 max-w-7xl">
                <SubscriptionCTA onNavigate={onNavigate} />
            </div>
        </section>

        {/* Related Series Section */}
        {relatedSeries.length > 0 && (
          <section className="pb-16 bg-black">
            <Carousel title="Related Series" series={relatedSeries} onSelectSeries={onSelectSeries} />
          </section>
        )}
        
        {/* AI Assistant Section */}
        <section className="pb-16 bg-black">
            <div className="container mx-auto px-6 max-w-7xl">
                <AIAssistant series={series} />
            </div>
        </section>
      </div>

      <Modal isOpen={!!selectedEpisode} onClose={handleClosePlayer}>
        {selectedEpisode && (
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedEpisode.title}</h2>
                <div className="aspect-video bg-black border border-zinc-700 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-600 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <p className="text-zinc-400">Video player for "{selectedEpisode.title}" would be here.</p>
                        <p className="text-xs text-zinc-500 mt-2">Press ESC or click outside to close</p>
                    </div>
                </div>
            </div>
        )}
      </Modal>

      <Modal isOpen={isTrailerOpen} onClose={handleCloseTrailer}>
        <div>
            <h2 className="text-2xl font-bold text-white mb-4">Trailer: {series.title}</h2>
            <div className="aspect-video bg-black border border-zinc-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-600 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-zinc-400">Trailer for "{series.title}" would be here.</p>
                    <p className="text-xs text-zinc-500 mt-2">Press ESC or click outside to close</p>
                </div>
            </div>
        </div>
      </Modal>
    </>
  );
};

export default SeriesDetails;