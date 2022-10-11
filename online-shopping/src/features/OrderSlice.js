import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHader, url } from "./Api";

const initialState={
    orderList:[],
    status:"",
    err:""
}

export const fetchAsyncOrderData = createAsyncThunk(
    "orders/fetchAsyncOrderData",
    async(values=null,{rejectWithValue})=>{
     try{
         const response = await axios.get(`${url}/orders`, setHader())
        //  console.log("order response", response.data)
         return response.data
     }catch(Error){
        // console.log(Error.response.data)
        return rejectWithValue(Error.response.data)
     }
    }
)

export const orderEditUpdate = createAsyncThunk(
    "orders/orderEditUpdate",
    async(values , {getState})=>{
     console.log("orderEditUpdate values",values)
     const state = getState();
     console.log("orderEditUpdate state",state)
     const currentOrder = state.ordersData.orderList.filter(
        (item)=> item._id === values.id
     )
     console.log("orderEditUpdate currentOrder",currentOrder)
     const newOrder = {
        ...currentOrder[0],
        delivery_status:values.delivery_status
     }
     console.log("orderEditUpdate newOrder",newOrder)
    
     try{
      const response = await axios.put(`${url}/orders/${values.id}`, newOrder, setHader())
      console.log("orderEditUpdate response data",response.data)
      return response.data
     }catch(err){
        console.log(err,"ërr")
        return err;
     }
 
    }
    
)

export const getOrderById= createAsyncThunk(
    "orders/getOrderById",
    async(id , {rejectWithValue})=>{
        try{
          const response = await axios.get(`${url}/findOne/${id}`,setHader())
          console.log("getOrderById order response",response)
        }
        catch(err){
            console.log("getOrderById order Error", err)
        }
    }
)
const OrderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:{
        [fetchAsyncOrderData.pending]:(state ,{payload})=>{
          state.status="pending"
        },
        [fetchAsyncOrderData.fulfilled]:(state ,{payload})=>{
            state.orderList= payload
            state.status="fulfilled"
        },
        [fetchAsyncOrderData.rejected]:(state ,{payload})=>{
            state.status="rejected"
        },

        
        [orderEditUpdate.pending]:(state ,{payload})=>{
          state.status="pending"
        },
        [orderEditUpdate.fulfilled]:(state ,{payload})=>{
            const updatedOrder = state.orderList.map(
                (item)=>item._id === payload._id ? payload:item
            )
            state.orderList = updatedOrder
            state.status="fulfilled"
        },
        [orderEditUpdate.rejected]:(state ,{payload})=>{
            state.status="rejected"
            state.err= payload
        },
    }
})

export default OrderSlice.reducer