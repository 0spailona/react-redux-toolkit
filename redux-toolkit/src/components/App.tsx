import Nav from "./Nav.tsx";
import {Route, Routes} from "react-router-dom";
import Search from "./Search.tsx";
import Favorites from "./Favorites.tsx";
import FilmCard from "./FilmCard.tsx";

function App() {

    return (
        <>
            <Nav></Nav>
            <div className="page">
                <Routes>
                    <Route path="/" element={<Search/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/card/:id" element={<FilmCard/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
