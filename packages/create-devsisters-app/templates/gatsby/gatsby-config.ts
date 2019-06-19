import { getEnv } from '@devsisters/dotenv';
import getStack from '@devsisters/gatsby-stack';
import getHats from '@devsisters/gatsby-hats';

const { PATH_PREFIX, PUBLIC_URL, SENTRY_DSN, GA_ID } = getEnv();

export = {
  ...(PATH_PREFIX && { pathPrefix: PATH_PREFIX }),
  siteMetadata: {
    siteUrl: PUBLIC_URL,
  },
  plugins: [
    ...getStack(),
    ...getHats({
      i18n: false,
      autotrack: true,
      googleAnalytics: !!GA_ID && { trackingId: GA_ID },
      sentry: !!SENTRY_DSN && { dsn: SENTRY_DSN },
    }),
  ],
};
