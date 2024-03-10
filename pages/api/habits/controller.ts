import prisma from '../../../prisma/prisma-db';
import logger from '../../../src/services/logger';

export const addHabit = () => {};
export const deleteHabit = async (habitId: string) => {
  logger.debug('deleting habit ', habitId);

  const deleteEntriesPrisma = prisma.entry.deleteMany({
    where: {
      habitId,
    },
  });

  const deleteHabitPrisma = prisma.habit.delete({
    where: {
      id: habitId,
    },
  });

  const [entries, habit] = await prisma.$transaction([
    deleteEntriesPrisma,
    deleteHabitPrisma,
  ]);

  logger.debug('transaction:');
  logger.debug(entries, habit);

  // TODO: What happens if the transaction fails?

  return habit.id;
};

export default {};
