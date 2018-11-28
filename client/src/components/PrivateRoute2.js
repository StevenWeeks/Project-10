import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
import {Consumer} from './Context';

const PrivateRoute2 = ({component: Component, ...rest}) => {
  return (
    <Consumer>
      {context => {
        return (
          <Route {...rest} render = {(props) =>
           context.currentUser ?
           ( <Component {...props} {...rest} /> ) :
            ( <Redirect to="/Forbidden"/>
          )}/>
        )
      }}
    </Consumer>
  )
}

export default PrivateRoute2;
