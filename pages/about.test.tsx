import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './about';

describe('<About />', () => {
  it('should render without crashing', async () => {
    render(<About />);

    // Act
    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent('About');
  });
});
