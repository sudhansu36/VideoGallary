import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { decrypt, encrypt } from "../AuthorizedRequest/EncriptionDecription";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
// Login Thunk
export const userLogin = createAsyncThunk(
  "loginUser",
  async (userCredentialObj, thunkAPI) => {
    let data;
    // encrypt userCredential
    let encryptedUser = encrypt(userCredentialObj);
    // for User
    if (userCredentialObj.type === false) {
      let response = await axios.post("/users/login", {
        userCredential: encryptedUser,
      });
      data = response.data;
    }
    // for Admin
    if (userCredentialObj.type === true) {
      let response = await axios.post("/admin/login", {
        adminCredential: encryptedUser,
      });
      data = response.data;
    }
    // After Successful response
    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      let encrypedUserObj = encrypt(data.user);
      localStorage.setItem("userObj", encrypedUserObj);
      return data;
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
// Edit Pic Thunk
export const editProfilePicture = createAsyncThunk(
  "Edit Pic",
  async ({ formData, isAdmin }, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response;
    // for User
    if (isAdmin === false) {
      response = await axiosReqWithToken.put("/users/editprofilepic", formData);
    }
    // for Admin
    if (isAdmin === true) {
      response = await axiosReqWithToken.put("/admin/editprofilepic", formData);
    }
    let data = response.data;
    if (data.message === "updated") {
      localStorage.setItem("userObj", data.payload);
      let decrypedUser = decrypt(data.payload);
      return decrypedUser;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
// edit profile thunk
export const editUserProfile = createAsyncThunk(
  "editUserProfile",
  async (user, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response;
    let encryptedUser = encrypt(user);
    // for Admin
    if (user.isAdmin === true) {
      response = await axiosReqWithToken.put("/admin/edituserprofile", {
        encryptedUser: encryptedUser,
      });
    }
    // for User
    if (user.isAdmin === false) {
      response = await axiosReqWithToken.put("/users/edituserprofile", {
        encryptedUser: encryptedUser,
      });
    }
    let data = response.data;
    if (data.message === "updated") {
      localStorage.setItem("userObj", data.payload);
      let decrypedUser = decrypt(data.payload);
      alert("User Updated");
      return decrypedUser;
    } else {
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
      state = Object.assign(state, {
        userObj: action.payload.user,
        isSuccess: true,
        isLoading: false,
        invalidLoginMessage: "",
        isError: false,
      });
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
    [editProfilePicture.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [editProfilePicture.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [editProfilePicture.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload;
    },
    [editUserProfile.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [editUserProfile.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [editUserProfile.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
  },
});
export const { clearLoginState, reLogin } = userSlice.actions;
export default userSlice.reducer;
