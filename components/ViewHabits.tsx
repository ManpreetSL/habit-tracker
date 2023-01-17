import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Habit from './Habit';
import { GoalWithHabitHistory } from '../src/types/habits';
import fetchData from '../src/api/habits';

const styles = {
  container: css({
    position: 'relative',
    maxWidth: '100%',
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: '#111',
  }),
  logoContainer: css({
    height: '20vh',
  }),
  logo: css({
    maxHeight: '16vh',
  }),
};

const ViewHabits = () => {
  const [habitsData, setHabitsData] = useState<GoalWithHabitHistory[]>([]);

  useEffect(() => {
    fetchData().then(setHabitsData);
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.logoContainer}>
        <Image css={styles.logo} src='/logo.svg' alt='.SHIFT logo' fill />
      </div>

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
