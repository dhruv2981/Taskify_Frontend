import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./features/projectSlice";
// import projectSlice from './features/projectSlice';

export const store = configureStore({
  reducer: {
    projects:projectSlice,
  },
});
