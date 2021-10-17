import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={HomePage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
