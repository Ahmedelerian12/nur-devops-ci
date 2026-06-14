import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, BookOpen, Star, Sparkles, Users, Heart, MessageCircleQuestion, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  const { t, dir } = useLanguage();

  const stats = [
    { icon: Globe, value: '5', label: t('statsLanguages', 'Languages') },
    { icon: BookOpen, value: '9+', label: t('statsTopics', 'Topics') },
    { icon: Users, value: '∞', label: t('statsCommunity', 'Community') },
    { icon: Heart, value: '24/7', label: t('statsSupport', 'Support') },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5A5A40]/5 to-transparent -z-10" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#EAE7DC] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F5F5F0] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        
        <motion.div 
          variants={stagger}
          initial="initial"
          animate="animate"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE7DC] text-[#5A5A40] text-xs font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t('discoverIslam', 'Discover Islam')}</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#5A5A40] leading-[1.1] mb-6">
            {t('heroTitle', 'Discover the Light of Islam')}
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg text-[#5A5A40]/70 mb-10 max-w-lg mx-auto leading-relaxed">
            {t('heroSubtitle', 'A global community spreading peace, knowledge, and truth. Join us to learn, connect, and support.')}
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/learn" 
              className="w-full sm:w-auto px-8 py-4 bg-[#5A5A40] text-[#FAF9F6] rounded-full font-medium shadow-lg shadow-[#5A5A40]/20 hover:bg-[#5A5A40]/90 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              {t('startLearning', 'Start Learning')} <ArrowRight className={dir === 'rtl' ? 'rotate-180 w-4 h-4' : 'w-4 h-4'} />
            </Link>
            <Link 
              to="/stories" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#5A5A40] rounded-full font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-[#5A5A40]/10"
            >
              {t('readStories', 'Read Stories')}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Banner */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 -mt-8 mb-12 relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-lg border border-[#5A5A40]/10 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <stat.icon className="w-6 h-6 text-[#D2691E] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#5A5A40] font-serif">{stat.value}</div>
              <div className="text-xs text-[#5A5A40]/60 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Featured Resources */}
      <section className="px-6 py-12 bg-white rounded-t-[2.5rem]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#5A5A40] mb-2">{t('forNewMuslims', 'For New Muslims')}</h2>
            <p className="text-[#5A5A40]/60">{t('essentialGuides', 'Essential guides to begin your journey.')}</p>
          </div>
          <Link to="/learn" className="text-[#5A5A40] font-medium text-sm hidden sm:flex items-center gap-1 hover:gap-2 transition-all">
            {t('viewAll', 'View all')} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Card 1 — Prayer Guide */}
          <Link to="/learn" className="group block relative overflow-hidden rounded-3xl bg-[#F5F5F0] p-6 border border-[#5A5A40]/10 hover:border-[#5A5A40]/30 hover:bg-[#EAE7DC] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-white text-[#5A5A40] rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#5A5A40] mb-2">{t('howToPray', 'How to Pray (Salah)')}</h3>
            <p className="text-[#5A5A40]/70 text-sm mb-4">{t('prayGuideDesc', 'A complete step-by-step guide to performing the daily prayers.')}</p>
            <span className="text-[#5A5A40] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              {t('readGuide', 'Read Guide')} <ArrowRight className={dir === 'rtl' ? 'rotate-180 w-3 h-3' : 'w-3 h-3'} />
            </span>
          </Link>

          {/* Card 2 — Ask a Scholar */}
          <Link to="/qa" className="group block relative overflow-hidden rounded-3xl bg-[#F5F5F0] p-6 border border-[#5A5A40]/10 hover:border-[#D2691E]/30 hover:bg-[#EAE7DC] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-white text-[#D2691E] rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#5A5A40] mb-2">{t('askScholar', 'Ask a Scholar')}</h3>
            <p className="text-[#5A5A40]/70 text-sm mb-4">{t('askScholarDesc', 'Have questions? Get answers from verified Islamic scholars.')}</p>
            <span className="text-[#D2691E] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              {t('browseQA', 'Browse Q&A')} <ArrowRight className={dir === 'rtl' ? 'rotate-180 w-3 h-3' : 'w-3 h-3'} />
            </span>
          </Link>

          {/* Card 3 — Conversion Stories */}
          <Link to="/stories" className="group block relative overflow-hidden rounded-3xl bg-[#F5F5F0] p-6 border border-[#5A5A40]/10 hover:border-[#5A5A40]/30 hover:bg-[#EAE7DC] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-white text-[#5A5A40] rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#5A5A40] mb-2">{t('stories', 'Stories')}</h3>
            <p className="text-[#5A5A40]/70 text-sm mb-4">{t('storiesCardDesc', 'Read inspiring journeys of people who embraced Islam from around the world.')}</p>
            <span className="text-[#5A5A40] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              {t('readStories', 'Read Stories')} <ArrowRight className={dir === 'rtl' ? 'rotate-180 w-3 h-3' : 'w-3 h-3'} />
            </span>
          </Link>

          {/* Card 4 — Donate */}
          <Link to="/donate" className="group block relative overflow-hidden rounded-3xl bg-[#F5F5F0] p-6 border border-[#5A5A40]/10 hover:border-[#D2691E]/30 hover:bg-[#EAE7DC] transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-white text-[#D2691E] rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#5A5A40] mb-2">{t('donate', 'Donate')}</h3>
            <p className="text-[#5A5A40]/70 text-sm mb-4">{t('donateCardDesc', 'Support our mission to make Islamic knowledge accessible to everyone globally.')}</p>
            <span className="text-[#D2691E] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              {t('continuePayment', 'Continue to Payment')} <ArrowRight className={dir === 'rtl' ? 'rotate-180 w-3 h-3' : 'w-3 h-3'} />
            </span>
          </Link>
        </div>

        {/* Mobile view all */}
        <Link to="/learn" className="sm:hidden mt-6 block text-center text-[#5A5A40] font-medium text-sm">
          {t('viewAll', 'View all')} →
        </Link>
      </section>

      {/* Quran Verse Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-6 py-16 bg-[#5A5A40] text-center"
      >
        <div className="max-w-2xl mx-auto">
          <p className="font-arabic text-2xl md:text-3xl text-[#EAE7DC] leading-loose mb-4" dir="rtl">
            ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ
          </p>
          <p className="text-[#EAE7DC]/80 text-sm md:text-base italic font-serif">
            "Allah is the Light of the heavens and the earth."
          </p>
          <p className="text-[#EAE7DC]/50 text-xs mt-2">— {t('surahNur', 'Surah An-Nur (24:35)')}</p>
        </div>
      </motion.section>
    </div>
  );
}
