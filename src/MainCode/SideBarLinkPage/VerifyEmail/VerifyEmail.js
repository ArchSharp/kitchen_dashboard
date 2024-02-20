import React, { useState, useEffect } from "react";
import "../../SignUpScreen/signup.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  VerifyEmail,
  ResendVerifyEmail,
  setNotifyMessage,
} from "../../../Features/kitchenSlice";
import { notification } from "antd";
import {
  selectKitchen,
  useAppSelector,
  useAppDispatch,
} from "../../../Store/store";

function Verifymail() {
  const dispatch = useAppDispatch();
  const { notifyMessage } = useAppSelector(selectKitchen);
  const [formData, setFormData] = useState({
    Email: "",
    EmailOTP: "",
  });

  const [resendEmail, setResendEmail] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showResend = queryParams.get("showResend") === "true";
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (notifyMessage?.isSuccess === true) {
      var response = { ...notifyMessage };
      delete response.isSuccess;
      response = {
        ...response,
        onClose: () => dispatch(setNotifyMessage(null)),
      };
      notification.success(response);
      navigate("/signIn");
    } else if (notifyMessage?.isSuccess === false && notifyMessage?.message) {
      response = { ...notifyMessage };
      delete response.isSuccess;
      response = {
        ...response,
        onClose: () => dispatch(setNotifyMessage(null)),
      };
      if (notifyMessage?.message === "Expired OTP") {
        setResendEmail(formData.Email);
      }
      notification.error(response);
    }
  }, [navigate, dispatch, notifyMessage, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Email: formData.Email,
      EmailOTP: formData.EmailOTP,
    };

    dispatch(VerifyEmail(payload));
  };

  const handleResendEmail = async () => {
    dispatch(ResendVerifyEmail(formData.Email));
  };

  return (
    <div className="glass-morphism">
      <div className="fixed-header">
        <h1 className="title" onClick={() => window.location.reload()}>
          QuicKee
        </h1>
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
            {showResend ? "Resend Verify Email" : "Verify your Kitchen Email"}
          </h2>

          {showResend ? (
            <form onSubmit={handleResendEmail}>
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
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Resend Email
                </button>
              </div>
            </form>
          ) : (
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
              {showResend ? null : (
                <div className="input-group">
                  <label
                    htmlFor="EmailOTP"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    OTP
                  </label>
                  <input
                    type="number"
                    id="EmailOTP"
                    name="EmailOTP"
                    placeholder="Enter your OTP"
                    value={formData.EmailOTP}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <div className="button-container">
                <button type="submit" className="submit-button">
                  {showResend ? "Resend Email" : "Verify"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verifymail;
