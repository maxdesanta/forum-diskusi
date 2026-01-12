import { describe, it, expect } from 'vitest';
import UsersReducer from './reducer';

describe('testing user reducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [{ id: 'user-1', name: 'Alice' }];
    const action = { type: 'UNKNOWN' };

    const nextState = UsersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the users list when given GET_USERS action', () => {
    const initialState = [];
    const action = {
      type: 'GET_USERS',
      payload: {
        users: [
          { id: 'user-1', name: 'Alice' },
          { id: 'user-2', name: 'Bob' },
        ],
      },
    };

    const nextState = UsersReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
    expect(nextState).toHaveLength(2);
  });
});