import { api } from '../../utils/api';

export const ActionType = {
  GET_DETAIL_THREAD: 'GET_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
};

export function getDetailThreadCreator(detailThread) {
  return {
    type: ActionType.GET_DETAIL_THREAD,
    payload: {
      detailThread
    }
  };
}

export function addCommentCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  };
}

export function clearDetailThreadCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD
  };
}

export function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    dispatch(clearDetailThreadCreator());
    try {
      const detailThread = await api.getDetailThread(id);
      console.log(detailThread);

      dispatch(getDetailThreadCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.addComment({ id: threadId, content });
      dispatch(addCommentCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}