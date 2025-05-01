import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1>Esta es la homepage!</h1>
      <Link to="/">Home</Link>
      <Link to="/favourites">Favoritos</Link>
      <Link to="/login">Login</Link>
    </>
  );
}
