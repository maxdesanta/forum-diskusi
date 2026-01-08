import { ActionType as threadDetailActionType } from "./action";
import { ActionType as voteCommentActionType } from "../votesComment/action";

export default function detailThreadReducer(detailThread = {}, action = {}) {
    switch (action.type) {
        case threadDetailActionType.GET_DETAIL_THREAD:
            return action.payload.detailThread;
        case threadDetailActionType.CLEAR_DETAIL_THREAD:
            return null;
        case threadDetailActionType.ADD_COMMENT:
            return { ...detailThread, comments: [...detailThread.comments, action.payload.comment] };
        case voteCommentActionType.TOGGLE_UPVOTE_COMMENT:
            return {
                ...detailThread,
                comments: detailThread.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        return {
                            ...comment,
                            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                                : [...comment.upVotesBy, action.payload.userId],
                            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
                        };
                    }
                    return comment;
                })
            }
        case voteCommentActionType.TOGGLE_DOWNVOTE_COMMENT:
            return {
                ...detailThread,
                comments: detailThread.comments.map((comment) => {
                    if (comment.id === action.payload.commentId) {
                        return {
                            ...comment,
                            upVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId) ,
                            downVotesBy: comment.upVotesBy.includes(action.payload.userId)
                            ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                            : [...comment.upVotesBy, action.payload.userId],
                        };
                    }
                    return comment;
                })
            };
        default:
            return detailThread;
    }
}