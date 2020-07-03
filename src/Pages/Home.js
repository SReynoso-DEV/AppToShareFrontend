import Nav from "./Nav"; 
import React, { Component } from "react";

export class Home extends Component { 
  state = {
    user: '',
    reserva: '',
  };

    render(){           
      
      
      return(
        <div>            
            <Nav />
          <h1 className="text-center pt-3 pb-7">Bienvenido a AppToShare!</h1>        
        </div>
      )
    }
  }

export default Home;
