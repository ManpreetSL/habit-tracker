import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdAccountBox } from 'react-icons/md';
import useAuth from '../src/services/auth/useAuth';
import useUser from '../src/services/auth/useUser';
import Button from './Button';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '92px',
    right: '12px',
    zIndex: '2',
  }),
  menu: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#1c1c1c',
    padding: '1em',
    borderRadius: '4px',
    transform: 'rotateX(-90deg)',
    transformOrigin: 'top center',
    opacity: '0.3',
    visibility: 'hidden',
    transition: '280ms all ease-out',
  }),
  menuOpen: css({
    transform: 'rotateX(0)',
    opacity: 1,
    visibility: 'visible',
  }),
  button: css({
    maxWidth: '50px',
    maxHeight: '50px',
    padding: '7px',
  }),
  email: css({
    marginBottom: '9px',
  }),
};

const AccountMenu = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/log-in');
  };

  const [showMenu, setShowMenu] = useState(false);
  const menuStyles = showMenu ? [styles.menuOpen] : [styles.menu];

  return (
    <div css={styles.container}>
      <Button
        aria-expanded={showMenu}
        aria-controls='account-menu'
        stylesProp={styles.button}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <MdAccountBox size='36px' />
      </Button>
      <div css={menuStyles} id='account-menu' data-css='dropdown-menu'>
        {user ? (
          <>
            <span css={styles.email}>{user.email}</span>
            <Button onClick={handleSignOut}>Sign out</Button>
          </>
        ) : (
          <Button onClick={handleSignIn}>Sign in</Button>
        )}
      </div>
    </div>
  );
};

export default AccountMenu;
