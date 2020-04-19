import Nav from "./Nav";
import React, { Component } from "react";


export class Profile extends Component {
    render(){  
      const {data} = this.props.location; 
      console.log(data);
      return(
        <div>            
            <Nav />
          <h1>Welcome Back: {data.name}</h1>
          <h5>userCode: {data.userCode}</h5>
          <h5>password: {data.password}</h5>
          <h5>token: {data.token}</h5>
        </div>
      )
    }
  }

export default Profile;
