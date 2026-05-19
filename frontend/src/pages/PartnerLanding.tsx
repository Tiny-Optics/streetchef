import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bike, ArrowRight, Store, CheckCircle2 } from 'lucide-react';

export const PartnerLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold text-gray-900">Street<span className="text-orange-500">Chef</span></span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#merchants" className="text-gray-600 hover:text-orange-500 font-medium">Become a StreetChef</a>
            <a href="#drivers" className="text-gray-600 hover:text-orange-500 font-medium">Deliver with Us</a>
            <button 
              onClick={() => navigate('/login')}
              className="text-gray-900 font-medium hover:text-orange-500"
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Experience A Taste Of Home
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              If you have a passion for food or dessert and want the world to not only taste your delicious home-cooked food, but also generate an income from home, then look no further than StreetChef.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => navigate('/welcome')}
                className="bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors flex items-center justify-center"
              >
                Order food
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup?type=merchant')}
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
              >
                Become a StreetChef <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/signup?type=driver')}
                className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                Sign up to drive <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000" 
              alt="Street food vendor" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Merchants Section */}
      <section id="merchants" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=1000" 
                alt="Chef preparing food" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">"Still... Nothing beats a home-cooked meal."</h2>
              <p className="text-lg text-gray-600 mb-8">
                For those interested in becoming StreetChefs, it will offer you an opportunity to earn an additional stream of income without having to leave your kitchen. We all know that one person who makes a delicious pasta, malva pudding or any food which you enjoy. You are now able to order it on StreetChef from their kitchen to your home.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Earn an additional stream of income from home',
                  'Share your passion for food and desserts',
                  'Flexible schedule - cook when you want',
                  'Reach customers who crave authentic home-cooked meals'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 mr-3 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/signup?type=merchant')}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                Get started as a StreetChef
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Drivers Section */}
      <section id="drivers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <Bike className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Deliver with StreetChef</h2>
              <p className="text-lg text-gray-600 mb-8">
                Be your own boss. Earn money delivering delicious home-cooked meals from local StreetChefs to hungry customers.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Flexible schedule - work when you want',
                  'Competitive earnings and keep 100% of your tips',
                  'Easy onboarding process',
                  'Support available when you need it'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-orange-500 mr-3 shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/signup?type=driver')}
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-colors"
              >
                Sign up to deliver
              </button>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000" 
                alt="Delivery driver" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-white">Street<span className="text-orange-500">Chef</span></span>
              </div>
              <p className="text-gray-400">
                Experience A Taste Of Home. Connecting you with the best home-cooked food in town.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Partner with us</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#merchants" className="hover:text-white transition-colors">Become a StreetChef</a></li>
                <li><a href="#drivers" className="hover:text-white transition-colors">Sign up to deliver</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="mailto:info@streetchef.co.za" className="hover:text-white transition-colors">info@streetchef.co.za</a></li>
                <li><a href="tel:+27677238055" className="hover:text-white transition-colors">+27 67 723 8055</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PAIA Manual</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} StreetChef. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
