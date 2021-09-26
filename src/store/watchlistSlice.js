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
      return data;
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
    let axiosReqWithToken = getAxiosWithTokenObj();
    let data;
    let response = await axiosReqWithToken.get(`/watchlist/getlist/${email}`);
    data = response.data;
    if (data.message === "success") {
      return data;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const deleteFromWatchList = createAsyncThunk(
  "deleteFromWatchList",
  async (content, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response = await axiosReqWithToken.put(
      "/watchlist/deletewatchlist",
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
const watchlistSlice = createSlice({
  name: "watchlist",
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
      state.watchList.push(action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addToWatchList.pending]: reducerPending,
    [addToWatchList.rejected]: reducerRejected,
    [getWatchList.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        watchList: action.payload.payload,
        isSuccess: true,
        isLoading: false,
        invalidMessage: "",
        isError: false,
      });
    },
    [getWatchList.pending]: reducerPending,
    [getWatchList.rejected]: reducerRejected,
    [deleteFromWatchList.fulfilled]: (state, action) => {
      state.watchList.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [deleteFromWatchList.pending]: reducerPending,
    [deleteFromWatchList.rejected]: reducerRejected,
  },
});
export const { clearWatchListState } = watchlistSlice.actions;
export default watchlistSlice.reducer;
