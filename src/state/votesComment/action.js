import { api } from '../../utils/api';
import { asyncReceiveThreadDetail } from '../threadDetail/action';

export const ActionType = {
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRAL_COMMENT: 'TOGGLE_NEUTRAL_COMMENT',
};

export function toggleUpVoteCommentsCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    },
  };
}

export function toggleDownVoteCommentsCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    },
  };
}

export function toggleNeutralVoteCommentsCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_COMMENT,
    payload: {
      threadId,
      commentId,
      userId
    },
  };
}

export function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('Silahkan login terlebih dahulu !');
      return;
    };

    try {
      await api.upVoteComment(threadId, commentId);
      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    if (!authUser) {
      alert('Silahkan login terlebih dahulu !');
      return;
    };

    try {
      await api.downVoteComment(threadId, commentId);
      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch) => {
    try {
      await api.neutralVoteComment(threadId, commentId);
      dispatch(asyncReceiveThreadDetail(threadId)); // Refresh data
    } catch (error) {
      alert(error.message);
    }
  };
}