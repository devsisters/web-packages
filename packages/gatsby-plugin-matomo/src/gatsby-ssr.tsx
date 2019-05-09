import * as React from 'react';

export const onRenderBody = ({ setHeadComponents }: any, pluginOptions: any) => {
  const { trackerUrl, siteId } = pluginOptions;
  if (!trackerUrl || !siteId) return;
  const isProd = process.env.NODE_ENV === 'production';
  const piwikSrc = isProd ?
    'https://public.devscookie.com/piwik.min.js' :
    'https://public.devscookie.com/piwik.js';
  setHeadComponents([
    <script key="piwik-js" src={piwikSrc}/>,
    <script key="piwik-js-init" dangerouslySetInnerHTML={{ __html: `
      window.piwik = window.Piwik.getTracker(${
        JSON.stringify(trackerUrl)
      }, ${
        JSON.stringify(siteId)
      });
    ` }}/>,
  ]);
};
