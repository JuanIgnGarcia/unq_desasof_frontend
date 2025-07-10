import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterAdmin from "./pages/RegisterAdmin";

import Users from "./pages/Users";
import Shopped from "./pages/Shoppeds";
import Favorites from "./pages/Favorites";
import UserShopped from "./pages/UserShopped";

import Top5User from "./pages/Top5User";
import Top5Shopped from "./pages/Top5Shopped";
import Top5Favorites from "./pages/Top5Favorites";

import SearchPage from "./pages/Search";

import { Home } from "./pages/Home";
import Layout from "./components/Layout";

function App() {
  const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/registerAdmin" element={<RegisterAdmin />} />

          {/* need token */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/users" element={<Users />} />
              <Route path="/shoppeds" element={<Shopped />} />
              <Route path="/top5/User" element={<Top5User />} />
              <Route path="/top5/Shopped" element={<Top5Shopped />} />
              <Route path="/top5/Favorite" element={<Top5Favorites />} />
              <Route path="/search/:query" element={<SearchPage />} />
              <Route path="/user/shopped" element={<UserShopped />} />
            </Route>
          </Route>
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Router>
    </div>
  );
}

export default App;
