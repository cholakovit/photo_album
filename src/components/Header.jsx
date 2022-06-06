import { Link } from "react-router-dom"


const Header = () => {

    return (
        <div className="header">
            <Link to='/'>Home</Link>
            <Link to={'/photos/favourites'}>Favourites</Link>
        </div>
    )
}

export default Header