export default function getStack(): GatsbyPlugin[] {
  const plugins: GatsbyPlugin[] = [
    { resolve: 'gatsby-plugin-typescript' },
    { resolve: 'gatsby-plugin-linaria' },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          localIdentName:
            (process.env.NODE_ENV === 'production') ?
            '[hash:base64:7]' :
            '[path][name]__[local]--[hash:base64:5]',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-module-resolver',
      options: {
        root: './',
        aliases: {
          '~': '.',
        },
      },
    },
  ];
  return plugins;
}

interface GatsbyPlugin {
  resolve: string;
  options?: object;
}
