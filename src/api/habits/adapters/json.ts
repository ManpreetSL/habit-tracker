import { HabitService } from '../types';
import habits from '../../../../public/data/habits.json';

import { Frequency, GoalWithHabitHistory, Habit } from '../../../types/habits';

type Response = typeof habits;

const jsonHabitServiceFactory = (): HabitService => {
  const addHabit = (): Promise<string> => {
    
    return Promise.resolve('adding habit in ze factorie');
  };

  const getHabits = (): Promise<GoalWithHabitHistory[]> =>
    fetch('../data/habits.json')
      .then((res) => res.json() as Promise<Response>)
      .then((json) =>
        json.map(({ habits, ...rest }) => ({
          ...rest,
          habits: habits.map(({ entries, frequency, ...rest }) => ({
            ...rest,
            frequency: frequency as Frequency,
            entries: entries.map(({ completionDate, ...rest }) => ({
              ...rest,
              completionDate: new Date(completionDate)
            }))
          }))
        }))
      );

  return { addHabit, getHabits };
};

export default jsonHabitServiceFactory;
