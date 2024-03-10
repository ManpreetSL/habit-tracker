// Single recording of a habit
// Captures the completion, effort, metadata.
export type Entry = {
  id: string;
  completionDate: Date;
  effort?: number;
  notes?: string;
  quantity: number; // How many of the thing?
};

// Q1 read 10 pages of a book 3 times a week
// A1 target: 10, unit: weekly, count: 3
// Q2 badminton twice a week
// A2 target: 2, count: 2, unit: weekly
// Q3 10 hours of badminton per week
// A3 target: 2, unit: weekly, count: 5
export type Frequency = {
  frequencyUnit: 'daily' | 'weekly' | 'monthly';
  frequencyQuantity: number;
};

type Target = {
  // How many times do we want to do this habit in the day?
  targetUnit: string;

  // Pages, km, miles, etc.
  targetQuantity: number;
};

// Action that leads to fulfilment in your life
export type Habit = {
  id: string;
  name: string;
  description?: string;
  intensity?: number;
  impact?: number; // Life-wise and feelings-wise
};

export type HabitFlat = {
  id: string;
  name: string;
  description: string | null;
  frequencyUnit: string;
  frequencyQuantity: number;
  targetUnit: string;
  targetQuantity: number;
  intensity: number | null;
  impact: number | null; // Life-wise and feelings-wise
} & Frequency &
  Target; // How often? Daily/Weekly/Twice weekly habit?;

export type History = {
  streak: number;
  entries: Entry[];
};

export type HabitWithHistory = HabitFlat & History;

// An overarching objective, formed by a collection of habits
export type Goal = {
  name: string;
  description: string | null;
};

export type GoalWithHabitHistory = Goal & {
  habits: HabitWithHistory[];
};
