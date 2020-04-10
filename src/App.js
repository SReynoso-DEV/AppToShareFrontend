import React from 'react';
import logo from './logo.svg';
import './App.css';


const Input = (props) => 
<div class ="form-group">
  <label for={props.name}>{props.name}</label><br/> 
  <input class="form-control" type={props.type} placeholder={props.name} id={props.name}/>
</div>

const Button = (props) => <button type ={props.type} class="btn btn-primary">{props.value}</button>

// class Text extends Component {
//   render() {
//     const flag = this.props.boolean ? "Es cierto!" : "Es falso!"
//     const mappedNumbers = this.props.array.map(x => x * 2)
//     return (
//       <div>
//         <p>{this.props.t1}</p>
//         <p>{this.props.t2}</p>
//         <p>{this.props.number}</p>
//         <p>{this.props.number-1}</p>
//         <p>{this.props.number+2}</p>
//         <p>{this.props.number-5}</p>
//         <p>{flag}</p>
//         <p>{mappedNumbers.join(', ')}</p>
//         <p>{this.props.login.userCode}</p>
//         <p>{this.props.login.password}</p>
//       </div>
//     )
//   }
// }


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <Input type="text"
                 name="userCode"/>
          <Input type="password"
                 name="password" />
          <Button type="submit"
                value="Enviar"/>                 
        </form>
      </header>
    </div>
  );
}

export default App;
