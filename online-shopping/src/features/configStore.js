import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice';
import CartReducer from './CartSlice';
import ProductReducer from './ProductSlice';
import UserReducer from './UserSlice';
import OrderReducer from './OrderSlice';
const store = configureStore({
    reducer:{
      authData:AuthReducer,
      cartData:CartReducer,
      productsData:ProductReducer,
      usersData:UserReducer,
      ordersData:OrderReducer,
    }
})


export default store;