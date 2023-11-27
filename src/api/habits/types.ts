import { Entry, Goal } from '@prisma/client';

export type GetGoalsParams = {
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

// Raw JSON data type from backend
type HabitRaw = {
  id: string;
  name: string;
  description: string | null;
  frequencyUnit: string;
  frequencyQuantity: string;
  targetUnit: string;
  targetQuantity: string;
  streak: number;
  goalId: string;
};

export type GoalWithHabitsAndEntriesRaw = Goal & {
  habits: HabitWithHistoryRaw[];
};

type HabitWithHistoryRaw = HabitRaw & {
  entries: Entry[]; // TODO: What does completionDate come as? A string, presumably?
};

export type GoalWithHabitsAndEntries = Goal & {
  habits: HabitWithHistory[];
};

export type Habit = {
  id: string;
  name: string;
  description: string | null;
  frequencyUnit: string;
  frequencyQuantity: number;
  targetUnit: string;
  targetQuantity: number;
  streak: number;
  goalId: string;
};

type HabitWithHistory = Habit & {
  entries: Entry[];
};

export type HabitService = {
  adapterType: string;
  getGoals: ({
    fromDate,
    toDate,
  }: GetGoalsParams) => Promise<GoalWithHabitsAndEntries[]>;
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
