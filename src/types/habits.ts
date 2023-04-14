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
  unit: 'daily' | 'weekly' | 'monthly';
  count: number;
};

// Action that leads to fulfilment in your life
export type Habit = {
  id: string;
  name: string;
  description?: string;
  frequency: Frequency; // How often? Daily/Weekly/Twice weekly habit?
  intensity?: number;
  impact?: number; // Life-wise and feelings-wise
  target: {
    // How many times do we want to do this habit in the day?
    unit: string;
    // Pages, km, miles, etc.
    quantity: number;
  };
};

export type HabitFlat = {
  id: string;
  name: string;
  description?: string;
  frequencyUnit: string;
  frequencyCount: number;
  targetUnit: string;
  targetQuantity: number;
  intensity?: number;
  impact?: number; // Life-wise and feelings-wise
};

export type History = {
  streak: number;
  entries: Entry[];
};

export type HabitWithHistory = Habit & History;

// An overarching objective, formed by a collection of habits
export type Goal = {
  name: string;
  description?: string;
};

export type GoalWithHabitHistory = Goal & {
  habits: HabitWithHistory[];
};
