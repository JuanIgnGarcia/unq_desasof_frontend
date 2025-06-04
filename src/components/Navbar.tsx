import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
//import { FaSearch, FaShoppingCart, FaRegUserCircle, FaBars, FaAngleLeft } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  //const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query != "") {
      navigate(`/search/${query}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={assets.logo_react} className="w-14" />

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/favourites" className="flex flex-col items-center gap-1 ">
          <p>Favourites</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/login" className="flex flex-col items-center gap-1 ">
          <p>Login</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        {/* Cambios de Juan */}
        <Link to="/users">
          <button>Users</button>
        </Link>
        <Link to="/shoppeds">
          <button>Shoppeds</button>
        </Link>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
        <Link to="/top5/User">
          <button>Top 5 User</button>
        </Link>
        <Link to="/top5/Shopped">
          <button>Top 5 Shopped</button>
        </Link>
        <Link to="/top5/Favorite">
          <button>Top 5 Favorites</button>
        </Link>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar..."
        />
        <button onClick={handleSearch}>Buscar</button>
      </ul>
    </div>
  );
}

export default Navbar;
