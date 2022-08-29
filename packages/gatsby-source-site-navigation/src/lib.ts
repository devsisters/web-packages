import type { ThemeOptions } from './types';

export function normalizeLanguage(lang: string) {
  const supportedLangs = ['en', 'ja', 'ko', 'th', 'zh-Hant', 'zh-Hans', 'de', 'fr'] as const;
  type SupportedLanguage = typeof supportedLangs[number];

  const normalized = lang
    .replace(/.*(tw).*/i, 'zh-Hant')
    .replace(/.*(cn).*/i, 'zh-Hans')
    .replace(/.*(en|ja|ko|th|zh-Hant|zh-Hans|de|fr).*/i, '$1') as SupportedLanguage;

  if (!supportedLangs.includes(normalized)) {
    throw new Error(`language: ${lang} is not supported`);
  }

  return normalized;
}

export function normalizeSocialServiceName(service: string) {
  const supportedServiceNames = [
    'BILIBILI',
    'DISCORD',
    'FACEBOOK',
    'FORUM',
    'INSTAGRAM',
    'KAKAOTALK',
    'NAVER_CAFE',
    'REDDIT',
    'TWITTER',
    'WEIBO',
    'YOUTUBE',
    'LINE',
  ] as const;
  type SupportedService = typeof supportedServiceNames[number];

  const normalized = service
    .replace(/-/g, '_')
    .toUpperCase() as SupportedService;

  if (!supportedServiceNames.includes(normalized)) {
    throw new Error(`service: ${service} is not supported`);
  }

  return normalized;
}
