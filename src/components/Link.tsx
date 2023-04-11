import NextLink from 'next/link';
import { ReactNode } from 'react';
import { css } from '@emotion/react';

type LinkProps = {
  href: string;
  children: ReactNode;
};

const styles = {
  link: css({
    fontSize: '1em',
    '&:hover': {
      color: 'orange',
    },
  }),
};

const Link = ({ href, children }: LinkProps) => (
  <NextLink css={styles.link} href={href}>
    {children}
  </NextLink>
);

export default Link;
