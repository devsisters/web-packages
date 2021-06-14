import * as React from 'react';
import { global } from '@stitches/react';

const globalStyles = global({
  '@import': 'https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,700&display=swap&subset=chinese-simplified'
});

const NotoSansSC: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(NotoSansSC, always);
