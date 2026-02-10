import { render, screen } from '@testing-library/react';
import LoginPage from '@/../app/login/page';

jest.mock('next-auth/react', () => ({ signIn: jest.fn(), useSession: () => ({ status: 'unauthenticated' }) }));

describe('Login page', () => {
  it('shows google button', () => {
    render(<LoginPage />);
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });
});
