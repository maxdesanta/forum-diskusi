import { api } from "../../utils/api";

export const ActionType = {
    GET_THREADS: 'GET_THREADS',
    ADD_THREADS: 'ADD_THREADS',
};

export function getThreadsCreator(threads) {
    return {
        type: ActionType.GET_THREADS,
        payload: {
            threads
        },
    }
}

export function addThreadsCreator(thread) {
    return {
        type: ActionType.ADD_THREADS,
        payload: {
            thread
        },
    }
}

export function asyncGetThreads() {
    return async (dispatch) => {
        try {
            const threads = await api.getThreads();
            dispatch(getThreadsCreator(threads));
        } catch(error) {
            alert(error.message);
        }
    }
}

export function asyncAddThreads({title, body, category}) {
    return async (dispatch) => {
        try {
            const thread = await api.addThread({ title, body, category });
            console.log(thread);
    
            dispatch(addThreadsCreator(thread));
        } catch(error) {
            alert(error.message);
        }
    }
}