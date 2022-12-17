import { css } from '@emotion/react';
import Image from 'next/image';
import { Habit } from '../data-types';

type HabitProps = {
  habit: Habit;
};

const Habit = ({ habit }: HabitProps) => {
  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <div css={streakContainerStyle}>
          <Image
            src='/images/fire.svg'
            alt='.SHIFT logo'
            width='32'
            height='32'
          />
          <span css={streakTextStyle}>{habit.streak}</span>
        </div>
        <div css={middleContainerStyle}>
          <span>{habit.name}</span>
          <span css={deadlineStyle}>
            {habit.complete ? 'Complete' : 'Incomplete'}
          </span>
        </div>
        <Image
          src={
            habit.complete
              ? '/images/habit-complete.svg'
              : '/images/habit-incomplete.svg'
          }
          alt='.SHIFT logo'
          width='32'
          height='32'
        />
      </div>
    </div>
  );
};

const containerStyle = css({
  maxWidth: '500px',
  margin: '0 auto'
});

const contentStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#333',
  margin: '12px 0px',
  padding: '12px',
  gap: '8px'
});

const middleContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  minWidth: '30%'
});

const deadlineStyle = css({
  color: '#91E220'
});

const streakContainerStyle = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '100px',
  padding: '0px 12px'
});

const streakTextStyle = css({
  color: '#fad15c',
  paddingLeft: '4px'
});

export default Habit;
