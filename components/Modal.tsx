import { css } from '@emotion/react';
import { ReactNode } from 'react';
import Button from './Button';

const styles = {
  container: css({
    position: 'fixed',
    zIndex: 1,
    background: 'rgba(0, 0, 52, 0.5)',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  }),
  content: css({
    width: '90%',
    backgroundColor: '#333',
    margin: '10% auto',
    padding: '2em 1em 2em 1em',
    position: 'relative',
    opacity: '100%',

    '@media (min-width: 800px)': {
      width: '70%',
    },

    '@media (min-width: 1280px)': {
      width: '40%',
    },
  }),
  closeButton: css({
    position: 'absolute',
    top: '15px',
    right: '15px',
  }),
};

type ModalProps = {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
  title: string;
};

const Modal = ({ children, show, onClose, title }: ModalProps) =>
  show ? (
    <div css={styles.container}>
      <div
        css={styles.content}
        role='dialog'
        aria-labelledby='modal_label'
        aria-modal='true'
      >
        <h1 id='modal_label'>{title}</h1>
        <Button css={styles.closeButton} onClick={onClose} title='Cancel'>
          &times;
        </Button>
        {children}
      </div>
    </div>
  ) : null;

export default Modal;
