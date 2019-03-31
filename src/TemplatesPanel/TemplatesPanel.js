import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TemplateTypes from '../Constants/TemplateTypes';
import NodeTemplate from './NodeTemplate';

class TemplatesPanel extends Component {

  renderTemplateDropdown() {
    let menuItems = [];

    // Create and push non-selected MenuItems
    for (let i = 0; i < 3; i++) { 
      if (i !== this.props.templateType) menuItems.push(
        <Dropdown.Item key={i} eventKey={i} className="template-menu-item"
            onClick={() => this.props.changeTemplateType(i)}>
          {TemplateTypes.getTypeTitle(i) + "s"}
        </Dropdown.Item>
      );
    }

    // Return dropdown with MenuItems
    return (
      <DropdownButton title={TemplateTypes.getTypeTitle(this.props.templateType) + "s"} 
            key="0" className="template-panel-dropdown" variant="light"
            id={`dropdown-basic`} >
        {menuItems}
      </DropdownButton>
    );
  }

  renderTemplates(templateType) {
    // Initialize variables
    let templateComps = [],
        templates = [], 
        activeTemplate = this.props.activeTemplate, 
        nodeTemplates = this.props.nodeTemplates;

    // Assign templates based on template type
    switch(templateType) {
      case TemplateTypes.NODE:
        templates = this.props.nodeTemplates;
        break;
      case TemplateTypes.RELATIONSHIP:
        templates = this.props.relationshipTemplates;
        break;
      case TemplateTypes.INTERFACE:
        templates = this.props.interfaces;
        break;
      default:
        console.log("renderTemplates() template type error: ", this.props.templateType); // TODO --DTM-- Remove
    }

    console.log('templates: ', templates); // TODO --DTM-- Remove

    // Return if not array (can occur when API call does not return nodes)
    if (Object.prototype.toString.call( templates ) !== '[object Array]' ) return;

    // Determine if template type is relationship
    let isRelationship = false;
    if (templateType === TemplateTypes.RELATIONSHIP) isRelationship = true;

    // Iterate through templates
    nodeTemplates.forEach(function (template, index) {
      // Add each template to list
      console.log('template, index: ', template, index); // TODO --DTM-- Remove
      
      // TODO --DTM-- Remove. Temp assignment of template based on first load or state update (will not hold state)
      var temp;
      if (template.id === activeTemplate.id) (temp = activeTemplate); else (temp = template);

      templateComps.push(
        <NodeTemplate 
          key={template.id} 
          index={index}
          open={(template.id === activeTemplate.id)} 
          nodeTemplates={nodeTemplates}
          templateType={templateType}
          template={temp} />
      );
    });
    return templateComps;
  }

  render() {
    return (
      <div className="templates-panel-container">
        <Card.Header>
          <h3>
            {this.renderTemplateDropdown()}
          </h3>
          {/* <Button className="create-template-btn" bsStyle="primary" onClick={this.props.addTemplate}> */}
          <Button>
            <i className="fas fa-plus"></i>
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="list-group">
            {this.renderTemplates(this.props.templateType)}
          </div>
        </Card.Body>
      </div>
    )
  }
}

export default TemplatesPanel;