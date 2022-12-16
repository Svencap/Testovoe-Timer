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
    const { _id, name, password, participates, __v } = item;
    acc[item._id] = { id: _id, name, password, participates, __v};
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
    // joinUser: usersAdapter.updateOne
    joinUser: usersAdapter.addOne,
    leaveUser: usersAdapter.removeOne
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


export const { actions } = userSlice;
export const usersSelectors = usersAdapter.getSelectors((state) => state.users);

export default userSlice.reducer;
