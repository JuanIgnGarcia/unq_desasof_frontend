import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Favourites } from "./pages/Favourites";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
