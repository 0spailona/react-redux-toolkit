import List from "./List.tsx";
import Form from "./Form.tsx";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {
    complementList,
    loadingState,
    searchError,
    searchList,
    searchPattern,
    toComplementList
} from "../redux/lastSearchSlice.ts";
import {Alert} from "react-bootstrap";
import {useEffect} from "react";

export default function Search() {

    const error = useAppSelector(searchError)
    const loading = useAppSelector(loadingState)
    const pattern = useAppSelector(searchPattern)
    const favoritesId = useAppSelector(state => state.favorites.favoritesId);
    const dispatch = useAppDispatch()
    const list = useAppSelector(searchList)
    const complList = useAppSelector(complementList)

    useEffect(() => {
        dispatch(toComplementList(favoritesId))
    }, [list,favoritesId,dispatch])


    return (
        <div className="d-flex flex-column gap-3">
            <Form pattern={pattern}/>
            {error !== "" ? <Alert variant="warning">{error}</Alert> : null}
            {loading && <Alert variant="warning">Loading...</Alert>}
            {!loading && <List list={complList} isFavoriteList={false}/>}
        </div>
    )
}
//