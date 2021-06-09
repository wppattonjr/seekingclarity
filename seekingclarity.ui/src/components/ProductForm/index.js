/* eslint-disable react/prop-types */
import React from 'react';
import firebase from 'firebase';
import 'firebase/firebase-storage';
import { Form, Button } from 'react-bootstrap';
import productGroupData from '../../helpers/data/productGroupData';

export default class AddProductGroupForm extends React.Component {
    state = {
      name: this.props.products?.name || '',
      category: this.props.products?.category || '',
      isActive: this.props.products?.isActive || '',
      image: this.props.products?.image || '',
    }

    handleChange = (e) => {
      e.preventDefault();
      if (e.target.id === 'filename') {
        this.setState({
          image: ''
        });
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${e.target.files[0].name}`);
        imageRef.put(e.target.files[0]).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((image) => {
            this.setState({ image });
          });
        });
      } else if (e.target.id === 'uid'
                 || e.target.id === 'userId') {
        this.setState({
          [e.targe.id]: (e.target.value),
        });
      } else {
        this.setState({
          [e.target.id]: e.target.value,
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();

      if (!this.props.products) {
        const addGroup = {
          userid: this.props.products.userid,
          name: this.props.products.name,
          catgory: this.props.products.category,
          isActive: this.state.isActive === 'true' && true,
          image: this.state.image
        };
        productGroupData.createProductGroup(addGroup);

        this.props.handleUpdate();
      } else {
        const updateGroup = {
          userid: this.props.products.userid,
          name: this.props.products.name,
          catgory: this.props.products.category,
          isActive: this.state.isActive === 'true' && true,
          image: this.state.image
        };
        productGroupData.updateProductGroup(this.props.products.id, updateGroup);
      }
      this.props.toggle();
    }

    render() {
      return (
            <>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Product Group Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.props.name} required/>
                </Form.Group>
                <Form.Group controllId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} value={this.props.category} required>
                    <option value="" defaultValue disabled hidden>Select a category</option>
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controllId="isActive">
                <Form.Label>Active Product Group</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} value={this.props.isActive} required>
                    <option value="" defaultValue disabled hidden>Select availability</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
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