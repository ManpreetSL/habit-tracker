import { render } from '@testing-library/react';
import * as router from 'next/router';
import Profile from './index.page';

describe('<Profile />', () => {
  it('should render without crashing', () => {
    jest.spyOn(router, 'useRouter').mockReturnValue({
      route: '/profile',
      pathname: '',
      query: { id: 'manpreet' },
      asPath: '',
      basePath: '/',
      isLocaleDomain: false,
    } as unknown as router.NextRouter);

    render(<Profile />);
  });
});
