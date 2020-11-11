import * as React from 'react';

type AnchorProps = React.ComponentProps<'a'>;

type LinkProps = Omit<AnchorProps, 'href'> & {
  to: string,
};

const Link: React.FC<LinkProps> = ({
  to,
  children,
  ...otherProps
}) => {
  return (
    <a href={to} {...otherProps}>
      {children}
    </a>
  );
};

export default Link;
