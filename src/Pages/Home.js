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
      //text: 'Espera recopilando los datos de tu perfil.',
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
            showConfirmButton: true
        })
    })
    axios.get('api/user/',{
      headers:{ "Authorization" : "Bearer " +  localStorage.getItem('token')}
    })
      .then(response => {
        this.setState({ user: response.data});
       Swal.close();
      })     
      .catch(error => {
        console.log(localStorage.getItem('token'))
        Swal.hideLoading()
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Error :(',
            showConfirmButton: true
        })
    })
  }

    render(){  
     // const {data} = this.props.location; 
      //console.log(data);
      //console.log(t)
    /////
      const hi =  moment(this.state.reserva.start).format("hh:mm")
      const hf =  moment(this.state.reserva.end).format("hh:mm")



      return(
        <div>            
            <Nav />
          <h1 className="text-center pt-3">Bienvenido a AppToShare</h1><br/><br/><br/><br/><br/><br/><br/>
          <h4 style={{textAlign:"center",  color:  "crimson"}}> {this.state.user.inRoom ? "Actualmente te encuentras en el cubículo: "
          : "Actualmente no está usando ningún cubículo"}</h4>
          <h4 class="home-text">
         {this.state.reserva.room && JSON.stringify(this.state.reserva.room.office).replace(/['"]+/g, '')} - {this.state.reserva.room && JSON.stringify(this.state.reserva.room.code).replace(/['"]+/g, '')}
            </h4>
            <h4 class="home-text">{hi} a {hf}</h4><br/>
            <h4 class = "home-text">{this.state.user.userCode === this.state.reserva.userCode && <h3><Button color="danger" >Convertir a cubículo público</Button></h3>}
         </h4>
        </div>
      )
    }
  }

export default Home;
