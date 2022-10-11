import React, { useEffect } from 'react'
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncOrderData, orderEditUpdate } from '../../../features/OrderSlice';
import { useSelect } from '@mui/base';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';


function OrderList() {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const {orderList} = useSelector((state)=>state.ordersData)
//  console.log("order data" ,orderList)


 useEffect(()=>{
  dispatch(fetchAsyncOrderData())
 },[])

  const rows = orderList && orderList.map((order)=>{
    return {
            id:     order._id,
            cName:  order.shipping.name,
            amount: (order.total/100)?.toLocaleString() ,
            dstatus: order.delivery_status,
            date:    moment(order.createdAt).fromNow()
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cName', headerName: 'shipping Name', width: 130 },
    { field: 'amount', headerName: 'amount', width: 130},
    { field: 'dstatus', headerName: 'delivery status', width: 200,
        renderCell:(params)=>{
        return(
          // console.log(params)
            <div>
              {params.row.dstatus === "pending"?
              <Pending>Pending</Pending>
              :params.row.dstatus === "dispatched"?
              <Dispatched>Dispatched</Dispatched>
              :params.row.dstatus === "delivered"?
              <Delivered>Delivered</Delivered>
              :"error"
              }
             
            </div>
        )
        }
    },
    { field: 'date', headerName: 'date', width: 130},
    {
      field: 'action',
      headerName: 'action',
      sort: false,
      width: 220,
      renderCell:(params)=>{
        return(
            <Actions>
            <DispatchBtn onClick={()=>handleDispatch(params.row.id)}>Dispatch</DispatchBtn>
            <DeliveryBtn onClick={()=>handleDeliver(params.row.id)}>Deliver</DeliveryBtn>
            <View onClick={()=>navigate(`/order/${params.row.id}`)}>View</View>
            </Actions>
        )
      }
    },
  ];
 const handleDispatch = (id)=>{
  dispatch(orderEditUpdate({
    id:id,
    delivery_status:"dispatched"
  }))
 }
 const handleDeliver = (id)=>{
  dispatch(orderEditUpdate({
    id:id,
    delivery_status:"delivered"
  }))
 }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default OrderList;

 const Actions = styled.div`
 width:100%;
 display: flex;
  justify-content: space-between;
 button{
    border:none;
    outline:none;
    padding:3px 5px;
    color:#fff;
    border-radius:3px;
    cursor:pointer;
 }
 `

 const DeliveryBtn = styled.button`
 background-color: rgb(102,108,255);
 `
 const View = styled.button`
 background-color: rgb(114,255,40);
 `
 const DispatchBtn = styled.button`
 background-color: rgb(38,198,249);
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

