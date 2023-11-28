import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserApi,
  updateUserApi,
  deleteUserApi,
} from "../../Apis/UserApi";
