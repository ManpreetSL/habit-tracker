import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { signUp } from '../src/services/auth/manage-users';
import useUser from '../src/services/auth/useUser';
import SignUp from './sign-up.page';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    onAuthStateChanged: jest.fn().mockImplementation((callback) => {
      callback({ uid: 'asdfaxz', email: 'asdf@gmail.com' });
      return jest.fn();
    }),
    setPersistence: jest.fn(),
  }),

  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({}),
}));

const performSignUp = async () => {
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
};

describe('SignUp()', () => {
  it('should render without crashing', () => {
    render(<SignUp />);

    expect(screen.getByRole('heading')).toHaveTextContent('auth:signUp');
  });

  it('should show an error message if the email address already has an existing account associated with it', async () => {
    (signUp as jest.Mock).mockRejectedValue(
      new Error('Firebase: Error (auth/email-already-in-use).')
    );

    await performSignUp();

    expect(signUp).toHaveBeenCalled();
    expect(
      await screen.findByText(/auth:errors.emailInUse/i)
    ).toBeInTheDocument();
  });

  it('should show an error message if an password with <6 characters is entered', async () => {
    (signUp as jest.Mock).mockRejectedValue(
      new Error(
        'Firebase: Password should be at least 6 characters (auth/weak-password).'
      )
    );
    await performSignUp();
    expect(signUp).toHaveBeenCalled();

    const errorMessage = await screen.findByText(/auth:errors.passwordLength/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it('should sign up a user when submitting the form', async () => {
    (signUp as jest.Mock).mockResolvedValue('');
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

    expect(signUp).toHaveBeenCalled();
  });

  it('should redirect to the homepage if a user is signed in', async () => {
    (useUser as jest.Mock).mockReturnValue({ user: 'asd' });

    render(<SignUp />);

    expect(useUser).toHaveBeenCalled();
    expect(useRouter().push).toHaveBeenCalledWith('/');
  });

  it('should go back to the previous page when a user presses the back button', async () => {
    const user = userEvent.setup();
    render(<SignUp />);
    const backButton = screen.getByRole('button', { name: 'common:back' });

    await user.click(backButton);

    expect(useRouter().back).toHaveBeenCalled();
  });
});
