import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
export const addToWatchList = createAsyncThunk(
  "addToWatchList",
  async (content, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response = await axiosReqWithToken.post(
      "/watchlist/addtowatchlist",
      content
    );
    let data = response.data;
    // make post
    if (data.message === "success") {
      return data.payload;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const getWatchList = createAsyncThunk(
  "getWatchList",
  async (userMail, thunkAPI) => {
    let { email } = userMail;
    console.log("email:s:",email);
    let axiosReqWithToken = getAxiosWithTokenObj();
    let data;
    let response = await axiosReqWithToken.get(`/watchlist/getlist/${email}`);
    console.log(response);
    data = response.data;
    if (data.message === "success") {
      console.log(data.payload);
      return data.payload;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
const watchlistSlice = createSlice({
  name: "user",
  initialState: {
    watchList: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  },
  reducers: {
    clearWatchListState: (state) => {
      state.isSuccess = false;
      state.watchList = [];
      return state;
    },
  },
  extraReducers: {
    [addToWatchList.fulfilled]: (state, action) => {
      state.watchList.push(action.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addToWatchList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addToWatchList.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
    [getWatchList.fulfilled]: (state, action) => {
      state.watchList = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [getWatchList.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getWatchList.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
  },
});
export const { clearWatchListState } = watchlistSlice.actions;
export default watchlistSlice.reducer;
