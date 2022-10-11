import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { addToCart, cartPrice, clearCart, decreaseCartItem, removeCartItem } from '../features/CartSlice';
import PayButton from './PayButton';

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartItems } = useSelector((state)=>state.cartData)
  const {cartTotalAmount } = useSelector((state)=>state.cartData);
  const AuthData = useSelector((state)=> state.authData);
  //  console.log("cartTotalAmount",cartTotalAmount)

  const handleClearCart = () =>{
    dispatch(clearCart())
  }
  const  handleCart = (product)=>{
    dispatch(addToCart(product))  
  }
  const  handleRemove = (item)=>{
    dispatch(removeCartItem(item))  
  }
  const  handleDecrease = (item)=>{
    dispatch(decreaseCartItem(item))  
  }
  
  useEffect(()=>{
    dispatch(cartPrice())
  },[dispatch,handleDecrease,handleRemove,handleCart,handleClearCart]
  )
  console.log("cartItemscartItems",cartItems)
    return (
        <div className="cart-container">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ?
            <div className="cart-empty">
              <p>Your cart is currently empty</p>
              <div className="start-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
            :cartItems.length >= 1?
            <>
              <div className="titles">
                <h3 className="product-title">Product</h3>
                <h3 className="price">Price</h3>
                <h3 className="quantity">Quantity</h3>
                <h3 className="total">Total</h3>
              </div>
              <div className="cart-items">
                {cartItems&& cartItems.map((cartItem)=>{
                  
                  return(
                    <div className="cart-item" key={cartItem._id} >
                    <div className="cart-product">
                      <img src={cartItem && cartItem.image.url} alt={cartItem && cartItem.name} />
                      <div>
                        <h3>{cartItem && cartItem.name}</h3>
                        <p>{cartItem && cartItem.desc}</p>
                        <button onClick={()=>handleRemove(cartItem)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">$ {cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={()=>handleDecrease(cartItem)}> - </button>
                      <div className="count">{cartItem.cartTotalQuantity}</div>
                      <button onClick={()=>handleCart(cartItem)}>+</button>
                    </div>
                    <div className="cart-product-total-price">
                      $ {cartItem.price * cartItem.cartTotalQuantity}
                    </div>
                  </div>
                  )
                })}
                
              </div>
              {cartItems.length >= 1?
              <div className="cart-summary">
                <button className="clear-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span className="amount">${cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  {AuthData._id ?
                  <PayButton cartItem={cartItems} />
                  :
                  <button className="cart-login" 
                  onClick={()=>navigate("/login")}>Login to Check out</button>
                }
                  <div className="continue-shopping">
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                      </svg>
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
              :''}
            </>
            :
            ''
         }
        </div>
      );
}

export default Cart