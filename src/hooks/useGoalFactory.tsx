import useUser from '../services/auth/useUser';
import localStorageApi from '../api/habits';
import {
  AddEntryParams,
  HabitService,
  RemoveEntryParams,
} from '../api/habits/types';
import { GoalWithHabitHistory } from '../types/habits';

const useGoalFactory = (): HabitService => {
  const { user } = useUser();

  // Return JSON local storage methods
  if (!user) {
    const {
      addHabit,
      deleteHabit,
      getHabits,
      getHabitsFromDate,
      addEntry,
      removeEntry,
      saveHabits,
      saveDefaultData,
    } = localStorageApi;

    return {
      addHabit,
      deleteHabit,
      getHabits,
      getHabitsFromDate,
      addEntry,
      removeEntry,
      saveHabits,
      saveDefaultData,
    };
  }

  // Return server-side storage methods
  const addHabit = () =>
    fetch('/api/habits', { method: 'POST' })
      .then((res) => res.json())
      .then(({ id }: { id: string }) => id);

  const deleteHabit = async (habitId: string) => {
    await fetch(`/api/habits/${habitId}`, { method: 'DELETE' });
  };

  const getHabits = () =>
    fetch('/api/habits', { method: 'GET' })
      .then((res) => res.json())
      .then(({ habits }: { habits: GoalWithHabitHistory[] }) => habits);

  const getHabitsFromDate = (date: Date) =>
    fetch(`/api/habits?${new URLSearchParams({ date: date.toDateString() })}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(({ habits }: { habits: GoalWithHabitHistory[] }) => habits);

  const saveHabits = async (habits: GoalWithHabitHistory[]) => {
    await fetch('/api/habits', {
      method: 'POST',
      body: JSON.stringify(habits),
    });
  };

  // Save a default set of habits to local storage
  const saveDefaultData = async () => {
    await fetch('/api/habits/save-examples', {
      method: 'POST',
    });
  };

  const addEntry = ({
    habitId,
    date = new Date(),
    quantity = 1,
  }: AddEntryParams) =>
    fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify({ habitId, date: date.toDateString(), quantity }),
    })
      .then((res) => res.json())
      .then(({ id }) => id);

  const removeEntry = async ({ entryId, habitId }: RemoveEntryParams) => {
    await fetch(`/api/habits/${entryId}${new URLSearchParams({ habitId })}`, {
      method: 'DELETE',
    });
  };

  return {
    addHabit,
    deleteHabit,
    getHabits,
    getHabitsFromDate,
    addEntry,
    removeEntry,
    saveHabits,
    saveDefaultData,
  };
};

export default useGoalFactory;
