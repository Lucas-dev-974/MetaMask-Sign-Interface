import { createContext, useContext, ParentComponent, createSignal, onMount, createMemo } from 'solid-js';
import { translations, type Language, type Translations } from './translations';

const I18nContext = createContext<{
  t: () => Translations;
  language: () => Language;
  setLanguage: (lang: Language) => void;
}>();

const LANGUAGE_STORAGE_KEY = 'metamask_wallet_language';
const DEFAULT_LANGUAGE: Language = 'fr';

export const I18nProvider: ParentComponent = (props) => {
  const [language, setLanguageSignal] = createSignal<Language>(DEFAULT_LANGUAGE);

  const setLanguage = (lang: Language) => {
    setLanguageSignal(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  onMount(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (saved && (saved === 'fr' || saved === 'en')) {
      setLanguageSignal(saved);
    } else {
      // Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'fr') {
        setLanguageSignal(browserLang as Language);
      }
    }
  });

  const t = createMemo(() => translations[language()]);

  return (
    <I18nContext.Provider value={{ t, language, setLanguage }}>
      {props.children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

