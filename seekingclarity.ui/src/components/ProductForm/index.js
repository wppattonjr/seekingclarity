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
          [e.target.id]: (e.target.value),
        });
      } else {
        this.setState({
          [e.target.id]: e.target.value,
        });
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();

      const group = {
        userid: this.props.dbUser.id,
        id: this.props.id,
        name: this.state.name,
        category: this.state.category,
        isActive: this.state.isActive === 'true' && true,
        image: this.state.image
      };
      if (!this.props.products) {
        productGroupData.createProductGroup(group).then(() => {
          this.props.handleUpdate();
        });
      } else {
        productGroupData.updateProductGroup(this.props.id, group).then(() => {
          this.props.handleupdate();
        });
      }

      if (this.props.callback) {
        this.props.callback(group);
        productGroupData.getAllProductGroups();
      }

      this.props.toggle();
    }

    render() {
      return (
            <>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Product Group Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} value={this.state.name} required/>
                </Form.Group>
                <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} value={this.state.category} required>
                    <option value="" defaultValue disabled hidden>Select a category</option>
                    <option value="Product" >Product</option>
                    <option value="Service" >Service</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="isActive">
                <Form.Label>Active Product Group</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} value={this.state.isActive} required>
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
