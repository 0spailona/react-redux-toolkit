import List from "./List.tsx";
import {useAppSelector} from "../redux/hooks.ts";

export default function Favorites() {
    const list = useAppSelector(state => state.favorites.favorites)

    return (
        <div><List list={list} isFavoriteList={true}/></div>
    )
}