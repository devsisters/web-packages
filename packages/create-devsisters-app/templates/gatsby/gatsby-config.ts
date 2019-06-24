import { getEnv } from '@devsisters/dotenv';
import getPreset from '@devsisters/gatsby-preset';

const { PATH_PREFIX, PUBLIC_URL, SENTRY_DSN, GA_ID } = getEnv();

export = {
  ...(PATH_PREFIX && { pathPrefix: PATH_PREFIX }),
  siteMetadata: {
    siteUrl: PUBLIC_URL,
  },
  plugins: [
    ...getPreset({
      passport: false,
      i18n: false,
      autotrack: true,
      googleAnalytics: !!GA_ID && { trackingId: GA_ID },
      sentry: !!SENTRY_DSN && { dsn: SENTRY_DSN },
    }),
  ],
};
