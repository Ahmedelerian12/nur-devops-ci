import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { Search, ChevronDown, MessageSquarePlus, X, BookOpen } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    category: 'basics',
    q_en: "What are the requirements to become a Muslim?",
    a_en: "Becoming a Muslim requires a sincere declaration of faith called the Shahada: 'Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah' — meaning 'I bear witness that there is no deity but God, and I bear witness that Muhammad is the messenger of God.' It is simply a heartfelt acknowledgment spoken with conviction. No formal ceremony, witnesses, or registration is strictly necessary, though it is recommended to say it before witnesses and at a mosque for community support.",
  },
  {
    id: 2,
    category: 'prayer',
    q_en: "How do I start performing daily prayers if I don't know Arabic?",
    a_en: "Begin by learning the physical movements (standing, bowing, prostrating, sitting) and then gradually learn the Arabic recitations. Many new Muslims start by reading transliterations and translations alongside the Arabic text. Allah looks at your sincerity and effort above all. There are excellent apps like 'My Salah' and YouTube tutorials that guide you step by step. Start with the short surahs (Al-Fatiha, Al-Ikhlas) and expand from there. The community at your local mosque will also be happy to help you learn.",
  },
  {
    id: 3,
    category: 'basics',
    q_en: "Is it mandatory to change my name after converting to Islam?",
    a_en: "No, changing your name is not required in Islam. You only need to change it if your current name carries a meaning that contradicts Islamic monotheism (such as being named after another deity) or has an inherently negative or obscene meaning. Many companions of the Prophet ﷺ kept their pre-Islamic names. However, some new Muslims choose to adopt an Arabic or Islamic name as a personal and spiritual choice, which is entirely permissible and can be a meaningful part of your new identity.",
  },
  {
    id: 4,
    category: 'basics',
    q_en: "What is the difference between Sunni and Shia Muslims?",
    a_en: "Both Sunni and Shia Muslims share the core beliefs of Islam: belief in One God (Allah), the Quran as God's final revelation, and Muhammad ﷺ as the final Prophet. The historical split originated from a disagreement over leadership succession after the Prophet's death. Sunnis followed Abu Bakr as the first Caliph, while Shia believed Ali ibn Abi Talib (the Prophet's cousin and son-in-law) was the rightful successor. Despite differences in some practices and jurisprudence, both groups are Muslim and share far more in common than what divides them.",
  },
  {
    id: 5,
    category: 'dailylife',
    q_en: "What foods are Halal and what should I avoid?",
    a_en: "Halal (permissible) food includes most fruits, vegetables, grains, seafood, and meat that has been slaughtered according to Islamic guidelines (Dhabiha) with the name of Allah invoked. Items that are Haram (forbidden) include: pork and its by-products, alcohol and intoxicants, blood, meat from animals that died naturally or were not slaughtered properly, and carnivorous animals. When shopping, look for Halal certification on packaged products. When in doubt, many scholars advise choosing seafood or vegetarian options.",
  },
  {
    id: 6,
    category: 'prayer',
    q_en: "What times are the five daily prayers performed?",
    a_en: "The five daily prayers are: Fajr (pre-dawn, before sunrise), Dhuhr (midday, after the sun passes its zenith), Asr (afternoon, when shadows are equal to or longer than object heights), Maghrib (immediately after sunset), and Isha (nightfall, when twilight disappears). Prayer times vary by location and season. You can use apps like 'Muslim Pro' or 'Athan' or websites like IslamicFinder.org to find exact times for your location. Each prayer has a window of time during which it can be performed.",
  },
  {
    id: 7,
    category: 'family',
    q_en: "How do I tell my family I've accepted Islam?",
    a_en: "This is a deeply personal matter that varies by family. Here are some general guidelines: Choose a calm, private moment. Be gentle and patient — your family may need time to process. Emphasize that Islam teaches respect and honor for parents and family. Show through your improved character and kindness what Islam means to you. Don't try to convert them or debate — simply live your faith. If you face hostility, remain patient and kind, as the Quran advises. Connecting with a local Muslim community can provide essential emotional support during this transition.",
  },
  {
    id: 8,
    category: 'basics',
    q_en: "Do Muslims worship Muhammad ﷺ?",
    a_en: "No, absolutely not. Muslims worship Allah (God) alone. Muhammad ﷺ is revered as the final Prophet and Messenger of God, but he is a human being, not divine. Muslims follow his example (Sunnah) and teachings as a guide for living a righteous life. The Quran itself states: 'Muhammad is not but a messenger' (3:144). The symbol 'ﷺ' stands for 'Sallallahu Alayhi Wasallam' (peace and blessings be upon him), which is a prayer Muslims say out of respect whenever his name is mentioned.",
  },
];

export default function QA() {
  const { t, dir } = useLanguage();
  const { showToast } = useToast();
  const [openId, setOpenId] = useState<number | null>(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({ email: '', topic: 'General Islam', question: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filters = [
    { key: 'all', label: t('allTopics', 'All') },
    { key: 'basics', label: t('theBasics', 'Basics') },
    { key: 'prayer', label: t('prayerWorship', 'Prayer') },
    { key: 'dailylife', label: t('dailyLife', 'Daily Life') },
    { key: 'family', label: t('familyLife', 'Family') },
  ];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.q_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a_en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || faq.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      showToast(t('questionRequired', 'Please enter your question before submitting.'), 'error');
      return;
    }
    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowAskModal(false);
    setFormData({ email: '', topic: 'General Islam', question: '' });
    showToast(t('questionSubmitted', 'Your question has been submitted! A scholar will review and respond soon.'));
  };

  return (
    <div className="px-6 py-8 md:py-12">
      <header className="mb-8 text-center relative">
        <h1 className="font-serif text-4xl font-bold text-[#5A5A40] mb-4">{t('qa', 'Q&A')}</h1>
        <p className="text-[#5A5A40]/60 max-w-md mx-auto">
          {t('qaDesc', 'Find answers to common questions or ask a verified Islamic scholar directly.')}
        </p>
      </header>

      {/* Search and Action */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A5A40]/40`} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchTopics', 'Search topics...')}
            className={`w-full bg-white border border-[#5A5A40]/10 rounded-full py-3 ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} focus:outline-none focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent transition-all`}
          />
        </div>
        <button 
          onClick={() => setShowAskModal(true)}
          className="bg-[#5A5A40] text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-[#5A5A40]/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <MessageSquarePlus className="w-5 h-5" />
          {t('askQuestion', 'Ask a Question')}
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter.key
                ? 'bg-[#5A5A40] text-white shadow-sm'
                : 'bg-white text-[#5A5A40]/70 border border-[#5A5A40]/10 hover:border-[#5A5A40]/30'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-[#5A5A40]/50"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">{t('noResults', 'No questions match your search.')}</p>
            <p className="text-sm mt-1">{t('tryDifferent', 'Try a different search term or ask a scholar directly.')}</p>
          </motion.div>
        ) : (
          filteredFaqs.map((faq) => (
            <motion.div 
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              layout
              className="bg-[#FAF9F6] border text-left border-[#5A5A40]/10 rounded-2xl overflow-hidden hover:border-[#5A5A40]/20 transition-colors"
            >
              <button 
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <h3 className="font-semibold text-[#5A5A40] pr-4">{faq.q_en}</h3>
                <ChevronDown className={`w-5 h-5 text-[#5A5A40]/40 flex-shrink-0 transition-transform duration-300 ${openId === faq.id ? 'rotate-180 text-[#5A5A40]' : ''}`} />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-[#5A5A40]/70 border-t border-[#5A5A40]/10 pt-4 bg-[#F5F5F0]/50"
                    style={{ originY: 0 }}
                  >
                    <p className="leading-relaxed text-sm">{faq.a_en}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>

      {/* Ask Scholar Modal */}
      <AnimatePresence>
        {showAskModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#5A5A40]/60 p-4 sm:p-6 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowAskModal(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FAF9F6] w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowAskModal(false)}
                className="absolute top-4 right-4 p-2 bg-[#EAE7DC] rounded-full text-[#5A5A40]/60 hover:text-[#5A5A40] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-serif text-2xl font-bold mb-2 text-[#5A5A40]">{t('askScholar', 'Ask a Scholar')}</h2>
              <p className="text-[#5A5A40]/60 text-sm mb-6">{t('askModalDesc', 'Your question will be reviewed and answered by a qualified scholar. You will be notified via email.')}</p>
              
              <form className="space-y-4" onSubmit={handleSubmitQuestion}>
                <div>
                  <label className="block text-sm font-medium text-[#5A5A40]/80 mb-1">{t('emailOptional', 'Email (Optional)')}</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-[#F5F5F0] border border-[#5A5A40]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all" 
                    placeholder={t('forNotification', 'For notification...')} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5A5A40]/80 mb-1">{t('topic', 'Topic')}</label>
                  <select 
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full bg-[#F5F5F0] border border-[#5A5A40]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
                  >
                    <option>{t('generalIslam', 'General Islam')}</option>
                    <option>{t('prayerWorship', 'Prayer & Worship')}</option>
                    <option>{t('familyRelationships', 'Family & Relationships')}</option>
                    <option>{t('halalHaram', 'Halal & Haram')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5A5A40]/80 mb-1">{t('question', 'Question')}</label>
                  <textarea 
                    rows={4} 
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full bg-[#F5F5F0] border border-[#5A5A40]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] resize-none transition-all" 
                    placeholder={t('typeQuestion', 'Type your detailed question here...')}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#5A5A40] text-white rounded-xl py-4 font-medium hover:bg-[#5A5A40]/90 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('submitting', 'Submitting...')}
                    </>
                  ) : (
                    t('submitQuestion', 'Submit Question')
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
