import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CardThreads from '.';

describe('CardThreads component', () => {
  // Data mock untuk props
  const dummyThread = {
    id: 'thread-1',
    title: 'Belajar Testing',
    body: 'Testing itu mudah',
    author: 'John Doe',
    url: '/threads/thread-1',
    createdAt: '2023-05-29T07:55:52.266Z',
  };

  it('should render thread title and body correctly', () => {
    // Arrange
    render(
      <MemoryRouter>
        <CardThreads {...dummyThread} />
      </MemoryRouter>
    );

    // Act
    const titleElement = screen.getByText('Belajar Testing');
    const bodyElement = screen.getByText('Testing itu mudah');

    // Assert
    expect(titleElement).toBeTruthy();
    expect(bodyElement).toBeTruthy();
  });

  it('should call onUpVote when upvote button is clicked', async () => {
    // Arrange
    const mockUpVote = vi.fn();
    // Kita asumsikan Vote adalah komponen yang merender tombol berdasarkan icon
    render(
      <MemoryRouter>
        <CardThreads {...dummyThread} onUpVote={mockUpVote} totalGood={10} />
      </MemoryRouter>
    );

    // Act
    // Mencari elemen vote berdasarkan angka count atau icon
    const upVoteButton = screen.getByText('10').closest('div');
    await userEvent.click(upVoteButton);

    // Assert
    expect(mockUpVote).toHaveBeenCalledWith('thread-1');
  });
});