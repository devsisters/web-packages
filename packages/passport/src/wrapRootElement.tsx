import * as React from 'react';
import { Root } from './react';

export default ({ element }: any, pluginOptions: any) => {
  return (
    <Root clientId={pluginOptions.clientId}>
        {element}
    </Root>
  );
};
