import { render, screen } from '@testing-library/react';
import AddHabit from './add-habit';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

describe('AddHabit', () => {
  it('should render without crashing', () => {
    render(<AddHabit />);

    expect(
      screen.queryByRole('heading', { name: 'add-habit:title' })
    ).toBeInTheDocument();
  });
});
