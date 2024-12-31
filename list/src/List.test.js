import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { List } from './List';

// Mock the global fetch function
global.fetch = jest.fn();

describe('List Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('displays loading state initially', () => {
    // Mock a resolved fetch request with an empty response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<List />);

    // Check if loading state is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays data when API call is successful', async () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    ];

    // Mock a resolved fetch request with mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<List />);

    // Wait for the API call to finish and check if data is displayed
    await waitFor(() => screen.getByText(/john doe/i));

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    // Mock a rejected fetch request
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<List />);

    // Wait for the error message to appear
    await waitFor(() => screen.getByText(/error/i));

    expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
  });
});
