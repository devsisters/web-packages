import * as React from 'react';
import { Global, css } from '@emotion/core';

import woff2 from './Cafe24Danjunghae.subset.woff2';
import woff from './Cafe24Danjunghae.subset.woff'
import opentype from './Cafe24Danjunghae.subset.otf';
import truetype from './Cafe24Danjunghae.ttf';

const Cafe24Danjunghae: React.FC = () => {
  return (
    <Global styles={css`
      @font-face {
        font-family: 'Cafe24Danjunghae';
        src: local('Cafe24Danjunghae'),
          url(${woff2}) format('woff2'),
          url(${woff}) format('woff'),
          url(${opentype}) format('opentype'),
          url(${truetype}) format('truetype');
      }
    `}/>
  );
};

const always = () => true;
export default React.memo(Cafe24Danjunghae, always);
