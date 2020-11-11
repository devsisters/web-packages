import type { ThemeOptions } from './types';

module.exports = ({ prismicOptions }: ThemeOptions) => {
  return {
    plugins: [
      'gatsby-plugin-svgr',
      {
        resolve: 'gatsby-theme-prismic',
        options: {
          ...prismicOptions,
          schemas: {
            site_navigation: require('./prismicSchema/site_navigation.json'),
          },
        },
      },
    ],
  };
};
