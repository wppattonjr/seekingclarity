import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GroupDetails from '../views/GroupDetails';
import Dashboard from '../views/Dashboard';
import ProductGroups from '../views/ProductGroups';
import SingleProduct from '../views/SingleProduct';
import NotFound from '../views/NotFound';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (check) => (user
    ? (<Component {...check} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: check.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default function Routes({ user }) {
  return (
    <Switch>
      <Route
      exact
      path='/dashboard'
      component={Dashboard}
      user={user}
      />
      <PrivateRoute
      exact path='/group-details'
      component={GroupDetails}
      user={user}
      />
      <PrivateRoute
      exact path='/product-groups'
      component={ProductGroups}
      user={user}
      />
      <Route
      exact
      path='/single-product/:id'
      component={(props) => <SingleProduct user={user} {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}