import { GatsbyI18nPluginOptions } from '@devsisters/gatsby-plugin-i18n/types';

export default function getHats(config: HatsConfig): GatsbyPlugin[] {
  // 이 배열의 뒤쪽에 있을 수록 나중에 감싸집니다.
  // 나중에 감싸진다는 것은 렌더트리의 바깥에 있다는 뜻이기 때문에
  // 나중에 감싸진 플러그인의 `onClientEntry` 훅이 먼저 불립니다.
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
  if (config.i18n) {
    plugins.push(Object.assign({
      resolve: '@devsisters/gatsby-plugin-i18n',
    }, typeof config.i18n === 'object' && {
      options: config.i18n,
    }));
  }
  plugins.push(
    { resolve: 'gatsby-plugin-react-helmet' },
    { resolve: 'gatsby-plugin-sitemap' },
  );
  return plugins;
}

export const matomoTrackerUrls = {
  dev: 'https://logging.dev.devsisters.cloud/v1/log/web',
  production: 'https://logging.devsisters.cloud/v1/log/web',
};

interface HatsConfig {
  /**
   * 사이트 다국어 지원 여부입니다.
   * `true`를 넣으면 기본 설정을 사용합니다.
   *
   * 자세한 내용은 [문서](https://www.notion.so/devsisters/gatsby-plugin-i18n-8cab9382aa7f4dfa9e5d2015200d062a)를 참고하세요.
  */
  i18n?: boolean | Partial<GatsbyI18nPluginOptions>;
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
