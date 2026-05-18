import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  {
    id: 1,
    title: "Discover Deliciousness Anytime, Anywhere",
    description: "Explore endless food options, order in seconds, and enjoy quick delivery straight to your door.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Order with Ease, Anytime You Crave",
    description: "Discover new tastes, customize your meals, and track your order in real-time with ease.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Track & Enjoy Every Bite of the Journey",
    description: "From breakfast to dinner, find your favorite dishes and get them delivered fast and fresh.",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=800",
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].image}
          alt="Onboarding background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Vertical Pagination Dots for Slide 1 & 2 */}
      {currentSlide < 2 && (
        <div className="absolute right-6 top-1/4 flex flex-col space-y-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'h-8 bg-orange-500' : 'h-2 bg-white'
              }`}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full justify-end px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed px-2">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Horizontal Pagination Dots for Slide 3 */}
        {currentSlide === 2 && (
          <div className="flex justify-center space-x-2 mb-8 z-20">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white'
                }`}
              />
            ))}
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 mb-4"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
        </button>

        {currentSlide === slides.length - 1 && (
          <p className="text-center text-gray-400 text-sm">
            Don't have an account? <button className="text-white font-bold ml-1" onClick={onComplete}>Sign In</button>
          </p>
        )}
      </div>
    </div>
  );
};
