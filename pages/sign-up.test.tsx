import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signUp } from '../src/services/auth/manage-users';
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

jest.mock('../src/services/auth/manage-users', () => ({
  signUp: jest
    .fn()
    .mockRejectedValue('Firebase: Error (auth/email-already-in-use).'),
}));

describe('SignUp()', () => {
  it('should render without crashing', () => {
    render(<SignUp />);

    expect(screen.getByRole('heading')).toHaveTextContent('auth:signUp');
  });

  it('should show an error message if the email address already has an existing account associated with it', async () => {
    const user = userEvent.setup();
    render(<SignUp />);

    const usernameInput = screen.getByLabelText('auth:email:', {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText('auth:password:', {
      selector: 'input',
    });

    const submitButton = screen.getByRole('button', { name: 'auth:signUp' });

    await user.type(usernameInput, 'Laxus@FairyTail.guild');
    await user.type(passwordInput, 'Jellaaaal1212');
    await user.click(submitButton);

    expect(signUp).toHaveBeenCalled();
    expect(signUp).rejects.toEqual(
      'Firebase: Error (auth/email-already-in-use).'
    );
    setTimeout(() => {
      expect(screen.queryByText(/auth:errors.emailInUse/i)).not.toBeNull();
    }, 1000);
  });

  it.todo(
    'should show an error message if an password with <6 characters is entered'
  );

  it.todo('should successfully log in an existing user');

  it('should redirect to the homepage after successfully signing in', async () => {
    const user = userEvent.setup();
    render(<SignUp />);

    const usernameInput = screen.getByLabelText('auth:email:', {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText('auth:password:', {
      selector: 'input',
    });

    const submitButton = screen.getByRole('button', { name: 'auth:signUp' });

    await user.type(usernameInput, 'Erza@FairyTail.guild');
    await user.type(passwordInput, 'Jellaaaal1212');
    await user.click(submitButton);

    expect(window.location.pathname).toBe('/');
  });
});
