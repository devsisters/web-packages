import * as React from 'react';

import { PluginOptions } from './types';


export const onRenderBody = ({ setHeadComponents }: any, pluginOptions: PluginOptions) => {
  const { type } = pluginOptions;
  switch (type) {
    case 'alert':
      setHeadComponents([
        <script
          key='check-ie'
          dangerouslySetInnerHTML={{
            __html: ''
              + '(function () {'
              + '  var koMessage = "Internet Explorer는 지원되지 않습니다.\\nChrome 브라우저를 이용해주세요.";'
              + '  var enMessage = "Sorry! Internet Explorer is not supported.\\n Please use Google Chrome.";'
              + ''
              + '  var href = window.location.href;'
              + '  var isKoPage = href.indexOf("ko") >= 0;'
              + '  var isEnPage = href.indexOf("en") >= 0;'
              + '  var isThPage = href.indexOf("th") >= 0;'
              + '  var isJaPage = href.indexOf("ja") >= 0;'
              + '  var isZhHantPage = href.indexOf("zh-Hant") >= 0;'
              + '  var isDePage = href.indexOf("de") >= 0;'
              + '  var isFrPage = href.indexOf("fr") >= 0;'
              + ''
              + '  var lang = window.navigator.userLanguage || window.navigator.language;'
              + '  var isKo = lang.indexOf("ko") >= 0;'
              + ''
              + '  var isIE = /MSIE|Trident/.test(window.navigator.userAgent);'
              + ''
              + '  if (isIE) {'
              + '    if (isKoPage) return alert(koMessage);'
              + '    if (isEnPage || isThPage || isJaPage || isZhHantPage || isDePage || isFrPage) return alert(enMessage);'
              + '    if (isKo) {'
              + '      return alert(koMessage);'
              + '    } else {'
              + '      return alert(enMessage);'
              + '    }'
              + '  }'
              + '})();',
          }}
        />,
      ]);
      break;
    case 'navigate':
      setHeadComponents([
        <script
          key='check-ie'
          dangerouslySetInnerHTML={{
            __html: ''
              + '(function () {'
              + '  return window.location.href = "https://please-never-ie.devsisters.com/";'
              + '})();',
          }}
        />,
      ]);
      break;
    default:
      break;
  }
};
