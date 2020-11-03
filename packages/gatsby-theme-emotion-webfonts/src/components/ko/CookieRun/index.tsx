import * as React from 'react';
import { Global, css } from '@emotion/core';

import regularWoff2 from './CookieRun-Regular.subset.woff2';
import regularWoff from './CookieRun-Regular.subset.woff';
import regularOpentype from './CookieRun-Regular.subset.otf';
import regularTruetype from './CookieRun-Regular.ttf';

import boldWoff2 from './CookieRun-Bold.subset.woff2';
import boldWoff from './CookieRun-Bold.subset.woff';
import boldOpentype from './CookieRun-Bold.subset.otf';
import boldTruetype from './CookieRun-Bold.ttf';

const CookieRun: React.FC = () => {
  return (
    <Global styles={css`
      @font-face {
        font-family: 'CookieRun';
        font-weight: 400;
        src: local('CookieRun'),
          url(${regularWoff2}) format('woff2'),
          url(${regularWoff}) format('woff'),
          url(${regularOpentype}) format('opentype'),
          url(${regularTruetype}) format('truetype');
      }
      @font-face {
        font-family: 'CookieRun';
        font-weight: 700;
        src: local('CookieRun'),
          url(${boldWoff2}) format('woff2'),
          url(${boldWoff}) format('woff'),
          url(${boldOpentype}) format('opentype'),
          url(${boldTruetype}) format('truetype');
      }
    `}/>
  );
};

const always = () => true;
export default React.memo(CookieRun, always);
