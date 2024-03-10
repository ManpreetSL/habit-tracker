export type CompletionPercentages = {
  [date: string]: number;
};

export type OnRemoveHabitEntry = (entryId: string) => void;
