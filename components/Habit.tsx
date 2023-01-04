import { css } from '@emotion/react';
import Image from 'next/image';
import { Entry, History, Habit as THabit } from '../src/types/habits';

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

// Get the entry for today from the entries history
const getEntriesForDay = (entries: Entry[], date: Date) =>
  entries.filter(
    ({ completionDate }) =>
      completionDate.toDateString() === date.toDateString()
  );

const getEntriesForToday = (entries: Entry[]) =>
  getEntriesForDay(entries, new Date());

/**
 * For a non-binary habit, check how much of the target habit has been completed
 */
const checkCompletionQuantity = (entries: Entry[]) => {
  let total = 0;
  entries.forEach((entry) => (total += entry.quantity));
  return total;
  // for binary habits, if there's been a habit today, we can say it's complete
};

const getCompletionPercentage = (quantity: number, target: number) =>
  (quantity / target) * 100;

type HabitProps = {
  streak: number;
  habit: THabit;
  entries: Entry[];
};

const Habit = ({ entries, habit, streak }: HabitProps) => {
  const todayEntries = getEntriesForToday(entries);

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
          <span css={streakTextStyle}>{streak}</span>
        </div>

        <div css={middleContainerStyle}>
          <span>{habit.name}</span>
          <span css={deadlineStyle}>1 day left</span>
        </div>
        {/* <span css={deadlineStyle}>
            {habitHistory.habit.type === 'binary' ?
              habitHistory.habit.type complete ? 'Complete' : 'Incomplete'
              :
            }
          </span> */}

        {habit.target.quantity === 1 ? (
          <Image
            src={
              todayEntries.length >= 1
                ? '/images/habit-complete.svg'
                : '/images/habit-incomplete.svg'
            }
            alt='.SHIFT logo'
            width='32'
            height='32'
          />
        ) : (
          <span>
            {getCompletionPercentage(
              checkCompletionQuantity(todayEntries),
              habit.target.quantity
            )}
            %
          </span>
        )}
      </div>
    </div>
  );
};

export default Habit;
