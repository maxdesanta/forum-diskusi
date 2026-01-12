import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '.';

describe('Test Search component', () => {
  it('should render the keyword value correctly', () => {
    // Arrange
    render(<Search keyword="react" setKeyword={() => {}} />);
    const searchInput = screen.getByPlaceholderText('Search...');

    // Assert
    expect(searchInput.value).toBe('react');
  });

  it('should call setKeyword function when typing', async () => {
    // Arrange
    const mockSetKeyword = vi.fn();
    render(<Search keyword="" setKeyword={mockSetKeyword} />);
    const searchInput = screen.getByPlaceholderText('Search...');

    // Act
    await userEvent.type(searchInput, 'dicoding');

    // Assert
    // Memastikan fungsi setKeyword dipanggil setiap kali ada karakter baru yang diketik
    expect(mockSetKeyword).toHaveBeenCalled();
  });
});