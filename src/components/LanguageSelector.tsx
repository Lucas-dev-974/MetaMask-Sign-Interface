import { Component } from 'solid-js';
import { useI18n } from '../i18n/context';
import type { Language } from '../i18n/translations';

const LanguageSelector: Component = () => {
  const { language, setLanguage } = useI18n();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <div class="flex items-center gap-2 mb-4">
      <span class="text-xs text-gray-500">Language:</span>
      <div class="flex gap-1">
        {languages.map((lang) => (
          <button
            onClick={() => setLanguage(lang.code)}
            class={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              language() === lang.code
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={lang.label}
          >
            <span class="mr-1">{lang.flag}</span>
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;

