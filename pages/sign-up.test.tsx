import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './sign-up.page';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({}),
}));

jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

describe('SignUp()', () => {
  it('should render without crashing', () => {
    render(<SignUp />);

    expect(screen.getByRole('heading')).toHaveTextContent('auth:signUp');
  });

  it.todo(
    'should show an error message if the email address already has an existing account associated with it'
  );

  it.todo('should show an error message if an invalid password is entered');

  it.todo('should successfully log in an existing user');

  it('should redirect to the homepage after successfully signing in', async () => {
    const user = userEvent.setup();
    render(<SignUp />);

    const usernameInput = screen.getByLabelText('Email:', {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText('Password:', {
      selector: 'input',
    });

    const submitButton = screen.getByRole('button', { name: 'auth:signUp' });

    await user.type(usernameInput, 'Erza@FairyTail.guild');
    await user.type(passwordInput, 'Jellaaaal1212');
    await user.click(submitButton);

    expect(window.location.pathname).toBe('/');
  });
});
