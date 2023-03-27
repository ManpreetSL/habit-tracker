import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { signIn } from '../src/services/auth/manage-users';
import useUser from '../src/services/auth/useUser';
import LogIn from './log-in.page';

describe('<LogIn />', () => {
  it('should render without crashing', () => {
    render(<LogIn />);

    expect(screen.getByRole('heading')).toHaveTextContent('auth:signIn');
  });

  it('should show an error message if an invalid email is entered', async () => {
    (signIn as jest.Mock).mockRejectedValue(
      new Error('Firebase: Error (auth/invalid-email).')
    );
    const user = userEvent.setup();
    render(<LogIn />);

    const usernameInput = screen.getByLabelText(/auth:email/, {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText(/auth:password/, {
      selector: 'input',
    });

    const submitButton = screen.getByRole('button', { name: 'auth:signIn' });

    await user.type(usernameInput, 'Laxus@FairyTail.guild');
    await user.type(passwordInput, 'Jellaaaal1212');
    await user.click(submitButton);

    expect(signIn).toHaveBeenCalled();
    expect(await screen.findByText(/auth:invalidEmail/)).toBeInTheDocument();
  });

  it('should show an error message if an invalid password is entered', async () => {
    (signIn as jest.Mock).mockRejectedValue(
      new Error('Firebase: Error (auth/wrong-password).')
    );
    const user = userEvent.setup();
    render(<LogIn />);

    const usernameInput = screen.getByLabelText(/auth:email/, {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText(/auth:password/, {
      selector: 'input',
    });

    const submitButton = screen.getByRole('button', { name: 'auth:signIn' });

    await user.type(usernameInput, 'Laxus@FairyTail.guild');
    await user.type(passwordInput, 'Jellaaaal1212');
    await user.click(submitButton);

    expect(signIn).toHaveBeenCalled();
    expect(await screen.findByText(/auth:invalidPassword/)).toBeInTheDocument();
  });

  it('should show an error message if the email is not associated to an account', async () => {
    (signIn as jest.Mock).mockRejectedValue(
      new Error('Firebase: Error (auth/user-not-found).')
    );
    const user = userEvent.setup();
    render(<LogIn />);

    const usernameInput = screen.getByLabelText(/auth:email/, {
      selector: 'input',
    });
    const passwordInput = screen.getByLabelText(/auth:password/, {
      selector: 'input',
    });

    const submitButton = screen.getByRole('button', { name: 'auth:signIn' });

    await user.type(usernameInput, 'Laxus@FairyTail.guild');
    await user.type(passwordInput, 'Jellaaaal1212');
    await user.click(submitButton);

    expect(signIn).toHaveBeenCalled();
    expect(
      await screen.findByText(/auth:errors.userNotFound/)
    ).toBeInTheDocument();
  });

  it('should redirect to the homepage when a user is signed in', () => {
    (useUser as jest.Mock).mockReturnValue({ user: 'asd' });

    render(<LogIn />);

    expect(useUser).toHaveBeenCalled();
    expect(useRouter().push).toHaveBeenCalledWith('/');
  });
});
