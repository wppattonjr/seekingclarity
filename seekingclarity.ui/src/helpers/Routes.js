/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GroupDetails from '../views/GroupDetails';
import Dashboard from '../views/Dashboard';
import ProductGroups from '../views/ProductGroups';
import SingleProduct from '../views/SingleProduct';
import NotFound from '../views/NotFound';
import LoginPage from '../components/Auth';

const PrivateRoute = ({
  component: Component, user, dbUser, ...rest
}) => {
  const routeChecker = (check) => ((user, dbUser)
    ? (<Component {...check} user={user} dbUser={dbUser} />)
    : (<Redirect to={{ pathname: '/', state: { from: check.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default function Routes({ user, dbUser }) {
  return (
    <Switch>
      <Route
      exact path='/'
      component={LoginPage}
      user={user}
      dbUser={dbUser}
      />
      <PrivateRoute
      exact path='/dashboard'
      component={Dashboard}
      uid={user.uid}
      user={user}
      dbUser={dbUser}
      />
      <PrivateRoute
      exact path='/group-details'
      component={GroupDetails}
      user={user}
      uid={user.uid}
      dbUser={dbUser}
      />
      <PrivateRoute
      exact path='/product-groups'
      component={ProductGroups}
       user={user}
       uid={user.uid}
       dbUser={dbUser}
      />
      <PrivateRoute
      exact path='/single-product'
      component={SingleProduct}
      user={user}
      uid={user.uid}
      dbUser={dbUser}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
