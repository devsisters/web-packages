import * as path from 'path';
import * as fs from 'fs';
// todo: replace glob
import readDir = require('recursive-readdir');
import chokidar = require('chokidar');
import yaml = require('js-yaml');
import memoize = require('lodash.memoize');

import {
  GatsbyOnCreatePage,
  PluginOptions,
  GatsbyCreatePagesStatefully,
  PageInput,
} from './types';
import { Translations, toLocaleObject } from './index';

export const createPagesStatefully: GatsbyCreatePagesStatefully = async ({ actions, store }, options, done) => {
  const pagesPath = getPagesPath(options);
  const translationsPath = getTranslationsPath(options);
  const { createPage, deletePage } = actions;

  const translationFilepaths = await readDir(translationsPath);
  const localeStrings = translationFilepaths.map(
    filename => removeExtension(filename.substr(translationsPath.length + 1))
  );
  const toUrlPath = (filepath: string): string => {
    const filename = removePageExtension(filepath.substr(pagesPath.length));
    return removeTrailingSlash(
      filename.endsWith('index') ? filename.slice(0, -5) : filename
    );
  }
  const toI18nPaths = (filepath: string): string[] => {
    const urlPath = toUrlPath(filepath);
    return localeStrings.map(localeString => `${localeString}${urlPath}`);
  }

  const createI18nPage = (filepath: string) => {
    const i18nPaths = toI18nPaths(filepath);
    return Promise.all(
      i18nPaths.map(async (path, index) => {
        const locale = toLocaleObject(localeStrings[index]);
        createPage({
          path,
          component: filepath,
          context: {
            locale,
            translations: await loadTranslations(translationsPath),
          },
        });
      })
    );
  }

  try {
    const files = await readDir(pagesPath);
    await Promise.all(
      files
        .filter(filepath => filepath.match(/\.page\.(js|ts)x?$/))
        .map(createI18nPage)
    );
  } catch (error) {
    errorLog(`Failed to read directory '${pagesPath}'`);
    console.error(error);
    return;
  }

  chokidar
    // todo: read extensions from gatsby program
    .watch(`${pagesPath}/**/*.page.{js,jsx,ts,tsx}`)
    .on('add', createI18nPage)
    .on('unlink', (filepath) => {
      store.getState().pages.forEach((page: PageInput) => {
        if (page.component !== filepath) {
          return;
        }
        const i18nPaths = toI18nPaths(filepath);
        i18nPaths.forEach(i18nPath => {
          deletePage({
            ...page,
            path: i18nPath,
          });
        });
      });
    })
    .on('ready', done);
};

export const onCreatePage: GatsbyOnCreatePage = async ({ page, actions }, options) => {
  // inject translations to non-i18n pages
  if (page.context && page.context.i18nTranslations) {
    return;
  }
  const { deletePage, createPage } = actions;
  const translationsPath = getTranslationsPath(options);
  deletePage(page);
  createPage({
    ...page,
    context: {
      ...page.context,
      translations: await loadTranslations(translationsPath),
    },
  });
};

const getTranslationsPath = memoize(
  (option: PluginOptions): string =>
    path.resolve(option.translationsPath || './src/translations')
);

const getPagesPath = memoize(
  (option: PluginOptions): string => path.resolve(option.pagesPath || './src/@pages')
);

const loadTranslations = memoize(async (path: string): Promise<Translations> => {
  const files = await readDir(path);
  return files.reduce<{ [key: string]: any }>((_translations, filepath) => {
    const translation = yaml.load(fs.readFileSync(filepath).toString());
    const key = removeExtension(filepath.substr(path.length + 1));
    _translations[key] = translation;
    return _translations;
  }, {});
});

const errorLog = (message: string): void =>
  console.error(`\x1b[41m\x1b[37m${message}\x1b[0m`);

const removeExtension = (filename: string): string =>
  filename
    .split('.')
    .slice(0, -1)
    .join('.');

const removePageExtension = (filename: string): string =>
  filename
    .split('.')
    .slice(0, -2)
    .join('.');

const removeTrailingSlash = (pathname: string): string => 
  pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
