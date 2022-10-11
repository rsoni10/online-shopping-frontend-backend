import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { setHader, url } from '../../../features/Api';


function Chart() {

  const[isloading,setIsLoading]= useState(false);
  const [salesData,setSalesData] = useState()

  useEffect(()=>{
    async function weekSale(){
      setIsLoading(true)
      try{
        const response = await axios.get(`${url}/orders/week-sales` , setHader())
        // console.log(response.data ,"weekSale weekSale")
  
        const newData = response.data.map((item)=>{
          const Days = ["sun","mon","tue","wed","thu","fri","sat"]
          return{
            day:Days[item._id-1],
            amount:item.total/100,
          }
        })
        setSalesData(newData)
      }catch(err){
        console.log(err)
      }
      setIsLoading(false)
    }
    weekSale();
  },[])


  // console.log(salesData,"salesData")
  return (
   <>
   <StyleChats>
    {isloading ?
   <Loader>Loading Chart...</Loader> 
    :
      <>
        <h3>Last 7 Days Earning($)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={salesData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
         
        </LineChart>
      </ResponsiveContainer>
      </>
    }
     
     </StyleChats>
   </>
  )
}

export default Chart

const StyleChats = styled.div`
width:100%;
height:300px;
margin-top:2rem;
padding:1rem;
border:2px solid rgba(48 , 51, 78,0.2);
border-radius:5px;
h3{
    margin-bottom : 1rem;
}
`

const Loader = styled.p`
margin-top:2rem;
`