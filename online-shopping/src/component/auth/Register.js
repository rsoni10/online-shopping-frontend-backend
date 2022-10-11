import React, { useState } from 'react';
import { StyledForm } from "../StyledForm";
import {useSelector,useDispatch} from 'react-redux';
import { postAsyncRegisterUserData } from '../../features/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const dispatch = useDispatch();
  const data = useSelector((state)=>state.authData);
  const navigate= useNavigate()
  const[userData,setUserData] = useState({
    name:"",
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    e.preventDefault();
    dispatch(postAsyncRegisterUserData(userData))
    .then(()=>{
      navigate("/")
    })


  }

  return (
    <>
      <StyledForm onSubmit={handleChange}>
      
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e)=>setUserData({...userData,name:e.target.value})}
        />
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
        <button>
         {data.registerStatus==="pending"?"Submitting":"submit"}
        </button>
        
        <p>{data.registerError}</p>
       
          
          
      </StyledForm>
    </>
  );
};
export default Register;