import logo from "./logo.svg";
import "./App.css";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailFile from "./pages/DetailFile";
import LayoutCustom from "./pages/Layout";
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" index element={<LayoutCustom><Main /></LayoutCustom>} />
          <Route path="/file/:hash" element={<LayoutCustom><DetailFile /></LayoutCustom>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
