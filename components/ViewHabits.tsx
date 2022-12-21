import { css } from '@emotion/react';
import Image from 'next/image';

const containerStyle = css({
  position: 'relative',
  width: '100vw',
  maxWidth: '100%',
  height: '20vh',
  backgroundColor: '#111',
});

const ViewHabits = () => (
  <div css={containerStyle}>
    <Image src='/logo.svg' alt='.SHIFT logo' fill />
  </div>
);

export default ViewHabits;
