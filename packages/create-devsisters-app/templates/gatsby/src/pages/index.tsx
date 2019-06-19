import React from 'react';
import { css } from 'linaria';

interface IndexPageProps {
  location: Location;
}
const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <h1 className={css`
      color: orange;
    `}>
      Hello, World!
    </h1>
  );
};
export default IndexPage;
