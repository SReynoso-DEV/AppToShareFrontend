import Nav from "./Nav";
import React, { Component } from "react";


export class Home extends Component {
    render(){  
      const {data} = this.props.location; 
      console.log(data);
      return(
        <div>            
            <Nav />
          <h1 className="text-center pt-3">Bienvenido a Cubiculos Pool</h1>
        </div>
      )
    }
  }

export default Home;
