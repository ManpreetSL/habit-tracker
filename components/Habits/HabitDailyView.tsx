import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { HabitWithHistory } from '../../src/types/habits';
import ButtonWithIcon from '../ButtonWithIcon';
import CompleteButton from '../entries/CompleteButton';
import Modal from '../Modal';
import {
  calculateCompletionPercentages,
  getEntriesForDay,
  isBinaryHabit,
} from './utils';
import Button from '../Button';

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

  deleteButton: css({
    marginRight: '12px',
    padding: '7px',
    background: 'none',
    border: 'none',
    color: '#fff',
  }),
  modalActions: css({
    marginTop: '1em',
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
  onDeleteHabit: (habitId: string) => void;
};

const HabitDailyView = ({
  habitWithHistory,
  streak,
  date,
  onAddHabitEntry,
  onRemoveHabitEntry,
  onDeleteHabit,
}: HabitDailyViewProps) => {
  const { t } = useTranslation(['common', 'habit']);
  const completionPercentagesByDay = calculateCompletionPercentages({
    habitWithHistory,
    dates: [date],
  });

  const [showModal, setShowModal] = useState(false);

  const entriesToday = getEntriesForDay(
    habitWithHistory.entries,
    new Date().toDateString()
  );

  const isComplete = completionPercentagesByDay[date] === 100;

  const toggleComplete = () => {
    if (isComplete) onRemoveHabitEntry(entriesToday[0].id);
    else onAddHabitEntry();
  };

  const confirmDelete = () => setShowModal(true);

  return (
    <div css={styles.content}>
      <Modal
        show={showModal}
        title='Confirm deletion'
        onClose={() => setShowModal(false)}
      >
        Are you sure you want to delete habit: {habitWithHistory.name}?
        <div css={styles.modalActions}>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={() => onDeleteHabit(habitWithHistory.id)}>
            Delete
          </Button>
        </div>
      </Modal>
      <div css={styles.streakContainer}>
        <ButtonWithIcon
          altText='Delete'
          onClick={confirmDelete}
          stylesProp={styles.deleteButton}
        >
          <FaTrash size={24} />
        </ButtonWithIcon>
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
