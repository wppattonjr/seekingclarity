/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import itemData from '../helpers/data/itemData';
import ItemCard from '../components/ItemCard';

export default class GroupDetails extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    this.getGroupItems();
  }

  getGroupItems = () => {
    const { groupId } = this.props;
    itemData.getGroupItems(groupId).then((response) => this.setState({
      items: response
    }));
  }

  render() {
    return (
       <div className='d-flex justify-content-center m5'>
        <h1>Group Details View</h1>
        <div className="item-cards-container">
          <ItemCard item={this.state.items} key={this.state.items.id} />
        </div>
      </div>
    );
  }
}
