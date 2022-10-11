import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { setHader, url } from "./Api";

const initialState = {
    usersList:[],
status:null,
error:null
}

export const getAsyncUsersList = createAsyncThunk(
    "users/getAsyncUsersList",
    async(values=null,{rejectWithValue})=>{
       try{
        const response = await axios.get(`${url}/users`, setHader());
        return response.data;
       }
       catch(err){
        return rejectWithValue(err.response.data)
       }
    }
)

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async(id , {rejectWithValue})=>{
        try{
            const response = await axios.delete(`${url}/users/${id}` ,setHader())
            console.log("delete Response :" , response.data)
            return response.data
          
        }
        catch(error){
            console.log("delete Error :" , error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
const UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:{
        [getAsyncUsersList.pending]:(state,{payload})=>{
          state.status="pending"
        },
        [getAsyncUsersList.fulfilled]:(state,{payload})=>{
           state.usersList = payload
           state.status="fulfilled"
        },
        [getAsyncUsersList.rejected]:(state,{payload})=>{
            state.status="rejected"
            state.error=payload
        },
        [deleteUser.pending]:(state,{payload})=>{
          state.status="pending"
        },
        [deleteUser.fulfilled]:(state,{payload})=>{
          const newUserList = state.usersList.filter( (item)=> item._id !== payload._id)
          state.usersList = newUserList
        },
        [deleteUser.rejected]:(state,{payload})=>{
            state.status="rejected"
            state.error=payload
        },
    }
})

export default UserSlice.reducer