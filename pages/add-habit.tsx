import { css } from '@emotion/react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Button from '../components/Button';
import Link from '../src/components/Link';
import habitsApi from '../src/api/habits';

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['add-habit'])),
    },
  };
}

type FormType = {
  name?: string;
  description?: string;
  target?: number;
  unit?: string;
  frequency: number;
  frequencyUnit: string;
};

const defaultFormValues = {
  name: 'Drink water',
  target: 1,
  frequency: 1,
  frequencyUnit: 'daily',
};

const styles = {
  screen: css({
    backgroundColor: '#292735',
    minHeight: '100vh',
    minWidth: '100vw',
    color: '#fff',
  }),

  container: css({
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: '0 auto',
    padding: '2em',
    alignItems: 'center',
  }),

  form: css({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '800px',
  }),
  inputField: css({
    margin: '1em 0',
    padding: '0.7em',
    backgroundColor: '#220000',
    color: '#fff',
  }),

  horizontalFlexContainer: css({
    display: 'flex',
    alignItems: 'center',
  }),
  verticalFlexContainer: css({
    display: 'flex',
    flexDirection: 'column',
    width: '33%',
  }),

  buttonsContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
  }),
  button: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    borderRadius: '1em',
  }),
  buttonText: css({
    margin: '0 0.7em',
  }),
};

const AddHabit = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormType>(defaultFormValues);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    console.log(`${name} changed to ${value}`);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    habitsApi
      .addHabit()
      .then((message) => {
        console.log(message);
        router.push('/');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div css={styles.screen}>
      <div css={styles.container}>
        <h2>{t('add-habit:title')}</h2>

        <form css={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='name'>
            {t('add-habit:form.name')}
            <input
              css={styles.inputField}
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor='description'>
            {t('add-habit:form.description')}
            <input
              css={styles.inputField}
              type='text'
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor='target'>
            {t('add-habit:form.target')}
            <input
              css={styles.inputField}
              type='text'
              id='target'
              name='target'
              value={formData.target}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor='unit'>
            {t('add-habit:form.unit')}
            <input
              css={styles.inputField}
              type='text'
              id='unit'
              name='unit'
              value={formData.unit}
              onChange={handleInputChange}
            />
          </label>

          <div css={styles.horizontalFlexContainer}>
            <div css={styles.verticalFlexContainer}>
              <label htmlFor='frequency'>
                {t('add-habit:form.frequency')}
                <input
                  css={styles.inputField}
                  type='text'
                  id='frequency'
                  name='frequency'
                  value={formData.frequency}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div
              css={[
                styles.verticalFlexContainer,
                {
                  textAlign: 'center',
                  position: 'relative',
                  alignSelf: 'center',
                },
              ]}
            >
              {t('add-habit:form.per')}
            </div>
            <div css={styles.verticalFlexContainer}>
              <label htmlFor='frequencyUnit'>
                {t('add-habit:form.timeUnit')}
                <select
                  css={styles.inputField}
                  id='frequencyUnit'
                  name='frequencyUnit'
                  value={formData.frequencyUnit}
                  onChange={handleInputChange}
                >
                  <option value='daily'>{t('add-habit:form.day')}</option>
                  <option value='weekly'>{t('add-habit:form.week')}</option>
                  <option value='monthly'>{t('add-habit:form.month')}</option>
                </select>
              </label>
            </div>
          </div>

          <div css={styles.buttonsContainer}>
            <Link href='/'>
              <Button stylesProp={styles.button} type='button'>
                <Image
                  src='/icons/cancel.svg'
                  alt='Cancel'
                  width='32'
                  height='32'
                />
                <span css={styles.buttonText}>
                  {t('add-habit:form.cancel')}
                </span>
              </Button>
            </Link>

            <Button stylesProp={styles.button} type='submit'>
              <Image
                src='/icons/add.svg'
                alt='Add habit'
                width='32'
                height='32'
              />
              <span css={styles.buttonText}>
                {t('add-habit:form.addHabit')}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;
