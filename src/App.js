import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { AddedBook } from "./pages/AddedBook";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/book-collection" element={<AddedBook />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
