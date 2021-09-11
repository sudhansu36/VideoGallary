import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const userLogin = createAsyncThunk(
  "loginUser",
  async (userCredentialObj, thunkAPI) => {
    // make post
    let data;
    if (userCredentialObj.type === false) {
      let response = await axios.post("/users/login", userCredentialObj);
      data = response.data;
    }
    if (userCredentialObj.type === true) {
      let response = await axios.post("/admin/login", userCredentialObj);
      data = response.data;
    }
    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("usertype", userCredentialObj.type);
      localStorage.setItem("userObj", JSON.stringify(data.user));
      return data.user;
    }
    if (
      data.message === "Invalid Password" ||
      data.message === "Invalid Username"
    ) {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: {},
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLoginMessage: "",
  },
  reducers: {
    clearLoginState: (state) => {
      state.isSuccess = false;
      state.userObj = {};
      return state;
    },
    reLogin: (state, action) => {
      state.isSuccess = true;
      state.userObj = action.payload;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userLogin.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
  },
});
export const { clearLoginState, reLogin } = userSlice.actions;
export default userSlice.reducer;
