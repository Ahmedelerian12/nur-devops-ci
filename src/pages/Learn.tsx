import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { PlayCircle, FileText, ChevronRight, ChevronDown, BookOpen, Moon, Utensils } from 'lucide-react';

interface TopicContent {
  title: string;
  description: string;
}

export default function Learn() {
  const { t, dir } = useLanguage();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const categories: { title: string; icon: React.ElementType; items: TopicContent[] }[] = [
    { 
      title: t('theBasics', 'The Basics'),
      icon: BookOpen,
      items: [
        { 
          title: t('pillarsIslam', 'Pillars of Islam'),
          description: t('pillarsDesc', 'The five pillars of Islam are the foundational acts of worship: Shahada (declaration of faith), Salah (five daily prayers), Zakat (almsgiving of 2.5% of savings), Sawm (fasting during Ramadan), and Hajj (pilgrimage to Makkah once in a lifetime for those who are able). These pillars form the framework of a Muslim\'s spiritual life and relationship with Allah.'),
        },
        { 
          title: t('articlesFaith', 'Articles of Faith'),
          description: t('articlesDesc', 'The six articles of faith are the core beliefs in Islam: Belief in Allah (the One God), His Angels, His revealed Books (Torah, Psalms, Gospel, Quran), His Messengers (from Adam to Muhammad ﷺ), the Day of Judgment, and Divine Decree (Qadar). These beliefs guide a Muslim\'s worldview and understanding of existence.'),
        },
        { 
          title: t('whoIsMuhammad', 'Who is Muhammad ﷺ?'),
          description: t('muhammadDesc', 'Prophet Muhammad ﷺ (peace be upon him) was born in Makkah in 570 CE. He received the first revelation of the Quran at age 40 and spent 23 years delivering Allah\'s message. He is regarded as the final prophet in a line of prophets including Abraham, Moses, and Jesus (peace be upon them all). His life (Sunnah) and sayings (Hadith) serve as a practical guide for Muslims in all aspects of life.'),
        },
      ],
    },
    { 
      title: t('worship', 'Worship'),
      icon: Moon,
      items: [
        { 
          title: t('howToPray', 'How to Pray (Salah)'),
          description: t('prayDetailDesc', 'Salah is the second pillar of Islam — five daily prayers performed at dawn (Fajr), midday (Dhuhr), afternoon (Asr), sunset (Maghrib), and night (Isha). Each prayer involves standing, bowing (Ruku), and prostrating (Sujud) while reciting verses from the Quran. Begin with Wudu (ablution), face the Qiblah (direction of the Kaaba in Makkah), and make your intention (Niyyah). You can start by learning Al-Fatiha and short surahs, then gradually memorize more.'),
        },
        { 
          title: t('fastingRamadan', 'Fasting Ramadan'),
          description: t('fastingDesc', 'During the holy month of Ramadan, Muslims fast from dawn (Fajr) to sunset (Maghrib), abstaining from food, drink, and other physical needs. Fasting teaches self-discipline, gratitude, and empathy for those less fortunate. The fast is broken each evening with Iftar, often starting with dates and water following the Prophet\'s tradition. Suhoor is the pre-dawn meal. Those who are ill, traveling, pregnant, or elderly are exempt.'),
        },
        { 
          title: t('zakatCharity', 'Zakat & Charity'),
          description: t('zakatDesc', 'Zakat is an obligatory form of charity requiring Muslims who meet the Nisab (minimum wealth threshold) to give 2.5% of their accumulated savings annually. It purifies one\'s wealth and supports those in need, including the poor, those in debt, travelers, and new Muslims. Beyond Zakat, Muslims are encouraged to give Sadaqah (voluntary charity) in any form — even a smile or a kind word is considered charity in Islam.'),
        },
      ],
    },
    { 
      title: t('dailyLife', 'Daily Life'),
      icon: Utensils,
      items: [
        { 
          title: t('halalHaram', 'Halal & Haram'),
          description: t('halalDesc', 'Halal (permissible) and Haram (forbidden) are guidelines that cover food, drink, finances, and behavior. In food, pork and alcohol are forbidden, and meat must be slaughtered in Allah\'s name (Dhabiha). In finance, interest (Riba) is prohibited, promoting ethical economic practices. These guidelines are designed to protect one\'s health, wealth, and spiritual wellbeing, encouraging a balanced and mindful lifestyle.'),
        },
        { 
          title: t('islamicManners', 'Islamic Manners'),
          description: t('mannersDesc', 'Islam places great emphasis on Adab (etiquette and manners). Key principles include greeting others with "As-salamu Alaikum" (peace be upon you), eating with the right hand and saying Bismillah (In the name of Allah), being truthful, keeping promises, respecting elders, being kind to neighbors, lowering one\'s gaze, speaking gently, and treating all people with dignity regardless of their background.'),
        },
        { 
          title: t('familyLife', 'Family Life'),
          description: t('familyDesc', 'Family is the cornerstone of Islamic society. Islam emphasizes honoring one\'s parents, maintaining strong bonds of kinship, and raising children with love and Islamic values. Marriage is considered a sacred bond and an act of worship. Spouses are described as "garments for each other" (Quran 2:187), signifying mutual protection, comfort, and complementarity. Children have rights to be named well, educated, and treated justly.'),
        },
      ],
    },
  ];

  const toggleTopic = (topicTitle: string) => {
    setExpandedTopic(expandedTopic === topicTitle ? null : topicTitle);
  };

  return (
    <div className="px-6 py-8 md:py-12">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-bold text-[#5A5A40] mb-4">{t('learn', 'Learn')}</h1>
        <p className="text-[#5A5A40]/60 max-w-md mx-auto">
          {t('learnDesc', 'Comprehensive resources tailored for those discovering Islam and new Muslims.')}
        </p>
      </header>

      {/* Featured Video Guide */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 relative overflow-hidden rounded-3xl bg-[#5A5A40] text-[#FAF9F6]"
      >
        <a 
          href="https://quran.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <div className="aspect-video bg-[#42422E] relative group cursor-pointer flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#5A5A40] via-[#5A5A40]/40 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-[#42422E] flex items-center justify-center">
              <p className="font-arabic text-5xl md:text-7xl text-[#EAE7DC]/20 select-none" dir="rtl">بِسْمِ ٱللَّهِ</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10 group-hover:scale-110 group-hover:bg-white/30 transition-all">
              <PlayCircle className="w-8 h-8 text-white fill-white/10" />
            </div>
          </div>
        </a>
        <div className="p-6">
          <span className="text-[#D2691E] text-xs font-bold uppercase tracking-wider mb-2 block">{t('featuredSeries', 'Featured Series')}</span>
          <h2 className="text-2xl font-serif font-bold mb-2">{t('introQuran', 'Introduction to Quranic Sciences')}</h2>
          <p className="text-[#FAF9F6]/70 text-sm mb-4">{t('introQuranDesc', 'A practical guide to approaching and understanding the Quran for beginners.')}</p>
        </div>
      </motion.section>

      {/* Structured Curriculum */}
      <section className="space-y-8">
        {categories.map((category, idx) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-xl font-bold text-[#5A5A40] mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D2691E]/10 flex items-center justify-center">
                <category.icon className="w-4 h-4 text-[#D2691E]" />
              </div>
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.items.map((item, i) => {
                const isExpanded = expandedTopic === item.title;
                return (
                  <div key={i} className="rounded-2xl bg-white border border-[#5A5A40]/10 hover:border-[#5A5A40]/20 transition-all overflow-hidden">
                    <button
                      onClick={() => toggleTopic(item.title)}
                      className="flex items-center gap-3 p-4 w-full text-left transition-all hover:bg-[#F5F5F0]/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#5A5A40]/60" />
                      </div>
                      <span className="font-medium text-[#5A5A40] flex-1">{item.title}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-[#5A5A40]/40" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-4 pb-4 pt-0 border-t border-[#5A5A40]/5">
                            <p className="text-[#5A5A40]/70 text-sm leading-relaxed mt-3">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
