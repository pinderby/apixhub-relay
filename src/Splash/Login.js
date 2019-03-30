import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();

    // TODO --DTM-- Login
  
  }
  
  render() {
    return(
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            required
            type="username" 
            placeholder="Enter Username"
            value={this.state.username} 
            onChange={this.handleInputChange} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            required
            placeholder="Password"
            name="password" 
            type="password" 
            value={this.state.password} 
            onChange={this.handleInputChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <p>Or click here to <a className="App-link" onClick={this.props.changeForm}>sign up</a>.</p>
      </Form>
    )
  }
}

export default Login;