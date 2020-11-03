import * as React from 'react';
import { Global, css } from '@emotion/core';

import woff2 from './NotoSans-Regular.subset.woff2';
import woff from './NotoSans-Regular.subset.woff';
import otf from './NotoSans-Regular.subset.otf';
import ttf from './NotoSans-Regular.ttf';

import italicWoff2 from './NotoSans-Italic.subset.woff2';
import italicWoff from './NotoSans-Italic.subset.woff';
import italicOtf from './NotoSans-Italic.subset.otf';
import italicTtf from './NotoSans-Italic.ttf';

import boldWoff2 from './NotoSans-Bold.subset.woff2';
import boldWoff from './NotoSans-Bold.subset.woff';
import boldOtf from './NotoSans-Bold.subset.otf';
import boldTtf from './NotoSans-Bold.ttf';

import boldItalicWoff2 from './NotoSans-BoldItalic.subset.woff2';
import boldItalicWoff from './NotoSans-BoldItalic.subset.woff';
import boldItalicOtf from './NotoSans-BoldItalic.subset.otf';
import boldItalicTtf from './NotoSans-BoldItalic.ttf';

const NotoSans: React.FC = () => {
  return (
    <Global styles={css`
      @font-face {
        font-family: 'Noto Sans';
        font-weight: 400;
        font-style: normal;
        font-display: swap;
        src: local('Noto Sans'),
          url(${woff2}) format('woff2'),
          url(${woff}) format('woff'),
          url(${opentype}) format('opentype'),
          url(${truetype}) format('truetype');
      }
      @font-face {
        font-family: 'Noto Sans';
        font-weight: 400;
        font-style: italic; font-display: swap;
        src: local('Noto Sans Italic'),
          url(${italicWoff2}) format('woff2'),
          url(${italicWoff}) format('woff'),
          url(${italicOpentype}) format('opentype'),
          url(${italicTruetype}) format('truetype');
      }
      @font-face {
        font-family: 'Noto Sans';
        font-weight: 700;
        font-style: normal;
        font-display: swap;
        src: local('Noto Sans Bold'),
          url(${boldWoff2}) format('woff2'),
          url(${boldWoff}) format('woff'),
          url(${boldOpentype}) format('opentype'),
          url(${boldTruetype}) format('truetype');
      }
      @font-face {
        font-family: 'Noto Sans';
        font-weight: 700;
        font-style: italic;
        font-display: swap;
        src: local('Noto Sans Bold Italic'),
          url(${boldItalicWoff2}) format('woff2'),
          url(${boldItalicWoff}) format('woff'),
          url(${boldItalicOpentype}) format('opentype'),
          url(${boldItalicTruetype}) format('truetype');
      }
    `} />
  );
};

const always = () => true;
export default React.memo(NotoSans, always);
