import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
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

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const KEY = `USER_ACKNOWLEDGEMENT`;
  const USER_ACKNOWLEDGEMENT = localStorage.getItem(KEY);
  const modalHasBeenOpened = !!USER_ACKNOWLEDGEMENT;

  useEffect(() => {
    console.log({ modalHasBeenOpened });

    if (!modalHasBeenOpened) {
      onOpen();
    } else {
    }
  }, [modalHasBeenOpened, onOpen]);

  const closeHandler = () => {
    localStorage.setItem(KEY, JSON.stringify(true));
    onClose();
  };

  return (
    <div className="App">
      <Modal
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeHandler}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="3xl">
            Disclaimer ⚠
          </ModalHeader>
          <ModalBody fontSize="xl">
            User input has been restricted by design. This can be seen when
            registering and creating posts. The registration username and post
            input fields are randomly generated and disabled for custom user
            input. To create or update a post simply click the{" "}
            <i>
              <b>"generate post"</b>
            </i>
            button.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" width="100%" onClick={closeHandler}>
              Acknowledge
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
};

export default App;
