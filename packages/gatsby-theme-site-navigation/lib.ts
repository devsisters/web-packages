import type { ThemeOptions } from './types';

import Joi from 'joi';

type PluginContext = {
  navigationId: string,
};

const schema = Joi.object({
  navigationId: Joi.string().required(),
}).unknown(true);

export function mustValidOptions(options: unknown): PluginContext {
  const { error, value } = schema.validate(options);
  if (error) {
    throw error;
  }
  return value as PluginContext;
}

export function normalizeLanguage(lang: string) {
  const supportedLangs = ['en', 'ja', 'ko', 'th', 'zh-Hant', 'zh-Hans'];

  const normalized = lang
    .replace('/.*(tw).*/i', 'zh-Hant')
    .replace('/.*(cn).*/i', 'zh-Hans')
    .replace(/.*(en|ja|ko|th|zh-Hant|zh-Hans).*/i, '$1');

  if (!supportedLangs.includes(normalized)) {
    throw new Error(`language: ${lang} is not supported`);
  }

  return normalized;
}
