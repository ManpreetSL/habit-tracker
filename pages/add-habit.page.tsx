import { css } from '@emotion/react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import Button from '../components/Button';
import Link from '../src/components/Link';
import logger from '../src/services/logger';
import useGoalsAdapter from '../src/hooks/useGoalsAdapter';
import { verifyCookies } from './api/utils';
import { getGoals } from './api/goals/controller';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale = 'en' } = context;
  const defaultProps = {
    props: {
      ...(await serverSideTranslations(locale, ['add-habit'])),
      goalsProp: [],
      uid: '',
    },
  };

  try {
    const token = await verifyCookies(context);

    if (!token) {
      logger.debug('null token');

      return defaultProps;
    }

    logger.debug(token.user_id);

    const goals = await getGoals({ userId: token.user_id });
    logger.debug(goals);
    const transformedGoals = goals.map(({ id, name, description }) => ({
      id,
      name,
      description,
    }));

    return {
      props: {
        ...(await serverSideTranslations(locale, ['add-habit'])),
        goalsProp: transformedGoals,
        uid: token.uid,
      },
    };
  } catch (error) {
    logger.error(error);
  }

  return defaultProps;
}

type FormType = {
  name?: string;
  description?: string;
  targetQuantity?: number;
  targetUnit?: string;
  frequencyQuantity: number;
  frequencyUnit: string;
};

const defaultFormValues = {
  name: 'Drink water',
  targetQuantity: 1,
  targetUnit: 'glass',
  frequencyQuantity: 1,
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

type AddHabitProps = {
  goalsProp: { id: string; name: string; description: string }[];
};

const AddHabit = ({ goalsProp }: AddHabitProps) => {
  const router = useRouter();
  const goalsAdapter = useGoalsAdapter();

  if (!goalsProp) logger.warn('No goals available to add a habit to');
  // TODO: Use the first goal ID as the one to add the habit to

  const goalToAttachTo = goalsProp[0];

  logger.debug({ goalToAttachTo, goalsProp });

  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormType>(defaultFormValues);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const {
      name,
      description,
      frequencyQuantity,
      frequencyUnit,
      targetQuantity,
      targetUnit,
    } = formData;

    if (
      !name ||
      !description ||
      !frequencyQuantity ||
      !frequencyUnit ||
      !targetQuantity ||
      !targetUnit
    )
      return;

    goalsAdapter
      .addHabit({
        name,
        description,
        frequencyQuantity,
        frequencyUnit,
        targetQuantity,
        targetUnit,
        goalId: goalToAttachTo.id,
      })
      .then((message) => {
        logger.debug('addHabit', { message });
        router.push('/');
      })
      .catch((error) => logger.error(error));
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
              name='targetQuantity'
              value={formData.targetQuantity}
              onChange={handleInputChange}
            />
          </label>

          <label htmlFor='unit'>
            {t('add-habit:form.unit')}
            <input
              css={styles.inputField}
              type='text'
              id='unit'
              name='targetUnit'
              value={formData.targetUnit}
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
                  name='frequencyQuantity'
                  value={formData.frequencyQuantity}
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
              <Button stylesProp={styles.button}>
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
