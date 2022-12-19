export const fetchData = () =>
  fetch('../data/habits.json').then((res) => res.json());
