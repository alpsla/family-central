import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
            <h3 className="text-sm font-semibold mb-3 text-white">{t('footer.features.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.health')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.meals')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.features.entertainment')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3 text-white">{t('footer.company.title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.privacy')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.terms')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3 text-white">{t('footer.contact.title')}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>{t('footer.contact.phone')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs">
          <p>© 2024 FamilyHub. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}