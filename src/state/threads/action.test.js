import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api } from '../../utils/api';
import { asyncSetAuthUser } from '../authUser/action';
import { asyncGetThreads } from './action';

// 1. Mocking modul API
vi.mock('../../utils/api');

describe('Thunk Functions', () => {
  // Mock dispatch function
  const dispatch = vi.fn();

  beforeEach(() => {
    // Reset semua mock sebelum setiap tes
    vi.clearAllMocks();
    // Mock window.alert agar tidak muncul saat testing
    global.alert = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // --- PENGUJIAN 1: asyncSetAuthUser ---
  it('should dispatch SET_AUTH_USER when login and get profile is successful', async () => {
    // Arrange (Siapkan data palsu)
    const fakeToken = 'fake_token_123';
    const fakeUser = { id: 'user-1', name: 'John Doe', email: 'john@example.com' };
    const loginCredentials = { email: 'john@example.com', password: 'password123' };

    // Mocking return value dari API
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    // Act (Jalankan thunk)
    await asyncSetAuthUser(loginCredentials)(dispatch);

    // Assert (Periksa apakah dispatch dipanggil dengan benar)
    expect(api.login).toHaveBeenCalledWith(loginCredentials);
    expect(api.putToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_AUTH_USER',
      payload: { authUser: fakeUser },
    });
  });

  // --- PENGUJIAN 2: asyncGetThreads ---
  it('should dispatch GET_THREADS when fetching threads is successful', async () => {
    // Arrange
    const fakeThreads = [
      { id: 'thread-1', title: 'Thread 1', category: 'General' },
      { id: 'thread-2', title: 'Thread 2', category: 'Tech' },
    ];

    api.getThreads.mockResolvedValue(fakeThreads);

    // Act
    await asyncGetThreads()(dispatch);

    // Assert
    expect(api.getThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_THREADS',
      payload: { threads: fakeThreads },
    });
  });

  // --- PENGUJIAN TAMBAHAN: Skenario Gagal ---
  it('should call alert when asyncGetThreads fails', async () => {
    // Arrange
    const errorMessage = 'Network Error';
    api.getThreads.mockRejectedValue(new Error(errorMessage));

    // Act
    await asyncGetThreads()(dispatch);

    // Assert
    expect(global.alert).toHaveBeenCalledWith(errorMessage);
  });
});