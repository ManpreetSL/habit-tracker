import { css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  container: css({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#444',
    marginBottom: '48px',
  }),

  content: css({
    minWidth: '700px',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    marginBottom: '48px',

    'div:nth-child(1), div:nth-child(3)': {
      display: 'flex',
      flexGrow: 1,
      flexBasis: 0,
      justifyContent: 'center',
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
    <div css={styles.content}>
      <div>{left}</div>
      <div>{centre}</div>
      <div>{right}</div>
    </div>
  </header>
);

export default Header;
