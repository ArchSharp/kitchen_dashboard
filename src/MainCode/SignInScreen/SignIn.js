import React, { useState, useEffect } from "react";
import "../SignUpScreen/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Signin, setNotifyMessage } from "../../Features/kitchenSlice";
import { notification } from "antd";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../Store/store";

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notifyMessage, userData } = useAppSelector(selectKitchen);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  useEffect(() => {
    if (userData) {
      navigate("/home");
    }
  }, [userData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (window.location.pathname === "/signIn") {
      if (notifyMessage?.isSuccess === true) {
        var response = { ...notifyMessage };
        delete response.isSuccess;
        response = { ...response };
        notification.success(response);
        dispatch(setNotifyMessage(null));
        if (
          response?.message !== "Email Verified Success" ||
          response?.message !== "Password Updated"
        ) {
          navigate("/home");
        }
      } else if (notifyMessage?.isSuccess === false && notifyMessage?.message) {
        response = { ...notifyMessage };
        delete response.isSuccess;
        response = { ...response };
        notification.error(response);
        dispatch(setNotifyMessage(null));
        if (response?.message === "Unverified email") {
          navigate(`/verifyEmail?showResend=true&email=${formData.Email}`);
        }
      }
    }
  }, [navigate, dispatch, notifyMessage, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Email: formData.Email,
      Password: formData.Password,
    };
    dispatch(Signin(payload));
  };

  const handleGoToSignUp = () => {
    navigate("/");
  };

  return (
    <div className="glass-morphism">
      <div className="fixed-header">
        <h1 className="title" onClick={() => window.location.reload()}>
          QuicKee
        </h1>
        <button onClick={handleGoToSignUp} className="sign-in-button">
          SignUp
        </button>
      </div>
      <div className="rectangle">
        <div>
          <h2
            style={{
              textAlign: "center",
              marginTop: "0%",
              fontFamily: "sans-serif",
            }}
          >
            Login To Your Account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="Email" style={{ fontFamily: "sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Enter your email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="Password" style={{ fontFamily: "sans-serif" }}>
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Enter your password"
                value={formData.Password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ marginLeft: "7%", fontFamily: "sans-serif" }}>
              <p>
                Forgot Password? <Link to="/forgotPassword">Click here</Link>
              </p>
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
