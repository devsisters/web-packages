import * as React from 'react';
import { Global, css } from '@emotion/react';

const Roboto: React.FC = () => {
  return (
    <Global styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    `} />
  );
};

const always = () => true;
export default React.memo(Roboto, always);
