import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
    margin: '0'
  }),
  header: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px',
    height: '130px'
  }),
  logoContainer: css({
    height: '200px',
    width: '100vw',
    position: 'relative'
  }),
  logo: css({
    maxHeight: '16vh',
    maxWidth: '100vw'
  }),
  habits: css({}),
  addHabitButton: css({
    borderRadius: '7px',
    position: 'absolute',
    padding: '0',
    height: '48px',
    width: '48px',

    top: '65px',
    right: '30px',
    transform: 'translateY(-50%)'
  })
};

const ViewHabits = () => {
  const [habitsData, setHabitsData] = useState<GoalWithHabitHistory[]>([]);

  useEffect(() => {
    habitsApi.getHabits().then(setHabitsData);
  }, []);

  return (
    <div css={styles.container}>
      <header css={styles.header}>
        <Image css={styles.logo} src='/logo.svg' alt='.SHIFT logo' fill />

        <Link href={`/add-habit`}>
          <Button stylesProp={styles.addHabitButton} type='button'>
            <Image
              src='/icons/add.svg'
              alt='Add habit'
              width='32'
              height='32'
            />
          </Button>
        </Link>
      </header>

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
  );
};

export default ViewHabits;
