import * as React from 'react';

export const onRenderBody = ({ setHeadComponents }: any, pluginOptions: any) => {
  const { apiKey } = pluginOptions;
  if (!apiKey) return;
  setHeadComponents([
    <script key="kakao-sdk" src="https://developers.kakao.com/sdk/js/kakao.min.js"/>,
    <script key="kakao-sdk-init" dangerouslySetInnerHTML={{ __html: `
      Kakao.init(${ JSON.stringify(apiKey) });
    ` }}/>
  ]);
};
