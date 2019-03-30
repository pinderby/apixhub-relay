import React, { Component } from 'react';
import graphql from "babel-plugin-relay/macro";
import { Redirect } from 'react-router-dom';
import { QueryRenderer, fetchQuery, commitMutation } from "react-relay";
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
    console.log('username: ', localStorage.getItem('username')); // TODO --DM-- Remove

    // Check if user token is already stored
    let token = '', goToProfile = false, user = {};
    if (localStorage.getItem('user_token') && 
        localStorage.getItem('user_token') !== 'undefined' && 
        localStorage.getItem('username') && 
        localStorage.getItem('username') !== 'undefined') {
      
      // Go to profile
      goToProfile = true;
      user = { username: localStorage.getItem('username') };
    }
    
    // Bind methods
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    // this.logout = this.logout.bind(this); // TODO --DTM-- Implement log out

    this.state = {
      user: user,
      goToProfile: goToProfile,
      isLoggingIn: true,
      token: token,
      errors: {}
    };
  }

  // Switch form
  changeForm(isLoggingIn) {
    // isLoggingIn: true = show login form, false = show signup form
    this.setState({
      isLoggingIn: isLoggingIn, 
      errors: {}
    });
  }

  // Log user in
  login(username, password) {
    console.log(username, password); // TODO --DTM-- Remove

    const query = graphql`
      query SplashQuery($username: String!, $password: String!) {
        user(username: $username) {
          id
          username
          fname
          lname
          token(password: $password)
          email
          preferences
          repos {
            id
          }
          repos {
            id
            name
          }
        }
      }
  `;

  const variables = {
    username: username,
    password: password
  };

  fetchQuery(RelayEnvironment, query, variables)
    .then(data => {
      // access the graphql response
      console.log(data);

      // Save token and username
      localStorage.setItem('user_token', data.user.token);
      localStorage.setItem('username', data.user.username);

      // Go to profile
      this.setState({
        user: data.user,
        goToProfile: true
      });

    });
  }

  // Sign up new user
  signup(firstname, lastname, username, email, password) {
    console.log(firstname, lastname, username, email, password); // TODO --DTM-- Remove

    const variables = {
      input: {
        attributes: {
          username: username,
          fname: firstname,
          lname: lastname,
          email: email
        },
        password: password
      },
      password: password
    };
    
    const mutation = graphql`
      mutation SplashMutation(
        $input: CreateUserInput!,
        $password: String!
      ) {
        createUser(input: $input) {
          user {
            id
            username
            fname
            lname
            email
            token(password: $password)
          }
          errors
        }
      }
    `;

    commitMutation(
      RelayEnvironment,
      {
        mutation,
        variables,
        onCompleted: (response, errors) => {
          console.log('Response received from server.');
          console.log(response); // TODO --DTM-- Remove

          // Save token and username
          localStorage.setItem('user_token', response.user.token);
          localStorage.setItem('username', response.user.username);

          // TODO --DTM-- Go to profile
          // Go to profile
          this.setState({
            user: response.user,
            goToProfile: true
          });
        },
        onError: err => console.error(err),
      },
    );
  }
  
  render() {
    if (this.state.goToProfile === true) {
      return <Redirect to={`/u/${this.state.user.username}`} />
    }

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
          <Login login={this.login} changeForm={() => this.changeForm(false)} />
        ) : (
          <Signup signup={this.signup} changeForm={() => this.changeForm(true)} />
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
        {/* <QueryRenderer
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
        /> */}
      </header>
    )
  }

}

export default Splash;