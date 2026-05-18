import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<{
    title: string;
    effectiveDate: string;
    sections: {title: string; body: string}[];
  } | null>(null);

  useEffect(() => {
    api.content.legal().then(setContent).catch(() => setContent(null));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="px-6 pt-12 pb-6 flex items-center sticky top-0 bg-white z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mr-4 shrink-0"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center pr-16">{content?.title ?? 'Privacy & Policy'}</h1>
      </div>

      <div className="px-6 pb-12 relative flex-1">
        {/* Scrollbar Indicator */}
        <div className="absolute right-2 top-0 bottom-12 w-1 bg-gray-100 rounded-full">
          <div className="w-full h-32 bg-orange-500 rounded-full absolute top-1/4"></div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6 pr-4">
          Effective Date: {content?.effectiveDate ?? 'January 2025'}
        </h2>

        <div className="space-y-6 pr-4">
          {(content?.sections ?? []).map((section) => (
            <section key={section.title}>
              <h3 className="text-lg font-medium text-gray-900 mb-3">{section.title}</h3>
              <p className="text-gray-500 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
