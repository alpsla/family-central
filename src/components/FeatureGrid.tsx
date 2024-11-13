import React from 'react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  const { t } = useTranslation();

  const getFeatureKey = (title: string) => {
    // Convert "Health Tracking" to "health"
    return title.toLowerCase().split(' ')[0];
  };

  return (
    <div className="py-12" id="features">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t('features.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('features.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const key = getFeatureKey(feature.title);
          return (
            <div
              key={key}
              className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(`features.items.${key}.title`)}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`features.items.${key}.description`)}
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {t('common.learnMore')}
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          );
        })}
      </div>

      <div className="mt-16 flex justify-center">
        <div className="max-w-2xl text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {t('features.betterTogether.title')}
          </h3>
          <p className="text-gray-600">
            {t('features.betterTogether.description')}
          </p>
        </div>
      </div>
    </div>
  );
}