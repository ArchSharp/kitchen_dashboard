import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../Store/store";
import { clearErrors, setError } from "../Features/errorSlice";
import { axios } from "../Features/utils";

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    auth: null,
    isLoading: false,
    userData: null,
    refreshToken: null,
    notifyMessage: { isSuccess: false, message: "", description: "" },
  },
  reducers: {
    setAuth: (state, actions) => {
      state.auth += actions.payload;
    },
    setRefreshToken: (state, actions) => {
      state.refreshToken += actions.payload;
    },
    setLoading: (state, actions) => {
      state.isLoading += actions.payload;
    },
    setUserData: (state, actions) => {
      state.userData += actions.payload;
    },
    setNotifyMessage: (state, actions) => {
      state.notifyMessage += actions.payload;
    },
  },
});

export const {
  setAuth,
  setLoading,
  setUserData,
  setNotifyMessage,
  setRefreshToken,
} = kitchenSlice.actions;
export default kitchenSlice.reducer;

const BASE_PATH = "/Kitchen";

export const Signin = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const data = response.data;
        console.log("login response: ", data);
        if (data.code === 200) {
          setUserData(data.body);
          setAuth(data.extrainfo);
          setRefreshToken(data?.extrainfo?.refreshtoken);
          setNotifyMessage({
            isSuccess: true,
            message: "Login Successful",
            description:
              "Welcome back to QuicKee, your kitchen trusted companion. Were delighted to see you again. Thank you for choosing QuicKee, where your culinary journey begins!",
          });
        } else {
          if (data.message === "Incorrect Password") {
            setNotifyMessage({
              isSuccess: false,
              message: "Incorrect Credential",
              description:
                "Incorrect Email or password. Check your login details again",
            });
          } else if (data.message === "User not found") {
            setNotifyMessage({
              isSuccess: false,
              message: "User not found",
              description:
                "This User is not found. Check your login credentials again",
            });
          } else if (response.message === "Unverified email") {
            setNotifyMessage({
              isSuccess: false,
              message: "Unverified Email",
              description: "This User is not yet verified",
            });
          }
        }
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }
    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const SignUp = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const ValidateBank = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const GetBank = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const ResendVerifyEmail = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const VerifyEmail = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const GetReviews = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const DeleteStaff = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const AddStaff = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const UploadImage = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const GetKitchenOrders = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const SendNotification = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const UpdateMenu = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const CreateMenu = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const ResetPasswords = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const GetNewToken = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const NotifyEveryone = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const GetStaff = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const DeleteMenu = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const Forgotpassword = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};

export const GetKitchenMenus = (data) => {
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const path = BASE_PATH + "/SignIn";
      const response = await axios.post(path, data);
      if (response) {
        const responseData = response.data;
        console.log("login response: ", responseData);
        // Handle response data as needed
      }
    } catch (error) {
      console.log("login error response: ", error);
      dispatch(setError(error?.message));
    }

    dispatch(setLoading(false));
  };

  // Call handleSignIn when needed
  return handleSignIn();
};
