import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-50 font-light">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg mb-8 text-blue-200 flex items-center">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            {t('hero.trustedBy')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/auth?mode=signup"
              className="group bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              {t('hero.getStarted')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              {t('hero.learnMore')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}