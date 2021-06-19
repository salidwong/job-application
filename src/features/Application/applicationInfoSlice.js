import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "empty",
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  nationality: "empty",
  citizenID: "",
  gender: "male",
  countryCode: "th",
  phoneNo: "",
  passportNo: "",
  salary: "",
};

export const applicationInfoSlice = createSlice({
  name: "applicationInfo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTitle: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.title = value;
    },
    setFirstName: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.firstName = value;
    },
    setLastName: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.lastName = value;
    },
    setDateOfBirth: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.dateOfBirth = value;
    },
    setNationality: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.nationality = value;
    },
    setCitizenID: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.citizenID = value;
    },
    setGender: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.gender = value;
    },
    setCountryCode: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.countryCode = value;
    },
    setPhoneNo: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.phoneNo = value;
    },
    setPassportNo: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.passportNo = value;
    },
    setSalary: (state, action) => {
      const { payload } = action;
      const { value } = payload;

      state.salary = value;
    },
  },
});

export const {
  setTitle,
  setFirstName,
  setLastName,
  setDateOfBirth,
  setNationality,
  setCitizenID,
  setGender,
  setCountryCode,
  setPhoneNo,
  setPassportNo,
  setSalary,
} = applicationInfoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTitle = (state) => state.applicationInfo.title;
export const selectFirstName = (state) => state.applicationInfo.firstName;
export const selectLastName = (state) => state.applicationInfo.lastName;
export const selectDateOfBirth = (state) => state.applicationInfo.dateOfBirth;
export const selectNationality = (state) => state.applicationInfo.nationality;
export const selectCitizenID = (state) => state.applicationInfo.citizenID;
export const selectGender = (state) => state.applicationInfo.gender;
export const selectCountryCode = (state) => state.applicationInfo.countryCode;
export const selectPhoneNo = (state) => state.applicationInfo.phoneNo;
export const selectPassportNo = (state) => state.applicationInfo.passportNo;
export const selectSalary = (state) => state.applicationInfo.salary;

export default applicationInfoSlice.reducer;
