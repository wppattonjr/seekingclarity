/* eslint-disable react/prop-types */
import React from 'react';
import firebase from 'firebase';
import 'firebase/firebase-storage';
import { Form, Button } from 'react-bootstrap';
import itemData from '../../helpers/data/itemData';

export default class AddItemForm extends React.Component {
    state = {
      name: this.props.item?.name || '',
      groupid: this.props.item?.groupid || '',
      isActive: this.props.item?.isActive || '',
      image: this.props.item?.image || '',
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
      } else {
        this.setState({
          [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value
        });
      }
    }

      handleSubmit = (e) => {
        e.preventDefault();

        const item = {
          groupid: parseInt(this.state.groupid, 10),
          name: this.state.name,
          isActive: this.state.isActive === 'true' && true,
          image: this.state.image
        };
        itemData.createGroupItem(item).then(() => {
          this.props.handleUpdate();
        });
        if (this.props.callback) {
          this.props.callback(item);
          itemData.getAllItems();
        }

        this.props.toggle();
      }

      render() {
        // const populateDropdown = () => this.state.groups.map((group) => (
        //       <option
        //         value={group.id}
        //         key={group.id}
        //         id={group.id}
        //       >
        //           {group.name}
        //       </option>
        // ));

        return (
              <>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="name">
                      <Form.Label>Item Name</Form.Label>
                      <Form.Control name="name" type="text" onChange={this.handleChange} value={this.state.name} required/>
                  </Form.Group>
              <Form.Group controlId="isActive">
                  <Form.Label>Active Item</Form.Label>
                  <Form.Control name="isActive" type="text" as="select" onChange={this.handleChange} value={this.state.isActive} required>
                      <option value="" defaultValue disabled hidden>Select availability</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="groupid">
                  <Form.Label>Choose Group</Form.Label>
                  <Form.Control as="select" type="number" name="groupid" onChange={this.handleChange} value={this.state.groupId} required>
                      <option value="" defaultValue disabled hidden>Select availability</option>
                      <option value="1" >SUV</option>
                      <option value="2">Television</option>
                      <option value="3">Day Care</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" type="url" onChange={this.handleChange} value={this.state.image} required/>
                </Form.Group>
                <Form.Group controlId="filename">
                    <Form.Control name="image" type="file" onChange={this.handleChange} />
                </Form.Group>
                  <Button variant="primary" type="submit">
                      Submit
                  </Button>
              </Form>
              </>
        );
      }
}
