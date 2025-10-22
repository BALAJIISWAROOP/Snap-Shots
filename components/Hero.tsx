import React from 'react';
import { Series } from '../types';

interface HeroProps {
  series: Series;
}

const Hero: React.FC<HeroProps> = ({ series }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Image and Gradients */}
      <div className="absolute inset-0">
        <img
          src={series.imageUrl}
          alt={series.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 max-w-4xl animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight mb-4">
          Create. Upload. Earn.
        </h1>
        <p className="text-xl md:text-2xl text-cyan-300 mb-8 font-semibold max-w-3xl mx-auto">
            Watch premium stories for just ₹10.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href="#creators"
            className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            Join as Creator
          </a>
          <a 
            href="#community"
            className="bg-zinc-800 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            Start Watching
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;