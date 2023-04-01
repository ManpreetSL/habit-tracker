import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
};

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common:app.title')}</h1>
      <h2>{t('about:about')}</h2>
      <h4 css={styles.title}>{t('app:welcome')}</h4>
    </div>
  );
};

export default About;
