import {
  AddEntryParams,
  HabitService,
  RemoveEntryParams,
  GetGoalsForDatesParams,
  AddHabitParams,
} from '../types';
import logger from '../../../services/logger';
import { GoalWithHabitsAndEntries } from '../../../../prisma/types';

const restHabitServiceFactory = (): HabitService => {
  // Return server-side storage methods
  const addHabit = (data: AddHabitParams) =>
    fetch('/api/habits', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json());

  const deleteHabit = async (habitId: string) => {
    await fetch(`/api/habits/${habitId}`, { method: 'DELETE' });
  };

  const getGoalsForDates = ({ fromDate, toDate }: GetGoalsForDatesParams) => {
    const url = new URL('/api/goals', process.env.NEXT_PUBLIC_BASE_URL);
    const params = new URLSearchParams(url.search);

    if (fromDate) params.append('fromDate', fromDate.toDateString());

    if (toDate) params.append('toDate', toDate.toDateString());

    return fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then(({ goals }: { goals: GoalWithHabitsAndEntries[] }) => goals);
  };

  const getHabits = () =>
    fetch('/api/habits', { method: 'GET' })
      .then((res) => res.json())
      .then(({ habits }: { habits: GoalWithHabitsAndEntries[] }) => habits);

  const getHabitsFromDate = (date: Date) =>
    fetch(`/api/habits?${new URLSearchParams({ date: date.toDateString() })}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => res)
      .then(({ habits }: { habits: GoalWithHabitsAndEntries[] }) => habits);

  const saveHabits = async (habits: GoalWithHabitsAndEntries[]) => {
    await fetch('/api/habits', {
      method: 'POST',
      body: JSON.stringify(habits),
    });
  };

  // Save a default set of habits to local storage
  const saveDefaultData = async () => {
    logger.debug('saveDefaultData');
    await fetch('/api/goals/save-examples', {
      method: 'POST',
    });
  };

  const addEntry = ({
    habitId,
    date = new Date(),
    quantity = 1,
  }: AddEntryParams) =>
    fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify({ habitId, date: date.toDateString(), quantity }),
    })
      .then((res) => res.json())
      .then(({ id }) => id);

  const removeEntry = async ({ entryId, habitId }: RemoveEntryParams) => {
    await fetch(`/api/habits/${entryId}${new URLSearchParams({ habitId })}`, {
      method: 'DELETE',
    });
  };

  const adapterType = 'rest';

  return {
    addHabit,
    deleteHabit,
    getHabits,
    addEntry,
    removeEntry,
    saveHabits,
    saveDefaultData,
    getHabitsFromDate,
    getGoalsForDates,
    adapterType,
  };
};

export default restHabitServiceFactory;
