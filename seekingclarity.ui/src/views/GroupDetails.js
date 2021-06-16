/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import itemData from '../helpers/data/itemData';
import ItemCard from '../components/ItemCard';

export default class GroupDetails extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const groupId = this.props.match.params.id;
    this.getASingleGroup(groupId);
  }

  getASingleGroup = (groupId) => {
    itemData.getAllGroupItems(groupId).then((response) => {
      this.setState({
        items: response,
      });
    });
  };

  render() {
    return (
      <div className="all-items-page">
        <h1 className="all-group-items">All Group Items</h1>
        <div className="all-items-body">
          <div className="all-items-container">
            {this.state.items.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    );
  }
}
