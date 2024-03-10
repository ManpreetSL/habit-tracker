import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index.page';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

describe('<Home />', () => {
  it('should render without crashing', async () => {
    // Arrange
    global.fetch = jest.fn();

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: 'url',
          map: () => {},
        }),
      status: 200,
    } as any);

    render(<Home />);

    // Assert
    expect(await screen.findByText('app:links.about')).toBeInTheDocument();
  });

  describe('goals and habits', () => {
    it.todo('should allow a user to save a default set of habits');
    it.todo(
      'should display a list of habits if there are any that have been saved'
    );
    it.todo('should allow a user to mark a habit as complete today');
    it.todo('should allow a user to mark a complete habit as not complete');
    it.todo('should allow a user to delete a habit');
    it.todo('should allow a user to switch to a weekly view of habits');
  });
});
