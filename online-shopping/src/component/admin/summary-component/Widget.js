import React from 'react'
import styled from 'styled-components'

function Widget({data}) {
  // console.log("data=>", data)
  return (<StyleWidget>
   <Icon color="" bgcolor="">
    {data.icon}
   </Icon> 
   <Text>
    <h3>{data.isMoney ? "$" + data.digits
    : 
    data.digits}
    
    </h3>
    <p>{data.title}</p>
   </Text>
 
    <>
    <Percentage isPositive={false}>
      {data.percentage + "%"}
    </Percentage>
    </>
    
    <>
    <Percentage isPositive={true}>
      
    </Percentage>
    </>
  </StyleWidget>
  )
}

export default Widget


const Percentage = styled.div`
 margin-left:0.5rem;
font-size: 14px;
color:${({isPositive})=>
isPositive?"rgb(114,255,40)":"rgb(255,77,73)"}
  
`
const Text = styled.div`
h3{font-weight: 900;}
p{
  font-size: 14px;
color:rgba(234,234,255,0.68)
}
`
const Icon = styled.div`
margin-right:0.5rem;
padding:0.5rem;
color:${({color}) => color};
background:${({bgcolor}) => bgcolor}
`
const StyleWidget = styled.div`
display: flex;
align-items: center;
`
