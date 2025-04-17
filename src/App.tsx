import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, Award, CheckCircle, Users, Zap, Shield, Sparkles } from 'lucide-react';
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

type Step = 'landing' | 'form' | 'processing' | 'offers';
type Offer = {
  url: string;
  anchor: string;
  conversion: string;
};

function App() {
  const [step, setStep] = useState<Step>('landing');
  const [username, setUsername] = useState('');
  const [productLink, setProductLink] = useState('');
  const [reviewCount, setReviewCount] = useState(10);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [processing, setProcessing] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth <= 768;
  const maxOffers = isMobile ? 3 : 4;

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    if (step === 'offers') {
      fetch('https://d30xmmta1avvoi.cloudfront.net/public/offers/feed.php?user_id=538458&api_key=16388e91cdf3368db3bfd08d2dfe4ff0&s1=&s2=&callback=?')
        .then(res => res.text())
        .then(text => {
          const jsonStr = text.replace(/^[^{]*\(|\)[^}]*$/g, '');
          return JSON.parse(jsonStr);
        })
        .then(data => setOffers(data.slice(0, maxOffers)))
        .catch(error => console.error('Error fetching offers:', error));
    }
  }, [step, maxOffers]);

  const handleGetStarted = () => {
    setStep('form');
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setProcessing(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setStep('offers');
      }
    }, 1000);
  };

  const features = [
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Real TikTok Users",
      description: "Authentic reviews from active TikTok Shop customers"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      title: "Fast Delivery",
      description: "See results within 24-48 hours after activation"
    },
    {
      icon: <Shield className="w-12 h-12 text-emerald-500" />,
      title: "Safe & Secure",
      description: "100% compliant with TikTok Shop guidelines"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#1a1f35] to-[#2d1b45] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container mx-auto px-4 py-16 relative z-10"
        >
          <div className="text-center text-white mb-12">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-12 border border-white/10 shadow-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-blue-400" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Boost Your TikTok Shop Reviews
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Increase your product visibility and sales with authentic reviews
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div 
                    className="flex justify-center mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl text-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ mixBlendMode: 'overlay' }}
              />
            </motion.button>
          </div>

          {step !== 'landing' && (
            <div ref={formRef}>
              {step === 'form' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10"
                >
                  <motion.div 
                    className="flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-purple-400" />
                    <h1 className="text-2xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      Boost Setup
                    </h1>
                  </motion.div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        TikTok Shop Username
                      </label>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="@username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Product Link
                      </label>
                      <input
                        type="url"
                        required
                        value={productLink}
                        onChange={(e) => setProductLink(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                        placeholder="https://shop.tiktok.com/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Number of Reviews
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={reviewCount}
                        onChange={(e) => setReviewCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl appearance-none cursor-pointer"
                      />
                      <div className="text-center mt-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        {reviewCount} Reviews
                      </div>
                    </div>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Start Boost</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ mixBlendMode: 'overlay' }}
                      />
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-md mx-auto bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                      className="inline-block"
                    >
                      <TrendingUp className="w-16 h-16 text-purple-400" />
                    </motion.div>
                    <h2 className="text-xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      Processing Your Boost Request
                    </h2>
                    <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ width: "0%" }}
                        animate={{ width: `${processing}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-gray-300">{processing}% Complete</p>
                  </div>
                </motion.div>
              )}

              {step === 'offers' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-4xl mx-auto p-4"
                >
                  <div className="text-center text-white mb-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      One Last Step!
                    </h2>
                    <p className="mt-2 text-gray-300">
                      Complete one quick offer to activate your review boost
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map((offer, index) => (
                      <motion.a
                        key={index}
                        href={offer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                          {offer.anchor}
                        </h3>
                        <p className="text-sm text-gray-300 text-center">{offer.conversion}</p>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;