import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import applicationInfoReducer from "../features/Application/applicationInfoSlice";
import applicationFormsReducer from "../features/Application/applicationFormSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    applicationInfo: applicationInfoReducer,
    applicationForms: applicationFormsReducer,
  },
});
