import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Chart from "./pages/Chart";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  return (
    <section>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="charts" element={<Chart />} />
        <Route path="/new" element={<New />} />
      </Routes>
      <Toaster />
    </section>
  );
}

export default App;
