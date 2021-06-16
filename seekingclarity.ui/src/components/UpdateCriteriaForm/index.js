/* eslint-disable react/prop-types */
import React from 'react';
import 'firebase/firebase-storage';
import { Form, Button } from 'react-bootstrap';
import criteriaData from '../../helpers/data/criteriaData';

export default class UpdateCriteriaForm extends React.Component {
    state = {
      name: this.props.criteria?.name || '',
      groupId: this.props.item?.groupId || '',

    }

      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

      handleSubmit = (e) => {
        e.preventDefault();

        const ncriteria = {
          groupId: parseInt(this.state.groupId, 10),
          name: this.state.name,
        };
        criteriaData.createCriteria(ncriteria).then(() => {
          this.props.handleUpdate();
        });
        if (this.props.callback) {
          this.props.callback(ncriteria);
          criteriaData.getAllCriteria();
        }

        this.props.toggle();
      }

      render() {
        return (
              <>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="name">
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control name="name" type="text" onChange={this.handleChange} value={this.state.name} required/>
                  </Form.Group>
                  <Form.Group controlId="groupId">
                  <Form.Label>Choose Group</Form.Label>
                  <Form.Control as="select" type="number" name="groupId" onChange={this.handleChange} value={this.state.groupId} required>
                      <option value="" defaultValue disabled hidden></option>
                      <option value="1">SUV</option>
                      <option value="2">Television</option>
                      <option value="3">Day Care</option>
                  </Form.Control>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
              </>
        );
      }
}
