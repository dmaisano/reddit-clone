import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BadRequest from "./components/BadRequest";
import Navbar from "./components/Navbar";
import ChangePasswordPage from "./pages/change-password";
import ConfirmRegistrationPage from "./pages/confirm-registration";
import CreatePostPage from "./pages/create-post";
import ForgotPasswordPage from "./pages/forgot-password";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>

          <Route path="/forgot-password" component={ForgotPasswordPage}></Route>
          <Route
            path="/change-password/:token"
            component={ChangePasswordPage}
          ></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route
            path="/confirm-registration/:token"
            component={ConfirmRegistrationPage}
          ></Route>
          <Route path="/create-post" component={CreatePostPage}></Route>
          <Route path="*">
            <BadRequest />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
