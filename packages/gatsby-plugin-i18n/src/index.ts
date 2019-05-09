// @ts-ignore
import * as raw from 'core-js-pure/features/string/raw';

import * as React from 'react';
import * as Bcp47 from 'bcp-47';
import memoize = require('lodash.memoize');

export interface Locale {
  language: string;
  script: string | null;
  region: string | null;
}

export interface Translations {
  [key: string]: { [key: string]: string | void } | void;
}

export interface I18nPageContext {
  pageContext: {
    locale?: Locale;
    translations: Translations;
  };
}

export interface I18nContext {
  translations: Translations;
  locale: Locale | null;
}

export const getInitialI18nState = (): I18nContext => ({
  translations: {},
  locale: null,
});

export const i18nContext = React.createContext(getInitialI18nState());

type TemplateString = (literals: TemplateStringsArray, ...placeholders: any[]) => string;

const _useTextCache = new Map<I18nContext['translations'], { [key: string]: TemplateString }>();

export const useLocale = (): Locale => {
  const { locale } = React.useContext(i18nContext);
  if (!locale) {
    throw new Error('locale not found');
  }
  return locale;
};

export const useLocaleString = () => {
  const locale = useLocale();
  return toLocaleString(locale);
}

export const useTexts = (locale?: Locale): TemplateString => {
  const { translations, locale: contextLocale } = React.useContext(i18nContext);
  if (!locale && !contextLocale) {
    throw new Error('locale not found');
  }
  const localeString = toLocaleString(locale || contextLocale!);
  if (!_useTextCache.get(translations)) {
    _useTextCache.set(translations, {});
  }
  const cached = _useTextCache.get(translations)!;
  const cachedGetText = cached[localeString];
  if (cachedGetText) {
    return cachedGetText;
  }
  const getText = (
    literals: TemplateStringsArray,
    ...placeholders: any[]
  ): string => {
    const key = raw(literals, ...placeholders);
    if (!translations[localeString] || !(translations[localeString] as any)[key]) {
      return key;
    }
    return (translations[localeString] as any)[key];
  };
  return cached[localeString] = getText;
};

const defaultSchema = {
  extendedLanguageSubtags: [],
  variants: [],
  extensions: [],
  privateuse: [],
  irregular: null,
  regular: null,
};
export const toLocaleString = (localeObject: Locale): string =>
  Bcp47.stringify({ ...defaultSchema, ...localeObject });

export const toLocaleObject = memoize(
  (localeString: string): Locale => {
    const { language, script = null, region = null } = Bcp47.parse(localeString);
    return {
      language,
      script,
      region,
    };
  }
);
