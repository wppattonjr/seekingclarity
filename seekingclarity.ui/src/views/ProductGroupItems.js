import React from 'react';
import itemData from '../helpers/data/itemData';
import ItemCard from '../components/ItemCard';

export default class AllGroupItems extends React.Component {
    state = {
      items: []
    }

    componentDidMount() {
      this.getAllTheItems();
    }

      getAllTheItems = () => {
        itemData.getAllItems().then((response) => {
          this.setState({
            items: response
          });
        });
      }

      render() {
        return (
          <div clasName="all-items-page">
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
