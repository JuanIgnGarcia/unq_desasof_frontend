import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/favourites">
        <button>Favoritos</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/top5/User">
        <button>Top 5 User</button>
      </Link>{" "}
      <Link to="/top5/Shopped">
        <button>Top 5 Shopped</button>
      </Link>
      <Link to="/top5/Favorite">
        <button>Top 5 Favorites</button>
      </Link>
    </>
  );
}

export default Navbar;
