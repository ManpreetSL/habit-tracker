import { css } from '@emotion/react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Entry, Habit as THabit } from '../src/types/habits';
import Button from './Button';

const styles = {
  content: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: '12px 0px',
    padding: '12px',
    gap: '8px',
  }),

  middleContainer: css({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    minWidth: '30%',
  }),

  deadline: css({
    color: '#91E220',
  }),

  streakContainer: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100px',
    padding: '0px 12px',
  }),

  streakText: css({
    color: '#fad15c',
    paddingLeft: '4px',
  }),

  completeButton: css({
    background: 'none',
    padding: '0.5em',
    border: '0px',
  }),
};

// Get the entry for today from the entries history
const getEntriesForDay = (entries: Entry[], date: Date) =>
  entries.filter(
    ({ completionDate }) =>
      completionDate.toDateString() === date.toDateString()
  );

const getEntriesForToday = (entries: Entry[]) =>
  getEntriesForDay(entries, new Date());

/**
 * Check how much of the target habit has been completed
 */
const checkCompletionQuantity = (entries: Entry[]) =>
  entries.reduce((total, entry) => total + entry.quantity, 0);

const getCompletionPercentage = (quantity: number, target: number) =>
  (quantity / target) * 100;

type HabitProps = {
  streak: number;
  habit: THabit;
  entries: Entry[];
  addHabitEntry: () => void;
  removeHabitEntry: () => void;
};

const Habit = ({
  entries,
  habit,
  streak,
  addHabitEntry,
  removeHabitEntry,
}: HabitProps) => {
  const { t } = useTranslation(['common', 'habit']);

  const [todayEntries, setTodayEntries] = useState<Entry[]>([]);
  const isComplete = () => todayEntries.length >= 1;

  const completionPercentage = getCompletionPercentage(
    checkCompletionQuantity(todayEntries),
    habit.target.quantity
  );

  const toggleComplete = () => {
    if (todayEntries.length >= 1) removeHabitEntry();
    else addHabitEntry();
  };

  useEffect(() => {
    setTodayEntries(getEntriesForToday(entries));
  }, [entries]);

  return (
    <div css={styles.content}>
      <div css={styles.streakContainer}>
        <Image
          src='/images/fire.svg'
          alt={t('habit:alt.fire')}
          width='32'
          height='32'
        />
        <span css={styles.streakText}>{streak}</span>
      </div>

      <div css={styles.middleContainer}>
        <span>{habit.name}</span>
        <span css={styles.deadline}>
          {completionPercentage < 100
            ? t('common:daysLeft', { quantity: '2' })
            : t('habit:complete')}
        </span>
      </div>
      {habit.target.quantity === 1 ? (
        <Button stylesProp={styles.completeButton} onClick={toggleComplete}>
          <Image
            src={
              isComplete()
                ? '/images/habit-complete.svg'
                : '/images/habit-incomplete.svg'
            }
            alt={isComplete() ? t('habit:complete') : t('habit:incomplete')}
            width='32'
            height='32'
          />
        </Button>
      ) : (
        <span>{completionPercentage}%</span>
      )}
    </div>
  );
};

export default Habit;
