import jsonHabitServiceFactory from './json';
import restHabitServiceFactory from './REST';

const jsonHabitService = jsonHabitServiceFactory();
const restHabitService = restHabitServiceFactory();
export { jsonHabitService, restHabitService };
