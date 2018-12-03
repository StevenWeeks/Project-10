import React, { Component } from 'react';
import {Consumer} from './Context';
import {Link} from 'react-router-dom'

// header that either shows sign-in/sign-up links if not a currentUser, else it shows a welcome message
// and an option to sign out.   Made the Ccourses text a link to go back to /courses.
class Header extends Component {

  render(){

  return (
  <Consumer>
  {context =>{
    if (!context.currentUser){
      return (
        <div className="header">
              <div className="bounds">
                <Link to={"/Courses"}><h1 className="header--logo" >Courses</h1></Link>
                <nav>
                  <Link className="signup"  to={"/Sign-Up"}>Sign Up</Link>
                  <Link className="signin" id="signin" to={"/Sign-In"}>Sign In</Link>
                </nav>
              </div>
            </div>
    )
    } else {
      return(
        <div className="header">
            <div className="bounds">
              <Link to={"/Courses"}><h1 className="header--logo">Courses</h1></Link>
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
