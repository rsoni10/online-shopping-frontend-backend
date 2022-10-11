import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url ,setHader} from "./Api";
 const initialState={
    productList:[],
    status:"",
 }
 export const createAsyncProduct = createAsyncThunk(
    "product/createAsyncProduct",
    async ( values ,{rejectWithValue}) =>{
        console.log(values)
        try{
            
            const response = await axios.post(`${url}/products`, values ,setHader())
            console.log(response.data,"createAsyncProduct response data")
            return response.data
        }
        catch(err){
         console.log(err.response.data)
         return rejectWithValue(err.response.data);
        }
    }

 )

 export const fetchAsyncProducts = createAsyncThunk(
    "product/fetchAsyncProducts",
    async(values=null,{rejectWithValue})=>{
        try{
            const response = await axios.get(`${url}/products`);
            // console.log("fetchAsyncProducts fetchAsyncProducts", response.data)
            return response.data
        }
        catch(err){
            return rejectWithValue(err.response.data)
        }
    }
 )

 export const delteAsyncProduct = createAsyncThunk(
    "product/delteAsyncProduct",
    async(id,{rejectWithValue})=>{
        console.log("id",id)
        try{
            const response = await axios.delete(`${url}/products/${id}`,setHader());
            console.log("delteAsyncProduct delteAsyncProduct", response.data)
            return response.data
        }
        catch(err){
            return rejectWithValue(err.response.data)
        }
    }
 )
 export const UpdateAsyncProduct = createAsyncThunk(
    "product/UpdateAsyncProduct",
    async(values,{rejectWithValue})=>{
        console.log("valuesvaluesvalues",values)
        try{
            const response = await axios.put(`${url}/products/${values.product._id}`,values ,setHader());
            console.log("UpdateAsyncProduct UpdateAsyncProduct", response.data)
            return response.data
        }
        catch(err){
            return rejectWithValue(err.response.data)
        }
    }
 )

 const ProductSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:{
        [createAsyncProduct.pending]:(state,{payload})=>{
              state.status="pending"
        },
        [createAsyncProduct.fulfilled]:(state,{payload})=>{
            state.status="fulfilled"
            state.productList.push(payload)
        },
        [createAsyncProduct.rejected]:(state,{payload})=>{
            state.status="rejected"
        },


        [fetchAsyncProducts.pending]:(state,{payload})=>{
              state.status="pending"
        },
        [fetchAsyncProducts.fulfilled]:(state,{payload})=>{
            state.status="fulfilled"
            state.productList= payload
        },
        [fetchAsyncProducts.rejected]:(state,{payload})=>{
            state.status="rejected"
        },


        [delteAsyncProduct.pending]:(state,{payload})=>{
              state.status="pending"
        },
        [delteAsyncProduct.fulfilled]:(state,{payload})=>{
            state.status="fulfilled"
            const newProductList = state.productList.filter((item)=> item._id !== payload._id)
            // console.log(newProductList,"newProductList")
            state.productList= newProductList
        },
        [delteAsyncProduct.rejected]:(state,{payload})=>{
            state.status="rejected"
        },


        [UpdateAsyncProduct.pending]:(state,{payload})=>{
              state.status="pending"
        },
        [UpdateAsyncProduct.fulfilled]:(state,{payload})=>{
            console.log(payload,"payloadpayload")
            state.status="fulfilled"
            const updatedProductList = state.productList.map((item)=> item._id === payload._id ? payload :item)
            console.log(updatedProductList,"updatedProductList")
            state.productList= updatedProductList
        },
        [UpdateAsyncProduct.rejected]:(state,{payload})=>{
            state.status="rejected"
        },
    }
 })


 export default ProductSlice.reducer