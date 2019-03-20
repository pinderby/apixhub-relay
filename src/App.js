import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from './Splash/Splash';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Splash} />
          {/* <Route exact path="/u/:user" component={} />
          <Route exact path="/u/:user/:repo" component={} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
