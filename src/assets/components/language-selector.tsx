import { ChevronDownIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';


type Language = 'pt' | 'en';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false); // Fechar dropdown após seleção
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-400 rounded-full transition-colors duration-200 bg-transparent font-medium text-zinc-200 hover:border-gray-500"
      >
        <span className="w-5 h-5">
          <img
            src={language === 'pt' ? '/brazil-.png' : '/united-states.png'}
            alt={language === 'pt' ? 'Brazil Flag' : 'United States Flag'}
            className="w-5 h-5"
          />
        </span>
        <span>{language === 'pt' ? 'Português' : 'English'}</span>
        <ChevronDownIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-zinc-800 border border-gray-400 rounded-lg shadow-lg">
          <button
            onClick={() => handleLanguageChange('pt')}
            className="flex items-center w-full px-4 py-2 text-left text-white hover:bg-zinc-700 rounded-t-lg"
          >
            <span className="w-5 h-5 mr-2 items-center">
                <img src="/brazil-.png" className="w-5 h-5" alt="Brazil Flag" />
            </span>
            <span>Português</span>
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className="flex items-center w-full px-4 py-2 text-left text-white hover:bg-zinc-700 rounded-b-lg"
          >
            <span className="w-5 h-5 mr-2 items-center">
                <img src="/united-states.png" className="w-5 h-5" alt="United States Flag" />
            </span>
            <span>English</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
