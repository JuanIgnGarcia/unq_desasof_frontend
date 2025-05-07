import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between py-5 font-medium">
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
      </ul>
    </div>
  );
}

export default Navbar;
