import { startOfDay, sub } from 'date-fns';
import { transformGoals } from '../goal-utils';
import prisma from '../../../prisma/prisma-db';
import { GoalWithHabitsAndEntries } from '../../../prisma/types';
import logger from '../../../src/services/logger';

const DEFAULT_DAYS = 7;

type GetGoalsParams = {
  userId: string;
  fromDate?: string;
  toDate?: string;
};

export const getGoals = async ({ userId, ...params }: GetGoalsParams) => {
  let { fromDate, toDate } = params;
  let goals: GoalWithHabitsAndEntries[] = [];

  if (!userId) {
    throw new Error(`Invalid user ID ${userId}`);
  }
  // How do I confirm what types the query args are?
  // can use typeof to make sure it's a string
  // But then also cast them to dates and check if they're valid dates - if not, return an error?

  if (typeof fromDate !== 'string') {
    fromDate = '';
  }

  if (typeof toDate !== 'string') {
    toDate = '';
  }

  // Go to the start of the given date
  if (fromDate) {
    // TODO: What happens if it's not a valid date value that's passed?
    fromDate = startOfDay(new Date(fromDate)).toUTCString();
  }

  // If no dates given, then calculate the last default days period
  if (!fromDate && !toDate) {
    const today = new Date();
    toDate = today.toUTCString();
    const fromDateWithTime = sub(today, { days: DEFAULT_DAYS });
    // Now get midnight
    fromDate = startOfDay(new Date(fromDateWithTime)).toUTCString();
  }

  logger.debug({ fromDate, toDate });

  goals = await prisma.goal.findMany({
    where: {
      userId,
    },
    include: {
      habits: {
        include: {
          entries: {
            where: {
              // TODO: Will this mean a goal won't be shown if there are no entries in the given time range?
              completionDate: {
                gte: new Date(fromDate),
                lte: new Date(toDate),
              },
            },
          },
        },
      },
    },
  });

  const transformedGoals = transformGoals(goals);

  return transformedGoals;
};

export default {};
