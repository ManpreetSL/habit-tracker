import { css } from '@emotion/react';
import Image from 'next/image';

type Props = {};

const ViewHabits = (props: Props) => {
  return (
    <div css={containerStyle}>
      <Image src='/logo.svg' alt='.SHIFT logo' fill />
    </div>
  );
};

const containerStyle = css({
  position: 'relative',
  width: '100vw',
  maxWidth: '100%',
  height: '20vh',
  backgroundColor: '#111'
});

export default ViewHabits;
