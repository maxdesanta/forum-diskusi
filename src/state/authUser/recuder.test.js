import { describe, it, expect } from 'vitest';
import AuthUserReducer from './reducer';

describe('testing auth user reducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = { id: 'user-1', name: 'John Doe' };
    const action = { type: 'UNKNOWN' };

    const nextState = AuthUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given SET_AUTH_USER action', () => {
    const initialState = {};
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: { id: 'user-123', name: 'Dicoding Academy' },
      },
    };

    const nextState = AuthUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-123', name: 'Dicoding Academy' };
    const action = { type: 'UNSET_AUTH_USER' };

    const nextState = AuthUserReducer(initialState, action);

    expect(nextstate).toBeNull();
  });
});