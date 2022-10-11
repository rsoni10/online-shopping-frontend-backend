import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postAsyncLoginUserData } from '../../features/AuthSlice';
import { StyledForm } from "../StyledForm";
const Login = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state)=>state.authData)
//  console.log(data,"data")
 const[userData,setUserData]= useState({
  email:"",
  password:""
 })
const handleSubmit = (e)=>{
e.preventDefault();
dispatch(postAsyncLoginUserData(userData))
.then(()=>{
  navigate("/");
})

}

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          onChange={(e)=>setUserData({...userData,email:e.target.value})}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e)=>setUserData({...userData,password:e.target.value})}
        />
        <button >
            {data.loginStatus==="pending"?"Submitting":"submit"}
        </button>
        {data.loginStatus==="pending"?
        <p>Loading...</p>:
        data.loginStatus==="success"?
        <p>{data.loginStatus}</p>:
        <p>{data.loginError}</p>
        }
      
        
      </StyledForm>
    </>
  );
};

export default Login;