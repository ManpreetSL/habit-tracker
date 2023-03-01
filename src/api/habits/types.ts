import { GoalWithHabitHistory } from '../../types/habits';

export type HabitService = {
  save?: () => {};
  retrieve?: () => {};
  get?: () => {};
  set?: () => {};
  addHabit: () => Promise<string>;
  getHabits: () => Promise<GoalWithHabitHistory[]>;
  saveHabits: (habits: GoalWithHabitHistory[]) => Promise<void>;
  saveDefaultData: () => Promise<void>;
  addEntry: (habitId: string) => Promise<string>;
  removeEntry: (entryId: string, habitId: string) => Promise<void>;
};
