import * as React from 'react';
import { global } from '@stitches/react';

const globalStyles = global({
  '@import': 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap&subset=japanese'
});

const NotoSansJP: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(NotoSansJP, always);
