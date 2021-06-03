import * as  React from 'react';
import HelloWorld from '~/src/components/Hello';

type IndexPageProps = {
  location: Location;
}

const IndexPage: React.FC<IndexPageProps> = () => {
  return (
    <HelloWorld />
  );
};

export default IndexPage;
