import { GoalWithHabitsAndEntries } from '../../../prisma/types';

export type GetGoalsForDatesParams = {
  fromDate?: Date;
  toDate?: Date;
};

export type AddHabitParams = {
  name: string;
  description: string | null;
  frequencyUnit: string;
  frequencyQuantity: number;
  targetUnit: string;
  targetQuantity: number;
  goalId: string;
};

export type AddEntryParams = {
  habitId: string;
  date?: Date;
  quantity?: number;
};

export type RemoveEntryParams = {
  entryId: string;
  habitId: string;
};

export type HabitService = {
  adapterType: string;
  getGoalsForDates: ({
    fromDate,
    toDate,
  }: GetGoalsForDatesParams) => Promise<GoalWithHabitsAndEntries[]>;
  save?: () => {};
  retrieve?: () => {};
  get?: () => {};
  set?: () => {};
  addHabit: ({
    name,
    description,
    frequencyUnit,
    frequencyQuantity,
    targetUnit,
    targetQuantity,
  }: AddHabitParams) => Promise<string>;
  deleteHabit: (habitId: string) => Promise<void>;
  getHabits: () => Promise<GoalWithHabitsAndEntries[]>;
  getHabitsFromDate: (date: Date) => Promise<GoalWithHabitsAndEntries[]>;
  saveHabits: (habits: GoalWithHabitsAndEntries[]) => Promise<void>;
  saveDefaultData: (userId: string) => Promise<void>;
  addEntry: ({ habitId, date, quantity }: AddEntryParams) => Promise<string>;
  removeEntry: ({ entryId, habitId }: RemoveEntryParams) => Promise<void>;
};
