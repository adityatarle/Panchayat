'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('hi'); // Default to Hindi

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['hi', 'mr', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (['hi', 'mr', 'en'].includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  const t = (text) => {
    if (!text || typeof text !== 'object') return text;
    
    // Return text based on current language
    switch (language) {
      case 'hi':
        return text.hi || text.en || text.mr || text;
      case 'mr':
        return text.mr || text.hi || text.en || text;
      case 'en':
        return text.en || text.hi || text.mr || text;
      default:
        return text.hi || text.en || text.mr || text;
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    isHindi: language === 'hi',
    isMarathi: language === 'mr',
    isEnglish: language === 'en'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};