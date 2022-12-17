import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.js";
import timerSlice from "./slices/timerSlice.js";

export const store = configureStore({
  reducer: {
    users: userSlice,
    timer: timerSlice,
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
  