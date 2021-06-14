import * as React from 'react';
import { global } from '@stitches/react';

import regularWoff2 from './NotoSansThai-Regular.subset.woff2';
import regularWoff from './NotoSansThai-Regular.subset.woff';
import regularOpentype from './NotoSansThai-Regular.subset.otf';
import regularTruetype from './NotoSansThai-Regular.ttf';

import boldWoff2 from './NotoSansThai-Bold.subset.woff2';
import boldWoff from './NotoSansThai-Bold.subset.woff';
import boldOpentype from './NotoSansThai-Bold.subset.otf';
import boldTruetype from './NotoSansThai-Bold.ttf';

const globalStyles = global({
  '@font-face': [
    {
    fontFamily: 'Noto Sans Thai',
    fontWeight: 400,
    src: `local('Noto Sans Thai'),
      url(${regularWoff2}) format('woff2'),
      url(${regularWoff}) format('woff'),
      url(${regularOpentype}) format('opentype'),
      url(${regularTruetype}) format('truetype')`
    },
    {
      fontFamily: 'Noto Sans Thai',
      fontWeight: 700,
      src: `local('Noto Sans Thai'),
        url(${boldWoff2}) format('woff2'),
        url(${boldWoff}) format('woff'),
        url(${boldOpentype}) format('opentype'),
        url(${boldTruetype}) format('truetype')`
    }
  ]
});

const NotoSansThai: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(NotoSansThai, always);
