import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Habit from './Habit';
import { GoalWithHabitHistory } from '../src/types/habits';
import habitsApi from '../src/api/habits';
import Link from '../src/components/Link';
import Button from './Button';

const styles = {
  container: css({
    position: 'relative',
    maxWidth: '100%',
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: '#111',
    margin: '0',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    height: '130px',
    maxWidth: '500px',
    position: 'relative',
  }),
  logoContainer: css({
    height: '200px',
    width: '100vw',
    position: 'relative',
  }),
  logo: css({
    maxHeight: '16vh',
    maxWidth: '100vw',
  }),
  habitsContainer: css({
    maxWidth: '500px',
    margin: '0 auto',
  }),
  addHabitButton: css({
    borderRadius: '7px',
    position: 'absolute',
    padding: '0',
    height: '48px',
    width: '48px',
    top: '65px',
    right: '8px',
    transform: 'translateY(-50%)',
  }),
};

const ViewHabits = () => {
  const { t } = useTranslation(['common', 'add-habit']);
  const [habitsData, setHabitsData] = useState<GoalWithHabitHistory[]>([]);

  useEffect(() => {
    habitsApi
      .getHabits()
      .then(setHabitsData)
      .catch((error) => console.error(error));
  }, []);

  return (
    <div css={styles.container}>
      <header css={styles.header}>
        <Image
          css={styles.logo}
          src='/logo.svg'
          alt={t('common:alt.logo')}
          fill
        />
        <Link href='/add-habit'>
          <Button stylesProp={styles.addHabitButton}>
            <Image
              src='/icons/add.svg'
              alt={t('add-habit:title')}
              width='32'
              height='32'
            />
          </Button>
        </Link>
      </header>

      <div css={styles.habitsContainer}>
        {habitsData.map(({ habits }) =>
          habits.map(({ entries, streak, ...habit }) => (
            <Habit
              key={habit.id}
              entries={entries}
              streak={streak}
              habit={habit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ViewHabits;
