import React, { useState, useEffect } from "react";
import "../SignUpScreen/signup.css";
import { useNavigate } from "react-router-dom";
import { Forgotpassword, setNotifyMessage } from "../../Features/kitchenSlice";
import { notification } from "antd";
import {
  useAppDispatch,
  useAppSelector,
  selectKitchen,
} from "../../Store/store";

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notifyMessage } = useAppSelector(selectKitchen);

  const [formData, setFormData] = useState({
    Email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (window.location.pathname.includes("/forgotpassword")) {
      if (notifyMessage?.isSuccess === true) {
        var response = { ...notifyMessage };
        delete response.isSuccess;
        response = { ...response };
        notification.success(response);
        dispatch(setNotifyMessage(null));
        navigate(`/resetPassword/${formData.Email}`);
      } else if (notifyMessage?.isSuccess === false && notifyMessage?.message) {
        response = { ...notifyMessage };
        delete response.isSuccess;
        response = { ...response };
        notification.error(response);
        dispatch(setNotifyMessage(null));
      }
    }
  }, [navigate, dispatch, notifyMessage, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Email: formData.Email,
    };
    dispatch(Forgotpassword(payload));
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
            Forgot Password
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
            <div className="button-container">
              <button type="submit" className="submit-button">
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
