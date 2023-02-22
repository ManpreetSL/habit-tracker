import { GoalWithHabitHistory } from '../../types/habits';

export type HabitService = {
  save?: () => {};
  retrieve?: () => {};
  get?: () => {};
  set?: () => {};
  addHabit: () => Promise<void>;
  getHabits: () => Promise<GoalWithHabitHistory[]>;
  saveHabits: (habits: GoalWithHabitHistory[]) => Promise<void>;
  saveDefaultData: () => Promise<void>;
};
