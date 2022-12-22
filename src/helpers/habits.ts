import { Habit, Binary } from '../types/habits';

const isBinary = (habit: Habit): habit is Binary => habit.type === 'binary';

export { isBinary };
