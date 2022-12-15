import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export default store;

// console.log(
//   configureStore({
//     reducer: {
//       users: userSlice,
//     },
//   }).getState()
// );
  