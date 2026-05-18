import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronRight, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';

export const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [faqs, setFaqs] = useState<{id: number; question: string; answer: string}[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.content.help().then(setFaqs).catch(() => setFaqs([]));
  }, []);

  const filteredFaqs = faqs.filter(
    (f) =>
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4 shrink-0"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">Help Center</h1>
      </div>

      <div className="px-6 py-2">
        <div className="relative mb-6 flex items-center border border-gray-200 rounded-2xl p-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics.."
              className="w-full bg-transparent pl-10 pr-4 py-3 focus:outline-none text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
          <button className="p-3 text-gray-500">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isExpanded ? 'border-gray-200 bg-white' : 'border-gray-200 bg-white'
                }`}
              >
                <button 
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-gray-500 shrink-0 ml-4" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500 shrink-0 ml-4" />
                  )}
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 text-gray-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
