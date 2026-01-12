import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../../utils/api';
import { asyncAddComment, asyncReceiveThreadDetail } from './action';

vi.mock('../../utils/api');

describe('threadDetailAction Thunk', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.alert = vi.fn();
  });

  it('should dispatch actions correctly when fetching thread detail', async () => {
    // Arrange
    const fakeThreadDetail = { id: 'thread-1', title: 'Detail Title', comments: [] };
    api.getDetailThread.mockResolvedValue(fakeThreadDetail);

    // Act
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // Assert
    // 1. Memastikan state dibersihkan dulu
    expect(dispatch).toBeCalledWith({ type: 'CLEAR_DETAIL_THREAD' });
    // 2. Memastikan API dipanggil dengan ID yang benar
    expect(api.getDetailThread).toHaveBeenCalledWith('thread-1');
    // 3. Memastikan data hasil API dikirim ke reducer
    expect(dispatch).toBeCalledWith({
      type: 'GET_DETAIL_THREAD',
      payload: { detailThread: fakeThreadDetail },
    });
  });

  it('should dispatch ADD_COMMENT when adding comment is successful', async () => {
    // Arrange
    const fakeComment = { id: 'comment-1', content: 'New Comment' };
    api.addComment.mockResolvedValue(fakeComment);

    // Act
    await asyncAddComment({ threadId: 'thread-1', content: 'New Comment' })(dispatch);

    // Assert
    expect(api.addComment).toHaveBeenCalledWith({ id: 'thread-1', content: 'New Comment' });
    expect(dispatch).toBeCalledWith({
      type: 'ADD_COMMENT',
      payload: { comment: fakeComment },
    });
  });
});