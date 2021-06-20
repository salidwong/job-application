import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
  editIndex: -1,
  isCheckedAll: false,
};

export const applicationFormSlice = createSlice({
  name: "applicationForms",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setApplicationForms: (state, action) => {
      const { payload } = action;
      const { applicationForms } = payload;

      state.forms = applicationForms;

      localStorage.setItem(
        "applicationForms",
        JSON.stringify(applicationForms)
      );
    },
    setIsChecked: (state, action) => {
      const { payload } = action;
      const { index, applicationForms } = payload;
      const updatedApplicationInfoByIndex = {
        ...applicationForms[index],
        isChecked: !applicationForms[index].isChecked,
      };

      state.forms[index] = updatedApplicationInfoByIndex;
    },
    setEditIndex: (state, action) => {
      const { payload } = action;
      const { index } = payload;

      state.editIndex = index;
    },
    updateFieldByIndex: (state, action) => {
      const { payload } = action;
      const { value, name, index, applicationForms } = payload;
      const updatedApplicationInfoByIndex = {
        ...applicationForms[index],
        [name]: value,
      };

      state.forms[index] = updatedApplicationInfoByIndex;

      const updatedApplicationForms = [...applicationForms];
      updatedApplicationForms[index] = updatedApplicationInfoByIndex;
      localStorage.setItem(
        "applicationForms",
        JSON.stringify(updatedApplicationForms)
      );
    },
    deleteApplicationInfo: (state, action) => {
      const { payload } = action;
      const { index, applicationForms } = payload;
      const filterApplicationForms = applicationForms.filter(
        (f, i) => i !== index
      );

      state.forms = filterApplicationForms;

      localStorage.setItem(
        "applicationForms",
        JSON.stringify(filterApplicationForms)
      );
    },
    setIsCheckedAll: (state, action) => {
      const { payload } = action;
      const { rootApplicationForms } = payload;
      const { forms, isCheckedAll } = rootApplicationForms;
      const updatedApplicationForms = forms.map((f) => ({
        ...f,
        isChecked: !f.isChecked,
      }));

      state.isCheckedAll = !isCheckedAll;
      state.forms = updatedApplicationForms;
    },
    deleteMultiApplicationInfo: (state, action) => {
      const { payload } = action;
      const { applicationForms } = payload;
      const filterApplicationForms = applicationForms.filter(
        (f) => !f.isChecked
      );

      state.forms = filterApplicationForms;

      localStorage.setItem(
        "applicationForms",
        JSON.stringify(filterApplicationForms)
      );
    },
  },
});

export const {
  setApplicationForms,
  setIsChecked,
  setEditIndex,
  deleteApplicationInfo,
  setIsCheckedAll,
  deleteMultiApplicationInfo,
  updateFieldByIndex,
} = applicationFormSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectApplicationForms = (state) => state.applicationForms;
export const selectForms = (state) => state.applicationForms.forms;
export const selectEditIndex = (state) => state.applicationForms.editIndex;
export const selectIsCheckedAll = (state) =>
  state.applicationForms.isCheckedAll;

export default applicationFormSlice.reducer;
