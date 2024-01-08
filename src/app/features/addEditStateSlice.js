import { createSlice } from "@reduxjs/toolkit";

const addEditStateSlice = createSlice({
  name: "addEdit",
  initialState: {
    addEditState: {
      editList: false,
      addList:false,
      editListId: "",
      editCard:false,
      editCardId:'',
      editProject:false,
      editProjectId:'',
    },
    loading: "idle",
    error: "Lists could not be retreived",
  },
  reducers: {
    updateAddEditState: (state, action) => {
      const { newAddEditState } = action.payload;
      state.addEditState = newAddEditState;
      console.log(state.addEditState,"stage 2");
    },
  },
});

export const selectAddEdit = (state) => state.addEdit.addEditState;
export const { updateAddEditState } = addEditStateSlice.actions;
export default addEditStateSlice.reducer;
