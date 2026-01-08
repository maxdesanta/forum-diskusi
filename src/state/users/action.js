import { api } from "../../utils/api";

export const ActionType = {
    GET_USERS: 'GET_USERS',
};

export function getUsersCreator(users) {
    return {
        type: ActionType.GET_USERS,
        payload: {
            users
        },
    }
}

export function asyncGetUsers() {
    return async (dispatch) => {
        try {
            const users = await api.getAllUsers();
            dispatch(getUsersCreator(users));
        } catch(error) {
            alert(error.message);
        }
    }
}