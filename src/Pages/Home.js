import Nav from "./Nav"; 
import React, { Component } from "react";
import axios from 'axios';
import * as moment from 'moment-timezone'
import Swal from "sweetalert2";
import { Button } from 'reactstrap';

export class Home extends Component { 
  state = {
    user: '',
    reserva: '',
  };
 
  componentDidMount() { 
    if (localStorage.length === 0)
    window.location.href = "/"
    Swal.fire({
      title: 'Cargando',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          Swal.showLoading()
      }
  })
    axios.get('api/reservation/active',{
      headers:{ "Authorization" : "Bearer " +  localStorage.getItem('token')}
    })
      .then(response => {
        console.log("api/reservation")
        console.log(response.data)
        this.setState({ reserva: response.data});
       Swal.close();
      })       
      .catch(error => {
        console.log(localStorage.getItem('token'))
        Swal.hideLoading()
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error :(',
            html:`${error}`,
            showConfirmButton: true
        })
    })
    axios.get('api/user/',{
      headers:{ "Authorization" : "Bearer " +  localStorage.getItem('token')}
    })
      .then(response => {
        console.log("api/user")
        console.log(response.data)
        this.setState({ user: response.data});
       Swal.close();
      })     
      .catch(error => {
        console.log("error")
        console.log(error)
        console.log(localStorage.getItem('token'))
        Swal.hideLoading()
        Swal.fire({
            icon: 'error',
            title: 'Error :(',
            html:`${error}`,
            showConfirmButton: true
        })
    })
  }

  

    render(){      
      const hi =  this.state.reserva === null ? " " : moment(this.state.reserva.start).format("hh:mm")
      const hf =  this.state.reserva === null ? " " : moment(this.state.reserva.end).format("hh:mm")
      
      
      return(
        <div>            
            <Nav />
          <h1 className="text-center pt-3 pb-7">Bienvenido a AppToShare!</h1>
          <h4 style={{textAlign:"center",  color:  "crimson"}}> {this.state.user.inRoom ? "Actualmente te encuentras en el cubículo: "
          : "Actualmente no está usando ningún cubículo"}</h4>
          {           
            this.state.reserva !== null &&
            <div className = "home-text">
              <h4>
                {this.state.reserva.room && JSON.stringify(this.state.reserva.room.office).replace(/['"]+/g, '')} - {this.state.reserva.room && JSON.stringify(this.state.reserva.room.code).replace(/['"]+/g, '')}
              </h4>         
            
              <h4>{hi} a  {hf}</h4>
              {/* <h4 class = "home-text">{this.state.user.userCode === this.state.reserva.userCode}</h4> */}
              <Button color="danger" className = "center-block" >Convertir a cubículo público</Button>
            </div>
          }          
         
        </div>
      )
    }
  }

export default Home;
