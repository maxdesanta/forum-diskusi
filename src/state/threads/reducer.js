import { ActionType as ThreadActionType } from "./action";
import { ActionType as VoteActionType } from "../votesThread/action";


export default function ThreadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ThreadActionType.GET_THREADS:
      return action.payload.threads || [];
    case ThreadActionType.ADD_THREADS:
      return [action.payload.thread, ...threads];
    case VoteActionType.TOGGLE_UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const isAlreadyUpVoted = thread.upVotesBy.includes(
            action.payload.userId
          );
          return {
            ...thread,
            upVotesBy: isAlreadyUpVoted
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.upVotesBy, action.payload.userId],
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }

        return thread;
      });
    case VoteActionType.TOGGLE_DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const isAlreadyDownVoted = thread.downVotesBy.includes(
            action.payload.userId
          );
          return {
            ...thread,
            downVotesBy: isAlreadyDownVoted
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.downVotesBy, action.payload.userId],
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }

        return thread;
      });
    case VoteActionType.TOGGLE_NEUTRAL_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            ),
          };
        }

        return thread;
      });
    default:
      return threads;
  }
}
