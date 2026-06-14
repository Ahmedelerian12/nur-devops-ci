import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Home, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t, dir } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-8">
          <span className="text-[120px] md:text-[180px] font-serif font-bold text-[#5A5A40]/10 leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#EAE7DC] flex items-center justify-center">
              <span className="font-arabic text-3xl text-[#5A5A40]">نور</span>
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#5A5A40] mb-4">
          {t('notFoundTitle', 'Page Not Found')}
        </h1>
        <p className="text-[#5A5A40]/60 max-w-md mx-auto mb-8 leading-relaxed">
          {t('notFoundDesc', 'The page you are looking for does not exist. Perhaps the path has changed, or the link was incorrect.')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[#5A5A40] text-white rounded-full font-medium hover:bg-[#5A5A40]/90 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" />
            {t('backHome', 'Back to Home')}
          </Link>
          <Link
            to="/learn"
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#5A5A40] rounded-full font-medium border border-[#5A5A40]/10 hover:border-[#5A5A40]/30 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {t('startLearning', 'Start Learning')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
