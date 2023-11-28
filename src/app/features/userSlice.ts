import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserApi,
  fetchUserApi,
  fetchUsersApi,
  updateUserApi,
  deleteUserApi,
} from "../../Apis/UserApi";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: "idle",
    error: "Users could not be retreived",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error.message!;
    });
  },
});

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await fetchUsersApi();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem fetching users");
  }
});

export const fetchUser = createAsyncThunk("user/fetchUsers", async (userId) => {
  try {
    const response = await fetchUserApi(userId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem fetching user");
  }
});

export const createUser = createAsyncThunk("user/Users", async (newUser) => {
  try {
    const response = await createUserApi(newUser);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Problem creating users");
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUsers",
  async (userId, newUser) => {
    try {
      const response = await updateUserApi(userId, newUser);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("Problem updating users");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, newUser) => {
    try {
      await deleteUserApi(userId);
      return userId;
    } catch (error) {
      console.log("Problem deleting users");
    }
  }
);

//action

//reducer

//     .then(response=>{
//         setUserList(response.data)})
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
export const selectUsers = (state: any) => state.users.users;
export default userSlice.reducer;
