import { GoalWithHabitHistory } from '../../types/habits';

export type HabitService = {
  save?: () => {};
  retrieve?: () => {};
  get?: () => {};
  set?: () => {};
  addHabit: () => Promise<string>;
  getHabits: () => Promise<GoalWithHabitHistory[]>;
  saveHabits: (habits: GoalWithHabitHistory[]) => Promise<string>;
  saveDefaultData: () => Promise<void>;
};
