import styled from 'styled-components';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { setHader, url } from '../../features/Api';



function UserProfile() {
  const navigate =useNavigate();
  const param = useParams();
  const [user , setUser] = useState({
    name:"",
    email:"",
    password:"",
    isAdmin:"",
  });
  const [Loading,setLoading] = useState(false)

  // console.log("paramparam",param)


const handleSubmit = async(e)=>{
  //  console.log(param,)
  e.preventDefault()
  console.log(user.password)
    try{
      const response = await axios.put(`${url}/users/${param.id}`,{...user} ,setHader())
      return setUser({...response.data
        , password:""
      })
    }
    catch(err){
      console.log(err);
      return err
    }
    
  }
  useEffect(()=>{
    async function fetchUserData(){
      setLoading(true)
      try{
        const response = await axios.get(`${url}/users/find/${param.id}` , setHader())
        // console.log(response.data)
        setUser({
          ...response.data,
          password:""
        })
      }
      catch(err){
        // console.log(err)
        return err
      }
      setLoading(false);
    }
    fetchUserData()
  },[])


  return (
    <StylesProfile>
     <ProfileContainer>
      {Loading===true ? <p>Loading....</p>
    
      :
    <form onSubmit={handleSubmit}>
      <h3>User Profile</h3>
      {user.isAdmin === true ?
      <Admin>Admin</Admin>
        
      :
      <Customer>Customer</Customer>
      }
      <br/>
      <label htmlFor='name'>Name:</label>
      <input
      value={user.name}
      type="text"
      onChange={(e)=>setUser({...user , name:e.target.value})}
      id="name"
      />
      <label htmlFor='email'>Email:</label>
      <input
      type="text"
      value={user.email}
      onChange={(e)=>setUser({...user, email:e.target.value})}
      id="email"
      />
      <label htmlFor='password'>Password:</label>
      <input
      type="password"
      id="password"
      onChange={(e)=>setUser({...user, password:e.target.value})}
      />
      <button>Update</button>
      {/* <button>"Updating": "update Profile"</button> */}
      </form>
    }
     </ProfileContainer>

    </StylesProfile>
  )
}

export default UserProfile
const StylesProfile = styled.div`
margin:3rem;
display: flex;
  justify-content: center;
 `

 const ProfileContainer = styled.div`
 max-width:500px;
 width:100%;
 height:auto;
 display: flex;
 box-shadow:rgba(100,100,111,0.2) 0px 7px 29px 0px;
 border-radius:5px;
 padding:2rem;
 form{
  display: flex;
  flex-direction :column;
  align-items:flex-start;
  h3{
    margin-bottom :0.5rem;
  }
  label{
    margin-bottom :0.2rem;
    color:gray;
  }
  input{
    margin-bottom:1rem;
    outline:none;
    border:none;
    border-bottom:1px solid gray
  }
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