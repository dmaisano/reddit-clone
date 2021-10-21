import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BadRequest from "./components/BadRequest";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="*">
            <BadRequest />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
