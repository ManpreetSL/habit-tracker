import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index.page';

describe('<Home />', () => {
  it('should render without crashing', async () => {
    // Arrange
    render(<Home />);

    // Act
    await screen.findByRole('heading');

    // Assert
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Welcome to .SHIFT habit tracker!'
    );
  });
});
