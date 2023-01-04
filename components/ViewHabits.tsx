import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Habit from './Habit';
import { GoalWithHabitHistory } from '../src/types/habits';
import { fetchData } from '../src/api/habits';

const ViewHabits = () => {
  const [habitsData, setHabitsData] = useState<GoalWithHabitHistory[]>([]);

  useEffect(() => {
    fetchData().then(setHabitsData);
  }, []);

  return (
    <div css={containerStyle}>
      <div css={logoContainerStyle}>
        <Image css={logoStyle} src='/logo.svg' alt='.SHIFT logo' fill />
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

const containerStyle = css({
  position: 'relative',
  width: '100vw',
  maxWidth: '100%',
  height: '100vh',
  backgroundColor: '#111'
});

const logoContainerStyle = css({
  height: '20vh'
});

const logoStyle = css({
  maxHeight: '16vh'
});

export default ViewHabits;
