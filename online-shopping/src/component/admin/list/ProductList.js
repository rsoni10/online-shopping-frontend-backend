import React, { useEffect } from 'react'
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import {useDispatch, useSelector} from 'react-redux';
import {delteAsyncProduct, fetchAsyncProducts} from '../../../features/ProductSlice'
import EditProduct from '../EditProduct';
import { useNavigate } from 'react-router-dom';
function ProductList() {
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const {productList} = useSelector((state)=>state.productsData);
  console.log(productList,"productList")

   useEffect(() => {
    dispatch(fetchAsyncProducts())
   }, [dispatch])
   
   const handleDelete = (id)=>{
    dispatch(delteAsyncProduct(id))
  }


   const rows = productList && productList.map((product)=>{
    return {
            id: product._id,
            imgUrl:product.image.secure_url,
            pName:  product.name,
            pDesc: product.desc,
            price:"$" + product.price,
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {field:'imgUrl' , headerName:'Image' , width:60,
    renderCell:(params)=>{
      return(
        // console.log("params",params)
        <ImageContainer>
          <img src={params.row.imgUrl} alt="image" />
        </ImageContainer>
      )
    }},
    {field:'pName' , headerName:'Product Name' , width:150},
    {field:'pDesc' , headerName:'Product Desc' , width:250},
    {field:'price' , headerName:'Price' , width:100},
    {field:'action' , headerName:'Action' , width:150 ,
    renderCell:(params)=>{
     return(
      <Actions>
        <Delete onClick={()=>handleDelete(params.row.id)}>Delete</Delete>
        <EditProduct productId={params.row.id}>Edit</EditProduct>
        <View onClick={()=>navigate(`/product/${params.row.id}`)}>View</View>
      </Actions>
     )
    }
    },
    
  ];

 


  return (
    <div style={{ height: 400, width: '100%' }}>
      table Here
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

export default ProductList;
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