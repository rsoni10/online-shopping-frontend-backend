
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { setHader, url } from '../../features/Api';

function Order() {
  const param = useParams();
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState({})
  // console.log("order detail param",param);
  useEffect(()=>{
    async function getOrderById(){
      try{
        const response = await axios.get(`${url}/orders/findOne/${param.id}`,setHader())
        // console.log("getOrderById order response",response.data)
        setOrderDetail(response.data)

      }
      catch(err){
          console.log("getOrderById order Error", err)
      }
    }
    getOrderById()
  },[param.id])


  console.log(orderDetail,"orderDetail")
  return ( <StylesProduct>
    {/* <p>Loading...</p> */}
      <>
      <div>
      <h2>Order Detail</h2>
      <p>
        Delivery status :
        { orderDetail && orderDetail.delivery_status==="pending"?
        <Pending>Pending</Pending>
        :
        orderDetail && orderDetail.delivery_status==="dispatched"?
        <Dispatched>Dispatched</Dispatched>
        :orderDetail && orderDetail.delivery_status==="delivered"?
        <Delivered>Delivered</Delivered>
        : "error"
        }
      </p>
      <h3>Ordered Products</h3>
      {/* <div>
            <Item> 
             <span>{product.description}</span>
             <span>{product.quantity}</span>
             <span>
              {"$" + (product.amount_total / 100).toLocaleString()}
             </span>
            </Item>
        
      </div> */}
      <div>
        <h3>Total Price</h3>
        <p>"$" + (order.total / 100).toLocaleString()</p>
      </div>
      <div>
        <h3>Shipping Price</h3>
        <p>Customer:order.shipping?.name</p>
        <p>City:order.</p>
        <p>Email:order.shipping</p>
      </div>
      
     
      </div>
      </>
    
      </StylesProduct>
  )
}

export default Order

const StylesProduct = styled.div`
margin:3rem 11rem;
display: flex;
  justify-content: center;
 `
 const ProductContainer = styled.div`
 max-width:500px;
 width:100%;
 height:auto;
 display: flex;
 box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
 border-radius:5px;
 padding:2rem;
 `
 const Items = styled.div`
 `
 const Item = styled.div`
 `
 const ImageContainer = styled.div`
 flex:1;
 img{
  width:100%;
 }
 
 `
 const Pending = styled.div`
 color:rgb(253,181,40);
 background:rgb(253,181,40 , 0.12);
 padding:3px 5px;
 border-radius:3px;
 font-size:14px;
 `
 const Dispatched = styled.div`
 color:rgb(38,198,249);
 background:rgb(38,198,249 , 0.12);
 padding:3px 5px;
 border-radius:3px;
 font-size:14px;
 `

 const Delivered = styled.div`
 color:rgb(102,108,255);
 background:rgb(102,108,255 , 0.12);
 padding:3px 5px;
 border-radius:3px;
 font-size:14px;
 `
 const ProductDetails = styled.div`
 flex:2;
 margin-left:2rem;
    h3{
      font-size:35px;
    }
    p span{
      font-weight:bold;
    }
 `
 const Price = styled.div`
 margin:1rem 0;
 font-weight:bold;
 font-size:25px;
 `