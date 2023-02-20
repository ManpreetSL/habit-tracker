import { HabitService } from '../types';
import habitsData from '../../../../public/data/habits.json';

import { Frequency, GoalWithHabitHistory } from '../../../types/habits';

type Response = typeof habitsData;

const jsonHabitServiceFactory = (): HabitService => {
  const addHabit = (): Promise<string> =>
    Promise.resolve('adding habit in ze factorie');

  const parseJsonHabits = (json: string) => {
    const jsonHabits = JSON.parse(json) as unknown as Response;

    return jsonHabits.map(({ habits, ...rest }) => ({
      ...rest,
      habits: habits.map(({ entries, frequency, ...restHabits }) => ({
        ...restHabits,
        frequency: frequency as Frequency,
        entries: entries.map(({ completionDate, ...restEntries }) => ({
          ...restEntries,
          completionDate: new Date(completionDate),
        })),
      })),
    }));
  };

  const getHabits = (): Promise<GoalWithHabitHistory[]> => {
    const localHabits = localStorage.getItem('habits');
    console.log('localHabits', localHabits);
    if (!localHabits) return Promise.resolve([]);

    try {
      return Promise.resolve(parseJsonHabits(localHabits));
    } catch (error) {
      console.error('Error fetching habits');
      return Promise.reject(new Error('Failed to fetch habits'));
    }
  };

  const saveHabits = (habits: GoalWithHabitHistory[]) => {
    try {
      localStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      return Promise.reject(
        new Error('Failed to save habits to local storage.')
      );
    }

    return Promise.resolve('Saved habits successfully.');
  };

  // Save a default set of habits to local storage
  const saveDefaultData = () => {
    console.log('saving default data');
    fetch('../data/habits.json')
      .then((res) => res.json())
      .then((json) => saveHabits(parseJsonHabits(JSON.stringify(json))));
  };

  return { addHabit, getHabits, saveHabits, saveDefaultData };
};

export default jsonHabitServiceFactory;
