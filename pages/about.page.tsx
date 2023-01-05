import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'about']))
      // Will be passed to the page component as props
    }
  };
}

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common:app.title')}</h1>
      <h2>{t('about:about')}</h2>
    </div>
  );
};

export default About;
