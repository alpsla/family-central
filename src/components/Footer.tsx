import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">FamilyHub</span>
            </div>
            <p className="text-sm">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.features.title')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.health')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.meals')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.entertainment')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.community')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.about')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.privacy')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.terms')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contact.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>{t('footer.contact.phone')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>© 2024 FamilyHub. {t('footer.rights').split('© {year} FamilyHub.')[1]}</p>
        </div>
      </div>
    </footer>
  );
}