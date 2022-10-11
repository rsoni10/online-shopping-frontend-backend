import React from 'react';
import {BrowserRouter ,useRoutes} from 'react-router-dom';
import Navbar from './component/Navbar';
import Cart from './component/Cart';
import Home from './component/Home';
import PageNotFound from './component/PageNotFound';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Dashboard from './component/admin/Dashboard';
import Summary from './component/admin/Summary';
import Orders from './component/admin/Orders';
import Products from './component/admin/Products';
import Users from './component/admin/Users';
import { ToastContainer } from 'react-toastify';
// import OrderList from './component/admin/list/OrderList';
import ProductList from './component/admin/list/ProductList';
// import UserList from './component/admin/list/UserList';
import CreateProduct from './component/admin/CreateProduct';
import EditProduct from './component/admin/EditProduct';
import UserProfile from './component/Details/UserProfile';
import Order from './component/Details/Order';
import Product from './component/Details/Product';
import CheckoutSuccess from './component/CheckoutSuccess';



function App() {

  const MyRoutes = ()=>{
    const rut = useRoutes([
     {path:"/" ,element:<Home/>} ,
     {path:"/cart" ,element:<Cart/>} ,
     {path:"/register" ,element:<Register/>} ,
     {path:"/login" ,element:<Login/>} ,
     {path:"/user/:id" ,element:<UserProfile/>} ,
     {path:"/order/:id" ,element:<Order/>} ,
     {path:"/product/:id" ,element:<Product/>} ,
     {path:"/checkout-success" ,element:<CheckoutSuccess/>} ,
     {
      path:"admin" ,
      element:<Dashboard/>,
      children:[
        {path:"summary" ,element:<Summary/>} ,
        {path:"orders" ,element:<Orders/>} ,
        {
          path:"products" ,
          element:<Products/>,
          children:[
            { path:" " ,element:<ProductList/>},
            {path:"create-product" , element:<CreateProduct/>},
            {path:"edit-product" , element:<EditProduct/>},
          ]
        } ,
        {path:"users" ,element:<Users/>} ,
      ]
    } ,
     {path:"/*" ,element:<PageNotFound/>} ,
    ])
    return rut
  }
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ToastContainer> */}
          <Navbar />
          <MyRoutes/>
        {/* </ToastContainer> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
