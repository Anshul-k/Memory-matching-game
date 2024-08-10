import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Game from "./Pages/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Home />} />
        <Route exact path="/error" element={<Error />} />
        <Route exact path="/:number" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
