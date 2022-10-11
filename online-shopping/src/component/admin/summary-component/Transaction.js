import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {url,setHader} from '../../../features/Api'
import styled from 'styled-components';
import moment from 'moment/moment';
function Transaction() {
  const[isloading,setIsLoading]= useState(false);
  const[transactionData,setTransactionData]= useState();


  useEffect(()=>{
    async function transactionData(){
      setIsLoading(true);
     try{
      const response = await axios.get(`${url}/orders/?new=true` , setHader())
      // console.log(response.data,"transactionData");
      setTransactionData(response.data)
     }catch(err){
      console.log(err)
     }
     setIsLoading(false);
    }
    transactionData();
  },[])

  return (
    <StyledTransaction>
      {isloading ?
        <Loader>Loading ..</Loader> 
        :
        <>
            <h3>Latest Transaction</h3>
            {transactionData && transactionData.map((item)=>{
              return(
                <TransactionDiv key="index">
                <p>{item.shipping.name}</p>
                <p>{(item.total/100).toLocaleString()}</p>
                <p>{moment(item.createdAt).fromNow()}</p>
              </TransactionDiv>
              )
            })}
        </>    
    }
    
    </StyledTransaction>
  )
}

export default Transaction

const StyledTransaction = styled.div`
background: rgb(48,51,78);
color:#fff;
padding: 1rem;
border-radius:5px;
`

const TransactionDiv = styled.div`
display: flex;
font-size:14px;
margin-top:1rem;
padding:0.5rem;
border-radius:3px;
background: rgb(38,198,249,0.12);
p{
    flex:1
}
&:nth-child(even){
    background: rgb(102,108,255,0.12);
}
`
const Loader = styled.p`
margin-top:2rem;
`