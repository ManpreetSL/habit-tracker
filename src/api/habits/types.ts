import { GoalWithHabitHistory, HabitFlat } from '../../types/habits';

export type GetGoalsForDatesParams = { fromDate: Date; toDate: Date };

export type AddHabitParams = Omit<HabitFlat, 'id'>;

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
  }: GetGoalsForDatesParams) => Promise<GoalWithHabitHistory[]>;
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
  }: AddHabitParams) => Promise<string>;
  deleteHabit: (habitId: string) => Promise<void>;
  getHabits: () => Promise<GoalWithHabitHistory[]>;
  getHabitsFromDate: (date: Date) => Promise<GoalWithHabitHistory[]>;
  saveHabits: (habits: GoalWithHabitHistory[]) => Promise<void>;
  saveDefaultData: () => Promise<void>;
  addEntry: ({ habitId, date, quantity }: AddEntryParams) => Promise<string>;
  removeEntry: ({ entryId, habitId }: RemoveEntryParams) => Promise<void>;
};
