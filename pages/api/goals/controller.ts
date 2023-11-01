import { transformGoals } from '../goal-utils';
import prisma from '../../../prisma/prisma-db';
import { GoalWithHabitsAndEntries } from '../../../prisma/types';
import logger from '../../../src/services/logger';

type GetGoalsParams = {
  userId: string;
  fromDate: Date;
  toDate: Date;
};

export const getGoals = async ({
  userId,
  fromDate,
  toDate,
}: GetGoalsParams) => {
  let goals: GoalWithHabitsAndEntries[] = [];

  if (!userId) {
    throw new Error(`Invalid user ID ${userId}`);
  }

  logger.debug(`getGoals for user ${userId} between ${fromDate} and ${toDate}`);

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

  logger.debug('getGoals goals', goals);

  const transformedGoals = transformGoals(goals);

  // logger.info(
  //   'controller habit quantity',
  //   transformedGoals[0]?.habits[0].targetQuantity
  // );

  // logger.info(
  //   'controller type',
  //   transformedGoals[0]?.habits[0]?.entries[0]?.completionDate instanceof Date
  // );

  return transformedGoals;
};

export default {};
