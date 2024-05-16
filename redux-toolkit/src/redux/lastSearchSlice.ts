import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilmsList} from "../config/typesConfig.ts";
import keys from "../config/keys.ts";

export type LastSearchState = {
    searchPattern: string,
    searchResult: FilmsList,
    complementsList: FilmsList,
    loading: boolean,
    error: string
}

const initialState: LastSearchState = {
    searchPattern: "",
    searchResult: [],
    complementsList: [],
    loading: false,
    error: ""
}

const url = import.meta.env.VITE_URL;
const key = keys[0]

const createSliceWithThunk = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator}
})

export const lastSearchSlice = createSliceWithThunk({
    name: "lastSearch",
    initialState,
    selectors: {
        searchList: (state) => state.searchResult,
        complementList: (state) => state.complementsList,
        searchPattern: (state => state.searchPattern),
        loadingState: (state => state.loading),
        searchError: (state => state.error)
    },
    reducers: (create) => ({

        toComplementList: create.reducer((state, action: PayloadAction<Array<string>>) => {
            state.complementsList = []

            for (const film of state.searchResult) {
                if (action.payload.find(id => id === film.imdbID)) {
                    state.complementsList.push({...film, isFavorite: true})
                } else {
                    state.complementsList.push(film)
                }
            }
        }),
        fetchFilmsList: create.asyncThunk<{ result: [], pattern: string }, string>(
            async (searchPattern, {rejectWithValue}) => {
                try {
                    const response = await fetch(`${url}?apikey=${key}&s=${searchPattern}`);
                    if (!response.ok) {
                        return rejectWithValue("Loading films error!")
                    }

                    const result = await response.json()

                    if (!result["Search"]) {
                        return rejectWithValue("Film was not found")
                    }

                    return {result: result["Search"], pattern: searchPattern};

                } catch (e) {
                    return rejectWithValue(e)
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                    state.searchResult = []
                },
                fulfilled: (state, action) => {
                    state.searchResult = action.payload.result.map(film => ({
                        imdbID: film["imdbID"],
                        title: film["Title"],
                        isFavorite: false
                    }))
                    state.searchPattern = action.payload.pattern
                    state.error = ""
                },
                rejected: (state, action) => {
                    state.error = action.payload as string
                    state.searchResult = []
                },
                settled: (state) => {
                    state.loading = false
                }
            }
        )
    }),
})

export const {fetchFilmsList, toComplementList} = lastSearchSlice.actions
export const {searchList, searchPattern, loadingState, searchError, complementList} = lastSearchSlice.selectors

const lastSearchReducer = lastSearchSlice.reducer
export default lastSearchReducer