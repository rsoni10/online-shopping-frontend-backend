import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { PrimaryButton } from './CommonStyled';
import { Dialog ,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setHader, url } from '../../features/Api';
import { UpdateAsyncProduct } from '../../features/ProductSlice';
import { useNavigate } from 'react-router-dom';

function EditProduct({productId}) {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [currentProduct , setCurrentProduct] = useState({});
  const[productDetails, setProductDetails] = useState({
    brand:"",
    name:"",
    price:"",
    desc:"",
    image:""
  })
  const [previewImage ,setPreviewImage] = useState();
  const[productImg, setProductImg] = useState()
  const dispatch = useDispatch()
  const {productList} = useSelector((state)=>state.productsData)
  // console.log(productList,"productList")

  const handleClose = () =>{
    setOpen(false)
  }

  const handleClickOpen = () =>{
    setOpen(true);

    const productDetail = productList.filter((item)=> item._id === productId )
    // console.log("single product data",productDetail[0]);
    setCurrentProduct(productDetail[0]);
    setProductDetails(productDetail[0]);
    setPreviewImage(productDetail[0].image.url);
    setProductImg("");
  }

  const handleImageChange = (e ) =>{
   const file = e.target.files[0]
   const reader = new FileReader();
   if(file){
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      setProductImg(reader.result)
      setPreviewImage(reader.result)
    }
   }
   else{
    setProductImg("");
   }
  }
  // console.log("productImg productImg",productImg)


  const handleSubmit = (e) =>{
   e.preventDefault();
   dispatch(UpdateAsyncProduct({
    productImg,
    product : {
      ...currentProduct,
    brand:productDetails.brand,
    name:productDetails.name,
    price:productDetails.price,
    desc:productDetails.desc,
    
    }
    
   }))
   setOpen(false)
   navigate('/admin/products')
  }


  // console.log("productDetails=>",productDetails)
    return (
        <div>
           <Edit variant="outlined" onClick={handleClickOpen}>
            Edit
          </Edit>
          <Dialog open={open} onClose={handleClose} 
          fullWidth={true}
          maxWidth={"md"}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
              <StyledEditProduct>
                <StyledForm onSubmit={handleSubmit}>
                    <h3>Create a Product</h3>
                    <input
                    id="imgUpload"
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                    // required
                    />
                
                    <select 
                    // required 
                    onChange={(e)=>setProductDetails({...productDetails , brand:e.target.value})}
                     value={productDetails  && productDetails.brand}
                   
                     >
                    <option value="">Select Brand</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="xiomi">Xiomi</option>
                    <option value="other">Other</option>
                    </select>
                    <input
                    type="text"
                    placeholder="Name"
                    // required
                    onChange={(e)=>setProductDetails({...productDetails , name:e.target.value})}
                     value={productDetails && productDetails.name}
                   
                    />
                    <input
                    type="number"
                    placeholder="Price"
                    // required
                    onChange={(e)=>setProductDetails({...productDetails, price:e.target.value})}
                     value={productDetails && productDetails.price}
                   
                    />
                    <input
                    type="text"
                    placeholder="Short Description"
                    // required
                    onChange={(e)=>setProductDetails({...productDetails , desc:e.target.value})}
                     value={productDetails && productDetails.desc}
                   
                    />

                    <PrimaryButton type="submit">
                    "Editting" : "Edit"
                    </PrimaryButton>
                </StyledForm>
                <ImagePreview>
                   {previewImage  ?
                    <img src={previewImage} alt="img!" />
                    :
                    <p>Product image upload preview will appear here!</p>
                   }
                </ImagePreview>
              </StyledEditProduct> 
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog> 
        </div>
      );
}

export default EditProduct

const Edit = styled.button`
border:none;
outline:none;
padding:3px 5px;
color:#fff;
border-radius:3px;
cursor:pointer;
background-color: #4b70e2;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;




