declare module '*.svg' {
  import type * as React from 'react';

  interface SvgrComponent extends React.FC<React.SVGAttributes<SVGElement>> {}

  const url: string;
  const ReactComponent: SvgrComponent;

  export default url;
  export { ReactComponent };
}
