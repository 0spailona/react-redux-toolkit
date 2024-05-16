import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilmsList, FilmsListItem} from "../config/typesConfig.ts";

type Favorites = {
    favorites: FilmsList
    favoritesId: Array<string>
}

const initialState: Favorites = {
    favorites: [],
    favoritesId: []
}

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<FilmsListItem>) => {
            if (!state.favorites.find(film => film.imdbID === action.payload.imdbID)) {
                const newFavorite = action.payload;
                newFavorite.isFavorite = true
                state.favorites.push(newFavorite)
                state.favoritesId.push(action.payload.imdbID)
            }
        },
        removeFromFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(x => x.imdbID !== action.payload)
            state.favoritesId = state.favoritesId.filter(x => x !== action.payload)
        }
    }
})

export const {addToFavorite, removeFromFavorite} = favoritesSlice.actions
const favoritesReducer = favoritesSlice.reducer
export default favoritesReducer