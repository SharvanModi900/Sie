import React from 'react'
import  MultiSelector  from './multiselector'
export default class app extends React.Component{
    constructor(props){
    super(props)
    this.state ={

    }}

    render(){
        return(
            <div>
                <table>
  <tr>
    <th> <input type="radio" className="" /></th>
    <th> <input type="text" className="form-control" placeholder="Enter user data..."/></th>
   
  </tr>
  <tr >
      <td>
      <MultiSelector />
   
      </td>
   
    
  </tr>
  
</table>
            </div>
        )
    }
}