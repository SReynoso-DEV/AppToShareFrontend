import Nav from "./Nav";
import React, { Component } from "react";
import axios from 'axios';
import Swal from "sweetalert2";


export class Profile extends Component {
  state = {
    user: '',
    hoursLeft: '',
  };

  componentDidMount() {

    if (localStorage.length === 0)
    window.location.href = "/"
    
    Swal.fire({
      title: 'Cargando Perfil',
      text: 'Recopilando los datos de tu perfil...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          Swal.showLoading()
      }
  })
    axios.get('api/user/',{
      headers:{ "Authorization" : "Bearer " +  localStorage.getItem('token')}
    })
      .then(response => {
        console.log(localStorage.getItem('token'))
        console.log(response.data);
        this.setState({ user: response.data, hoursLeft: response.data.hoursLeft });
        console.log(this.state.user.name)
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

  render() {
    return (
      <div>
        <Nav active = "profile"/>
        <div className="col-md-12">
          <h1>Bienvenido, {this.state.user.name}</h1>
          <h5 class = "profile-text">TIU: {this.state.user.userCode}</h5>
          <h5>correo: {this.state.user.email}</h5>

          <h5>Horas Reservables: {this.state.hoursLeft.todayHours}</h5>
          <h5>Horas Reservables de mañana: {this.state.hoursLeft.tomorrowHours}</h5>
          <h5>Horas de Activador: {this.state.hoursLeft.secondaryHours}</h5>
          <h5>Puntos Acumulados: {this.state.user.points}</h5>
        </div>
      </div>
    );
  }
}

export default Profile;
