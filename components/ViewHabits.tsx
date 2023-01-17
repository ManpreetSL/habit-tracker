import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Habit from './Habit';
import { GoalWithHabitHistory } from '../src/types/habits';
import { fetchData } from '../src/api/habits';
import Link from '../src/components/Link';

const styles = {
  container: css({
    position: 'relative',
    maxWidth: '100%',
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: '#111'
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '20px'
  }),
  logoContainer: css({
    height: '20vh',
    width: '100vw'
  }),
  logo: css({
    maxHeight: '16vh',
    maxWidth: '100vw'
  }),
  addHabitButton: css({
    position: 'relative'
  })
};

const ViewHabits = () => {
  const [habitsData, setHabitsData] = useState<GoalWithHabitHistory[]>([]);

  useEffect(() => {
    fetchData().then(setHabitsData);
  }, []);

  return (
    <div css={styles.container}>
      <header css={styles.header}>
        <div css={styles.logoContainer}>
          <Image css={styles.logo} src='/logo.svg' alt='.SHIFT logo' fill />
        </div>

        <div css={styles.addHabitButton}>
          <Link href={`/add-habit`}>Addddddd</Link>
        </div>
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
