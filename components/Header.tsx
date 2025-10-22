import React, { useState, useEffect } from 'react';

const NavLink: React.FC<{ href?: string; onClick?: () => void; children: React.ReactNode }> = ({ href, onClick, children }) => (
  <a 
    href={href}
    onClick={onClick}
    className="text-zinc-300 hover:text-white transition-colors duration-300 font-medium cursor-pointer"
  >
    {children}
  </a>
);

interface HeaderProps {
  onNavigate: (page: 'home' | 'subscription') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeNavigation = (targetId: string) => {
    onNavigate('home');
    // Allow state to update before trying to scroll
    setTimeout(() => {
        const element = document.querySelector(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a onClick={() => handleHomeNavigation('#hero')} className="text-3xl font-black tracking-tighter text-cyan-400 cursor-pointer">
          Snapshots
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink onClick={() => handleHomeNavigation('#about')}>About</NavLink>
          <NavLink onClick={() => onNavigate('subscription')}>Subscription</NavLink>
          <NavLink onClick={() => handleHomeNavigation('#creators')}>For Creators</NavLink>
          <NavLink onClick={() => handleHomeNavigation('#community')}>Community</NavLink>
        </nav>
        <div className="flex items-center space-x-4">
          <a onClick={() => handleHomeNavigation('#contact')} className="bg-cyan-600 text-white font-semibold text-sm py-2 px-5 rounded-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            Join Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;