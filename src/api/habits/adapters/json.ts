import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import { AddEntryParams, HabitService, RemoveEntryParams } from '../types';
import habitsData from '../../../../public/data/habits.json';
import {
  Frequency,
  GoalWithHabitHistory,
  HabitWithHistory,
} from '../../../types/habits';

type Response = typeof habitsData;

const jsonHabitServiceFactory = (): HabitService => {
  const addHabit = () => Promise.resolve('new id');

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

    return Promise.resolve(parseJsonHabits(localHabits)).catch((error) =>
      Promise.reject(new Error('Failed to fetch habits', error))
    );
  };

  const saveHabits = (habits: GoalWithHabitHistory[]) =>
    Promise.resolve(
      localStorage.setItem('habits', JSON.stringify(habits))
    ).catch((error) =>
      Promise.reject(
        new Error('Failed to save habits to local storage.', error)
      )
    );

  // Save a default set of habits to local storage
  const saveDefaultData = () =>
    fetch('../data/habits.json')
      .then((res) => res.json())
      .then((json) => saveHabits(parseJsonHabits(JSON.stringify(json))));

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

  const removeEntry = ({ entryId, habitId }: RemoveEntryParams) =>
    getHabits()
      .then((goals) =>
        Promise.resolve(
          goals.map((goal) => ({
            ...goal,
            habits: goal.habits.map((habit) => {
              if (habit.id === habitId) {
                return {
                  ...habit,
                  entries: habit.entries.filter(
                    (entry) => entry.id !== entryId
                  ),
                };
              }

              return habit;
            }, [] as HabitWithHistory[]),
          }))
        )
      )
      .then(saveHabits)
      .catch((error) => Promise.reject(error));

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
