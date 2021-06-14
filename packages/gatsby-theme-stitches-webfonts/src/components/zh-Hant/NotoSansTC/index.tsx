import * as React from 'react';
import { global } from '@stitches/react';

const globalStyles = global({
  '@import': 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap&subset=chinese-tranditional'
});

const NotoSansTC: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(NotoSansTC, always);
