import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class NodesPanel extends Component {
  render() {
    return (
      <div className="nodes-panel-container">
        <Card.Header>
          <h3>Nodes</h3>
          <Button>
            <i className="fas fa-plus"></i>
          </Button>
        </Card.Header>
        <div className="nodes-searchbar">
          {/* {nodesSearchForm} */}
        </div>
        <Card.Body>
          {/* {this.renderNodes(this.props.nodes, this.props.templateSettings)} */}
        </Card.Body>
      </div>
    )
  }
}

export default NodesPanel;