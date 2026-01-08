import { api } from '../../utils/api';

export const ActionType = {
  GET_LADERBOARDS: 'GET_LADERBOARDS',
};


export function getLaderboardsCreator(laderboards) {
  return {
    type: ActionType.GET_LADERBOARDS,
    payload: {
      laderboards
    },
  };
}

export function asyncGetLaderboards() {
  return async (dispatch) => {
    try {
      const laderboards = await api.getLaderboards();
      dispatch(getLaderboardsCreator(laderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}