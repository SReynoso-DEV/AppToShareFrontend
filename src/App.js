import React from 'react';
import Login from './Pages/Login';

import './App.css';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Pages/Home';
import CPublics from './Pages/cpublics';
import Profile from './Pages/profile';
import MyReservations from './Pages/myreservations';

function App(){
    return(
      <Router>
        <div>  
          <Switch>
            <Route path="/" exact               component={Login}/>
            <Route path='/home' exact           component={Home}/>
            <Route path="/cpublics" exact       component={CPublics}/>
            <Route path="/profile" exact        component={Profile}/>
            <Route path="/myreservations" exact component={MyReservations}/>
            <Route exact path='/' render={({ location }) => <Redirect to={location.hash.replace('#', '')} />} />
          </Switch>
        </div>
        </Router>
    );
  }

export default App;
