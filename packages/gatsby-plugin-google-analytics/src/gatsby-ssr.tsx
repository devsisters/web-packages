import * as React from 'react';

export const onRenderBody = ({ setHeadComponents }: any, pluginOptions: any) => {
  const { trackingId } = pluginOptions;
  if (!trackingId) return;
  setHeadComponents([
    <link rel="preconnect" href="https://www.google-analytics.com"/>,
    <link rel="dns-prefetch" href="https://www.google-analytics.com"/>,
    // See https://developers.google.com/analytics/devguides/collection/analyticsjs#alternative_async_tracking_snippet
    <script dangerouslySetInnerHTML={{ __html: `
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', '${trackingId}', 'auto');
      ga('send', 'pageview');
    `}}/>,
    <script async src='https://www.google-analytics.com/analytics.js'/>,
  ]);
};
