import habitsApi from '.';

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
];

describe('JSON habit adapter', () => {
  describe('getHabits()', () => {
    // Set up empty local storage and test that an empty array is returned
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);

    it('should return null when local storage has no goals stored', async () => {
      await expect(habitsApi.getHabits()).resolves.toEqual([]);
    });

    it("should return a goal when local storage there's one goal stored", async () => {
      Storage.prototype.getItem = jest
        .fn()
        .mockReturnValue(JSON.stringify(habitsMockData));
      await expect(habitsApi.getHabits()).resolves.toEqual(habitsMockData);
    });
  });
});
