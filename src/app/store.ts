import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./features/projectSlice";
import singleProjectSlice from "./features/singleProjectSlice";
import cardSlice from "./features/cardSlice";
import listSlice from "./features/listSlice";
import userSlice from "./features/userSlice";
import singleUserSlice from "./features/singleUserSlice";
// import projectSlice from './features/projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectSlice,
    singleProject: singleProjectSlice,
    cards: cardSlice,
    lists: listSlice,
    users: userSlice,
    singleUser:singleUserSlice,
  },
});
