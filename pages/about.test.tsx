import { render, screen } from '@testing-library/react';
import About from './about.page';

describe('<About />', () => {
  it('should render without crashing', () => {
    // Act
    render(<About />);

    // Assert
    expect(
      screen.queryByRole('heading', { name: 'about:about' })
    ).toBeInTheDocument();
  });
});
