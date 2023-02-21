import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { HabitWithHistory } from '../../src/types/habits';
import CompleteButton from '../entries/CompleteButton';
import {
  calculateCompletionPercentages,
  getEntriesForDay,
  isBinaryHabit,
} from './utils';

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

type HabitDailyViewProps = {
  habitWithHistory: HabitWithHistory;
  streak: number;
  date: string;
  onAddHabitEntry: () => void;
  onRemoveHabitEntry: (entryId: string) => void;
};

const HabitDailyView = ({
  habitWithHistory,
  streak,
  date,
  onAddHabitEntry,
  onRemoveHabitEntry,
}: HabitDailyViewProps) => {
  const { t } = useTranslation(['common', 'habit']);
  const completionPercentagesByDay = calculateCompletionPercentages({
    habitWithHistory,
    dates: [date],
  });

  const entriesToday = getEntriesForDay(
    habitWithHistory.entries,
    new Date().toDateString()
  );

  const isComplete = completionPercentagesByDay[date] === 100;

  const toggleComplete = () => {
    if (isComplete) onRemoveHabitEntry(entriesToday[0].id);
    else onAddHabitEntry();
  };

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
        <span>{habitWithHistory.name}</span>
        <span css={styles.deadline}>
          {!isComplete
            ? t('common:daysLeft', { quantity: '2' })
            : t('habit:complete')}
        </span>
      </div>

      {isBinaryHabit(habitWithHistory) ? (
        <CompleteButton
          complete={isComplete}
          stylesProp={styles.completeButton}
          onClick={toggleComplete}
        />
      ) : (
        <span>{completionPercentagesByDay[date]}%</span>
      )}
    </div>
  );
};

export default HabitDailyView;
