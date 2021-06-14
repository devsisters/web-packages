import * as React from 'react';
import { global } from '@stitches/react';

const globalStyles = global({
  '@import': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
});

const Roboto: React.FC = () => {
  globalStyles();
  return null;
};

const always = () => true;
export default React.memo(Roboto, always);
