import { describe, expect, it } from 'vitest';
import detailThreadReducer from './reducer';

describe('test detail thread reducer', () => {
  it('should return null when given CLEAR_DETAIL_THREAD action', () => {
    const initialState = { id: 'thread-1', title: 'Old Data' };
    const action = { type: 'CLEAR_DETAIL_THREAD' };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should add a comment when given ADD_COMMENT action', () => {
    const initialState = { id: 'thread-1', comments: [] };
    const action = {
      type: 'ADD_COMMENT',
      payload: { comment: { id: 'comment-1', content: 'Halo!' } },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.comments).toHaveLength(1);
    expect(nextState.comments[0].content).toBe('Halo!');
  });

  it('should toggle upvote on a specific comment', () => {
    const initialState = {
      id: 'thread-1',
      comments: [
        { id: 'comment-1', upVotesBy: [], downVotesBy: [] }
      ]
    };
    const action = {
      type: 'TOGGLE_UPVOTE_COMMENT',
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    const nextState = detailThreadReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toContain('user-1');
    // Memastikan downvote dibersihkan jika ada
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });
});