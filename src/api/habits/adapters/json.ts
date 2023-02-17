import { HabitService } from '../types';
import habitsData from '../../../../public/data/habits.json';

import { Frequency, GoalWithHabitHistory } from '../../../types/habits';

type Response = typeof habitsData;

const jsonHabitServiceFactory = (): HabitService => {
  const addHabit = (): Promise<string> =>
    Promise.resolve('adding habit in ze factorie');

  const getHabits = (): Promise<GoalWithHabitHistory[]> =>
    fetch('../data/habits.json')
      .then((res) => res.json() as Promise<Response>)
      .then((json) =>
        json.map(({ habits, ...rest }) => ({
          ...rest,
          habits: habits.map(({ entries, frequency, ...restHabits }) => ({
            ...restHabits,
            frequency: frequency as Frequency,
            entries: entries.map(({ completionDate, ...restEntries }) => ({
              ...restEntries,
              completionDate: new Date(completionDate),
            })),
          })),
        }))
      );

  return { addHabit, getHabits };
};

export default jsonHabitServiceFactory;
