import { css, SerializedStyles } from '@emotion/react';

const styles = {
  button: css({
    padding: '0.5em 2em'
  })
};

type ButtonProps = {
  color?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  stylesProp?: SerializedStyles;
};

const Button = ({
  color = '#000',
  backgroundColor = '#91E220',
  stylesProp,
  children
}: ButtonProps) => {
  return (
    <button
      css={[
        styles.button,
        { color: `${color}`, backgroundColor: `${backgroundColor}` },
        { ...stylesProp }
      ]}
    >
      {children}
    </button>
  );
};

export default Button;
