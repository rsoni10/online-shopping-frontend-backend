import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Widget from './summary-component/Widget';
import AllTimeData from './summary-component/AllTimeData';
import Chart from './summary-component/Chart';
import Transaction from './summary-component/Transaction';
import {FaChartBar, FaClipboard, FaUsers ,} from 'react-icons/fa';
import axios from 'axios';
import { setHader, url } from '../../features/Api';

const Summary = () => {

  const[usersPerc ,setUsersPerc] = useState();
  const[users ,setUsers] = useState();
  const[ordersPerc ,setOrdersPerc] = useState();
  const[orders ,setOrders] = useState();
  const[incomePerc ,setIncomePerc] = useState();
  const[income ,setIncome] = useState();


  function compare(a,b){
    if(a._id < b._id){
      return 1
    }
    else if( a._id > b._id){
      return -1
    }
    else return 0

  }
  //  useEffect(()=>{
  //   async function fetchData(){
  //    const response = await axios.get(`${url}/users/stats`, setHader())
  //    response.data.sort(compare)
  //    console.log(response.data.sort(compare) ,"stats response")

  //   //  setUsers(response.data)
  //   //  setUsersPerc(((response.data[0].total - response.data[1].total )/ response.data[1].total) * 100)
  //   }
  //   fetchData()
  //  },[])
  const data =[
    {
      icon:<FaUsers/>,
      digits:5,
      isMoney:false,
      title:"Users",
      color:"rgb(253, 181 ,40)",
      bgColor:"rgb(253, 181 ,40 , 0.12)",
      // percentage:usersPerc
    },

    {
      icon:<FaClipboard/>,
      digits:0,
      isMoney:false,
      title:"Orders",
      color:"rgb(38, 198 ,249)",
      bgColor:"rgb(38, 198 ,249 , 0.12)",
      // percentage:ordersPerc
    },
    {
      icon:<FaChartBar/>,
      digits:0,
      isMoney:true,
      title:"Earning",
      color:"rgb(102, 108 ,255)",
      bgColor:"rgb(102, 108 ,255 , 0.12)",
      // percentage:incomePerc
    },
  ]
    return <StyledSummary>
     <MainStats>
      <Overview>
        <Title>
          <h2>Overview</h2>
          <p>how your shop is performing compared to pervious month</p>
        </Title>
        <Widgetwrapper>
         { data?.map(
          (data,index)=> <Widget key={index} data={data}/> 
          )}

        </Widgetwrapper>
      </Overview>
      <Chart/>
     </MainStats>
     <Sidestats>
      <Transaction/>
      <AllTimeData />
     </Sidestats>

    </StyledSummary>;
  };
  
  export default Summary;

  const StyledSummary = styled.div`
  width:100%;
  display:flex;
  `
  const MainStats = styled.div`
  flex:2;
  width:100%;
  `
 
  const Overview  = styled.div`
  width:100% ;
  background: rgb(48,51,78);
  color:#fff;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  `
   const Widgetwrapper = styled.div`
  width:100%;
  display: flex;
  justify-content: space-between;
  `
  const Title = styled.div`
  p{
    font-size:14px;
    color:#fff
  }
  `
 
  const Sidestats = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width:100%;
  `