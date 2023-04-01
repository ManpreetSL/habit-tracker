import { css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#444',

    'div:nth-child(1), div:nth-child(3)': {
      flexGrow: 1,
      flexBasis: 0,
    },
  }),
};

type HeaderProps = {
  left: ReactNode;
  centre: ReactNode;
  right: ReactNode;
};

// TODO: If any props aren't given, display defaults of:
// Left: back button
const Header = ({ left, centre, right }: HeaderProps) => (
  <header css={styles.container}>
    <div>{left}</div>
    <div>{centre}</div>
    <div>{right}</div>
  </header>
);

export default Header;
