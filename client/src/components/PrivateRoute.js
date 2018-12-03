import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
import {Consumer} from './Context';
//the first private route, made to send users to login when trying to create a course while not logged in.
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

export default PrivateRoute
