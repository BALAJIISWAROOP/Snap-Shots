import React, { useState } from 'react';
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

const Contact: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd send data to a server here.
        setIsSubmitted(true);
    }

  return (
    <SectionWrapper id="contact">
      <SectionTitle subtitle="Get in Touch">
        Have a Question?
      </SectionTitle>
      <div className="max-w-xl mx-auto">
        {isSubmitted ? (
             <div className="bg-zinc-900/50 border border-cyan-800 rounded-lg p-8 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">Thank You!</h3>
                <p className="text-zinc-300">Your message has been sent successfully. We'll get back to you shortly.</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                    <input type="text" id="name" required className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                    <input type="email" id="email" required className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Message</label>
                    <textarea id="message" required rows={5} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105">
                        Send Message
                    </button>
                </div>
            </form>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Contact;