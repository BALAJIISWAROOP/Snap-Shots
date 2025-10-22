import React from 'react';

interface SubscriptionCTAProps {
    onNavigate: () => void;
}

const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ onNavigate }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Get More with a Subscription</h2>
            <div className="bg-gradient-to-r from-cyan-900/50 to-zinc-900/50 border border-cyan-800 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock a World of Stories</h3>
                    <p className="text-zinc-300">
                        Subscribe for just <span className="font-bold text-white">₹99/month</span> and get <span className="font-bold text-cyan-400">99 Snapcoins</span>. Use your coins to unlock any series on the platform!
                    </p>
                </div>
                <button 
                    onClick={onNavigate}
                    className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105 flex-shrink-0 w-full md:w-auto"
                >
                    Subscribe Now
                </button>
            </div>
        </div>
    )
}

export default SubscriptionCTA;