import React, { Component } from 'react';
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import RelayEnvironment from "../RelayEnvironment.js";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component {
  render() {
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query ProfileQuery($username: String!) {
            user(username: $username) {
              id
              username
              fname
              lname
              email
              preferences
              repos {
                id
                name
              }
            }
          }
        `}
        variables={{ username: this.props.match.params.user }}
        render={({error, props}) => {
          console.log("Error, props: ", error, props); // TODO --DTM-- Remove
          if (error) {
            return <div>Error!</div>; // TODO --DTM-- Implement error handling
          }
          if (!props) {
            return <div>Loading...</div>; // TODO --DTM-- Implement loader handling
          }
          return (
            <div className="profile-container">
              <ProfileContent user={props.user} />
            </div>
          )
        }}
      />
    )
  }
}

function ProfileContent(props) {
  return (
    <div className="profile-area">
      <Col sm={4}>
        <Card header="Profile">
          <h2>{`${props.user.fname} ${props.user.lname}`}</h2>
          <div>
            <h3>{`@${props.user.username}`}</h3>
          </div>
          {/* TODO --DTM-- Implement log out */}
          {/* <Button onClick={this.props.logout} variant="danger">Log out</Button> */}
        </Card>
      </Col>
      <Col sm={8}>
        <div className="repo-area">
          <h2>Data Repositories</h2>
          <div className="repo-card-container">
            {props.user.repos.map(
              repo =>
                <Link key={repo.id} to={`/u/${props.user.username}/${repo.name}`}>
                  <Card className="repo-card">{repo.name}</Card>
                </Link>
            )}
          </div>
        </div>
      </Col>
    </div>
  );
}

export default Profile;