import * as uuid from 'uuid';
import { GoalWithHabitHistory } from '../../../types/habits';
import jsonHabitFactory from './json';

jest.mock('uuid', () => ({ v4: jest.fn() }));
const mockUuid = (id: string) => jest.spyOn(uuid, 'v4').mockReturnValue(id);

const habitsMockData = [
  {
    name: 'Improve health',
    description:
      'Improve physical and mental health so I can feel better about living life',
    habits: [
      {
        id: '1',
        name: 'Do 5 mins of Simran',
        frequency: {
          unit: 'daily',
          count: 1,
        },
        target: {
          quantity: 5,
          unit: 'minutes',
        },
        entries: [
          {
            id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
            completionDate: new Date('2022-12-19T15:09:20.037Z'),
            quantity: 5,
          },
          {
            id: '1b9d6bcd-bbfd-4b2d-9b5d-ab7dfbbd4bed',
            completionDate: new Date('2022-12-18T15:16:49.193Z'),
            quantity: 3,
          },
        ],
        streak: 2,
      },
      {
        id: '2',
        name: 'Play badminton',
        description:
          'Play badminton twice per week so I can get my heart rate into zones 2-3 more regularly',
        frequency: {
          unit: 'weekly',
          count: 2,
        },
        target: {
          quantity: 1,
          unit: 'session',
        },
        entries: [
          {
            id: '9b1deb4d',
            completionDate: new Date('2022-12-21T20:05:07.193Z'),
            quantity: 1,
          },
          {
            id: '3b7d',
            completionDate: new Date('2022-12-20T20:05:07.193Z'),
            quantity: 1,
          },
        ],
        streak: 234,
      },
    ],
  },
] as GoalWithHabitHistory[];

describe('JSON habit adapter', () => {
  describe('getHabits()', () => {
    it('should return null when local storage has no goals stored', async () => {
      const { getHabits } = jsonHabitFactory();
      localStorage.clear();

      await expect(getHabits()).resolves.toEqual([]);
    });

    it('should return a goal when local storage has only one goal stored', async () => {
      const { getHabits, saveHabits } = jsonHabitFactory();
      saveHabits(habitsMockData);

      await expect(getHabits()).resolves.toEqual(habitsMockData);
    });
  });

  describe('saveHabits()', () => {
    it('should save habits to local storage', async () => {
      localStorage.clear();
      const { getHabits, saveHabits } = jsonHabitFactory();

      await saveHabits(habitsMockData);
      const goals = await getHabits();

      expect(goals).toEqual(habitsMockData);
    });
  });

  describe('addEntry()', () => {
    it('should return a blank array when there are no goals', async () => {
      const { getHabits, saveHabits, addEntry } = jsonHabitFactory();
      await saveHabits([]);

      await addEntry({ habitId: '1234asdf' });
      const results = await getHabits();

      expect(results).toEqual([]);
    });

    it('should add an entry when there is 1 goal with 1 habit and 0 entries', async () => {
      const { addEntry, saveHabits, getHabits } = jsonHabitFactory();
      const initialGoals = [
        {
          name: 'Improve health',
          description:
            'Improve physical and mental health so I can feel better about living life',
          habits: [
            {
              id: '1',
              name: 'Do 5 mins of Simran',
              frequency: {
                unit: 'daily',
                count: 1,
              },
              target: {
                quantity: 5,
                unit: 'minutes',
              },
              entries: [],
              streak: 2,
            },
          ],
        },
      ] as GoalWithHabitHistory[];
      await saveHabits(initialGoals);

      const entryId = '30230032';
      mockUuid(entryId);
      await addEntry({ habitId: initialGoals[0].habits[0].id });

      const [
        {
          habits: [{ entries }],
        },
      ] = await getHabits();
      const entry = entries.find(({ id }) => id === entryId);
      expect(entry).toBeDefined();
      expect(entry?.completionDate.getTime()).toBeGreaterThan(
        Date.now() - 30 * 1000
      );
      expect(entries.length).toBe(1);
    });
  });

  describe('removeEntry()', () => {
    it('should remove an entry given a valid entry ID and its associated habit ID', async () => {
      // Arrange
      const { getHabits, saveHabits, removeEntry } = jsonHabitFactory();
      saveHabits(habitsMockData);
      const originalEntries = habitsMockData[0].habits[0].entries;

      // Act
      const entryId = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
      await removeEntry(entryId, '1');

      // Assert
      const [
        {
          habits: [{ entries }],
        },
      ] = await getHabits();
      const entry = entries.find(({ id }) => id === entryId);
      expect(entry).not.toBeDefined();
      expect(entries.length).toBe(originalEntries.length - 1);
    });
  });
});
