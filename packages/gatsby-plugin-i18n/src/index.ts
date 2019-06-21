import React from 'react';
// @ts-ignore
import raw from 'core-js-pure/features/string/raw';

import { Translations } from './types';
import { useStaticQuery, graphql } from 'gatsby';

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
  return (literals: TemplateStringsArray) => resource[raw(literals)];
};
