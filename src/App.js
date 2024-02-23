import "./App.css";
import { useRoutes } from "react-router-dom";
import React from "react";

import ForgotPassword from "./MainCode/ForgotPassword/ForgotPassword";
import ResetPassword from "./MainCode/ForgotPassword/ResetPassword";
import VerifyEmail from "./MainCode/SideBarLinkPage/VerifyEmail/VerifyEmail";
import ResendCode from "./MainCode/SideBarLinkPage/VerifyEmail/ResendVerifyEmail";
import SignIn from "./MainCode/SignInScreen/SignIn";
import Signup from "./MainCode/SignUpScreen/Signup";
import Home from "./MainCode/HomeScreen/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "../src/Features/utils";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setupAxiosInterceptors(dispatch);

    // Cleanup function
    return () => {
      // Remove interceptors or perform any cleanup if needed
    };
  }, [dispatch]);

  const routes = useRoutes([
    { path: "/", element: <Signup /> },
    { path: "/signIn", element: <SignIn /> },
    { path: "/home", element: <Home /> },
    { path: "/forgotPassword", element: <ForgotPassword /> },
    { path: "/resetPassword/:email", element: <ResetPassword /> },
    { path: "/verifyEmail", element: <VerifyEmail /> },
    { path: "/resendEmail", element: <ResendCode /> },
  ]);

  return <div>{routes}</div>;
}

export default App;
