import React, { useEffect, useState } from "react";
import { Space, notification } from "antd";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Sidebar from "../../Components/Sidebar";
import PageContent from "../../Components/PageContent";
import "../../Components/dash.css";
import { useNavigate } from "react-router-dom";
import {
  Signin,
  GetNewToken,
  setNotifyMessage,
} from "../../Features/kitchenSlice";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../Store/store";

function Home() {
  const dispatch = useAppDispatch();
  const [selectedMenuItem, setSelectedMenuItem] = useState("/orders");
  const { intV, setIntV } = useState(10000);
  const navigate = useNavigate();
  const { userData, refreshToken, notifyMessage } =
    useAppSelector(selectKitchen);

  useEffect(() => {
    if (!userData) {
      navigate("/signIn");
    }
  }, [userData, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const auth2 = localStorage.getItem("auth");
      console.log(auth2, userData, "Hello");
      if (userData && auth2 === null) {
        GetNewToken({ Email: userData, UserId: userData }, refreshToken);
      }
    }, [intV]);
    return clearInterval(interval);
  }, [userData, refreshToken]);

  useEffect(() => {
    if (notifyMessage?.isSuccess === true) {
      var response = { ...notifyMessage };
      delete response.isSuccess;
      response = {
        ...response,
        onClose: () => dispatch(setNotifyMessage(null)),
      };
      notification.success(response);
      navigate("/home");
    } else if (notifyMessage?.isSuccess === false && notifyMessage?.message) {
      var response = { ...notifyMessage };
      delete response.isSuccess;
      response = {
        ...response,
        onClose: () => dispatch(setNotifyMessage(null)),
      };
      notification.error(response);
    }
  }, [navigate, dispatch, notifyMessage]);

  return (
    <div className="Home">
      <Header />
      <Space className="SideandDisplay">
        <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
        <PageContent selectedMenuItem={selectedMenuItem} />
      </Space>
      <Footer />
    </div>
  );
}

export default Home;
