import useUser from '../services/auth/useUser';
import { jsonHabitService, restHabitService } from '../api/habits';

import logger from '../services/logger';

const useGoalsAdapter = () => {
  const { user } = useUser();

  // Return JSON local storage methods
  if (!user) {
    return jsonHabitService;
  }

  return restHabitService;
};

export default useGoalsAdapter;
