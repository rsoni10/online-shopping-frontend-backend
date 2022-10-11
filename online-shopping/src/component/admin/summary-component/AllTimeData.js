import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchAsyncOrderData } from '../../../features/OrderSlice';
import { fetchAsyncProducts } from '../../../features/ProductSlice';
import { getAsyncUsersList } from '../../../features/UserSlice';

function AllTimeData() {

  const dispatch = useDispatch();
  const {orderList} = useSelector((state)=>state.ordersData)
  const {productList} = useSelector((state)=>state.productsData)
  const {usersList} = useSelector((state)=>state.usersData)

  // console.log("orderList",orderList)
  // console.log("productList",productList)
  // console.log("usersList",usersList)

  useEffect(()=>{
    dispatch(fetchAsyncOrderData())
    dispatch(fetchAsyncProducts())
    dispatch(getAsyncUsersList())
  },[])


    const totalEarning = orderList.reduce((total,item)=> total += item.total , 0)
  
  return (
    <Main>
        <h3>AllTimeData</h3>
        <Info>
            <Title>Users</Title>
            <Data>{usersList.length}</Data>
        </Info>
        <Info>
            <Title>Products</Title>
            <Data>{productList.length}</Data>
        </Info>
        <Info>
            <Title>Orders</Title>
            <Data>{orderList.length}</Data>
        </Info>
        <Info>
            <Title>Earning</Title>
            <Data>{totalEarning}</Data>
        </Info>
    </Main>
  )
}

export default AllTimeData

const Main = styled.div`
background: rgb(48,51,78);
  color:#fff;
  padding: 1rem;
  margin-top:1.5rem;
  border-radius: 10px;
  font-size:14px
`
const Info = styled.div`
display: flex;
margin-top:1rem;
padding:0.3rem;
border-radius:3px;
background: rgb(38,198,249,0.12);

&:nth-child(even){
    background: rgb(102,108,255,0.12);
}
`
const Title = styled.div`
flex:1
`

const Data = styled.div`
flex:1;
font-weight:700;
`