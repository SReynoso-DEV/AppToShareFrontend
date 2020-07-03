import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

//const ApiURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const Input = (props) =>
    <div className="form-group mt-4 mb-4">
        <label className="col-md-6 label-style" name={props.name}>{props.name}</label>
        <input className="col-md-6 input-style" type={props.type} placeholder={props.name} name={props.name} onChange={props.changeFunction} />
    </div>

const Button = (props) => <button type={props.type} className="mt-3 btn btn-primary button-send">{props.value}</button>
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCode: '',
            password: ''
        }
    }
    componentDidMount() {
      if (localStorage.length !== 0)
      window.location.href = '/#/home'
    }


    loginChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // AXIOS SEND
    axiosSend = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Iniciando Sesión',
            text: 'Espera, estamos confirmando tus credenciales.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        axios.post('api/auth/v3/login', this.state)
            .then(response => {
                Swal.close()
                console.log(response.data);
                localStorage.setItem('userCode', this.state.userCode);
                localStorage.setItem('token', response.data.token);
                window.location.href="/#/home"
            })
            .catch(error => {
                Swal.hideLoading()
                console.log(error.response)
                Swal.fire({
                    icon: 'error',
                    title: 'Error :(',
                    html: `userCode: ${this.state.userCode}<br/>password: ************* <br/>Mensaje: ${error.response.data.description.errormsg}<br/>StatusCode: ${error.response.status}`,
                    showConfirmButton: true
                })
            })
    }
    // END AXIOS SEND


    render() {
        
        return (
          <header>
            <div className="cub-landing">
              <div className="formulario">
                <div class="card-heading"></div>
                <div className="card-body px-5">
                  <h2 className="form-title pt-5">
                    {" "}
                    ¡¡Bienvenido a App To Share!!
                  </h2>
                  <hr className="line line-color "></hr>
                  <div class="row justify-content-left">
                    <h3 class="form-subtitle pt-5">Inicia sesión:</h3>
                  </div>
                  <div class="row justify-content-center">
                    <div class="col-md-12 mt-1 text-center">
                      <form onSubmit={this.axiosSend}>
                        <Input
                          type="text"
                          name="userCode"
                          changeFunction={this.loginChange}
                        />
                        <Input
                          type="password"
                          name="password"
                          changeFunction={this.loginChange}
                        />
                        <Button type="submit" value="Enviar" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </header>
        );
    }
}

export default Login;
