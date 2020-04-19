import React, { Component } from 'react';
import logo from '../logo.svg';
import Swal from 'sweetalert2';
import axios from 'axios';

//const ApiURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const Input = (props) =>
    <div class="form-group">
        <label name={props.name}>{props.name}</label><br />
        <input className="form-control" type={props.type} placeholder={props.name} name={props.name} onChange={props.changeFunction} />
    </div>

const Button = (props) => <button type={props.type} className="btn btn-primary">{props.value}</button>
export class Login extends Component {
    constructor(props) {
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

    historyPush = (responseData) => {
        this.props.history.push({
            pathname: '/Profile',
            data: {name: responseData.name, userCode: this.state.userCode, password: this.state.password, token: responseData.token} // your data array of objects
          })  
    }
    

    // AXIOS SEND
    axiosSend = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Iniciando Sesion',
            text: 'Espera estamos confirmando tus credenciales.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        axios.post('api/auth/login/exp2', this.state)
            .then(response => {
                Swal.close()
                this.historyPush(response.data);    
                /*Swal.fire({
                    icon: 'success',
                    title: `Hola, ${response.data.name}`,
                    html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Tu token es: ${response.data.token}`,
                    showConfirmButton: true
                }).then(function (result){
                    if (result.value){    
                                 
                    }
                })*/
            })
            .catch(error => {
                Swal.hideLoading()
                console.log(error)

                Swal.fire({
                    icon: 'error',
                    title: 'Error :(',
                    html: `userCode: ${this.state.userCode}<br/>password: ${this.state.password}<br/>Mensaje: ${error.response.data.description.errormsg}<br/>StatusCode: ${error.response.status}`,
                    showConfirmButton: true
                })
            })
    }
    // END AXIOS SEND


    render() {
        
        return (            
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <form onSubmit={this.axiosSend}>
                    <Input type="text"
                        name="userCode"
                        changeFunction={this.loginChange} />
                    <Input type="password"
                        name="password"
                        changeFunction={this.loginChange} />
                    <Button type="submit"
                        value="Enviar" />
                </form>
            </header>
        )
    }
}

export default Login;
