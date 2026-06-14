import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Globe, BookOpen, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t, dir } = useLanguage();

  return (
    <footer className="bg-[#5A5A40] text-[#EAE7DC] mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#EAE7DC] flex items-center justify-center text-[#5A5A40] font-bold font-serif">N</div>
              <span className="font-serif font-bold text-xl tracking-tight">An-Nur</span>
            </div>
            <p className="text-[#EAE7DC]/70 text-sm leading-relaxed mb-4">
              {t('footerAbout', 'A global dawah platform dedicated to spreading the message of Islam with wisdom, compassion, and clarity.')}
            </p>
            <div className="flex items-center gap-2 text-[#EAE7DC]/60 text-sm">
              <Globe className="w-4 h-4" />
              <span>{t('footerGlobal', 'Available in 5 languages')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#EAE7DC]/90">{t('footerQuickLinks', 'Quick Links')}</h3>
            <ul className="space-y-3">
              <li><Link to="/learn" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors flex items-center gap-2"><BookOpen className="w-3 h-3" />{t('learn', 'Learn')}</Link></li>
              <li><Link to="/qa" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors">{t('qa', 'Q&A')}</Link></li>
              <li><Link to="/stories" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors">{t('stories', 'Stories')}</Link></li>
              <li><Link to="/donate" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors flex items-center gap-2"><Heart className="w-3 h-3" />{t('donate', 'Donate')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#EAE7DC]/90">{t('footerResources', 'Resources')}</h3>
            <ul className="space-y-3">
              <li><a href="https://quran.com" target="_blank" rel="noopener noreferrer" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors flex items-center gap-2">{t('footerQuran', 'Read the Quran')} <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://sunnah.com" target="_blank" rel="noopener noreferrer" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors flex items-center gap-2">{t('footerHadith', 'Hadith Collections')} <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://www.islamicfinder.org/prayer-times/" target="_blank" rel="noopener noreferrer" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors flex items-center gap-2">{t('footerPrayerTimes', 'Prayer Times')} <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#EAE7DC]/90">{t('footerContact', 'Contact')}</h3>
            <a href="mailto:contact@an-nur.org" className="text-[#EAE7DC]/70 text-sm hover:text-[#EAE7DC] transition-colors flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4" />
              contact@an-nur.org
            </a>
            <p className="text-[#EAE7DC]/50 text-xs leading-relaxed">
              {t('footerReach', 'For collaborations, content contributions, or questions about the platform.')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#EAE7DC]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAE7DC]/50">
          <p>© {new Date().getFullYear()} An-Nur Global Dawah. {t('footerRights', 'All rights reserved.')}</p>
          <p className="flex items-center gap-1">
            {t('footerMadeWith', 'Made with')} <Heart className="w-3 h-3 fill-[#D2691E] text-[#D2691E]" /> {t('footerForUmmah', 'for the Ummah')}
          </p>
        </div>
      </div>
    </footer>
  );
}
