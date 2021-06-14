import * as React from 'react';
import { global } from '@stitches/react';

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

const globalStyles = global({
  '@font-face': [
    {
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontStyle: 'normal',
      fontDisplay: 'swap',
      src: `local('Noto Sans'),
        url(${woff2}) format('woff2'),
        url(${woff}) format('woff'),
        url(${otf}) format('opentype'),
        url(${ttf}) format('truetype')`,
    },
    {
      fontFamily: 'Noto Sans',
      fontWeight: 400,
      fontStyle: 'italic',
      fontDisplay: 'swap',
      src:`Docal('Noto Sans Italic'),
        url(${italicWoff2}) format('woff2'),
        url(${italicWoff}) format('woff'),
        url(${italicOtf}) format('opentype'),
        url(${italicTtf}) format('truetype')`,
    },
    {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontStyle: 'normal',
      fontDisplay: 'swap',
      src: `local('Noto Sans Bold'),
        url(${boldWoff2}) format('woff2'),
        url(${boldWoff}) format('woff'),
        url(${boldOtf}) format('opentype'),
        url(${boldTtf}) format('truetype')`,
    },
    {
      fontFamily: 'Noto Sans',
      fontWeight: 700,
      fontStyle: 'italic',
      fontDisplay: 'swap',
      src: `local('Noto Sans Bold Italic'),
        url(${boldItalicWoff2}) format('woff2'),
        url(${boldItalicWoff}) format('woff'),
        url(${boldItalicOtf}) format('opentype'),
        url(${boldItalicTtf}) format('truetype')`,
    }
  ]
});

const NotoSans: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(NotoSans, always);
