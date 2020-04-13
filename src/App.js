import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';
const HttpsProxyAgent = require('https-proxy-agent');

const ApiURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const axiosDefaultConfig = {
  baseURL: ApiURL,
  proxy: false,
  httpsAgent: new HttpsProxyAgent('http://localhost:8080')
};

const axios = require ('axios').create(axiosDefaultConfig);

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

  callApi = async (path, Method, State) => {
    const response = await fetch(path, {
      method: Method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(State),
    });

    const body = await response.json();
    let result = [response, body];
    return result;   
    
  };

  fetchSend = async (e) => {
    e.preventDefault();
    let result = await this.callApi('/api/auth/login/exp', 'POST', this.state);
    let response = result[0];
    let body = result[1];
    if (response.status !== 201) 
    {
      Swal.hideLoading()
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Mensaje: ${body.description.errormsg}<br/>StatusCode: ${response.status}`,
        showConfirmButton: true
      })
    }
    else
    {
      Swal.hideLoading()
      Swal.fire({
        icon: 'success',
        title: `Hola, ${body.name}`,
        html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Tu token es: ${body.token}`,
        showConfirmButton: true
      })
    }

  }

  // AXIOS SEND
  axiosSend = (e) => {
    e.preventDefault()
    console.log(ApiURL);
    console.log(process.env.NODE_ENV);

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
      })
  }
  // END AXIOS SEND


  render(){
    return(
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit = {this.fetchSend}>
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
