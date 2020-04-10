import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';

const HttpsProxyAgent = require('https-proxy-agent');


const Input = (props) => 
<div class ="form-group">
  <label name={props.name}>{props.name}</label><br/> 
  <input class="form-control" type={props.type} placeholder={props.name} name={props.name} onChange={props.changeFunction}/>
</div>

const Button = (props) => <button type ={props.type} class="btn btn-primary">{props.value}</button>




// AXIOS CONFIGURATION
const axiosDefaultConfig = {
    baseURL: 'https://upc-pool-ferluisxd.cloud.okteto.net',
    proxy: false,
    httpsAgent: new HttpsProxyAgent('http://localhost:8080')
};

const axios = require ('axios').create(axiosDefaultConfig);
// END AXIOS CONFIGURATION

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

  send = e => {
    e.preventDefault()
    axios.post('/api/auth/login/exp', this.state)
    .then(response => {
      Swal.fire({
        icon: 'success',
        title: 'Login Confirm!',
        html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Token: ${response.data}`,
        showConfirmButton: true})         
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Mensaje: ${error.response.data.description.message}<br/>StatusCode: ${error.response.data.description.statusCode}`,
        showConfirmButton: true})  
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
