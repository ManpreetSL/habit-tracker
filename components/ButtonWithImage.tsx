import { css } from '@emotion/react';
import Image from 'next/image';
import Button from './Button';

const styles = {
  iconStyle: css({
    padding: '0.5em 0.7em',
    background: 'none',
    border: 'none',
  }),
};

type IconProps = {
  source: string;
  altText: string;
};

const ButtonWithImage = ({ source, altText, ...props }: IconProps) => (
  <Button stylesProp={styles.iconStyle} {...props}>
    <Image src={source} alt={altText} width='32' height='32' />
  </Button>
);

export default ButtonWithImage;
