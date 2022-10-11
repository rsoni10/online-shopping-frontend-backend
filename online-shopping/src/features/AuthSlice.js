import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {url,setHader} from './Api';
import jwtDecoder from 'jwt-decode';
import { toast } from "react-toastify";

const initialState={
    token:localStorage.getItem("token"),
    name:"",
    email:"",
    _id:"",
    userLoded:false,
    loginStatus:null,
    loginError:null,
    isAdmin:"",
    registerStatus:null,
    registerError:null,
}


export const postAsyncRegisterUserData= createAsyncThunk(
    "auth/postAsyncRegisterUserData",
    async(values , {rejectWithValue})=>{
        try{
            const response = await axios.post(`${url}/register `, {
                name:values.name,
                email:values.email,
                password:values.password
            })
            
            localStorage.setItem("token" , response.data);
            return response.data
        }
        catch(err){
            console.log(err.response.data);
           return rejectWithValue(err.response.data)
        }
    }
)

export const postAsyncLoginUserData = createAsyncThunk(
    "auth/postAsyncLoginUserData",
    async(dataValues,{rejectWithValue})=>{
        // console.log(dataValues,"dataValues")
        try{
            const response = await axios.post(`${url}/login` ,{
                email:dataValues.email,
                password:dataValues.password
            })
            localStorage.setItem("token",response.data);
            return response.data
        }
        catch(error){
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
const  AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loadUser(state,{payload}){
            const token = state.token
            if(token){
                const data = jwtDecoder(token);
                return{
                    ...state,
                    token,
                    name:data.name,
                    email:data.email,
                    _id:data._id,
                    isAdmin:data.isAdmin,
                    userLoded:true,
                }
            }
        }
        ,
        logoutUser(state,{payload}){
            localStorage.removeItem("token")
            return{
                ...state,
                token:"",
                name:"",
                email:"",
                _id:"",
                userLoded:false,
                loginStatus:null,
                loginError:null,
                isAdmin:"",
                registerStatus:null,
                registerError:null,  
            }

        }
    },
    extraReducers:{
     [postAsyncRegisterUserData.pending]:(state,{payload})=>{
        return{...state ,registerStatus:"pending"}
     },
     [postAsyncRegisterUserData.fulfilled]:(state,{payload})=>{
        if(payload){
          const data = jwtDecoder(payload)
          return{
            ...state ,
            token:payload,
            name:data.name,
            email:data.email,
            _id:data._id,
            isAdmin:data.isAdmin,
            userLoded:false,
            registerStatus:"fulfilled",
        }
        
        }
        else{
            return{...state}
        }
        
     },
     [postAsyncRegisterUserData.rejected]:(state,{payload})=>{
        return{...state ,registerStatus:"rejected" ,registerError:payload}
     },


     [postAsyncLoginUserData.pending]:(state,{payload})=>{
        // console.log("pending payload", payload);
        return {...state , loginStatus:"pending"}

     },
     [postAsyncLoginUserData.fulfilled]:(state,{payload})=>{
        if(payload){
           const data = jwtDecoder(payload);
           toast.success('Login Successfully!');
           return{
            ...state,
            token:payload,
            name:data.name,
            email:data.email,
            _id:data._id,
            isAdmin:data.isAdmin,
            loginStatus:"success"
           }
        }
        else{
            return {...state }  
        }
     },
     [postAsyncLoginUserData.rejected]:(state,{payload})=>{
        return {...state , loginStatus:"rejected" ,loginError:payload}
     },


    }
})
export const {logoutUser ,loadUser} = AuthSlice.actions;
export default AuthSlice.reducer