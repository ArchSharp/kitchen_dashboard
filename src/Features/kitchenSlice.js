import { createSlice } from "@reduxjs/toolkit";
import store, { useAppDispatch } from "../Store/store";
import { clearErrors, setError } from "../Features/errorSlice";
import axiosWithAuth, { axios, axiosAuth } from "../Features/utils";

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    orders: null,
    isModalVisible: false,
    menus: null,
    reviews: null,
    auth: null,
    isLoading: false,
    userData: null,
    refreshToken: null,
    notifyMessage: { isSuccess: false, message: "", description: "" },
    staff: null,
  },
  reducers: {
    setOrders: (state, actions) => {
      state.orders = actions.payload;
    },
    setStaff: (state, actions) => {
      state.staff = actions.payload;
    },
    setIsModalVisible: (state, actions) => {
      state.isModalVisible = actions.payload;
    },
    setMenus: (state, actions) => {
      state.menus = actions.payload;
    },
    setReviews: (state, actions) => {
      state.reviews = actions.payload;
    },
    setAuth: (state, actions) => {
      state.auth = actions.payload;
    },
    setRefreshToken: (state, actions) => {
      state.refreshToken = actions.payload;
    },
    setLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    setUserData: (state, actions) => {
      state.userData = actions.payload;
    },
    setNotifyMessage: (state, actions) => {
      state.notifyMessage = actions.payload;
    },
    setLogout: (state) => {
      state.auth = null;
      state.isLoading = false;
      state.userData = null;
      state.refreshToken = null;
      state.notifyMessage = null;
    },
  },
});

export const {
  setLogout,
  setStaff,
  setReviews,
  setMenus,
  setAuth,
  setOrders,
  setIsModalVisible,
  setLoading,
  setUserData,
  setNotifyMessage,
  setRefreshToken,
} = kitchenSlice.actions;
export default kitchenSlice.reducer;

const BASE_PATH = "/Kitchen";

export const Signin = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/SignIn";
    const response = await axios.post(path, data);
    if (response) {
      const data = response.data;
      console.log("login response: ", data);
      if (data.code === 200) {
        dispatch(setUserData(data.body));
        dispatch(setAuth(data.extrainfo));
        dispatch(setRefreshToken(data?.extrainfo?.refreshtoken));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Login Successful",
            description:
              "Welcome back to QuicKee, your kitchen trusted companion. Were delighted to see you again. Thank you for choosing QuicKee, where your culinary journey begins!",
          })
        );
      } else {
        if (data.message === "Incorrect Password") {
          dispatch(
            setNotifyMessage({
              isSuccess: false,
              message: "Incorrect Credential",
              description:
                "Incorrect Email or password. Check your login details again",
            })
          );
        } else if (data.message === "User not found") {
          dispatch(
            setNotifyMessage({
              isSuccess: false,
              message: "User not found",
              description:
                "This User is not found. Check your login credentials again",
            })
          );
        } else if (response.message === "Unverified email") {
          dispatch(
            setNotifyMessage({
              isSuccess: false,
              message: "Unverified Email",
              description: "This User is not yet verified",
            })
          );
        }
      }
    }
  } catch (error) {
    console.log("login error response: ", error);
    dispatch(setError(error?.message));
  }
  dispatch(setLoading(false));
};

export const Logout = () => async (dispatch) => {
  dispatch(setLogout());
};

export const openModal = () => async (dispatch) => {
  dispatch(setIsModalVisible(true));
};

export const closeModal = () => async (dispatch) => {
  dispatch(setIsModalVisible(false));
};

export const SetMenus = (menus) => async (dispatch) => {
  dispatch(setMenus(menus));
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

export const GetBank = (data) => async (dispatch) => {
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

export const GetReviews = (kitchenId) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/GetReviewsByKitchenId?KitchenId=${kitchenId}`;
    const response = await axiosWithAuth.get(path);
    if (response) {
      const data = response.data;
      console.log("GetReviews response: ", data);
      if (data.code === 200) {
        dispatch(setReviews(data?.body));
      }
    }
  } catch (error) {
    console.log("GetReviews error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const AddStaff = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/AddStaff";
    const response = await axiosWithAuth.post(path, data);
    if (response) {
      const responseData = response.data;
      console.log("AddStaff response: ", responseData);
      if (data.code === 200) {
        dispatch(setStaff(data?.body));
      }
    }
  } catch (error) {
    console.log("AddStaff error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const GetKitchenOrders = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/GetKitchenOrders?Email=${email}`;
    const response = await axiosWithAuth.get(path);
    if (response) {
      const data = response.data;
      console.log("getorders response: ", data);
      // Handle response data as needed
      dispatch(setOrders(data?.body?.Orders));
    }
  } catch (error) {
    console.log("getorders error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const UpdateMenu = (menuId, kitchenId, payload) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/UpdateMenu?MenuId=${menuId}`;
    const response = await axiosWithAuth.put(path, payload);
    if (response) {
      const data = response.data;
      console.log("UpdateMenu response: ", data);
      if (data.code === 200) {
        dispatch(GetKitchenMenus(kitchenId));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Updated success",
            description: data?.message,
          })
        );
      }
    }
  } catch (error) {
    console.log("UpdateMenu error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const CreateMenu = (userData, payload) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    // console.log(payload);
    const path = BASE_PATH + "/CreateMenu";
    const response = await axiosWithAuth.post(path, payload);
    if (response) {
      const data = response.data;
      console.log("CreateMenu response: ", data);
      if (data.code === 200) {
        const isBasicStaff = userData.Role === "basic";
        const kitchenId = isBasicStaff ? userData.KitchenId : userData.Id;
        dispatch(GetKitchenMenus(kitchenId));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Creation success",
            description: data?.message,
          })
        );
      }
    }
  } catch (error) {
    console.log("CreateMenu error response: ", error);
    const errObject = error?.response?.data;
    if (errObject.code === 400) {
      dispatch(
        setNotifyMessage({
          isSuccess: true,
          message: "Creation error",
          description: errObject?.message,
        })
      );
    }
    dispatch(setError(error?.message));
  }
  dispatch(setLoading(false));
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

export const GetNewToken = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path =
      BASE_PATH +
      `/GetNewAccessToken?Email=${data?.KitchenEmail}&&UserId=${data.Id}`;
    const refresh = store.getState().kitchen.refreshToken;
    const response = await axiosAuth(refresh).get(path);
    if (response) {
      const data = response.data;
      console.log("GetNewToken response: ", data);
      // Handle response data as needed
      dispatch(
        setAuth({ accesstoken: data?.body?.AccessToken, refreshtoken: refresh })
      );
    }
  } catch (error) {
    console.log("GetNewToken error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const DeleteMenu = (menuId, kitchenId) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/DeleteMenu?MenuId=${menuId}`;
    const response = await axiosWithAuth.delete(path);
    if (response) {
      const data = response.data;
      console.log("DeleteMenu response: ", data);
      if (data.code === 200) {
        dispatch(GetKitchenMenus(kitchenId));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Delete success",
            description: data?.body,
          })
        );
      }
    }
  } catch (error) {
    console.log("DeleteMenu error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const GetKitchenMenus = (kitchenId) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/GetKitchenMenus?KitchenId=${kitchenId}`;
    const response = await axiosWithAuth.get(path);
    if (response) {
      const data = response.data;
      console.log("GetKitchenMenus response: ", data);
      if (data?.code === 200) {
        dispatch(setMenus(data?.body));
      }
    }
  } catch (error) {
    console.log("GetKitchenMenus error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};
