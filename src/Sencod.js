import React from 'react'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            state:''
        }
    }

    componentDidMount=()=>{

    }

    render(){
        return (
            <div>
             <input type="text" className="form-control" placeholder="Enter user data..."/>
            </div>
        )
    }
}