import Nav from "./Nav";
import React, { Component } from "react";


export class Features extends Component {
    render(){  
      const {data} = this.props.location; 
      console.log(data);
      return(
        <div>            
            <Nav />
            <div class = "col-md-12">
              { data.features.map(feature =>
                <h5>Feature: {feature}</h5>
              )}
            </div>
            
          
        </div>
      )
    }
  }

export default Features;
