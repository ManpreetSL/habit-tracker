import NextLink from 'next/link';
import { ReactNode } from 'react';
import { css } from '@emotion/react';

type LinkProps = {
  href: string;
  children: ReactNode;
};

const linkStyle = css({
  fontSize: '1.2em',
  '&:hover': {
    color: 'orange'
  }
});

const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink css={linkStyle} href={href}>
      {children}
    </NextLink>
  );
};

export default Link;
