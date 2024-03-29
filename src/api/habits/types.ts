import { GoalWithHabitHistory } from '../../types/habits';

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
  save?: () => {};
  retrieve?: () => {};
  get?: () => {};
  set?: () => {};
  addHabit: () => Promise<string>;
  deleteHabit: (habitId: string) => Promise<void>;
  getHabits: () => Promise<GoalWithHabitHistory[]>;
  getHabitsFromDate: (date: Date) => Promise<GoalWithHabitHistory[]>;
  saveHabits: (habits: GoalWithHabitHistory[]) => Promise<void>;
  saveDefaultData: () => Promise<void>;
  addEntry: ({ habitId, date, quantity }: AddEntryParams) => Promise<string>;
  removeEntry: ({ entryId, habitId }: RemoveEntryParams) => Promise<void>;
};
