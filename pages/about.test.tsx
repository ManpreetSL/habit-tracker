import { render, screen } from '@testing-library/react';
import About from './about.page';

describe('<About />', () => {
  it('should render without crashing', async () => {
    // Act
    render(<About />);

    // Assert
    expect(
      screen.getByRole('heading', { name: 'about:about' })
    ).toBeInTheDocument();
  });
});
