/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import GroupDetails from '../views/GroupDetails';
import ProductGroups from '../views/ProductGroups';
import NotFound from '../views/NotFound';
import LoginPage from '../components/Auth';
import ProductGroupItems from '../views/ProductGroupItems';
import SingleItemDetails from '../views/SingleItemDetails';

export default function Routes({ user, dbUser }) {
  return (
    <Switch>
      <Route
      exact path='/'
      component={LoginPage}
      user={user}
      dbUser={dbUser}
      />
      <Route
      exact path='/group-details/:id'
      component={(props) => <GroupDetails dbUser={dbUser} {...props} />}
      user={user}
      uid={user.uid}
      />
       <Route
      exact path='/single-item-details/:id'
      component={(props) => <SingleItemDetails dbUser={dbUser} {...props} />}
      user={user}
      uid={user.uid}
      />
      <PrivateRoute
      exact path='/product-groups'
      component={ProductGroups}
       user={user}
       uid={user.uid}
       dbUser={dbUser}
      />
      <PrivateRoute
      exact path='/product-group-items'
      component={ProductGroupItems}
       user={user}
       uid={user.uid}
       dbUser={dbUser}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

const PrivateRoute = ({
  component: Component, user, dbUser, ...rest
}) => {
  const routeChecker = (check) => ((user, dbUser)
    ? (<Component {...check} user={user} dbUser={dbUser} />)
    : (<Redirect to={{ pathname: '/', state: { from: check.location } }} />));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
