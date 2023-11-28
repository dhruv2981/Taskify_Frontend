import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./features/projectSlice";
import cardSlice from "./features/cardSlice";
import listSlice from "./features/listSlice";
import userSlice from "./features/userSlice";
// import projectSlice from './features/projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectSlice,
    cards: cardSlice,
    lists: listSlice,
    users: userSlice,
  },
});
