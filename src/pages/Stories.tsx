import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { PenLine, Heart, Share2, X, MapPin, Calendar } from 'lucide-react';

interface Story {
  id: number;
  author: string;
  country: string;
  date: string;
  excerpt: string;
  fullStory: string;
  liked: boolean;
  likeCount: number;
}

const INITIAL_STORIES: Story[] = [
  {
    id: 1,
    author: "Aminah C.",
    country: "United Kingdom",
    date: "March 2026",
    excerpt: "I was always searching for inner peace. I had tried philosophy, meditation, and various spiritual paths, but nothing resonated deeply. Then a colleague noticed my restlessness and gently introduced me to the Quran...",
    fullStory: "I was always searching for inner peace. I had tried philosophy, meditation, and various spiritual paths, but nothing resonated deeply. Then a colleague noticed my restlessness and gently introduced me to the Quran. The very first verse I read — 'Verily, in the remembrance of Allah do hearts find rest' (13:28) — struck me profoundly. Over the next six months, I studied, asked questions, and met the most welcoming community at my local mosque. The day I took my Shahada, I felt a weight lift off my shoulders that I didn't even know I was carrying. Islam didn't just give me answers; it gave me tranquility. Alhamdulillah.",
    liked: false,
    likeCount: 142,
  },
  {
    id: 2,
    author: "Carlos M.",
    country: "Mexico",
    date: "January 2026",
    excerpt: "Growing up Catholic in Mexico, I never imagined I'd become Muslim. But when I started studying comparative religion at university, the concept of pure monotheism in Islam — no intermediaries, no trinity — made the most sense to me...",
    fullStory: "Growing up Catholic in Mexico, I never imagined I'd become Muslim. But when I started studying comparative religion at university, the concept of pure monotheism in Islam — no intermediaries, no trinity — made the most sense to me. I was drawn to how Islam integrated worship into daily life through the five prayers, how it honored Jesus (Isa) as a prophet, and how the Quran remained preserved in its original language. My family was hesitant at first, but when they saw how the discipline of daily prayers brought structure and peace to my formerly chaotic life, they began to understand. My mother even said, 'Whatever makes you this peaceful must be good.' That was the greatest affirmation I could receive.",
    liked: false,
    likeCount: 98,
  },
  {
    id: 3,
    author: "Yuki T.",
    country: "Japan",
    date: "November 2025",
    excerpt: "In the fast-paced world of Tokyo, I felt spiritually empty despite professional success. Walking past a small mosque in Shibuya one Friday, I was captivated by the sound of the Adhan...",
    fullStory: "In the fast-paced world of Tokyo, I felt spiritually empty despite professional success. Walking past a small mosque in Shibuya one Friday, I was captivated by the sound of the Adhan (call to prayer). Something about it pierced through the city noise straight into my heart. I stepped in hesitantly — and was met with warm smiles and green tea. The imam spoke basic Japanese and patiently explained the fundamentals of Islam over many weeks. What convinced me was Islam's emphasis on balance — work and worship, individual and community, this life and the hereafter. In Japanese culture, we value discipline and respect; I found these same values elevated to a spiritual dimension in Islam. My conversion was quiet, but the peace it brought is immeasurable.",
    liked: false,
    likeCount: 231,
  },
  {
    id: 4,
    author: "Grace O.",
    country: "Nigeria",
    date: "September 2025",
    excerpt: "I grew up in a Christian household in Lagos but always had questions that no one could answer satisfactorily. When I began reading the Quran out of curiosity, I found that it addressed every doubt I'd ever had...",
    fullStory: "I grew up in a Christian household in Lagos but always had questions that no one could answer satisfactorily — Why does God need a son? Why can't I speak to God directly? When I began reading the Quran out of curiosity, I found that it addressed every doubt I'd ever had with clear, rational answers. Surah Al-Ikhlas (Chapter 112) — 'Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent' — summed up everything I had always believed but couldn't articulate. The transition wasn't easy socially, but the Muslim community in Lagos embraced me as family. Today, my own mother, seeing the positive change in me, has started asking questions about Islam herself. Allah guides whom He wills.",
    liked: false,
    likeCount: 187,
  },
];

export default function Stories() {
  const { t, dir } = useLanguage();
  const { showToast } = useToast();
  const [showShareModal, setShowShareModal] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [formData, setFormData] = useState({ name: '', country: '', journey: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleLike = (id: number) => {
    setStories(prev => prev.map(s => 
      s.id === id 
        ? { ...s, liked: !s.liked, likeCount: s.liked ? s.likeCount - 1 : s.likeCount + 1 }
        : s
    ));
  };

  const shareStory = (story: Story) => {
    if (navigator.share) {
      navigator.share({
        title: `${story.author}'s Journey to Islam`,
        text: story.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${story.author}'s Journey to Islam:\n\n"${story.excerpt}"\n\nRead more at ${window.location.href}`);
      showToast(t('copiedClipboard', 'Story link copied to clipboard!'));
    }
  };

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.journey.trim()) {
      showToast(t('storyRequired', 'Please write your story before submitting.'), 'error');
      return;
    }
    if (formData.journey.trim().length < 50) {
      showToast(t('storyTooShort', 'Please write a bit more about your journey (at least 50 characters).'), 'error');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowShareModal(false);
    setFormData({ name: '', country: '', journey: '' });
    showToast(t('storySubmitted', 'JazakAllahu Khairan! Your story has been submitted for review and will be published soon.'));
  };

  return (
    <div className="px-6 py-8 md:py-12">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-bold text-[#5A5A40] mb-4">{t('stories', 'Stories')}</h1>
        <p className="text-[#5A5A40]/60 max-w-md mx-auto mb-6">
          {t('storiesDesc', 'Read inspiring journeys of people who found their way to Islam, or share your own to inspire others.')}
        </p>
        <button 
          onClick={() => setShowShareModal(true)}
          className="inline-flex items-center gap-2 bg-[#5A5A40] text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-[#5A5A40]/90 hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <PenLine className="w-4 h-4" />
          {t('shareJourney', 'Share Your Journey')}
        </button>
      </header>

      <div className="space-y-6">
        {stories.map((story) => (
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            key={story.id} 
            className="bg-white rounded-3xl p-6 border border-[#5A5A40]/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EAE7DC] to-[#D2691E]/20 text-[#5A5A40] flex items-center justify-center font-serif font-bold text-lg">
                {story.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-[#5A5A40] leading-tight">{story.author}</h3>
                <p className="text-xs text-[#5A5A40]/60 flex items-center gap-2">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{story.country}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{story.date}</span>
                </p>
              </div>
            </div>
            
            <div className="text-[#5A5A40]/90 leading-relaxed mb-6 font-serif italic">
              <p>
                "{expandedId === story.id ? story.fullStory : story.excerpt}"
              </p>
              <button
                onClick={() => setExpandedId(expandedId === story.id ? null : story.id)}
                className="text-[#D2691E] text-sm font-sans not-italic font-medium mt-2 hover:underline"
              >
                {expandedId === story.id ? t('readLess', 'Read less') : t('readMore', 'Read full story →')}
              </button>
            </div>
            
            <div className="flex items-center gap-6 border-t border-[#5A5A40]/10 pt-4">
              <button 
                onClick={() => toggleLike(story.id)}
                className={`flex items-center gap-2 transition-colors text-sm font-medium ${
                  story.liked ? 'text-[#D2691E]' : 'text-[#5A5A40]/40 hover:text-[#D2691E]'
                }`}
              >
                <Heart className={`w-5 h-5 transition-all ${story.liked ? 'fill-[#D2691E] scale-110' : ''}`} /> {story.likeCount}
              </button>
              <button 
                onClick={() => shareStory(story)}
                className="flex items-center gap-2 text-[#5A5A40]/40 hover:text-[#5A5A40] transition-colors text-sm font-medium ml-auto"
              >
                <Share2 className="w-5 h-5" />
                {t('share', 'Share')}
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Share Story Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#5A5A40]/60 p-4 sm:p-6 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowShareModal(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#FAF9F6] w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute top-4 right-4 p-2 bg-[#EAE7DC] rounded-full text-[#5A5A40]/60 hover:text-[#5A5A40] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="font-serif text-2xl font-bold mb-2 text-[#5A5A40]">{t('shareStory', 'Share Your Story')}</h2>
              <p className="text-[#5A5A40]/60 text-sm mb-6">{t('shareStoryDesc', 'Your story can be the light that guides someone else. You can choose to remain completely anonymous.')}</p>
              
              <form className="space-y-4" onSubmit={handleSubmitStory}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#5A5A40]/80 mb-1">{t('nameAlias', 'Name / Alias')}</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#F5F5F0] border border-[#5A5A40]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all" 
                      placeholder={t('egAnonymous', 'e.g. Anonymous')} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#5A5A40]/80 mb-1">{t('country', 'Country')}</label>
                    <input 
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full bg-[#F5F5F0] border border-[#5A5A40]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all" 
                      placeholder={t('egCountry', 'e.g. United States')} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5A5A40]/80 mb-1">{t('yourJourney', 'Your Journey')}</label>
                  <textarea 
                    rows={6}
                    value={formData.journey}
                    onChange={(e) => setFormData(prev => ({ ...prev, journey: e.target.value }))}
                    className="w-full bg-[#F5F5F0] border border-[#5A5A40]/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5A5A40] resize-none transition-all" 
                    placeholder={t('startWriting', 'Start writing your story here...')}
                  />
                  <p className="text-xs text-[#5A5A40]/40 mt-1">
                    {formData.journey.length}/50 {t('minChars', 'minimum characters')}
                  </p>
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
                    t('submitStory', 'Submit for Review')
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
