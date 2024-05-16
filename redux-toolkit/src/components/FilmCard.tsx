import {Alert, Button, Card, ListGroup} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Film} from "../config/typesConfig.ts";
import keys from "../config/keys.ts";

export default function FilmCard() {
    const navigate = useNavigate()
    const {id} = useParams()

    const [film, setFilm] = useState<Film>({
        "Poster": "",
        "Title": "",
        "Year": "",
        "Genre": "",
        "Runtime": "",
        "Director": "",
        "Actors": "",
        "imdbRating": ""
    })

    const [loading, setLoading] = useState(true)

    const url = import.meta.env.VITE_URL;
    const key = keys[0]

    useEffect(() => {
        fetch(`${url}?apikey=${key}&i=${id}`)
            .then(response => response.json())
            .then(json => {
                const film = {
                    "Poster": json["Poster"],
                    "Title": json["Title"],
                    "Year": json["Year"],
                    "Genre": json["Genre"],
                    "Runtime": json["Runtime"],
                    "Director": json["Director"],
                    "Actors": json["Actors"],
                    "imdbRating": json["imdbRating"]
                }
                setFilm(film)
                setLoading(false)
            })
    }, [id,key,url])

    return (<>
            {
                loading ? <Alert variant="warning">Loading...</Alert> :
                    <div className="d-flex gap-2 w-100">
                        <img alt="Poster" src={film["Poster"] || ".img.jpg"}/>
                        <Card className="flex-grow-1">
                            <Card.Body>
                                <Card.Title>{film["Title"]}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Year: {film["Year"]}</ListGroup.Item>
                                <ListGroup.Item>Genre: {film["Genre"]}</ListGroup.Item>
                                <ListGroup.Item>Runtime: {film["Runtime"]}</ListGroup.Item>
                                <ListGroup.Item>Director: {film["Director"]}</ListGroup.Item>
                                <ListGroup.Item>Actors: {film["Actors"]}</ListGroup.Item>
                                <ListGroup.Item>Rating: {film["imdbRating"]}</ListGroup.Item>
                            </ListGroup>
                            <Button variant="warning" onClick={() => navigate(-1)}>Close</Button>
                        </Card>
                    </div>
            }</>
    )
}