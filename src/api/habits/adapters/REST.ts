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
import { GoalWithHabitsAndEntries } from '../../../../prisma/types';

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

  const getGoals = ({ fromDate, toDate }: Partial<GetGoalsParams>) => {
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
    getGoals,
    adapterType,
  };
};

export default restHabitServiceFactory;
