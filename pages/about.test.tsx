import { render } from '@testing-library/react';
import About from './about';

describe('<About />', () => {
  it('should render without crashing', () => {
    render(<About />);
  });
});
