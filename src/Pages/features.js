import Nav from "./Nav";
import React, { Component } from "react";


export class Features extends Component {
    render(){  
      const {data} = this.props.location; 
      console.log(data);
      return(
        <div>            
            <Nav />
          
        </div>
      )
    }
  }

export default Features;
