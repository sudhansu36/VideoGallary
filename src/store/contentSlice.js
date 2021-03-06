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
export const getContent = createAsyncThunk(
  "getContent",
  async (_, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    // make post
    let data;
    let response = await axiosReqWithToken.get("/content/getcontent");
    data = response.data;
    if (data.message === "Collection data") {
      return data;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const addContent = createAsyncThunk(
  "addContent",
  async (formData, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response = await axiosReqWithToken.post(
      "/content/addcontent",
      formData
    );
    let data = response.data;
    if (data.message === "New Content Created") {
      alert(data.message);
      return data;
    } else {
      alert(data.message);
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const deleteContent = createAsyncThunk(
  "deleteContent",
  async (mnameObj, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let { mname } = mnameObj;
    let response = await axiosReqWithToken.delete(
      `/content/deletecontent/${mname}`
    );
    let data = response.data;
    if (data.message === "deleted") {
      alert("Content Deleted");
      return data;
    } else {
      // it will provide data to rejected state
      return thunkAPI.rejectWithValue(data);
    }
  }
);
export const editContent = createAsyncThunk(
  "editContent",
  async ({ formData, index }, thunkAPI) => {
    let axiosReqWithToken = getAxiosWithTokenObj();
    let response = await axiosReqWithToken.put(
      "/content/editcontent",
      formData
    );
    let data = response.data;
    if (data.message === "updated") {
      alert(data.message);
      return thunkAPI.fulfillWithValue({ payload: data.payload, index });
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
      state.contentCollection = action.payload.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [getContent.pending]: reducerPending,
    [getContent.rejected]: reducerRejected,
    [deleteContent.fulfilled]: (state, action) => {
      state.contentCollection.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [deleteContent.pending]: reducerPending,
    [deleteContent.rejected]: reducerRejected,
    [addContent.fulfilled]: (state, action) => {
      state.contentCollection.push(action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addContent.pending]: reducerPending,
    [addContent.rejected]: reducerRejected,
    [editContent.fulfilled]: (state, action) => {
      state.contentCollection.splice(
        action.payload.index,
        1,
        action.payload.payload
      );
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [editContent.pending]: reducerPending,
    [editContent.rejected]: reducerRejected,
  },
});
export const { clearContentState } = contentSlice.actions;
export default contentSlice.reducer;
