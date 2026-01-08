import { api } from '../../utils/api';

export const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

export function setAuthUserCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

export function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await api.login({ email, password });
      api.putToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

export function asyncUnsetAuthUser() {
  return async (dispatch) => {
    try {
      api.deleteToken();
      dispatch(unsetAuthUserCreator());
    } catch (error) {
      alert(error.message);
    }
  };
}