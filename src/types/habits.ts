// If binary, then yes/no completion, if not, then it's numerical completion
export type HabitType = 'binary' | 'non-binary';

// Action that leads to fulfilment in your life
export type CoreHabit = {
  id: string;
  name: string;
  description?: string;
  frequency: string; // How often? Daily/Weekly/Twice weekly habit?
  intensity?: number;
  impact?: number; // Life-wise and feelings-wise
};

export type Binary = CoreHabit & {
  type: 'binary';
};

export type NonBinary = CoreHabit & {
  type: 'non-binary';
  target: number; // How many times do we want to do this habit in the day?
};

export type Habit = Binary | NonBinary;

// Single recording of a habit
// Captures the completion, effort, metadata.
export type Entry = {
  complete: boolean;
  completionDate: Date;
  effort?: number;
  notes?: string;
};

// The full history of a habit
export type HabitHistory = {
  habit: Habit;
  entries: Entry[];
  streak: number;
};

// An overarching objective, formed by a collection of habits
export type Goal = {
  name: string;
  description?: string;
  habits: HabitHistory[];
};
