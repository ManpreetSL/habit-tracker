import { Entry } from '@prisma/client';
import { CompletionPercentages } from './types';
import { HabitWithHistory } from '../../src/api/habits/types';

type EntriesByDay = {
  [date: string]: Entry[];
};

const getCompletionPercentage = (quantity: number, target: number) =>
  (quantity / target) * 100;

/**
 * Check how much of the target habit has been completed
 */
const checkCompletionQuantity = (entries: Entry[]) =>
  entries.reduce((total, entry) => total + entry.quantity, 0);

// Get the entry for today from the entries history
export const getEntriesForDay = (entries: Entry[], date: string) =>
  entries.filter(
    ({ completionDate }) => completionDate.toDateString() === date
  );

type UseCompletionPercentagesParams = {
  habitWithHistory: HabitWithHistory;
  dates: string[];
};

export const calculateCompletionPercentages = ({
  habitWithHistory,
  dates,
}: UseCompletionPercentagesParams) => {
  const entriesByDay = dates.reduce(
    (acc, currentDate) => ({
      ...acc,
      [currentDate]: getEntriesForDay(habitWithHistory.entries, currentDate),
    }),
    {} as EntriesByDay
  );

  const completionPercentagesByDay = dates.reduce(
    (acc, currentDate) => ({
      ...acc,

      [currentDate]: getCompletionPercentage(
        checkCompletionQuantity(entriesByDay[currentDate]),
        habitWithHistory.targetQuantity as unknown as number
      ),
    }),
    {} as CompletionPercentages
  );

  return completionPercentagesByDay;
};

export const isBinaryHabit = (habitWithHistory: HabitWithHistory) =>
  (habitWithHistory.targetQuantity as unknown as number) === 1;
