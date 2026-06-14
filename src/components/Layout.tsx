import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, BookOpen, MessageCircleQuestion, Users, HeartHandshake, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

export default function Layout() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { to: '/', icon: Home, label: t('home', 'Home') },
    { to: '/learn', icon: BookOpen, label: t('learn', 'Learn') },
    { to: '/qa', icon: MessageCircleQuestion, label: t('qa', 'Q&A') },
    { to: '/stories', icon: Users, label: t('stories', 'Stories') },
    { to: '/donate', icon: HeartHandshake, label: t('donate', 'Donate') },
  ];

  const langs: { code: 'en' | 'ar' | 'fr' | 'es' | 'ur', label: string, localLabel?: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arabic', localLabel: 'عربى' },
    { code: 'fr', label: 'French', localLabel: 'Français' },
    { code: 'ur', label: 'Urdu', localLabel: 'اردو' },
    { code: 'es', label: 'Spanish', localLabel: 'Español' },
  ];

  const currentLang = langs.find(l => l.code === language);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#5A5A40]">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#5A5A40]/10 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-[#5A5A40] flex items-center justify-center text-[#EAE7DC] font-bold font-serif">N</div>
          <span className="font-serif font-bold text-xl tracking-tight text-[#5A5A40]">An-Nur</span>
        </NavLink>
        
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-[#5A5A40]",
                  isActive ? "text-[#5A5A40] border-b-2 border-[#5A5A40] pb-1" : "text-[#5A5A40]/70"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative" ref={langMenuRef}>
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-2 bg-[#EAE7DC] px-3 py-2 rounded-full hover:bg-[#EAE7DC]/80 transition-colors"
            aria-label="Select language"
          >
            <span className="text-[10px] sm:text-xs font-bold text-[#5A5A40] uppercase">{currentLang?.code}</span>
            {currentLang?.localLabel && <span className="text-[10px] sm:text-xs text-[#5A5A40]/60 hidden sm:inline">{currentLang.localLabel}</span>}
            <ChevronDown className={cn("w-3 h-3 text-[#5A5A40] transition-transform", showLangMenu && "rotate-180")} />
          </button>
          
          <AnimatePresence>
            {showLangMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-full mt-2 w-40 bg-white rounded-2xl shadow-lg border border-[#5A5A40]/10 overflow-hidden py-2`}
              >
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-[#F5F5F0] transition-colors flex items-center justify-between",
                      language === l.code ? "text-[#5A5A40] font-bold bg-[#F5F5F0]" : "text-[#5A5A40]/70"
                    )}
                  >
                    <span>{l.label}</span>
                    {l.localLabel && <span className="text-xs opacity-60 font-normal">{l.localLabel}</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto pt-16 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Footer — hidden on mobile to not interfere with bottom nav */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FAF9F6] border-t border-[#5A5A40]/10 z-50 px-2 pb-safe">
        <ul className="flex items-center justify-around h-full">
          {navItems.map((item) => (
            <li key={item.to} className="w-full">
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                    isActive ? "text-[#5A5A40]" : "text-[#5A5A40]/50 hover:text-[#5A5A40]"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <item.icon className={cn("w-5 h-5", isActive && "fill-[#5A5A40]/20")} strokeWidth={isActive ? 2.5 : 2} />
                    </motion.div>
                    <span className="text-[10px] font-medium leading-none">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
