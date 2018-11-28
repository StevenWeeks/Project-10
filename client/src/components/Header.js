import React, { Component } from 'react';
import {Consumer} from './Context';
import {Link} from 'react-router-dom'


class Header extends Component {
  render(){
  return (
  <Consumer>
  {context =>{
    if (!context.currentUser){
      return (
        <div className="header">
              <div className="bounds">
                <a href="/"><h1 className="header--logo" >Courses</h1></a>
                <nav>
                  <Link className="signup" to={"/Sign-Up"}>Sign Up</Link>
                  <Link className="signin" to={"/Sign-In"}>Sign In</Link>
                </nav>
              </div>
            </div>
    )
    } else {
      return(
        <div className="header">
            <div className="bounds">
              <a href="/"><h1 className="header--logo">Courses</h1></a>
                <nav>
                  <span>
                  Welcome {context.user.firstName} {context.user.lastName}
                  </span>
                    <Link className="signout" to={"/Sign-Out"}>Sign Out</Link>
                </nav>
              </div>
            </div>
            );
          }
      }}
      </Consumer>
    )
  }
}
export default Header;
