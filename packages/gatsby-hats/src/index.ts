export default function getHats(config: HatsConfig): GatsbyPlugin[] {
  const plugins: GatsbyPlugin[] = [
    { resolve: '@devsisters/dotenv' },
  ];
  autotrack: if (config.autotrack !== false) {
    if (!config.googleAnalytics && !config.matomo) break autotrack;
    plugins.push({ resolve: '@devsisters/gatsby-plugin-autotrack' });
  }
  if (config.googleAnalytics) {
    plugins.push({
      resolve: '@devsisters/gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalytics.trackingId,
      },
    });
  }
  if (config.matomo) {
    plugins.push({
      resolve: '@devsisters/gatsby-plugin-matomo',
      options: {
        trackerUrl: config.matomo.trackerUrl,
        siteId: config.matomo.siteId,
      },
    });
  }
  if (config.sentry) {
    plugins.push({
      resolve: '@devsisters/gatsby-plugin-sentry',
      options: {
        dsn: config.sentry.dsn,
      },
    });
  }
  return plugins;
}

export const matomoTrackerUrls = {
  dev: 'https://logging.dev.devsisters.cloud/v1/log/web',
  production: 'https://logging.devsisters.cloud/v1/log/web',
};

interface HatsConfig {
  /**
   * 자동 추적코드 삽입 여부입니다. (google analytics, matomo)
   * 
   * 기본값은 `true`입니다. 끄려면 `false`를 넣으세요.
   * 
   * 자동 추적코드에 대한 설명은 [여기](https://www.notion.so/devsisters/gatsby-plugin-autotrack-bced9c0bc9bb4ff58283b0006a182dd4)를 보세요.
   */
  autotrack?: boolean;
  googleAnalytics?: false | {
    /**
     * `UA-XXXXXXXX-XX` 요런 모양으로 생긴 ID를 적어주세요.
     */
    trackingId: string;
  };
  matomo?: false | {
    /**
     * 로깅서버 url을 적어주세요.
     */
    trackerUrl: string;
    /**
     * `DA-xxxx1234` 요런 모양으로 생긴 ID를 적어주세요.
     */
    siteId: string;
  };
  sentry?: false | {
    /**
     * `https://abcdef0123456789abcdef0123456789@sentry.io/1234567`
     * 요런 모양으로 생긴 url을 적어주세요.
     */
    dsn: string;
  };
}

interface GatsbyPlugin {
  resolve: string;
  options?: object;
}
