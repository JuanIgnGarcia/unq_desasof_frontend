import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
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
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
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
    </>
  );
}

export default Navbar;
