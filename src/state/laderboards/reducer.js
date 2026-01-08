import { ActionType } from "./action";

export default function LaderboardsReducer(laderboards = [], action = {}) {
    switch (action.type) {
        case ActionType.GET_LADERBOARDS:
            return action.payload.laderboards || []
        default:
            return laderboards
    }
}
