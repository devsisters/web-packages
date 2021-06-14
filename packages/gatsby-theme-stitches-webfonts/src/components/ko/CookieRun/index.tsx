import * as React from 'react';
import { global } from '@stitches/react';

import regularWoff2 from './CookieRun-Regular.subset.woff2';
import regularWoff from './CookieRun-Regular.subset.woff';
import regularOpentype from './CookieRun-Regular.subset.otf';
import regularTruetype from './CookieRun-Regular.ttf';

import boldWoff2 from './CookieRun-Bold.subset.woff2';
import boldWoff from './CookieRun-Bold.subset.woff';
import boldOpentype from './CookieRun-Bold.subset.otf';
import boldTruetype from './CookieRun-Bold.ttf';

const globalStyles = global({
  '@font-face': [
    {
      fontFamily: 'CookieRun',
      fontWeight: 400,
      src: `local('CookieRun'),
        url(${regularWoff2}) format('woff2'),
        url(${regularWoff}) format('woff'),
        url(${regularOpentype}) format('opentype'),
        url(${regularTruetype}) format('truetype')`
    },
    {
      fontFamily: 'CookieRun',
      fontWeight: 700,
      src: `local('CookieRun'),
        url(${boldWoff2}) format('woff2'),
        url(${boldWoff}) format('woff'),
        url(${boldOpentype}) format('opentype'),
        url(${boldTruetype}) format('truetype')`
    }
  ]
});

const CookieRun: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(CookieRun, always);
