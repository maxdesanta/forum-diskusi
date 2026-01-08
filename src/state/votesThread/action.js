import { api } from "../../utils/api";


export const ActionType = {
    TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
    TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
    TOGGLE_NEUTRAL_THREAD: 'TOGGLE_NEUTRAL_THREAD',
};

export function toggleUpVoteThreadsCreator({threadId, userId}) {
    return {
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: {
            threadId,
            userId
        },
    }
}

export function toggleDownVoteThreadsCreator({threadId, userId}) {
    return {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD,
        payload: {
            threadId,
            userId
        },
    }
}

export function toggleNeutralVoteThreadsCreator({threadId, userId}) {
    return {
        type: ActionType.TOGGLE_NEUTRAL_THREAD,
        payload: {
            threadId,
            userId
        },
    }
}

export function asyncToggleUpVoteThreads(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();
        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            return;
        };

        dispatch(toggleUpVoteThreadsCreator({ threadId, userId: authUser.id }));

        try {
            await api.upVoteThread(threadId);
        } catch (error) {
            alert(error.message);
        }
    }
}

export function asyncToggleDownVoteThreads(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();

        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            return;
        };

        dispatch(toggleDownVoteThreadsCreator({ threadId, userId: authUser.id }));

        try {
            await api.downVoteThread(threadId);
        } catch (error) {
            alert(error.message);
        }
    }
}

export function asyncToggleNeutralVoteThreads(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();
        if (!authUser) {
            alert("Silahkan login terlebih dahulu !");
            return;
        };

        dispatch(toggleNeutralVoteThreadsCreator({ threadId, userId: authUser.id }));

        try {
            await api.neutralVoteThread(threadId);
        } catch (error) {
            alert(error.message);
        }
    }
}