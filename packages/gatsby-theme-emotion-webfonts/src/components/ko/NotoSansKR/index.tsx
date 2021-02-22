import * as React from 'react';
import { Global, css } from '@emotion/react';

const NotoSansKR: React.FC = () => {
  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&display=swap&subset=korean');
    `} />
  );
};

const always = () => true;
export default React.memo(NotoSansKR, always);
