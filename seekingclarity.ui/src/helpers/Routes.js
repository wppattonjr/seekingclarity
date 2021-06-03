import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupDetails from '../views/GroupDetails';
import Dashboard from '../views/Dashboard';
import ProductGroups from '../views/ProductGroups';
import SingleProduct from '../views/SingleProduct';
import NotFound from '../views/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route
      exact path='/'
      component={Dashboard}
      />
      <Route
      exact path='/group-details'
      component={GroupDetails}
      />
      <Route
      exact path='/product-groups'
      component={ProductGroups}
      />
      <Route
      exact path='/single-product'
      component={SingleProduct}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
