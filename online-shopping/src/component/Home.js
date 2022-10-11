import { useSelect } from '@mui/base';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/CartSlice';
import { fetchAsyncProducts } from '../features/ProductSlice';

function Home() {
 const dispatch = useDispatch();
 const navigate = useNavigate()
  const {productList,status} = useSelector((state)=> state.productsData);


  useEffect(()=>{
    dispatch(fetchAsyncProducts())
  },[dispatch])

  const  handleCart = (product)=>{
      dispatch(addToCart(product))
      navigate('/cart')
  }
  // console.log("productsData", productList)
    return (
        <div className="home-container">
         {status==="fulfilled"?
            <>
              <h2>New Arrivals</h2>
              <div className="products">
                {productList.map((product)=>{
                  return(
                    <div  className="product" key={product._id}>
                    <h3>{product.name}</h3>
                    <img src={product.image.url} alt={product.name} />
                    <div className="details">
                      <span>{product.desc}</span>
                      <span className="price">${product.price}</span>
                    </div>
                    <button onClick={()=>handleCart(product)}>
                      Add To Cart
                    </button>
                  </div>
              
                  )
                })}
              </div>
            </>
        
            : status==="pending"?
              <p>Loading...</p>
           : status==="rejected"?
           <p>Unexpected error occured...</p>
           :""
           
          }
            
          
           
   
        </div>
      );
}

export default Home