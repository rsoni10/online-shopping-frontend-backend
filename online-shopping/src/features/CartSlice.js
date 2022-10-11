import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
const initialState ={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
}

const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state , {payload})=>{
        const itemIndex = state.cartItems.findIndex((item)=>item._id === payload._id)
        if(itemIndex >= 0){
           state.cartItems[itemIndex].cartTotalQuantity += 1
        }else{
            const newItem = { ...payload , cartTotalQuantity :1 }
            state.cartItems.push(newItem)
        }
        //    cartItems.
           localStorage.setItem("cartItems" , JSON.stringify(state.cartItems));
        //    console.log("cartItems cartItems",payload)
        },
        clearCart:(state,{payload})=>{
            state.cartItems= []
            localStorage.setItem("cartItems" , JSON.stringify(state.cartItems))
        },
        removeCartItem:(state ,{payload})=>{
            const newList = state.cartItems.filter((item)=>item._id!== payload._id)
            state.cartItems= newList;
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))


        },
        decreaseCartItem:(state ,{payload})=>{
           const findIndex = state.cartItems.findIndex((item)=>item._id === payload._id)

           if(state.cartItems[findIndex].cartTotalQuantity > 1){
            state.cartItems[findIndex].cartTotalQuantity -= 1
           }
           else if(state.cartItems[findIndex].cartTotalQuantity === 1){
            state.cartItems[findIndex].cartTotalQuantity = 0
            const newList = state.cartItems.filter((item)=>item._id !== payload._id )
            state.cartItems = newList
        }
        localStorage.setItem("cartItems" , JSON.stringify(state.cartItems))
       },
       cartPrice:(state, {payload})=>{
       const {quantity,price} = state.cartItems.reduce((cartTotal,item) =>
         {
           cartTotal.quantity += item.cartTotalQuantity
           var calculatePrice =  item.cartTotalQuantity * item.price ;
           cartTotal.price += calculatePrice

           return cartTotal
            }
            ,{
            quantity:0,
            price:0
           }
        )

        state.cartTotalAmount= price
        state.cartTotalQuantity = quantity

       }
    },

    extraReducers:{},
   
})
 export const {addToCart,clearCart,decreaseCartItem,removeCartItem,cartPrice} = CartSlice.actions
export default CartSlice.reducer;

