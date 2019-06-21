export interface GatsbyI18nPluginOptions {
  pagesPath: string;
  translationsPath: string;
}

export interface LocalizationData {
  locale: string;
  translations: {
    key: string;
    value: string;
  }[];
}
// will be transformed into
export interface LocalizedResources {
  [key: string]: string;
}

export interface Translations {
  [locale: string]: LocalizedResources;
}
