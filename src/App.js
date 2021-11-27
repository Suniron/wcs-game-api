import React from "react";
import GameList from "./GameList";
import GameDetail from "./GameDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Header = ({ name }) => (
  <a className="text-6xl font-bold" href="/">
    Welcome {name}
  </a>
);

function App() {
  return (
    <Router>
      <div className="m-3">
        <Header name="Etienne" />

        <Routes>
          <Route exact path="/" element={<GameList />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
