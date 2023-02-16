import { css, SerializedStyles } from '@emotion/react';

const styles = {
  button: css({
    padding: '0.5em 2em',
  }),
};

type ButtonProps = {
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  stylesProp?: SerializedStyles;
} & React.ComponentProps<'button'>;

const Button = ({
  color = '#000',
  backgroundColor = '#91E220',
  stylesProp,
  children,
  ...rest
}: ButtonProps) => (
  <button
    css={[
      styles.button,
      { color: `${color}`, backgroundColor: `${backgroundColor}` },
      { ...stylesProp },
    ]}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
