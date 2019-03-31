import React, { Component } from 'react';
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import RelayEnvironment from "../RelayEnvironment.js";
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TemplatesPanel from '../TemplatesPanel/TemplatesPanel';
import NodesPanel from '../NodesPanel/NodesPanel';
import TemplateTypes from '../Constants/TemplateTypes';
import testdata from '../test_data.json';
import './Repo.css';

class Repo extends Component {
  render() {
    // TODO --DTM-- REDIRECT TO LOGIN IF NOT AUTHED
    return (
      <QueryRenderer
        environment={RelayEnvironment}
        query={graphql`
          query RepoQuery($username: String!, $repo: String!) {
            user(username: $username) {
              id
              username
              fname
              lname
              email
              preferences
              repo(name: $repo) {
                id
                name
                nodes {
                  id
                  type
                  label
                  repoId
                  properties {
                    key
                    valueType
                  }
                  inRelationships {
                    id
                    relType
                    properties {
                      key
                      valueType
                    }
                    toNode {
                      id
                      type
                      label
                      repoId
                      properties {
                        key
                        valueType
                      }
                    }
                    fromNode {
                      id
                      type
                      label
                      repoId
                      properties {
                        key
                        valueType
                      }
                    }
                  }
                  outRelationships {
                    id
                    relType
                    properties {
                      key
                      valueType
                    }
                    toNode {
                      id
                      type
                      label
                      repoId
                      properties {
                        key
                        valueType
                      }
                    }
                    fromNode {
                      id
                      type
                      label
                      repoId
                      properties {
                        key
                        valueType
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        variables={{ 
          username: this.props.match.params.user,
          repo: this.props.match.params.repo
        }}
        render={({error, props}) => {
          console.log("Error, props: ", error, props); // TODO --DTM-- Remove
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div id="repo-container" className="repo-container">
              {/* <Sidemenu 
                dispatch={this.props.dispatch}
                menuIsOpen={this.state.sidemenu.open}
                editing={this.state.sidemenu.editing}
                template={this.state.activeTemplate}
                node={this.state.sidemenu.node}
                index={this.state.sidemenu.index}
                handleSideMenuStateChange={this.handleSideMenuStateChange}
                saveNode={this.saveNode}
                deleteNode={this.deleteNode} /> */}
              <TopNavbar />
              <h3 className="user-repo-title">
                {this.props.match.params.user} / 
                <DropdownButton variant="light" title={"Movies"} key="1" id={`dropdown-basic-1`} >
                  <Dropdown.Item eventKey="1">Games</Dropdown.Item>
                  <Dropdown.Item eventKey="2">TV Shows</Dropdown.Item>
                </DropdownButton>
              </h3>
              <Row>
                <Card id="repo-panel" className="repo-panel panel panel-default">
                  <Col className="template-col">
                    <TemplatesPanel
                      templateType={TemplateTypes.NODE}
                      activeTemplate={testdata.templates[0]}
                      nodeTemplates={testdata.templates} />
                  </Col>
                  <Col className="node-col">
                    <NodesPanel />
                  </Col>
                </Card>
              </Row>
            </div>    
          )
        }}
      />
    );
  }
}

function TopNavbar(props) {
  return (
    <Navbar bg="dark" collapseOnSelect>
      <Navbar.Brand>
        <a href="#brand">aPixHub</a>
      </Navbar.Brand>
      <Navbar.Toggle />
      <FormControl className="searchbar" type="text" placeholder="Search" />
      <Nav className="justify-content-end">
        <NavItem className="logout-nav-item" href="#">
          Logout {/* TODO --DTM-- Implement log out */}
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Repo;