import { describe, expect, it } from 'vitest';
import ThreadsReducer from './reducer';

describe('test threads reducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = ThreadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given GET_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'GET_THREADS',
      payload: { threads: [{ id: 'thread-1', title: 'Thread 1' }] },
    };

    const nextState = ThreadsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should toggle upvote thread correctly', () => {
    const initialState = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: [] }
    ];
    const action = {
      type: 'TOGGLE_UPVOTE_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    // Skenario 1: Dari netral menjadi Upvoted
    const stateAfterUpvote = ThreadsReducer(initialState, action);
    expect(stateAfterUpvote[0].upVotesBy).toContain('user-1');

    // Skenario 2: Klik lagi untuk membatalkan Upvote (menjadi netral)
    const stateAfterCancel = ThreadsReducer(stateAfterUpvote, action);
    expect(stateAfterCancel[0].upVotesBy).not.toContain('user-1');
  });

  it('should clear votes when given TOGGLE_NEUTRAL_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', upVotesBy: ['user-1'], downVotesBy: [] }
    ];
    const action = {
      type: 'TOGGLE_NEUTRAL_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = ThreadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});