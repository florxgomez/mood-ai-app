import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('@clerk/nextjs', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  // it will mimic the object you would get if you imported this package
  const mockedFunctions = {
    auth: () =>
      // it's async so we return a Promise with a fake userId
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  };

  return mockedFunctions;
});

// the layout uses this function so we need to mock it
vi.mock('next/font/google', () => {
  return {
    Inter: () => ({ className: 'inter' }),
  };
});

test('Home', async () => {
  render(await HomePage());
  expect(screen.getByText('The best Journal app, period.')).toBeInTheDocument();
});
