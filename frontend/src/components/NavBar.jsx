import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
            <div className="navbar-brand text-2xl font-bold">
                <Link to="/" className="hover:text-yellow-400 transition-colors">Movie App</Link>
            </div>
            <div className="navbar-links flex space-x-6">
                <Link to="/" className="nav-link hover:text-yellow-400 transition-colors">Home</Link>
                <Link to="/favorites" className="nav-link hover:text-yellow-400 transition-colors">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar