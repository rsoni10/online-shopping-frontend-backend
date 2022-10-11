import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createAsyncProduct } from "../../features/ProductSlice";
import { PrimaryButton } from "./CommonStyled";

const CreateProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productImage, setProdcutImage] = useState()
  const [data ,setData] = useState({
           name:"",
          brand:"",
           desc:"",
          price:"",
  })


  const handleImageChange = (e) =>{
   const file = e.target.files[0];
   const reader = new FileReader()
    if(file){
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setProdcutImage(reader.result)

      }
    }
    else{
      setProdcutImage("")
    }
   
  }

  const handleChange = (e)=>{
    e.preventDefault();
    dispatch(createAsyncProduct({
      name:data.name,
      brand:data.brand,
       desc:data.desc,
      price:data.price,
      image:productImage,
    }
      
    ))
    navigate('/admin/products');
   
  }
  // console.log("user data",data)
  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleChange}>
        <h3>Create a Product</h3>
        <input
          id="imgUpload"
          accept="image/*"
          type="file"
          required
          onChange={handleImageChange}
        />
        <select required onChange={(e)=>setData({...data , brand:e.target.value})}>
          <option value="">Select Brand</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiomi">Xiomi</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>setData({...data , name:e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e)=>setData({...data , price:e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e)=>setData({...data , desc:e.target.value})}
          required
        />

        <PrimaryButton type="submit">
           "Submitting" : "Submit"
        </PrimaryButton>
      </StyledForm>
      <ImagePreview>
        
          <>
            <img src="{productImg}" alt="error!" />
          </>
       
          <p>Product image upload preview will appear here!</p>
        
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

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

const StyledCreateProduct = styled.div`
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