import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index.page';

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

    const { unmount } = render(<Home />);

    // Act
    await screen.findByRole('heading');

    // Assert
    expect(screen.getByRole('heading')).toHaveTextContent('app:welcome');

    unmount();
  });
});
