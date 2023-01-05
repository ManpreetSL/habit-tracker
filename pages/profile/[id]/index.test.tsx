import { render } from '@testing-library/react';
import Profile from './index.page';
import * as router from 'next/router';

describe('<Profile />', () => {
  it('should render without crashing', () => {
    jest.spyOn(router, 'useRouter').mockReturnValue({
      route: '/profile',
      pathname: '',
      query: { id: 'manpreet' },
      asPath: '',
      basePath: '/',
      isLocaleDomain: false
    } as unknown as router.NextRouter);

    render(<Profile />);
  });
});
