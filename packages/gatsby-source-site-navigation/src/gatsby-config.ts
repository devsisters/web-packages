import type { GatsbyConfig } from 'gatsby';
import type { ThemeOptions } from './types';

module.exports = (options: ThemeOptions) => {
  return {
    plugins: [
      {
        resolve: 'gatsby-source-prismic',
        options: {
          repositoryName: options.repositoryName,
          accessToken: options.accessToken,
          schemas: {
            SiteNavigation: require('./prismicSchemas/site_navigation.json'),
          },
        },
      },
    ],
  };
};
