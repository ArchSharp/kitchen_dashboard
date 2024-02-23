import React, { useState, useEffect } from "react";
import "../SignUpScreen/signup.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, notification } from "antd";
import { ResetPasswords, setNotifyMessage } from "../../Features/kitchenSlice";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../Store/store";

function ResetPassword() {
  const { notifyMessage } = useAppSelector(selectKitchen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { email } = useParams();
  const [formData, setFormData] = useState({
    Email: email,
    OTP: "",
    NewPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (window.location.pathname.includes("/resetPassword")) {
      if (notifyMessage?.isSuccess === true) {
        var response = { ...notifyMessage };
        delete response.isSuccess;
        response = { ...response };
        notification.success(response);
        dispatch(setNotifyMessage(null));
        navigate("/signIn");
      } else if (notifyMessage?.isSuccess === false && notifyMessage?.message) {
        response = { ...notifyMessage };
        delete response.isSuccess;
        response = { ...response };
        notification.error(response);
        dispatch(setNotifyMessage(null));
        if (notifyMessage?.message === "Expired OTP") {
          navigate("/forgotPassword");
        }
      }
    }
  }, [navigate, dispatch, notifyMessage, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Email: formData.Email,
      OTP: formData.OTP,
      NewPassword: formData.NewPassword,
    };
    dispatch(ResetPasswords(payload));
  };
  const handleSignInBack = () => {
    navigate("/signIn");
  };

  return (
    <div className="glass-morphism">
      <div className="fixed-header">
        <h1 className="title" onClick={() => window.location.reload()}>
          QuicKee
        </h1>
        <button onClick={handleSignInBack} className="sign-in-button">
          Back To SignIn
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
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="Email" style={{ fontFamily: "sans-serif" }}>
                Email
              </label>
              <input
                type="email"
                name="Email"
                placeholder="Enter your email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="OTP" style={{ fontFamily: "sans-serif" }}>
                OTP
              </label>
              <input
                type="text"
                name="OTP"
                placeholder="Enter OTP"
                value={formData.OTP}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="NewPassword" style={{ fontFamily: "sans-serif" }}>
                New Password
              </label>
              <input
                type="password"
                name="NewPassword"
                placeholder="Enter your new password"
                value={formData.NewPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="button-container">
              <Button onClick={handleSubmit}>Reset Password</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
