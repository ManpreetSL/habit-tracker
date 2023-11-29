import { Prisma } from '@prisma/client';
import {
  AddEntryParams,
  HabitService,
  RemoveEntryParams,
  GetGoalsParams,
  AddHabitParams,
  GoalWithHabitsAndEntriesRaw,
} from '../types';
import logger from '../../../services/logger';

const restHabitServiceFactory = (): HabitService => {
  const transformGoals = (goals: GoalWithHabitsAndEntriesRaw[]) =>
    goals.map((goal) => ({
      ...goal,
      habits: goal.habits.map((habit) => ({
        ...habit,
        frequencyQuantity: parseFloat(habit.frequencyQuantity),
        targetQuantity: parseFloat(habit.targetQuantity),
        entries: habit.entries.map((entry) => ({
          ...entry,
          completionDate: new Date(entry.completionDate),
        })),
      })),
    }));

  // Return server-side storage methods
  const addHabit = (data: AddHabitParams) => {
    const targetQuantity = new Prisma.Decimal(data.targetQuantity);
    const frequencyQuantity = new Prisma.Decimal(data.frequencyQuantity);

    return fetch('/api/habits', {
      method: 'POST',
      body: JSON.stringify({ ...data, targetQuantity, frequencyQuantity }),
    }).then((res) => res.json());
  };

  const deleteHabit = async (habitId: string) => {
    await fetch(`/api/habits/${habitId}`, { method: 'DELETE' });
  };

  const getGoals = ({ fromDate, toDate }: GetGoalsParams = {}) => {
    const url = new URL('/api/goals', process.env.NEXT_PUBLIC_BASE_URL);
    const params = new URLSearchParams(url.search);

    if (fromDate) params.append('fromDate', fromDate.toDateString());
    if (toDate) params.append('toDate', toDate.toDateString());

    return fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then(({ goals }: { goals: GoalWithHabitsAndEntriesRaw[] }) =>
        transformGoals(goals)
      );
  };

  // Save a default set of habits to local storage
  const saveDefaultData = async (userId: string) => {
    logger.debug('saveDefaultData', userId);
    await fetch('/api/goals/save-examples', {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: new Headers({ 'content-type': 'application/json' }),
    });
  };

  const addEntry = ({
    habitId,
    date = new Date(),
    quantity = 1,
  }: AddEntryParams) =>
    fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    addEntry,
    removeEntry,
    saveDefaultData,
    getGoals,
    adapterType,
  };
};

export default restHabitServiceFactory;
