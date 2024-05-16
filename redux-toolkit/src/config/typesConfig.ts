import {LastSearchState} from "../redux/lastSearchSlice.ts";

export type FilmsListItem = { imdbID: string, title: string, isFavorite: boolean }

export type FilmsList = Array<FilmsListItem>

export type GlobalState = { favorites: FilmsList, lastSearch: LastSearchState }

export type Film = {
    "Poster": string,
    "Title": string,
    "Year": string,
    "Genre": string,
    "Runtime": string,
    "Director": string,
    "Actors": string,
    "imdbRating": string,
}