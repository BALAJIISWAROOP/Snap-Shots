import React from 'react';
import Hero from './Hero';
import About from './About';
import ForCreators from './ForCreators';
import ForViewers from './ForViewers';
import HowItWorks from './HowItWorks';
import Community from './Community';
import Contact from './Contact';
import { Series, Creator } from '../types';

interface HomeContentProps {
    featuredSeries: Series;
    onSelectSeries: (series: Series) => void;
    onSelectCreator: (creator: Creator) => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ featuredSeries, onSelectSeries, onSelectCreator }) => {
    return (
        <>
            <Hero series={featuredSeries} />
            <About />
            <ForCreators />
            <ForViewers />
            <HowItWorks />
            <Community onSelectSeries={onSelectSeries} onSelectCreator={onSelectCreator} />
            <Contact />
        </>
    );
};

export default HomeContent;
