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
    Swal.fire({
      title: 'Cargando Perfil',
      text: 'Espera recopilando los datos de tu perfil.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          Swal.showLoading()
      }
  })
    axios.get('api/user/',{
      headers:{ "Authorization" : "Bearer " +  sessionStorage.getItem('token')}
    })
      .then(response => {
        console.log(sessionStorage.getItem('token'))
        console.log(response.data);
        this.setState({ user: response.data, hoursLeft: response.data.hoursLeft });
        console.log(this.state.user.name)
        Swal.close();
      })
      .catch(error => {
        console.log(sessionStorage.getItem('token'))
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
        <Nav />
        <div class="col-md-12">
          <h1>Welcome Back: {this.state.user.name}</h1>
          <h5>userCode: {this.state.user.userCode}</h5>
          <h5>email: {this.state.user.email}</h5>
          <h5>inRoom: {this.state.user.inRoom ? "Usando un cubiculo" : "No esta usando un cubiculo"}</h5>
          <h5>TodayHours: {this.state.hoursLeft.todayHours}</h5>
          <h5>TomorrowHours: {this.state.hoursLeft.tomorrowHours}</h5>
          <h5>SecondaryHours: {this.state.hoursLeft.secondaryHours}</h5>
          <h5>points: {this.state.user.points}</h5>
        </div>
      </div>
    );
  }
}

export default Profile;
