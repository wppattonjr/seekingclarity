/* eslint-disable react/prop-types */
import React from 'react';
import itemData from '../helpers/data/itemData';
import ItemCard from '../components/ItemCard';
import AppModal from '../components/AppModal';
import ItemForm from '../components/ItemForm';
import productGroupData from '../helpers/data/productGroupData';
import criteriaData from '../helpers/data/criteriaData';

export default class AllGroupItems extends React.Component {
    state = {
      items: [],
      groups: [],
      criteria: []
    }

    componentDidMount() {
      this.getAllTheItems();
      this.getAllGroupIds();
      this.getAllTheCriteria();
    }

      getAllTheItems = () => {
        itemData.getAllItems().then((response) => {
          this.setState({
            items: response
          });
        });
      }

      getAllTheCriteria = () => {
        criteriaData.getAllCriteria().then((response) => {
          this.setState({
            criteria: response
          });
        });
      }

      getAllGroupIds = () => {
        productGroupData.getAllProductGroups().then((response) => {
          this.setState({
            groups: response
          });
        });
      }

      render() {
        return (
          <div className="all-items-page">
            <h1 className="all-group-items">All Group Items</h1>
            <div className="all-items-body">
              <AppModal
                title={'Add a Product Item'}
                groupId={this.props.groupId}
                dbUser={this.props.dbUser}
                userId={this.props.uid}>
                   <ItemForm handleUpdate={() => this.getAllTheItems()} items={this.state.items} callback={(thisItem) => console.log(thisItem)}/>
                </AppModal>
              <div className="all-items-container">
                {this.state.items.map((item) => <ItemCard key={item.id} item={item} />)}
              </div>
            </div>
          </div>
        );
      }
}
