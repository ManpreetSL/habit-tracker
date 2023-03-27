import { css } from '@emotion/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { FormEvent, ReactNode, useState } from 'react';
import { Trans, useTranslation } from 'next-i18next';
import Button from '../components/Button';
import Link from '../src/components/Link';
import useAuth from '../src/services/auth/useAuth';
import useUser from '../src/services/auth/useUser';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
    },
  };
}

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

    button: css({
      margin: '0.7em 0',
    }),
  }),

  error: css({
    backgroundColor: '#CF6679',
    padding: '0.7em',
    margin: '0.4em 0',
    color: '#000',
  }),
};

type FormType = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<FormType>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { t } = useTranslation();
  const { signUp } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  if (user) router.push('/');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;
    signUp(email, password).catch(({ message }) => setError(message));
  };

  let errorDisplay = '' as ReactNode;
  if (
    error ===
    'Firebase: Password should be at least 6 characters (auth/weak-password).'
  )
    errorDisplay = t('auth:errors.passwordLength');
  else if (error === 'Firebase: Error (auth/email-already-in-use).')
    errorDisplay = (
      <Trans
        t={t}
        i18nKey='auth:errors.emailInUse'
        components={[
          <Link key={0} href='/log-in'>
            sign in
          </Link>,
        ]}
      />
    );
  else errorDisplay = 'Error. Please try again.';

  return (
    <div css={styles.container}>
      <h1>{t('auth:signUp')}</h1>
      <form onSubmit={handleSignUp} css={styles.form}>
        <label htmlFor='email'>
          {t('auth:email')}:
          <input
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('auth:placeholders.email') || ''}
            required
          />
        </label>
        <label htmlFor='password'>
          {t('auth:password')}:
          <input
            type='password'
            name='password'
            id='password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        {error ? (
          <span css={styles.error}>
            {t('common:errorPrefix')} {errorDisplay}
          </span>
        ) : null}
        <Button type='submit'>{t('auth:signUp')}</Button>
      </form>
      <Button onClick={() => router.back()}>{t('common:back')}</Button>
    </div>
  );
};

export default SignUp;
