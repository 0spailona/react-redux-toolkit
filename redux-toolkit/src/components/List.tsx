import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faSolidHeart, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faRegularHeart} from "@fortawesome/free-regular-svg-icons";
import {FilmsList} from "../config/typesConfig.ts";
import {useAppDispatch} from "../redux/hooks.ts";
import {addToFavorite, removeFromFavorite} from "../redux/favoritesSlice.ts";

type Props = {
    list: FilmsList
    isFavoriteList: boolean
}

export default function List({list, isFavoriteList}: Props) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const addToFavorites = (imdbID: string, title: string, isFavorite: boolean) => dispatch(addToFavorite({
        imdbID,
        title,
        isFavorite
    }))
    const removeFromFavorites = (imdbID: string) => dispatch(removeFromFavorite(imdbID))

    return (
        <ListGroup> {
            list.map(item =>
                <ListGroupItem className="d-flex justify-content-between p-0" key={item.imdbID} action
                               variant="warning">
                    <span className="flex-grow-1 align-self-center h-100 p-3"
                          onClick={() => navigate(`/card/${item.imdbID}`)}>{item.title}</span>
                    <Button className="align-self-center m-1"
                            variant="warning"
                            title={isFavoriteList ? "Remove from favorites" : !item.isFavorite ? "Add to favorites" : undefined}
                            onClick={() => isFavoriteList ? removeFromFavorites(item.imdbID) :
                                item.isFavorite ? removeFromFavorites(item.imdbID) : addToFavorites(item.imdbID, item.title, item.isFavorite)}>
                        <FontAwesomeIcon
                            icon={isFavoriteList ? faTrash : item.isFavorite ? faSolidHeart : faRegularHeart}/>
                    </Button>
                </ListGroupItem>)
        }</ListGroup>
    )
}