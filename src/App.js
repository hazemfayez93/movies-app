import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import SimpleBottomNavigation from "./components/navbar/Navbar";
import Movies from "./components/pages/Movies";
import Search from "./components/pages/Search";
import Series from "./components/pages/Series";
import Trending from "./components/pages/Trending";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route exact path="/" element={<Trending />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route exact path="/series" element={<Series />} />
              <Route exact path="/search" element={<Search />} />
            </Routes>
          </Container>
          <SimpleBottomNavigation />
        </div>
        ;
      </Router>
    </React.Fragment>
  );
};

export default App;
