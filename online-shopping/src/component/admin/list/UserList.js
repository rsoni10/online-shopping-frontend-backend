import React, { useEffect } from 'react'
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, productsDelete } from '../../../features/ProductSlice';
import { useNavigate } from 'react-router';
import EditProduct from '../EditProduct';
import { deleteUser, getAsyncUsersList } from '../../../features/UserSlice';


function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {usersList} = useSelector((state)=>state.usersData)
// console.log("userList = >", usersList)

  const rows = usersList && usersList.map((user)=>{
    return {
            id:    user._id,
            uName:user.name,
            uEmail: user.email ,
            isAdmin: user.isAdmin
    }
  })
  const columns = [
    {field:"id" , headerName:"ID",width:100},
    {field:"uName" , headerName:"User Name",width:100},
    {field:"uEmail" , headerName:"User Email",width:150},
    {field:"isAdmin" , headerName:"Role",width:100,
    renderCell:(params)=>{
      return(
        <div>
          {params.row.isAdmin?
          <Admin>Admin</Admin>:
          <Customer>customer</Customer>
          }
      </div>
      )
    }
    },
    {field:"action" , headerName:"Actions",width:150,
    renderCell:(params)=>{
      return(
        <Actions>
        <Delete onClick={()=>deleteHandle(params.row.id)}>Delete</Delete>
        &nbsp;&nbsp;
        <View onClick={()=>navigate(`/user/${params.row.id}`)}>View</View>
        </Actions>
      )
    }
    },
  ]
 const deleteHandle =(id) =>{
   console.log("deleted product id",id)
   dispatch(deleteUser(id))
 }
  useEffect(()=>{
    // alert("hi")
    dispatch(getAsyncUsersList())
  },[dispatch])
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <br/>
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

export default UserList;
 const ImageContainer = styled.div`
 img{
    height:40px;
 }
 `
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

 const Delete = styled.button`
 background-color: rgb(255,77,73);
 `
 const View = styled.button`
 background-color: rgb(114,255,40);
 `
 const Admin = styled.div`
 color:rgb(253,181,40);
 background:rgb(253,181,40 , 0.12);
 padding:3px 5px;
 border-radius:3px;
 font-size:14px;
 `
 const Customer = styled.div`
 color:rgb(38,198,249);
 background:rgb(38,198,249 , 0.12);
 padding:3px 5px;
 border-radius:3px;
 font-size:14px;
 `