import React from 'react';
import Login from './Pages/Login';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CPublics from './Pages/cpublics';
import Profile from './Pages/profile';
import Features from './Pages/features';

function App(){
    return(
      <Router>
        <div>  
          <Switch>
          <Route path="/" exact component={Login}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/cpublics" exact component={CPublics}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/features" exact component={Features}/>
          </Switch>
        </div>
        </Router>
    );
  }

export default App;
