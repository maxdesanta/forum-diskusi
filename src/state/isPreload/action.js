// state/isPreload/action.js
import { api } from '../../utils/api';
import { setAuthUserCreator } from '../authUser/action';

export const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export function setIsPreloadCreator(isPreload) {
  return { type: ActionType.SET_IS_PRELOAD, payload: { isPreload } };
}

export function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      // Proses pengecekan token
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserCreator(authUser));
    } catch {
      // Jika token tidak valid atau tidak ada, set authUser jadi null
      dispatch(setAuthUserCreator(null));
    } finally {
      // Selesai mengecek, matikan status loading/preload
      dispatch(setIsPreloadCreator(false));
    }
  };
}