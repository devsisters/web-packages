import type { PluginOptions as PrismicSourceOptions } from 'gatsby-source-prismic/src/types';

export type ThemeOptions = {
  navigationId: string,
  prismicOptions: Pick<PrismicSourceOptions, (
    | 'repositoryName'
    | 'accessToken'
  )>,
};
