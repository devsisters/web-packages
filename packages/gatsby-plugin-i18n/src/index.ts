import React from 'react';

import { Translations } from './types';

const raw = require('core-js-pure/stable/string/raw') as typeof String.raw;

export interface I18nContext {
  locale: string;
  translations: Translations;
}

export const i18nContext = React.createContext<I18nContext>({
  // Faking default locale as EN
  locale: 'en',
  translations: {},
});

export const useI18n = () => {
  return React.useContext(i18nContext);
};

export const useLocale = () => {
  const { locale } = useI18n();
  return locale;
};

export const useLocaleString = () => {
  console.warn('useLocaleString() was deprecated. Use useLocale() instead.');
  return useLocale();
};

export const useTexts = (locale?: string) => {
  const { translations, locale: contextLocaleString } = useI18n();
  const resource = translations[locale || contextLocaleString]
  return (template: TemplateStringsArray) => {
    const key = raw(template);
    return resource[key] || key;
  };
};
