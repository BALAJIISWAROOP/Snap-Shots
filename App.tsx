import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SeriesDetails from './components/SeriesDetails';
import CreatorProfile from './components/CreatorProfile';
import HomeContent from './components/HomeContent';
import SubscriptionPage from './components/SubscriptionPage';
import { Series, Creator } from './types';
import { trendingSeries, featuredCreators } from './constants';

type Page = 'home' | 'subscription';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeSeries, setActiveSeries] = useState<Series | null>(null);
  const [activeCreator, setActiveCreator] = useState<Creator | null>(null);

  const featuredSeries = useMemo(() => trendingSeries.find(s => s.featured) || trendingSeries[0], []);

  const handleNavigate = (page: Page) => {
    setActiveSeries(null);
    setActiveCreator(null);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectSeries = (series: Series) => {
    setActiveSeries(series);
    setCurrentPage('home'); // Ensure we switch context from other pages
    window.scrollTo(0, 0);
  };
  
  const handleSelectCreator = (creator: Creator) => {
    setActiveCreator(creator);
    setActiveSeries(null); // Ensure we're not showing both
    setCurrentPage('home'); // Ensure we switch context from other pages
    window.scrollTo(0, 0);
  };

  const handleGoBack = () => {
    if (activeSeries) {
      setActiveSeries(null);
    } else if (activeCreator) {
      setActiveCreator(null);
    }
  };
  
  const renderContent = () => {
    if (currentPage === 'subscription') {
        return <SubscriptionPage onNavigateHome={() => handleNavigate('home')} />;
    }

    if (activeSeries) {
      return (
        <SeriesDetails 
          series={activeSeries} 
          onBack={handleGoBack}
          creators={featuredCreators}
          onSelectCreator={handleSelectCreator}
          allSeries={trendingSeries}
          onSelectSeries={handleSelectSeries}
          onNavigate={() => handleNavigate('subscription')}
        />
      );
    }
    if (activeCreator) {
      return (
        <CreatorProfile
          creator={activeCreator}
          series={trendingSeries.filter(s => s.creator === activeCreator.name)}
          onBack={handleGoBack}
          onSelectSeries={handleSelectSeries}
        />
      );
    }
    
    return (
       <HomeContent
          featuredSeries={featuredSeries}
          onSelectSeries={handleSelectSeries}
          onSelectCreator={handleSelectCreator}
       />
    );
  }

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Header onNavigate={handleNavigate} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;