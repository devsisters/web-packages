import * as React from 'react';
import { Global, css } from '@emotion/react';

const NotoSansSC: React.FC = () => {
  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,700&display=swap&subset=chinese-simplified');
    `} />
  );
};

const always = () => true;
export default React.memo(NotoSansSC, always);
