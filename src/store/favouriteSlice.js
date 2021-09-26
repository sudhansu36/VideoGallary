import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
const reducerPending = (state) => {
  return (state = {
    ...state,
    isLoading: true,
    isSuccess: false,
    invalidMessage: "",
  });
};
const reducerRejected = (state, action) => {
  return (state = {
    ...state,
    isError: true,
    isLoading: false,
    invalidMessage: action.payload.message,
  });
};
export const getFavourite = createAsyncThunk(
  "getFavourite",
  async (userMail, thunkAPI) => {
    let { email } = userMail;
    let axiosReqWithToken = getAxiosWithTokenObj();
    let data;
    let response = await axiosReqWithToken.get(
      `/favourite/getfavourite/${email}`
    );
    data = response.data;
    if (data.message === "success") {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const addToFavorite = createAsyncThunk(
  "addToFavorite",
  async (content, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response = await axiosReqWithToken.post(
      "/favourite/addtofavorite",
      content
    );
    let data = response.data;
    // make post
    if (data.message === "success") {
      return data;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const deleteFromFavourite = createAsyncThunk(
  "deleteFromFavorite",
  async (content, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response = await axiosReqWithToken.put(
      "/favourite/deletefavorite",
      content
    );
    let data = response.data;
    if (data.message === "success") {
      return data;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
const favouriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favourite: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  },
  reducers: {
    clearFavouriteState: (state) => {
      state.isSuccess = false;
      state.favourite = [];
      return state;
    },
  },
  extraReducers: {
    [addToFavorite.fulfilled]: (state, action) => {
      state.favourite.push(action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addToFavorite.pending]: reducerPending,
    [addToFavorite.rejected]: reducerRejected,
    [getFavourite.fulfilled]: (state, action) => {
      state.favourite = action.payload.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [getFavourite.pending]: reducerPending,
    [getFavourite.rejected]: reducerRejected,
    [deleteFromFavourite.fulfilled]: (state, action) => {
      state.favourite.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [deleteFromFavourite.pending]: reducerPending,
    [deleteFromFavourite.rejected]: reducerRejected,
  },
});
export const { clearFavouriteState } = favouriteSlice.actions;
export default favouriteSlice.reducer;
