import React, { useState, useEffect } from 'react';
import { Creator, Series } from '../types';
import SeriesCard from './SeriesCard';

interface CreatorProfileProps {
  creator: Creator;
  series: Series[];
  onBack: () => void;
  onSelectSeries: (series: Series) => void;
}

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors">
        {children}
    </a>
)

const CreatorProfile: React.FC<CreatorProfileProps> = ({ creator, series, onBack, onSelectSeries }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followedCreators: number[] = JSON.parse(localStorage.getItem('snapshotsFollowedCreators') || '[]');
    setIsFollowing(followedCreators.includes(creator.id));
  }, [creator.id]);

  const handleFollowToggle = () => {
    const followedCreators: number[] = JSON.parse(localStorage.getItem('snapshotsFollowedCreators') || '[]');
    const creatorIndex = followedCreators.indexOf(creator.id);
    let updatedIsFollowing = false;

    if (creatorIndex > -1) {
      followedCreators.splice(creatorIndex, 1);
      updatedIsFollowing = false;
    } else {
      followedCreators.push(creator.id);
      updatedIsFollowing = true;
    }
    
    localStorage.setItem('snapshotsFollowedCreators', JSON.stringify(followedCreators));
    setIsFollowing(updatedIsFollowing);
  };


  return (
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

        {/* Profile Header */}
        <section className="pt-32 pb-16 bg-zinc-900">
            <div className="container mx-auto px-6 text-center">
                <img 
                    src={creator.imageUrl} 
                    alt={creator.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-6 border-4 border-cyan-500 shadow-lg"
                />
                <h1 className="text-3xl md:text-5xl font-black text-white">{creator.name}</h1>
                <p className="text-lg text-cyan-400 mb-4">{creator.handle}</p>
                <p className="max-w-2xl mx-auto text-zinc-300 mb-6">{creator.bio}</p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <button 
                        onClick={handleFollowToggle}
                        className={`font-bold py-2 px-8 rounded-lg text-md transition-all duration-300 transform hover:scale-105 w-full sm:w-auto order-first sm:order-last ${isFollowing ? 'bg-zinc-700 text-white border border-zinc-600' : 'bg-cyan-600 text-white'}`}
                    >
                        {isFollowing ? '✓ Following' : '+ Follow'}
                    </button>
                    <div className="flex justify-center space-x-5">
                        {creator.socials.youtube && (
                            <SocialIcon href={creator.socials.youtube}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                            </SocialIcon>
                        )}
                        {creator.socials.instagram && (
                            <SocialIcon href={creator.socials.instagram}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"></path></svg>
                            </SocialIcon>
                        )}
                        {creator.socials.twitter && (
                            <SocialIcon href={creator.socials.twitter}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.596-4.788 6.086-4.01-1.01-7.542-3.2-9.2-5.016-.415.718-.617 1.62.058 2.515-.828.04-1.58-.2-2.2-.6v.063c0 2.155 1.488 4.02 3.6 4.453-.376.104-.774.15-1.175.15-.282 0-.55-.027-.812-.076.565 1.764 2.22 3.033 4.2 3.06-1.5.9-3.4 1.4-5.3 1.4-.3 0-.6 0-1-.05C2.643 18.02 4.45 18.9 6.45 18.9c7.5 0 11.6-6.2 11.6-11.6 0-.17-.004-.34-.012-.51.8-.58 1.5-1.3 2.0-2.1z"></path></svg>
                            </SocialIcon>
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* Creator's Series */}
        <section className="py-16 bg-black">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Series by {creator.name}</h2>
                {series.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {series.map(s => (
                            <SeriesCard key={s.id} series={s} onSelectSeries={onSelectSeries} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-zinc-900 rounded-lg">
                        <p className="text-zinc-400">No series uploaded by this creator yet.</p>
                    </div>
                )}
            </div>
        </section>
    </div>
  );
};

export default CreatorProfile;