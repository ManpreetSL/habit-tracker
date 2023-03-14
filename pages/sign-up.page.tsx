import { css } from '@emotion/react';
import { useState } from 'react';
import Button from '../components/Button';
import useAuth from '../src/services/auth/useAuth';
import useUser from '../src/services/auth/useUser';

const styles = {
  container: css({
    width: '40%',
    margin: '0 auto',
  }),
  form: css({
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',

    input: css({
      margin: '0.7em 0 0.7em 0',
      padding: '0.7em',
      backgroundColor: '#220000',
      color: '#fff',
      width: '100%',
    }),

    label: css({}),

    button: css({
      margin: '0.7em 0',
    }),
  }),
};

type FormType = {
  email?: string;
  password?: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormType>({
    email: '',
    password: '',
  });

  const { signUp } = useAuth();
  const { user } = useUser();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => signUp('Laxus@fairytail.guild', 'FairyHeart1313');

  return (
    <div css={styles.container}>
      {user ? (
        `${user.email} is already logged in`
      ) : (
        <form onSubmit={handleSignUp} css={styles.form}>
          <label htmlFor='email'>
            Email:
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='me@example.com'
              required
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <Button type='submit'>Sign Up</Button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
