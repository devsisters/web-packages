import * as React from 'react';
import { Global } from '@emotion/core';

const DefaultFontStyle: React.FC = () => {
  return (
    <Global
      styles={{
        '*': {
          fontFamily: 'inherit',
        },
        'body': {
          textRendering: 'optimizeLegibility',
          wordBreak: 'break-word',
          fontFamily: '"Noto Sans__subset", "Noto Sans", sans-serif',
          WebkitFontSmoothing: 'antialiased',
        },
        'body:lang(ja)': {
          fontFamily: '"Noto Sans JP__subset", "Noto Sans JP", sans-serif',
        },
        'body:lang(ko)': {
          wordBreak: 'keep-all',
          fontFamily: '"Noto Sans KR__subset", "Noto Sans KR", sans-serif',
        },
        'body:lang(th)': {
          fontFamily: '"Noto Sans Thai__subset", "Noto Sans Thai", sans-serif',
        },
        'body:lang(zh-Hans)': {
          fontFamily: '"Noto Sans SC__subset", "Noto Sans SC", sans-serif',
        },
        'body:lang(zh-Hant)': {
          fontFamily: '"Noto Sans TC__subset", "Noto Sans TC", sans-serif',
        },
      }}
    />
  );
};

export default DefaultFontStyle;
