import logo from "./logo.svg";
import "./App.css";
import { useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import { selectKitchen, useAppSelector } from "./Store/store";
import { generateToken, messaging } from "./MainCode/notifcations/firebase";
import { onMessage } from "firebase/messaging";
import { notification } from "antd";

import ForgotPassword from "./MainCode/ForgotPassword/ForgotPassword";
import ResetPassword from "./MainCode/ForgotPassword/ResetPassword";
import VerifyEmail from "./MainCode/SideBarLinkPage/VerifyEmail/VerifyEmail";
import ResendCode from "./MainCode/SideBarLinkPage/VerifyEmail/ResendVerifyEmail";
import SignIn from "./MainCode/SignInScreen/SignIn";
import Signup from "./MainCode/SignUpScreen/Signup";
import Home from "./MainCode/HomeScreen/Home";

function App() {
  const { auth } = useAppSelector(selectKitchen);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      notification.open({
        message: payload.notification.title,
        description: payload.notification.body,
      });
    });
  }, []);

  const routes = useRoutes([
    { path: "/", element: <Signup /> },
    { path: "/signIn", element: <SignIn /> },
    { path: "/home", element: <Home /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/resetPassword/:email", element: <ResetPassword /> },
    { path: "/verifyEmail", element: <VerifyEmail /> },
    { path: "/resendEmail", element: <ResendCode /> },
  ]);

  return <div>{routes}</div>;
}

export default App;
