import { combineReducers } from "@reduxjs/toolkit";
import kitchenReducer from "../Features/kitchenSlice";
import errorReducer from "../Features/errorSlice";

const rootReducer = combineReducers({
  kitchen: kitchenReducer,
  error: errorReducer,
  // Add other reducers here if you have them
});

export default rootReducer;
