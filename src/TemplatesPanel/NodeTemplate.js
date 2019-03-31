import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './NodeTemplate.css';

class NodeTemplate extends Component {  
  render() {  
    return (
      <div className={(this.props.open) ? "list-group-item template-item active" : "list-group-item template-item" }>
        <div className="template-label-wrapper">
          <span className="template-label" >
            {this.props.template.label}
          </span>
          <Button variant="light" className={(this.props.open) ? "template-edit-btn" : "hidden" }>
            <i className="fas fa-edit"></i>
          </Button>
        </div>
      </div>
    );
  }
}

export default NodeTemplate;