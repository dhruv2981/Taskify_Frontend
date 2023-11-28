import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


const singleUserSlice = createSlice({
  name: "singleUser",
  initialState: {
    id:'',
    name: "",
    year: '',
    username: "",
    email: "",
    enrollment_no: "",
    role: "n",
    enabled: true,
    image: "",
  },
  reducers:{
    setUserData:(state,action)=>{
      state.id=action.payload.id
      state.name=action.payload.name;
       state.year = action.payload.year;
       state.username = action.payload.username;
       state.email = action.payload.email;
       state.enrollment_no = action.payload.enrollment_no;
       state.role = action.payload.role;
       state.enabled = action.payload.enabled;
       state.image = action.payload.image;
    }
  }
});

export const {setUserData}=singleUserSlice.actions;
export default singleUserSlice.reducer;
// In Redux Toolkit, createSlice automatically generates action
//  creators based on the names of the reducers you provide 
//  in the reducers object. In this case, the setUserData action
//   creator is generated based on the setUserData reducer.