import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

interface IValidPassword {
  valid: string | null;
  confirmPasswordValidity: boolean | null;
}

const initialState = {
  signInCredentials: {},
  isValidPassword: {} as IValidPassword,
  isValidEmail: true,
  showPassword: false,
  isRequired: "",
  isAuthed: {} as any,
  loginError: "",
  loginSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    handleSignUp: (state, action) => {},
    handleSignIn: (state, action) => {},
    handleIsValidPassword: (state, action) => {},
    setIsValidPassword: (state, action) => {
      console.log("Desde", action.payload);
      return produce(state, (draft) => {
        console.log("Desde el slice", action.payload);
        draft.isValidPassword = action.payload;
      });
    },
    setIsValidEmail: (state, action) => {
      return produce(state, (draft) => {
        draft.isValidEmail = action.payload;
      });
    },
    setShowPassword: (state, action) => {
      return produce(state, (draft) => {
        draft.showPassword = action.payload;
      });
    },
    handleIsRequired: (state, action) => {},
    setIsRequired: (state, action) => {
      return produce(state, (draft) => {
        draft.isRequired = action.payload;
      });
    },
    setIsAuthed: (state, action) => {
      return produce(state, (draft) => {
        draft.isAuthed = action.payload;
      });
    },
    setLoginError: (state, action) => {
      return produce(state, (draft) => {
        draft.loginError = action.payload;
      });
    },
    setLoginSuccess: (state, action) => {
      console.log("Desde el slice", action.payload);
      return produce(state, (draft) => {
        draft.loginSuccess = action.payload;
      });
    }
  },
});

export const {
  handleSignUp,
  handleSignIn,
  handleIsValidPassword,
  setIsValidPassword,
  setIsValidEmail,
  setShowPassword,
  handleIsRequired,
  setIsRequired,
  setIsAuthed,
  setLoginError,
  setLoginSuccess,
} = authSlice.actions;

export default authSlice.reducer;
