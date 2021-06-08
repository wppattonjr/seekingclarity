/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GroupDetails from '../views/GroupDetails';
import Dashboard from '../views/Dashboard';
import ProductGroups from '../views/ProductGroups';
import SingleProduct from '../views/SingleProduct';
import NotFound from '../views/NotFound';
import LoginPage from '../components/Auth';

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
      exact path='/'
      component={LoginPage}
      user={user}
      />
      <PrivateRoute
      exact path='/dashboard'
      component={Dashboard}
      uid={user.uid}
      user={user}
      />
      <PrivateRoute
      exact path='/group-details'
      component={GroupDetails}
      user={user}
      uid={user.uid}
      />
      <PrivateRoute
      exact path='/product-groups'
      component={ProductGroups}
       user={user}
       uid={user.uid}
      />
      <PrivateRoute
      exact path='/single-product'
      component={SingleProduct}
      user={user}
      uid={user.uid}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
