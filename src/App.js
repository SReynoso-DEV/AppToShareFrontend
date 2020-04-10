import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Hello = (props) => <h2>{props.title}</h2>

class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userCode: '',
      password: ''
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async login(e) {
    e.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({ userCode: this.state.userCode, password: this.state.userCode})
    }
    const request = new Request('/api/auth/login/exp', requestOptions);
    await fetch(request).then((resp)=>{ return resp.text() }).then((text)=>{ console.log(text) });
    
  }

  render() {
    const { userCode, password } = this.state;
    return(
        <form onSubmit ={this.submitHandler}>
            <label >Usuario</label>
            <input type="text" name="userCode" 
                onChange={this.changeHandler}
                value={userCode} />

            <label>Password</label>
            <input type="password" name="password" 
                onChange={this.changeHandler} 
                value={password} />

            <button
                type="submit"
                className="btn btn-primary" onClick={e => this.login(e) }>Ingresar
            </button>
        </form>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello title="Log In" />
        <Text
          t1="Esto es un texto implementado desde un const."
          t2="Recuerda en JSX solo puede haber un componente, por ende si deseas agrupar varios debes usar la etiqueta div."
          number={20}
          boolean={false}
          array={[1, 2, 3]}
        />
      </header>
    </div>
  );
}
  

export default App;