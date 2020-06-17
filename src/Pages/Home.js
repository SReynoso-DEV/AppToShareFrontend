import Nav from "./Nav"; 
import React, { Component } from "react";
import axios from 'axios';

/*
const styles = {
  color:  "crimson",
  fontSize: "32px",
};*/

export class Home extends Component { 
  state = {
    user: '',
    reserva: '',
  };
 
  componentDidMount() { 
    if (localStorage.length === 0)
    window.location.href = "/"
    axios.get('api/reservation/active',{
      headers:{ "Authorization" : "Bearer " +  localStorage.getItem('token')}
    })
      .then(response => {
        console.log(localStorage.getItem('token'))
        console.log(response.data);
        this.setState({ reserva: response.data});
        console.log(this.state.reserva[0].userCode)
        console.log("aaaaaaaaaa")
      })  
    axios.get('api/user/',{
      headers:{ "Authorization" : "Bearer " +  localStorage.getItem('token')}
    })
      .then(response => {
        console.log(localStorage.getItem('token'))
        console.log(response.data);
        this.setState({ user: response.data});
        console.log(this.state.user.name)
      })
  }

    render(){  
      const {data} = this.props.location; 
      
      console.log(data);
      return(
        <div>            
            <Nav />
          <h1 className="text-center pt-3">Bienvenido a AppToShare</h1><br/><br/><br/><br/><br/>
          <h5 style={{textAlign:"center",  color:  "crimson"}}> {this.state.user.inRoom ? "Usando un cubículo "
          : "Actualmente no está usando ningún cubículo"}</h5>
          <h5>{JSON.stringify(this.state.reserva)}</h5>
        </div>
      )
    }
  }

export default Home;
