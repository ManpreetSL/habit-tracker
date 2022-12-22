import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Entry, NonBinaryEntry, HabitHistory } from '../src/types/habits';
import { isBinary } from '../src/helpers/habits';

type HabitProps = {
  habitHistory: HabitHistory;
};

// Get the entry for today from the entries history
const getEntriesForDay = (history: HabitHistory, date: Date) => {
  return history.entries.filter(
    (entry) =>
      new Date(entry.completionDate).toDateString() === date.toDateString()
  );
};

const getEntriesForToday = (history: HabitHistory) => {
  const today = new Date();
  return getEntriesForDay(history, today);
};

/**
 * For a non-binary habit, check how much of the target habit has been completed
 */
const checkCompletionQuantity = (entries: NonBinaryEntry[]) => {
  let total = 0;
  entries.forEach((entry) => (total += entry.quantity));
  return total;
  // for binary habits, if there's been a habit today, we can say it's complete
};

const getCompletionPercentage = (quantity: number, target: number) => {
  if (!quantity || !target) return 0;

  return (quantity / target) * 100;
};

const Habit = ({ habitHistory }: HabitProps) => {
  const [entriesToday, setEntriesToday] = useState<Entry[]>([]);
  const completeToday = useState(false);

  useEffect(() => {
    const entries = getEntriesForToday(habitHistory);
    setEntriesToday(entries);
  }, [habitHistory]);

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
          <span css={streakTextStyle}>{habitHistory.streak}</span>
        </div>
        <div css={middleContainerStyle}>
          <span>{habitHistory.habit.name}</span>
          <span css={deadlineStyle}>1 day left</span>
        </div>
        {isBinary(habitHistory.habit) ? (
          <Image
            src={
              entriesToday.length >= 1
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
              checkCompletionQuantity(entriesToday as NonBinaryEntry[]),
              habitHistory.habit.target
            )}
            %
          </span>
        )}
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
