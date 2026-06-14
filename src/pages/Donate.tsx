import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { Heart, ShieldCheck, Globe, CreditCard, BookOpen, Users, Mic } from 'lucide-react';

export default function Donate() {
  const { t, dir } = useLanguage();
  const { showToast } = useToast();
  const [amount, setAmount] = useState<number | 'other'>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [10, 25, 50, 100];

  const impactItems = [
    { icon: BookOpen, amount: '$10', label: t('impactTranslate', 'Translates 1 article into a new language') },
    { icon: Users, amount: '$25', label: t('impactNewMuslim', 'Provides a new Muslim welcome pack') },
    { icon: Mic, amount: '$50', label: t('impactScholar', 'Funds 1 hour of scholar Q&A time') },
    { icon: Globe, amount: '$100', label: t('impactPlatform', 'Supports platform hosting for 1 month') },
  ];

  const getSelectedAmount = (): number | null => {
    if (amount === 'other') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? null : parsed;
    }
    return amount;
  };

  const handleDonate = async () => {
    const selectedAmount = getSelectedAmount();
    if (!selectedAmount) {
      showToast(t('invalidAmount', 'Please enter a valid donation amount.'), 'error');
      return;
    }
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    const freqLabel = frequency === 'monthly' ? t('monthly', 'monthly') : t('oneTime', 'one-time');
    showToast(t('donationSuccess', `JazakAllahu Khairan! Your $${selectedAmount} ${freqLabel} donation has been received. May Allah reward you abundantly.`));
    setAmount(50);
    setCustomAmount('');
  };

  return (
    <div className="px-6 py-8 md:py-12 pb-24">
      <header className="mb-10 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-[#F5F5F0] to-[#EAE7DC] rounded-full flex items-center justify-center mx-auto mb-4 relative"
        >
          <Heart className="w-8 h-8 text-[#D2691E] fill-[#D2691E]" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Globe className="w-4 h-4 text-[#5A5A40]" />
          </div>
        </motion.div>
        <h1 className="font-serif text-4xl font-bold text-[#5A5A40] mb-4">{t('donate', 'Donate')}</h1>
        <p className="text-[#5A5A40]/60 max-w-md mx-auto">
          {t('donateDesc', 'Support our global Dawah efforts. Your contribution helps us translate resources, host scholars, and maintain the platform.')}
        </p>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* Donation Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#5A5A40]/10 shadow-sm">
          {/* Frequency Toggle */}
          <div className="mb-6 p-1 bg-[#EAE7DC] rounded-xl flex">
            <button 
              onClick={() => setFrequency('one-time')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                frequency === 'one-time' 
                  ? 'bg-white shadow-sm text-[#5A5A40]' 
                  : 'text-[#5A5A40]/60 hover:text-[#5A5A40]'
              }`}
            >
              {t('oneTime', 'One-time')}
            </button>
            <button 
              onClick={() => setFrequency('monthly')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                frequency === 'monthly' 
                  ? 'bg-white shadow-sm text-[#5A5A40]' 
                  : 'text-[#5A5A40]/60 hover:text-[#5A5A40]'
              }`}
            >
              {t('monthly', 'Monthly')}
            </button>
          </div>
          
          {/* Amount Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#5A5A40]/80 uppercase tracking-wider mb-4">{t('selectAmount', 'Select Amount')}</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {amounts.map((v) => (
                <button 
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    amount === v 
                      ? 'bg-[#5A5A40] text-white shadow-md shadow-[#5A5A40]/20 scale-[1.02]' 
                      : 'bg-[#FAF9F6] text-[#5A5A40]/70 border border-[#5A5A40]/10 hover:border-[#5A5A40]/30 hover:bg-[#F5F5F0]'
                  }`}
                >
                  ${v}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setAmount('other')}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                amount === 'other' 
                  ? 'bg-[#5A5A40] text-white shadow-md' 
                  : 'bg-[#FAF9F6] text-[#5A5A40]/70 border border-[#5A5A40]/10 hover:bg-[#F5F5F0]'
              }`}
            >
              {t('customAmount', 'Custom Amount')}
            </button>
          </div>

          {amount === 'other' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5A40]/40 font-bold">$</span>
                <input 
                  type="number" 
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={t('enterAmount', 'Enter amount')}
                  className="w-full bg-[#FAF9F6] border border-[#5A5A40]/10 rounded-xl py-3 pl-8 pr-4 font-bold text-[#5A5A40] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <button 
            onClick={handleDonate}
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-[#D2691E] text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#D2691E]/90 transition-all shadow-lg shadow-[#D2691E]/20 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t('processing', 'Processing...')}
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                {t('continuePayment', 'Continue to Payment')}
              </>
            )}
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#5A5A40]/50 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {t('securePayment', 'Secure SSL Encrypted Payment')}
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-[#FAF9F6] rounded-3xl p-6 border border-[#5A5A40]/10">
          <h3 className="font-serif text-lg font-bold text-[#5A5A40] mb-4">{t('yourImpact', 'Your Impact')}</h3>
          <div className="space-y-3">
            {impactItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#EAE7DC] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-[#5A5A40]" />
                </div>
                <span className="font-bold text-[#D2691E] w-10">{item.amount}</span>
                <span className="text-[#5A5A40]/70">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hadith Quote */}
        <div className="text-center py-6">
          <p className="font-serif italic text-[#5A5A40]/70 text-sm leading-relaxed">
            "The believer's shade on the Day of Resurrection will be their charity."
          </p>
          <p className="text-[#5A5A40]/40 text-xs mt-1">— Prophet Muhammad ﷺ (Al-Tirmidhi)</p>
        </div>
      </div>
    </div>
  );
}
