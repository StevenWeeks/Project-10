import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
import {Consumer} from './Context';

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Consumer>
      {context => {
        return (
          <Route {...rest} render = {(props) =>
           context.currentUser ?
           ( <Component {...props} {...rest} /> ) :
            ( <Redirect to="/Sign-In"/>
          )}/>
        )
      }}
    </Consumer>
  )
}

export default PrivateRoute;
