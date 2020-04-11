import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';
import axios from 'axios';


const Input = (props) => 
<div class ="form-group">
  <label name={props.name}>{props.name}</label><br/> 
  <input class="form-control" type={props.type} placeholder={props.name} name={props.name} onChange={props.changeFunction}/>
</div>

const Button = (props) => <button type ={props.type} class="btn btn-primary">{props.value}</button>

class Index extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      userCode: '',
      password: ''
    }
  }

  loginChange = (e) => {    
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  send = (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Iniciando Sesion...!',
      text: 'Espera estamos confirmando tus credenciales.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
        Swal.showLoading()
      }
    })
    axios.post('/api/auth/login/exp', this.state)
      .then(response => {
        Swal.hideLoading()
        Swal.fire({
          icon: 'success',
          title: `Hola, ${response.data.name}`,
          html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Tu token es: ${response.data.token}`,
          showConfirmButton: true
        })
      })
      .catch(error => {
        if (error.response.status === 500)
        {
          axios.post('/api/auth/login/exp', this.state)
          .then(response => {
            Swal.hideLoading()
            Swal.fire({
              icon: 'success',
              title: `Hola, ${response.data.name}`,
              html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Tu token es: ${response.data.token}`,
              showConfirmButton: true
            })
          })
          .catch(error => {
            Swal.hideLoading()
            Swal.fire({
              icon: 'error',
              title: 'Error :(',
              html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Mensaje: ${error.response.data.description.errormsg}<br/>StatusCode: ${error.response.status}`,
              showConfirmButton: true
            })
          })
        }
        else
        {
          Swal.hideLoading()
            Swal.fire({
              icon: 'error',
              title: 'Error :(',
              html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Mensaje: ${error.response.data.description.errormsg}<br/>StatusCode: ${error.response.status}`,
              showConfirmButton: true
            })
        }        
      })
  }


  render(){
    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit = {this.send}>
          <Input type="text"
                 name="userCode"
                 changeFunction={this.loginChange}/>
          <Input type="password"
                 name="password"
                 changeFunction={this.loginChange} />
          <Button type="submit"
                value="Enviar" />                 
        </form>
      </header>
    </div>
    )
  }
}

export default Index;
