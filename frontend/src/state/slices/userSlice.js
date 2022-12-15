import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetUsers = createAsyncThunk(
  "users/fetchGetUsers",
  async () => {
    const { data } = await axios.get("/api/v1");
    return data;
  }
);


const getNormalalized = (data) => {
  const entities = data.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});

  const ids = data.map((item) => item._id);
  return { entities, ids };
};


const usersAdapter = createEntityAdapter();

export const userSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({ error: false }),
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetUsers.fulfilled, (state, { payload }) => {
        const filterUsers = payload.filter(({ participates }) => participates);
        const { entities, ids } = getNormalalized(filterUsers);
        state.ids = ids;
        state.entities = entities;
      })
      .addCase(fetchGetUsers.rejected, (state, action) => {});
  },
});


export const usersSelectors = usersAdapter.getSelectors((state) => state.users);

export default userSlice.reducer;
