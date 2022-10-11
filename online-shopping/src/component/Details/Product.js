
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'
import { setHader, url } from '../../features/Api'

function Product() {
const param = useParams()
console.log("param",param);
const [product,setProduct] = useState()

useEffect(()=>{
  async function preFillData(id){
    try{
      const response = await axios.get(`${url}/products/find/${id}` , setHader())
      console.log(response.data,"response.data")
      setProduct(response.data)
    }
    catch(err){
      console.log(err,"catch err");
      return err
     
    }
  }
  preFillData(param.id);
},[])
console.log("productssssss",product)
  return ( <StylesProduct>
      <ProductContainer>
        {!product ?
        
        <p>Loading...</p>
        :
      <>
      
      <ImageContainer>
        <img src={product&& product.image.secure_url} alt="image" />
      </ImageContainer>
      <ProductDetails>
        <h3>{product&& product.name}</h3>
        <p><span>Brand:</span>{product&& product.bran}</p>
        <p><span>description:</span>{product&& product.des}</p>
        <Price>${product&& product.price}</Price>
        <button className='product-add-to-cart' >Add to Cart</button>
      </ProductDetails>
      
      </>
       }
      </ProductContainer>
      </StylesProduct>
  )
}

export default Product

const StylesProduct = styled.div`
margin:3rem;
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
 const ImageContainer = styled.div`
 flex:1;
 img{
  width:100%;
 }
 
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