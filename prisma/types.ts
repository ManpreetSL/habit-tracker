import { Entry, Goal, Habit } from '@prisma/client';

export type GoalWithHabitsAndEntries = Goal & {
  habits: HabitWithHistory[];
};

export type HabitWithHistory = Habit & {
  entries: Entry[];
};
