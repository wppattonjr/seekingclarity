import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GroupDetails from '../views/GroupDetails';
import Dashboard from '../views/Dashboard';
import ProductGroups from '../views/ProductGroups';
import SingleProduct from '../views/SingleProduct';
import NotFound from '../views/NotFound';
import LoginPage from '../components/Auth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (check) => (user
    ? (<Component {...check} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: check.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// eslint-disable-next-line react/prop-types
export default function Routes({ user }) {
  return (
    <Switch>
      <Route
      exact
      path='/'
      component={LoginPage}
      user={user}
      />
      <PrivateRoute
      exact path='/dashboard'
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
      exact path='/single-product'
      component={SingleProduct}
      user={user}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
