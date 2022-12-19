import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Habit from './Habit';
import { Habit as HabitType } from '../data-types';
import { fetchData } from '../src/api/habits';

const ViewHabits = () => {
  const [habitsData, setHabitsData] = useState<HabitType[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData();
      setHabitsData(data);
    };
    fetch();
  }, []);

  return (
    <div css={containerStyle}>
      <>
        <div css={logoContainerStyle}></div>
        <Image css={logoStyle} src='/logo.svg' alt='.SHIFT logo' fill />
        {habitsData.map((habit) => (
          <Habit key={habit.id} habit={habit} />
        ))}
      </>
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
