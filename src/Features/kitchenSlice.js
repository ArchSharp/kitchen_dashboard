import { createSlice } from "@reduxjs/toolkit";
import { clearErrors, setError } from "../Features/errorSlice";
import axiosWithAuth, { axios, axiosAuth } from "../Features/utils";

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    image: null,
    banks: null,
    orders: null,
    isBankVerified: null,
    isModalVisible: false,
    menus: null,
    reviews: null,
    auth: null,
    isLoading: false,
    userData: null,
    refreshToken: null,
    notifyMessage: { isSuccess: false, message: "", description: "" },
    staff: null,
    allStaffs: null,
    isVerifyingBank: false,
    bankAccount: null,
    totalOrders: null,
    totalCustomers: null,
    totalRevenue: null,
  },
  reducers: {
    setTotalRevenue: (state, actions) => {
      state.totalRevenue = actions.payload;
    },
    setTotalCustomers: (state, actions) => {
      state.totalCustomers = actions.payload;
    },
    setTotalOrders: (state, actions) => {
      state.totalOrders = actions.payload;
    },
    setImage: (state, actions) => {
      state.image = actions.payload;
    },
    setIsBankVerified: (state, actions) => {
      state.isBankVerified = actions.payload;
    },
    setBanks: (state, actions) => {
      state.banks = actions.payload;
    },
    setBankAccount: (state, actions) => {
      state.bankAccount = actions.payload;
    },
    setIsVerifyingBank: (state, actions) => {
      state.isVerifyingBank = actions.payload;
    },
    setOrders: (state, actions) => {
      state.orders = actions.payload;
    },
    setAllStaffs: (state, actions) => {
      state.allStaffs = actions.payload;
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
    setLogout: (state, actions) => {
      state.auth = null;
      state.isLoading = false;
      state.userData = null;
      state.refreshToken = null;
      state.notifyMessage = null;
      state.menus = null;
      state.orders = null;
      state.allStaffs = null;
      state.banks = null;
      state.isVerifyingBank = false;
      state.bankAccount = null;
      state.isBankVerified = false;
      state.image = null;
      state.staff = null;
      state.image = null;
      state.totalCustomers = null;
      state.totalOrders = null;
      state.totalRevenue = null;
      localStorage.removeItem("accesstoken");
    },
  },
});

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
        localStorage.setItem("accesstoken", data?.extrainfo?.accesstoken);
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
        } else if (data.message === "Unverified email") {
          dispatch(
            setNotifyMessage({
              isSuccess: false,
              message: "Unverified email",
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

export const SignUp = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/Create";
    const response = await axios.post(path, data);
    if (response) {
      const data = response.data;
      console.log("SignUp response: ", data);
      if (data.code === 200) {
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Sign Up Successful",
            description: "Please check your email for the confirmation code.",
          })
        );
      }
    }
  } catch (error) {
    console.log("SignUp error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const ValidateBank = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());
  dispatch(setIsVerifyingBank(true));
  try {
    const payload = {
      AccountNumber: data.AccountNumber,
      BankCode: data.BankCode,
      ShouldProceed: data.ShouldProceed,
    };

    const path = BASE_PATH + `/ValidateKitchenBank?Email=${data.KitchenEmail}`;
    const response = await axios.post(path, payload);
    if (response) {
      const data = response.data;
      console.log("ValidateBank response: ", data);
      if (data?.status === true) {
        dispatch(setBankAccount(data?.data));
      } else if (data?.code === 200) {
        dispatch(setIsBankVerified(true));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Bank Account verified",
            description: "Your bank account has been verified successfully.",
          })
        );
      }
    }
  } catch (error) {
    console.log("ValidateBank error response: ", error);
    const err = error?.response?.data;
    if (
      err?.message ===
        "Could not verify account, kindly check if your account number is correct" ||
      err?.message === "Kitchen already exist"
    ) {
      dispatch(
        setNotifyMessage({
          isSuccess: false,
          message: "Bank Verification failed",
          description: err?.message,
        })
      );
    }
    dispatch(setError(error?.message));
  }
  dispatch(setIsVerifyingBank(false));
  dispatch(setLoading(false));
};

export const GetBank = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/GetBanks";
    const response = await axios.get(path);
    if (response) {
      const data = response.data;
      console.log("GetBank response: ", data);
      if (data.status === true) {
        dispatch(setBanks(data?.data));
      }
    }
  } catch (error) {
    console.log("GetBank error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const ResendVerifyEmail = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/ResendVerifyEmail?Email=${email}`;
    const response = await axios.get(path);
    if (response) {
      const data = response.data;
      console.log("ResendVerifyEmail response: ", data);
      if (data.code === 200) {
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Email Resent",
            description:
              "Email verification link has been resent. Check your email.",
          })
        );
      }
    }
  } catch (error) {
    console.log("ResendVerifyEmail error response: ", error);
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: "Resend Email Failed",
        description: "An error occurred while resending the email.",
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const VerifyEmail = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/VerifyEmail";
    const response = await axios.put(path, payload);
    if (response) {
      const data = response.data;
      console.log("VerifyEmail response: ", data);
      if (data.code === 200) {
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Email Verified Success",
            description:
              "Welcome to QuicKee, become more efficient, Please signin",
          })
        );
      }
    }
  } catch (error) {
    console.log("VerifyEmail error response: ", error);
    const err = error?.response?.data;
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: err?.message,
        description: err?.message,
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const DeleteStaff = (staffEmail, KitchenEmail) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = `${BASE_PATH}/DeleteStaff?Email=${staffEmail}`;
    const response = await axiosWithAuth.delete(path);
    if (response) {
      const data = response.data;
      console.log("DeleteStaff response: ", data);
      if (data.code === 200) {
        dispatch(GetAllStaffs(KitchenEmail));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Deleted staff",
            description: data?.body,
          })
        );
      }
    }
  } catch (error) {
    console.log("DeleteStaff error response: ", error);
    const err = error?.response?.data;
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: "Error Adding staff",
        description: err?.message,
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const AddStaff = (data, KitchenEmail) => async (dispatch) => {
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
        dispatch(GetAllStaffs(KitchenEmail));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Added staff",
            description: "New staff has been added",
          })
        );
      }
    }
  } catch (error) {
    console.log("AddStaff error response: ", error);
    const err = error?.response?.data;
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: "Error Adding staff",
        description: err?.message,
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const UploadImage = (payload) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/Upload?KitchenId=${payload.get("KitchenId")}`;
    const response = await axios.post(path, payload);
    if (response) {
      const data = response.data;
      console.log("UploadImage response: ", data);
      if (data.code === 200) {
        const user = getState()?.kitchen?.userData;
        dispatch(
          setUserData({ ...user, KitchenImage: data?.extrainfo?.ImageUrl })
        );
        dispatch(setImage(data?.extrainfo?.ImageUrl));
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Image uploaded",
            description: "Image has been uploaded",
          })
        );
      }
    }
  } catch (error) {
    console.log("UploadImage error response: ", error);
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: "Upload error",
        description: "Image could not be uploaded",
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const SendNotification = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/SendNotification";
    const response = await axiosWithAuth.post(path, payload);
    if (response) {
      const data = response.data;
      console.log("SendNotification response: ", data);
      if (data.code === 200) {
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Sent notification",
            description: "Notification sent successfully",
          })
        );
      }
    }
  } catch (error) {
    console.log("SendNotification error response: ", error);
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: "Sent notification failed",
        description: "Notification was not sent",
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const ResetPasswords = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/ResetPassword";
    const response = await axios.put(path, data);
    if (response) {
      const data = response.data;
      console.log("ResetPasswords response: ", data);
      if (data.code === 200) {
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Password Updated",
            description: "Your password has been changed successfully.",
          })
        );
      }
    }
  } catch (error) {
    console.log("ResetPasswords error response: ", error);
    const err = error?.response?.data;
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: err?.message,
        description: err?.message,
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const Forgotpassword = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/ForgotPassword?Email=${data.Email}`;
    const response = await axios.post(path, data);
    if (response) {
      const data = response.data;
      console.log("Forgotpassword response: ", data);
      if (data.code === 200) {
        dispatch(
          setNotifyMessage({
            isSuccess: true,
            message: "Email Sent",
            description: "Email OTP has been resent. Check your email.",
          })
        );
      }
    }
  } catch (error) {
    console.log("Forgotpassword error response: ", error);
    const err = error?.response?.data;
    dispatch(
      setNotifyMessage({
        isSuccess: false,
        message: err?.message,
        description: err?.message,
      })
    );
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const GetNewToken = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const refresh = getState().kitchen.refreshToken;
    const user = getState().kitchen.userData;
    const path =
      BASE_PATH +
      `/GetNewAccessToken?Email=${user?.KitchenEmail}&&UserId=${user?.Id}`;
    const response = await axiosAuth(refresh).get(path);
    if (response) {
      const data = response.data;
      console.log("GetNewToken response: ", data);
      localStorage.setItem("accesstoken", data?.body?.AccessToken);
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

export const NotifyEveryone = (payload) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + "/NotifiyAllUsers";
    const response = await axiosWithAuth.post(path, payload);
    if (response) {
      const data = response.data;
      console.log("NotifyEveryone response: ", data);
      // Handle response data as needed
    }
  } catch (error) {
    console.log("NotifyEveryone error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
};

export const GetAllStaffs = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearErrors());

  try {
    const path = BASE_PATH + `/GetKitchenStaff?Email=${email}`;
    const response = await axiosWithAuth.get(path);
    if (response) {
      const data = response.data;
      console.log("GetAllStaffs response: ", data);
      if (data.code === 200) {
        dispatch(setAllStaffs(data?.body));
      }
    }
  } catch (error) {
    console.log("GetAllStaffs error response: ", error);
    dispatch(setError(error?.message));
  }

  dispatch(setLoading(false));
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

export const {
  setLogout,
  setImage,
  setStaff,
  setReviews,
  setMenus,
  setAuth,
  setBankAccount,
  setOrders,
  setIsBankVerified,
  setIsModalVisible,
  setIsVerifyingBank,
  setLoading,
  setUserData,
  setNotifyMessage,
  setRefreshToken,
  setBanks,
  setAllStaffs,
  setTotalOrders,
  setTotalCustomers,
  setTotalRevenue,
} = kitchenSlice.actions;
export default kitchenSlice.reducer;
