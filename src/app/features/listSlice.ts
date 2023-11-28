import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createListApi,
  fetchListApi,
  fetchListsApi,
  updateListApi,
  deleteListApi,
} from "../../Apis/ListApi";

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    loading: "idle",
    error: "Lists could not be retreived",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.lists = action.payload;
    });
    builder.addCase(fetchLists.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message!;
    });
  },
});

export const fetchLists = createAsyncThunk("list/fetchLists", async () => {
  try {
    const response = await fetchListsApi();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem fetching lists");
  }
});

export const fetchList = createAsyncThunk("list/fetchLists", async (listId) => {
  try {
    const response = await fetchListApi(listId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem fetching list");
  }
});

export const createList = createAsyncThunk("list/Lists", async (newList) => {
  try {
    const response = await createListApi(newList);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem creating lists");
  }
});

export const updateList = createAsyncThunk(
  "list/updateLists",
  async (listId, newList) => {
    try {
      const response = await updateListApi(listId, newList);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem updating lists");
    }
  }
);

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (listId, newList) => {
    try {
      await deleteListApi(listId);
      return listId;
    } catch (error) {
      console.log("Problem deleting lists");
    }
  }
);

//action

//reducer

//     .then(response=>{
//         setListList(response.data)})
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
export const selectLists = (state: any) => state.lists.lists;
export default listSlice.reducer;
