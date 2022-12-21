// How many sessions per how many days?
export type Frequency = {
  sessions: number;
  perDays: number;
};

// If binary, then yes/no completion, if not, then it's numerical completion
export type HabitType = 'binary' | 'non-binary';

// Action that leads to fulfilment in your life
export type CoreHabit = {
  id: string;
  name: string;
  description?: string;
  frequency: Frequency; // How often? Daily/Weekly/Twice weekly habit?
  intensity?: number;
  impact?: number; // Life-wise and feelings-wise
};

export type Binary = CoreHabit & {
  type: 'binary';
};

export type NonBinary = CoreHabit & {
  type: 'non-binary';
  target: number; // How many times do we want to do this habit in the day?
  unit: string; // Pages, km, miles, etc.
};

export type Habit = Binary | NonBinary;

// Single recording of a habit
// Captures the completion, effort, metadata.
export type EntryCore = {
  completionDate: Date;
  effort?: number;
  notes?: string;
};

export type BinaryEntry = EntryCore & {
  complete: boolean;
};

export type NonBinaryEntry = EntryCore & {
  quantity: number; // How many of the thing?
};

export type Entry = BinaryEntry | NonBinaryEntry;

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
  habitHistories: HabitHistory[];
};
