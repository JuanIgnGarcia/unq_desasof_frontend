import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
//import { FaSearch, FaShoppingCart, FaRegUserCircle, FaBars, FaAngleLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

function Navbar() {
  //const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    API.isAdmin()
      .then((res) => {
        setIsAdmin(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(handleApiError(error));
        setLoading(false);
      });
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-5 font-medium">
      <NavLink to="/" className="flex items-start">
        <img
          src={assets.logo_desasoft}
          className="w-14 rounded-full cursor-pointer"
        />
      </NavLink>

      <ul className="w-full mt-4 flex justify-evenly gap-5 text-sm text-gray-700 flex-wrap">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        {!loading && (
          <>
            {/* solo no admin */}
            {!isAdmin && (
              <NavLink
                to="/user/shopped"
                className="flex flex-col items-center gap-1"
              >
                <p>Shopped</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
              </NavLink>
            )}

            {/* solo admins */}
            {isAdmin && (
              <>
                <NavLink
                  to="/users"
                  className="flex flex-col items-center gap-1"
                >
                  <p>Users</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                  to="/shoppeds"
                  className="flex flex-col items-center gap-1"
                >
                  <p>Shoppeds</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                  to="/favorites"
                  className="flex flex-col items-center gap-1"
                >
                  <p>Favorites</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                  to="/top5/User"
                  className="flex flex-col items-center gap-1"
                >
                  <p>Top 5 User</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                  to="/top5/Shopped"
                  className="flex flex-col items-center gap-1"
                >
                  <p>Top 5 Shopped</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>

                <NavLink
                  to="/top5/Favorite"
                  className="flex flex-col items-center gap-1"
                >
                  <p>Top 5 Favorites</p>
                  <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
              </>
            )}
          </>
        )}

        {/* Barra de búsqueda */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar..."
          className="px-2 py-1 border rounded"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Buscar
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          logout
        </button>
      </ul>
    </div>
  );
}

export default Navbar;
