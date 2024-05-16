import {NavLink} from "react-router-dom";

export default function Nav() {
    return (
        <nav className="d-flex gap-2 w-100 p-2">
            <NavLink to="/"
                     className={({isActive}) => isActive ? "nav__item nav__item-active" : "nav__item"}>Search</NavLink>
            <NavLink to="/favorites"
                     className={({isActive}) => isActive ? "nav__item nav__item-active" : "nav__item"}>Favorites</NavLink>
        </nav>
    )
}