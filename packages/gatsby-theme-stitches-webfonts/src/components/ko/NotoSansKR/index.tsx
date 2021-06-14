import * as React from 'react';
import { global } from '@stitches/react';

const globalStyles = global({
  '@import': 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap&subset=korean'
});

const NotoSansKR: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(NotoSansKR, always);
