import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Habit from './Habit';
import { Goal as Goal } from '../src/types/habits';
import { fetchData } from '../src/api/habits';

const ViewHabits = () => {
  const [habitsData, setHabitsData] = useState<Goal[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData();
      setHabitsData(data);
    };
    fetch();
  }, []);

  return (
    <div css={containerStyle}>
      <div css={logoContainerStyle}>
        <Image css={logoStyle} src='/logo.svg' alt='.SHIFT logo' fill />
      </div>
      {habitsData.map((goal) =>
        goal.habitHistories.map((habitHistory) => (
          <Habit key={habitHistory.habit.id} habitHistory={habitHistory} />
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
