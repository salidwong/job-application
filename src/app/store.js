import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import applicationInfoReducer from "../features/Application/applicationInfoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    applicationInfo: applicationInfoReducer,
  },
});
