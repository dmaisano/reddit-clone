import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route path="/" component={HomePage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
