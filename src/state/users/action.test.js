import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../../utils/api';
import { asyncGetUsers } from './action';

vi.mock('../../utils/api');

describe('userAction Thunk', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn();
  });

  it('should dispatch GET_USERS when fetching users is successful', async () => {
    // Arrange
    const fakeUsers = [{ id: 'user-1', name: 'Alice' }, { id: 'user-2', name: 'Bob' }];
    api.getAllUsers.mockResolvedValue(fakeUsers);

    // Act
    await asyncGetUsers()(dispatch);

    // Assert
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(dispatch).toBeCalledWith({
      type: 'GET_USERS',
      payload: { users: fakeUsers },
    });
  });
});