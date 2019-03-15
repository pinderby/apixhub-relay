import React, { Component } from 'react';
import RelayEnvironment from "./RelayEnvironment.js";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import TestChild from './TestChild';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
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
              query AppQuery {
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
      </div>
    );
  }
}

export default App;
