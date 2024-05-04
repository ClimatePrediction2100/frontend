import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Main from "./pages/Main";
import Graph from "./pages/Graph";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} /> {/* 인트로 페이지 */}
        <Route path="/main" element={<Main />} /> {/* 메인 페이지 */}
        <Route path="/graph" element={<Graph />} /> {/* 그래프 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
