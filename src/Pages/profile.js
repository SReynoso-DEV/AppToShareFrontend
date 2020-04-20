import Nav from "./Nav";
import React, { Component } from "react";
import axios from 'axios';


export class Profile extends Component {
  state = {
    user: '',
  };

  componentDidMount() {
    axios.get('api/user/'+sessionStorage.getItem('userCode'))
      .then(response => {
        console.log(response.data);
        this.setState({ user: response.data });
      });
  }

  render() {
    console.log(this.state.user);
    return (
      <div>
        <Nav />
        <div class="col-md-12">
          <h1>Welcome Back: {this.state.user.name}</h1>
          <h5>userCode: {this.state.user.userCode}</h5>
          <h5>email: {this.state.user.email}</h5>
          <h5>inRoom: {String(this.state.user.inRoom)}</h5>
          <h5>SecondaryHours: {this.state.user.secondaryHoursLeft}</h5>
          <h5>points: {this.state.user.points}</h5>
        </div>
      </div>
    );
  }
}

export default Profile;
