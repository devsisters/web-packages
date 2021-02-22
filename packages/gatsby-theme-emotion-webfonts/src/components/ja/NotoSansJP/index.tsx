import * as React from 'react';
import { Global, css } from '@emotion/react';

const NotoSansJP: React.FC = () => {
  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap&subset=japanese');
    `} />
  );
};

const always = () => true;
export default React.memo(NotoSansJP, always);
