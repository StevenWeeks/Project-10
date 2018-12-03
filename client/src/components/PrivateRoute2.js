import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
import {Consumer} from './Context';
// private route made for when someone tries to edit a course they aren't the creator of
// prepend this to the edit route in app.js
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

export default PrivateRoute2
