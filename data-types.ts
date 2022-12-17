export type Habit = {
  id: string;
  name: string;
  frequency: string; // How often? Daily/Weekly/Twice weekly habit?
  streak: number;
  complete: boolean;
};
