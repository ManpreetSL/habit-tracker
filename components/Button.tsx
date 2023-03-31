import { css, SerializedStyles } from '@emotion/react';

const styles = {
  button: css({
    padding: '0.5em 2em',
    color: '#000',
    backgroundColor: '#91E220',

    ':hover': {
      cursor: 'pointer',
      filter: 'brightness(85%)',
    },
  }),
};

type ButtonProps = {
  children: React.ReactNode;
  stylesProp?: SerializedStyles;
} & React.ComponentProps<'button'>;

const Button = ({ children, stylesProp, ...rest }: ButtonProps) => (
  <button css={[styles.button, { ...stylesProp }]} type='button' {...rest}>
    {children}
  </button>
);

export default Button;
