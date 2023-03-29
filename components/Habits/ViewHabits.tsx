import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { GoalWithHabitHistory } from '../../src/types/habits';
import habitsApi from '../../src/api/habits';
import Link from '../../src/components/Link';
import Button from '../Button';
import HabitDailyView from './HabitDailyView';
import HabitWeeklyView from './HabitWeeklyView';
import logger from '../../src/services/logger';

const styles = {
  container: css({
    position: 'relative',
    maxWidth: '100%',
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: '#111',
    margin: '0',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    height: '130px',
    maxWidth: '500px',
    position: 'relative',
  }),

  toggleTimeViewButton: css({
    position: 'absolute',
    left: '8px',
  }),

  addHabitButton: css({
    borderRadius: '7px',
    position: 'absolute',
    padding: '0',
    height: '48px',
    width: '48px',
    top: '65px',
    right: '8px',
    transform: 'translateY(-50%)',
  }),

  logoContainer: css({
    height: '200px',
    width: '100vw',
    position: 'relative',
  }),
  logo: css({
    maxHeight: '16vh',
    maxWidth: '100vw',
  }),

  habitsContainer: css({
    maxWidth: '700px',
    margin: '0 auto',
  }),
};

const calculateDates = (daysToShow: number) => {
  const today = new Date();
  const days = [];

  // Get the last 7 days
  for (let i = 0; i < daysToShow; i += 1) {
    const newDay = new Date(today);
    newDay.setDate(newDay.getDate() - i);

    days.push(newDay);
  }

  return days;
};

type TimeView = 'daily' | 'weekly';

const DAYS_TO_SHOW = 7;

const ViewHabits = () => {
  const { t } = useTranslation(['common', 'add-habit']);
  const [habitsData, setHabitsData] = useState<GoalWithHabitHistory[]>([]);
  const [timeView, setTimeView] = useState<TimeView>('daily');

  const dates = calculateDates(DAYS_TO_SHOW);

  // Now fetch the data based on the number of days to show
  // We don't want to fetch all habits data, as it would be inefficient to pull in potentially years' worth of data
  // But this also means when saving data, these 7 days and any changes will have to be merged into the full set of entries
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() - (DAYS_TO_SHOW - 1));

    habitsApi
      .getHabitsFromDate(date)
      .then(setHabitsData)
      .catch((error) => logger.error(error));
  }, []);

  const toggleTimeView = () => {
    if (timeView === 'daily') setTimeView('weekly');
    else setTimeView('daily');
  };

  const addHabitEntry = (habitId: string, date: Date) => {
    habitsApi
      .addEntry({ habitId, date })
      .then(() => habitsApi.getHabits())
      .then(setHabitsData)
      .catch((error) =>
        logger.error('addHabitEntry encountered an issue', error)
      );
  };

  const removeHabitEntry = (habitId: string, entryId: string) => {
    habitsApi
      .removeEntry({ entryId, habitId })
      .then(() => habitsApi.getHabits())
      .then(setHabitsData)
      .catch((error) =>
        logger.error('removeHabitEntry encountered an issue', error)
      );
  };

  return (
    <div css={styles.container}>
      <Button stylesProp={styles.toggleTimeViewButton} onClick={toggleTimeView}>
        {timeView}
        <Image
          src='/icons/add.svg'
          alt={t('add-habit:title')}
          width='32'
          height='32'
        />
      </Button>
      <header css={styles.header}>
        <Image
          css={styles.logo}
          src='/logo.svg'
          alt={t('common:alt.logo')}
          fill
        />
        <Link href='/add-habit'>
          <Button stylesProp={styles.addHabitButton}>
            <Image
              src='/icons/add.svg'
              alt={t('add-habit:title')}
              width='32'
              height='32'
            />
          </Button>
        </Link>
      </header>

      <div css={styles.habitsContainer}>
        {timeView === 'weekly' && (
          <HabitWeeklyView
            goals={habitsData}
            dates={dates}
            onAddHabitEntry={(habitId, date) => addHabitEntry(habitId, date)}
            onRemoveHabitEntry={(habitId, entryId) =>
              removeHabitEntry(habitId, entryId)
            }
          />
        )}
        {timeView === 'daily' &&
          habitsData.map(({ habits }) =>
            habits.map((habitWithHistory) => (
              <HabitDailyView
                key={habitWithHistory.id}
                habitWithHistory={habitWithHistory}
                streak={habitWithHistory.streak}
                date={dates[0].toDateString()}
                onAddHabitEntry={() =>
                  addHabitEntry(habitWithHistory.id, dates[0])
                }
                onRemoveHabitEntry={(entryId) =>
                  removeHabitEntry(habitWithHistory.id, entryId)
                }
              />
            ))
          )}
      </div>
    </div>
  );
};

export default ViewHabits;
