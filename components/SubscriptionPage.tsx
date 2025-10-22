import React from 'react';

const CheckIcon = () => (
    <svg className="w-6 h-6 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const FAQItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
        <h4 className="font-bold text-lg text-white mb-2">{question}</h4>
        <p className="text-zinc-400 leading-relaxed">{children}</p>
    </div>
)

interface SubscriptionPageProps {
    onNavigateHome: () => void;
}


const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="animate-fade-in">
        {/* Page Header */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-cyan-900/30 to-black">
            <div className="container mx-auto px-6 text-center">
                 <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-4">
                    Unlock a World of Stories
                </h1>
                <p className="text-xl md:text-2xl text-cyan-300 mb-8 font-semibold max-w-3xl mx-auto">
                    Join Snapshots+ and get unlimited access with Snapcoins.
                </p>
            </div>
        </section>

        {/* Plan Details */}
        <section className="py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center bg-zinc-900 border-2 border-cyan-600 rounded-xl shadow-2xl shadow-cyan-900/30 overflow-hidden">
                    <div className="md:col-span-3 p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-white mb-2">Monthly Plan</h2>
                        <p className="text-zinc-300 mb-6">Get the best value and support creators directly with our simple monthly plan.</p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start"><CheckIcon /> <span><span className="font-bold text-white">99 Snapcoins</span> credited to your account every month.</span></li>
                            <li className="flex items-start"><CheckIcon /> <span>Use <span className="font-bold text-white">1 Snapcoin</span> to unlock any series permanently.</span></li>
                            <li className="flex items-start"><CheckIcon /> <span>Directly contribute to the creators you love.</span></li>
                            <li className="flex items-start"><CheckIcon /> <span>Flexibility to cancel your subscription anytime.</span></li>
                        </ul>
                    </div>
                    <div className="md:col-span-2 bg-cyan-900/50 p-8 md:p-12 h-full flex flex-col justify-center text-center">
                         <p className="text-5xl font-black text-white">₹99</p>
                         <p className="text-cyan-300 font-semibold mb-6">per month</p>
                         <button className="w-full bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </section>

         {/* FAQ Section */}
        <section className="py-20 bg-zinc-900/30">
             <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-white">Frequently Asked Questions</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FAQItem question="What are Snapcoins?">
                        Snapcoins are our platform's virtual currency. One Snapcoin can be used to unlock one entire mini-series, giving you permanent access to all its episodes.
                    </FAQItem>
                    <FAQItem question="Do my Snapcoins expire?">
                        No, your Snapcoins will remain in your account as long as your subscription is active. They don't expire month-to-month.
                    </FAQItem>
                    <FAQItem question="How does this support creators?">
                        A significant portion of your subscription fee and every Snapcoin you spend goes directly to the creators of the series you unlock, providing them with a sustainable income.
                    </FAQItem>
                    <FAQItem question="Can I still unlock series without a subscription?">
                        Yes! You can always unlock any series for the standard price of ₹10. The subscription is designed for our most active viewers to get the best value.
                    </FAQItem>
                </div>
             </div>
        </section>
    </div>
  );
};

export default SubscriptionPage;