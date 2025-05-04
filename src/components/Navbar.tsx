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
    </>
  );
}

export default Navbar;
