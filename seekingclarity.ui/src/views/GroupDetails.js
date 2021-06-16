/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import itemData from '../helpers/data/itemData';
import ItemCard from '../components/ItemCard';
import AppModal from '../components/AppModal';
import AddCriteriaForm from '../components/AddCriteriaForm';
import criteriaData from '../helpers/data/criteriaData';

export default class GroupDetails extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const groupId = this.props.match.params.id;
    this.getASingleGroup(groupId);
    this.getAllTheCriteria();
  }

  getASingleGroup = (groupId) => {
    itemData.getAllGroupItems(groupId).then((response) => {
      this.setState({
        items: response,
      });
    });
  };

  getAllTheCriteria = () => {
    criteriaData.getAllCriteria().then((response) => {
      this.setState({
        criteria: response
      });
    });
  }

  render() {
    return (
      <div className="all-items-page">
        <h1 className="all-group-items">All Group Items</h1>
        <div className="all-items-body">
          <div className="all-items-container">
          <AppModal
                title={'Add New Criteria'}
                groupId={this.props.groupId}
                dbUser={this.props.dbUser}
                userId={this.props.uid}>
                   <AddCriteriaForm handleUpdate={() => this.getAllTheCriteria()} criteria={this.state.criteria} callback={(thisCriteria) => console.log(thisCriteria)}/>
            </AppModal>
            {this.state.items.map((item) => <ItemCard key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    );
  }
}
