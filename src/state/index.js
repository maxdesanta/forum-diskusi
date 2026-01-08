import { configureStore } from "@reduxjs/toolkit";
import LaderboardsReducer from "./laderboards/reducer";
import ThreadsReducer from "./threads/reducer";
import UsersReducer from "./users/reducer";
import isPreloadReducer from "./isPreload/reducer";
import AuthUserReducer from "./authUser/reducer";
import detailThreadReducer from "./threadDetail/reducer";

export const store = configureStore({
    reducer: {
        laderboards: LaderboardsReducer,
        threads: ThreadsReducer,
        users: UsersReducer,
        isPreload: isPreloadReducer,
        authUser: AuthUserReducer,
        detailThread: detailThreadReducer
    },
});