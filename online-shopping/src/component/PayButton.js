import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { url } from '../features/Api'

function PayButton({cartItem}) {
 
    const authData = useSelector((state)=>state.authData)
    // console.log("authDataauthData",authData)

const handleClick = ()=>{
    axios.post(`${url}/stripe/create-checkout-session`,{
        cartItem,
        userId:authData._id
    }).then((res)=>{
        if(res.data.url){
            window.location.href= res.data.url
        }
    }).catch((err)=>console.log(err.message))
}

  return (
    <div>
        <button onClick={handleClick}>Check out</button>
    </div>
  )
}

export default PayButton