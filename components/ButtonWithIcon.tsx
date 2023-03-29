import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import Button from './Button';

const styles = {
  iconStyle: css({
    padding: '0.5em 0.5em',
    background: 'none',
    border: 'none',
    color: '#fff',
    minHeight: '32px',
    minWidth: '32px',
  }),
};

type IconProps = {
  source?: string;
  altText: string;
  children: ReactNode;
  stylesProp?: SerializedStyles;
  dark?: boolean;
  onClick?: () => void;
};

const ButtonWithIcon = ({
  source,
  altText,
  children,
  stylesProp,
  ...props
}: IconProps) => (
  <Button stylesProp={{ ...styles.iconStyle, ...stylesProp }} {...props}>
    {children}
  </Button>
);

export default ButtonWithIcon;
