import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const Hello = (props) => <h2>{props.title}</h2>

class Text extends Component {
  render() {
    const flag = this.props.boolean ? "Es cierto!" : "Es falso!"
    const mappedNumbers = this.props.array.map(x => x * 2)
    return (
      <div>
        <p>{this.props.t1}</p>
        <p>{this.props.t2}</p>
        <p>{this.props.number}</p>
        <p>{flag}</p>
        <p>{mappedNumbers.join(', ')}</p>
        <p>{this.props.login.userCode}</p>
        <p>{this.props.login.password}</p>
      </div>
    )
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello title="Hi from props!" />
        <Text
          t1="Esto es un texto implementado desde un const."
          t2="Recuerda en JSX solo puede haber un componente, por ende si deseas agrupar varios debes usar la etiqueta div."
          number={20}
          boolean={false}
          array={[1, 2, 3]}
          login={{ userCode: 'u201713131', password: '*abcdef1234*' }}
        />
      </header>
    </div>
  );
}

export default App;
