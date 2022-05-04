import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Chart from "./pages/Chart";
import Home from "./pages/Home";

function App() {
  return (
    <section>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="charts" element={<Chart />} />
      </Routes>
    </section>
  );
}

export default App;
