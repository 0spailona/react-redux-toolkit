import {combineReducers, configureStore} from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice.ts";
import lastSearchReducer from "./lastSearchSlice.ts";

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    lastSearch: lastSearchReducer
});

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
