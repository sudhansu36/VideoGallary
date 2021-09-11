import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getAxiosWithTokenObj from "../AuthorizedRequest/AxiosReqWithToken";
export const getContent = createAsyncThunk(
  "getContent",
  async (_, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    // make post
    let data;
    let response = await axiosReqWithToken.get("/content/getcontent");
    data = response.data;
    if (data.message === "Collection data") {
      return data.payload;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
const contentSlice = createSlice({
  name: "contentCollection",
  initialState: {
    contentCollection: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidMessage: "",
  },
  reducers: {
    clearContentState: (state) => {
      state.isSuccess = false;
      state.contentCollection = [];
      return state;
    },
  },
  extraReducers: {
    [getContent.fulfilled]: (state, action) => {
      state.contentCollection = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [getContent.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getContent.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
  },
});
export const { clearContentState } = contentSlice.actions;
export default contentSlice.reducer;
