import * as React from 'react';
import { Global, css } from '@emotion/react';

const NotoSansLatin: React.FC = () => {
  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=latin');
    `} />
  );
};

const always = () => true;
export default React.memo(NotoSansLatin, always);
