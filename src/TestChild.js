// TestChild.js
import React from 'react';
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer } from 'react-relay';

class TestChild extends React.Component {
  render() {
    console.log("props: ", this.props);
    const {name} = this.props.repo;

    return (
      <div>
        Child: {name}
      </div>
    );
  }
}

export default createFragmentContainer(
  TestChild, 
  graphql`
    fragment TestChild_repo on Repo {
      name
    }
  `
);