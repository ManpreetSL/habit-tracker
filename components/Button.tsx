import { css } from '@emotion/react';

const styles = {
  button: css({
    padding: '1em 2em'
  })
};

type ButtonProps = {
  text: string;
  color?: string;
  backgroundColor?: string;
};

const Button = ({
  text = '',
  color = '#000',
  backgroundColor = '#91E220'
}: ButtonProps) => {
  return (
    <button
      css={[
        styles.button,
        { color: `${color}`, backgroundColor: `${backgroundColor}` }
      ]}
    >
      {text}
    </button>
  );
};

export default Button;
