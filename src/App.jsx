import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Test from "./pages/Test/Test.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/Test">Test</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
