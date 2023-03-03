import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import { AddEntryParams, HabitService } from '../types';
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
      .then((json) => saveHabits(parseJsonHabits(JSON.stringify(json))))
      .then(() => Promise.resolve());

  const addEntry = ({
    habitId,
    date = new Date(),
    quantity = 1,
  }: AddEntryParams) => {
    const newId = uuidv4();
    return getHabits()
      .then((goals) => {
        const newGoals: GoalWithHabitHistory[] = cloneDeep(goals);

        // Nested find - find the habit from within the array of goals
        for (let i = 0; i < newGoals.length; i += 1) {
          const newGoal = newGoals[i];
          const tempHabit = newGoal.habits.find(
            (habit) => habit.id === habitId
          );

          // Break the loop early if the habit has been found
          if (tempHabit) {
            tempHabit.entries.push({
              id: newId,
              completionDate: date,
              quantity,
            });

            return newGoals;
          }
        }

        // if !habit
        throw new Error('Unable to find habit to add an entry to');
      })

      .then((goals) => saveHabits(goals))
      .then(() => newId)
      .catch((error) => Promise.reject(error));
  };

  return { addHabit, getHabits, addEntry, saveHabits, saveDefaultData };
};

export default jsonHabitServiceFactory;
