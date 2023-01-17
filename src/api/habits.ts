import habits from '../../public/data/habits.json';
import { Frequency, GoalWithHabitHistory } from '../types/habits';

type Response = typeof habits;

const fetchData = (): Promise<GoalWithHabitHistory[]> =>
  fetch('../data/habits.json')
    .then((res) => res.json() as Promise<Response>)
    .then((json) =>
      json.map(({ habits: habitsJson, ...rest }) => ({
        ...rest,
        habits: habitsJson.map(({ entries, frequency, ...restHabits }) => ({
          ...restHabits,
          frequency: frequency as Frequency,
          entries: entries.map(({ completionDate, ...restEntries }) => ({
            ...restEntries,
            completionDate: new Date(completionDate),
          })),
        })),
      }))
    );

export default fetchData;
