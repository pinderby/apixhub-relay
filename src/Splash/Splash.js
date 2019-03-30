import React, { Component } from 'react';
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import logo from '../assets/apixhub-icon.svg';
import RelayEnvironment from "../RelayEnvironment.js";
import Login from './Login.js';
import Signup from './Signup.js';
import TestChild from '../TestChild';
// import logo from '../logo.svg';

class Splash extends Component {
  constructor(props) {
    super(props);

    console.log('user_token: ', localStorage.getItem('user_token')); // TODO --DM-- Remove

    // Check if user token is already stored
    let token = '';
    if (localStorage.getItem('user_token') && 
        localStorage.getItem('user_token') !== 'undefined') {
      
      // If token exists, assign it to state
      token = localStorage.getItem('user_token');

      // If token exists but user does not, get "me"
      // TODO --DTM-- revise this line for relay
      // if (_.isEmpty(props.user)) props.dispatch(fetchMe()); 
    }
    
    // Bind methods
    // this.logout = this.logout.bind(this);

    this.state = {
      user: {},
      isLoggingIn: true,
      token: token,
      errors: {}
    };
  }

  changeForm(isLoggingIn) {
    // isLoggingIn: true = show login form, false = show signup form
    this.setState({
      isLoggingIn: isLoggingIn, 
      errors: {}
    });
  }
  
  render() {
    return (
      <header className="App-header">
        <div className="home">
          <div className="home-header-container">
            <div className="home-header">
              {/* { !(_.isEmpty(this.state.errors)) && 
                <div className="errors-alert alert alert-danger" role="alert">
                  {this.renderErrors()}
                </div>
              }
              {form} */}
            </div>
          </div>
          <p className="home-intro">
            {/* To get started, edit <code>src/Home.js</code> and save to reload. */}
          </p>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to aPixHub</h2>

        {this.state.isLoggingIn ? (
          <Login changeForm={() => this.changeForm(false)} />
        ) : (
          <Signup changeForm={() => this.changeForm(true)} />
        )}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <QueryRenderer
          environment={RelayEnvironment}
          query={graphql`
            query AppQuery {
              version
            }
          `}
          variables={{}}
          render={({error, props}) => {
            if (error) {
              return <div>Error!</div>;
            }
            if (!props) {
              return <div>Loading...</div>;
            }
            return <div>Version: {props.version}</div>;
          }}
        /> */}
        <QueryRenderer
          environment={RelayEnvironment}
          query={graphql`
            query SplashQuery {
              repo(username: "gweeks", reponame: "IMDB") {
                id
                ...TestChild_repo
              }
            }
          `}
          variables={{}}
          render={({error, props}) => {
            if (error) {
              return <div>Error!</div>;
            }
            if (!props) {
              return <div>Loading...</div>;
            }
            console.log("props: ", props);
            return <div>
                    id: {props.repo.id}
                    <TestChild repo={props.repo} component="TestChild" />
                  </div>;
          }}
        />
      </header>
    )
  }

}

export default Splash;