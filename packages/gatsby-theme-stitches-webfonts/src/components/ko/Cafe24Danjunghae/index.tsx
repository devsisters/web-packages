import * as React from 'react';
import { global } from '@stitches/react';

import woff2 from './Cafe24Danjunghae.subset.woff2';
import woff from './Cafe24Danjunghae.subset.woff'
import opentype from './Cafe24Danjunghae.subset.otf';
import truetype from './Cafe24Danjunghae.ttf';

const globalStyles = global({
  '@font-face': {
    fontFamily: 'Cafe24Danjunghae',
      src: `local('Cafe24Danjunghae'),
        url(${woff2}) format('woff2'),
        url(${woff}) format('woff'),
        url(${opentype}) format('opentype'),
        url(${truetype}) format('truetype')`,
  }
});

const Cafe24Danjunghae: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(Cafe24Danjunghae, always);
