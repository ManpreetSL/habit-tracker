import { v4 as uuidv4 } from 'uuid';
import { HabitService } from '../types';
import habitsData from '../../../../public/data/habits.json';
import {
  Frequency,
  GoalWithHabitHistory,
  HabitWithHistory,
} from '../../../types/habits';
import logger from '../../../services/logger';

type Response = typeof habitsData;

const jsonHabitServiceFactory = (): HabitService => {
  const addHabit = (): Promise<void> => Promise.resolve();

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
    if (!localHabits) return Promise.resolve([]);

    try {
      return Promise.resolve(parseJsonHabits(localHabits));
    } catch (error) {
      logger.error('Error fetching habits');
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

    return Promise.resolve();
  };

  // Save a default set of habits to local storage
  const saveDefaultData = () =>
    fetch('../data/habits.json')
      .then((res) => res.json())
      .then((json) => saveHabits(parseJsonHabits(JSON.stringify(json))))
      .then(() => Promise.resolve());

  const addEntry = (
    habitId: string,
    date: Date = new Date(),
    quantity: number = 1
  ) => {
    try {
      return getHabits()
        .then((goals) =>
          Promise.resolve(
            goals.map((goal) => ({
              ...goal,
              habits: goal.habits.reduce((habitsAcc, currentHabit) => {
                let habit = currentHabit;

                if (habit.id === habitId) {
                  // Add an entry here
                  habit = {
                    ...habit,
                    entries: [
                      ...habit.entries,
                      { id: uuidv4(), completionDate: date, quantity },
                    ],
                  };
                }

                // Otherwise just return this habit as-is
                return [...habitsAcc, habit];
              }, [] as HabitWithHistory[]),
            }))
          )
        )
        .then((goals) => saveHabits(goals))
        .then(() => getHabits());
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const removeEntry = (entryId: string, habitId: string) => {
    try {
      return getHabits()
        .then((goals) =>
          Promise.resolve(
            goals.map((goal) => ({
              ...goal,
              habits: goal.habits.reduce((habitsAcc, currentHabit) => {
                let habit = currentHabit;

                if (habit.id === habitId) {
                  habit = {
                    ...habit,
                    entries: habit.entries.filter(
                      (entry) => entry.id !== entryId
                    ),
                  };
                }

                return [...habitsAcc, habit];
              }, [] as HabitWithHistory[]),
            }))
          )
        )
        .then(saveHabits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    addHabit,
    getHabits,
    addEntry,
    removeEntry,
    saveHabits,
    saveDefaultData,
  };
};

export default jsonHabitServiceFactory;
