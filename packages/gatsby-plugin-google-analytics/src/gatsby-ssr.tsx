import * as React from 'react';

export const onRenderBody = ({ setHeadComponents }: any, pluginOptions: any) => {
  const { trackingId } = pluginOptions;
  if (!trackingId) return;
  setHeadComponents([
    <script key="gtag" async src={`https://www.googletagmanager.com/gtag/js?id=${ trackingId }`}/>,
    <script key="gtag-init" dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', ${ JSON.stringify(trackingId) }, { send_page_view: false });
    ` }}/>,
  ]);
};
