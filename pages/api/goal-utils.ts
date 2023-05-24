import { GoalWithHabitsAndEntries } from '../../prisma/types';

export const transformGoals = (goals: GoalWithHabitsAndEntries[]) =>
  goals.map((goal) => ({
    ...goal,
    habits: goal.habits.map((habit) => ({
      ...habit,
      entries: habit.entries.map((entry) => ({
        ...entry,
        completionDate: new Date(entry.completionDate),
      })),
    })),
  }));
export default {};
