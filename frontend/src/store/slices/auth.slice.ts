import { createSlice } from "@reduxjs/toolkit";
interface State {
  token: string | null;
  login: "fetch" | "failed" | "success";
  error: string;
}
const initialState: State = {
  token: localStorage.getItem("token"),
  login: "fetch",
  error: "",
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFetch: (state, action) => {
      state.login = "fetch";
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    },
    loginSuccess: (state, action) => {
      if (!action.payload.jwt) return;
      state.token = action.payload.jwt;
      localStorage.setItem("token", action.payload.jwt);
      state.login = "success";
      console.log(localStorage.getItem("token"));
    },
    logoutSuccess: (state) => {
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});
export const { loginSuccess, logoutSuccess, loginFetch, loginFailed } =
  AuthSlice.actions;
export default AuthSlice.reducer;
