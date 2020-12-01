import * as React from 'react';
import { Global, css } from '@emotion/core';

const NotoSansTC: React.FC = () => {
  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap&subset=chinese-tranditional');
    `} />
  );
};

const always = () => true;
export default React.memo(NotoSansTC, always);
