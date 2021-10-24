import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BadRequest from "./components/BadRequest";
import Navbar from "./components/Navbar";
import ChangePasswordPage from "./pages/change-password";
import ConfirmRegistrationPage from "./pages/confirm-registration";
import CreatePostPage from "./pages/create-post";
import EditPostPage from "./pages/edit-post";
import ForgotPasswordPage from "./pages/forgot-password";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ViewPostPage from "./pages/view-post";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>

          <Route
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          ></Route>
          <Route
            exact
            path="/change-password/:token"
            component={ChangePasswordPage}
          ></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
          <Route
            exact
            path="/confirm-registration/:token"
            component={ConfirmRegistrationPage}
          ></Route>
          <Route exact path="/create-post" component={CreatePostPage}></Route>
          <Route exact path="/post/:id" component={ViewPostPage}></Route>
          <Route exact path="/post/edit/:id" component={EditPostPage}></Route>
          <Route path="*">
            <BadRequest />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
