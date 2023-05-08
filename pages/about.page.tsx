import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Button from '../components/Button';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about'])),
      // Will be passed to the page component as props
    },
  };
}

const styles = {
  title: css({
    margin: '12px 0px',
    lineHeight: '1.15',
    fontSize: '3rem',
  }),

  body: css({
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    lineHeight: 1.5,
  }),

  header: css({
    backgroundColor: '#262434',
    position: 'fixed',
    color: '#fff',
    padding: '1rem',
    width: '100%',
  }),

  nav: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    a: css({
      color: '#fff',
      textDecoration: 'none',
      padding: '0.5rem',
    }),

    'a:hover': css({
      backgroundColor: '#fff',
      color: '#333',
    }),
  }),

  hero: css({
    backgroundImage: "url('background.jpg')",
    backgroundSize: 'cover',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }),

  button: css({}),

  footer: css({
    display: 'flex',
    justifyContent: 'center',
    color: '#9F9CAF',
    backgroundColor: '#262431',
  }),

  copyright: css({
    padding: '1em',
    marginBottom: '1em',
  }),

  features: css({}),
  contact: css({}),
};

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <header css={styles.header}>
        .SHIFT logo
        <nav>
          <a href='/'>Home</a>
          <a href='/contact'>Contact</a>
        </nav>
      </header>
      <main>
        <section css={styles.hero}>
          <h1>Habit Tracker App</h1>
          <p>Track your habits and achieve your goals with ease.</p>
          <a href='/' css={styles.button}>
            Get Started
          </a>

          <div>
            <h1>{t('common:app.title')}</h1>
            <h2>{t('about:about')}</h2>
            <h4 css={styles.title}>{t('app:welcome')}</h4>
          </div>
        </section>
        <section css={styles.features}>
          <h2>Features</h2>
          <ul>
            <li>Track your habits daily</li>
            <li>Set reminders for your habits</li>
            <li>View your progress over time</li>
            <li>Get insights and recommendations</li>
          </ul>
        </section>
        <section css={styles.contact}>
          <h2>Contact Us</h2>
          <p>Have a question or need help? Get in touch with us.</p>
          <form action='#'>
            <input type='text' name='name' placeholder='Name' />
            <input type='email' name='email' placeholder='Email' />
            <textarea name='message' placeholder='Message' />
            <button type='submit'>Send Message</button>
          </form>
        </section>
      </main>
      <footer css={styles.footer}>
        <p css={styles.copyright}>&copy; {new Date().getFullYear()} .SHIFT</p>
      </footer>
      <Button>Top</Button>
    </div>
  );
};

export default About;
