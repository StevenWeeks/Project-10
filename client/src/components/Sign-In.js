import React, {Component} from 'react';
import { Consumer } from './Context'
import {
    withRouter
  } from 'react-router'
import { Link } from 'react-router-dom';

// sign in, uses the user provided login credentials to attempt to log in.
// gives errors for wrong user/password
class SignIn extends Component {
constructor(){
  super()
  this.state = {
    user: "",
    password: ""
  }
}
//functions to use on submit of form
Name = e => { this.setState({user: e.target.value}) }
Pass = e => { this.setState({password: e.target.value}) }
//prevents page refresh, uses login from props and uses user inputted user and password.
doSubmit = e => {
  e.preventDefault()
  this.props.logIn(this.state.user, this.state.password)
}

resetLogin = e => {
  this.props.resetLogin()
}

// if the login is succesful, user is taken back to previous page.
// if invalidUser/invalidPass, shows error messages.
  render(){
  return (
    < Consumer >
        {context => {

          if (context.currentUser)
          {
            this.props.history.goBack()
          }
           if (context.invalidUser) {
            document.getElementById("pUser").style.display="block"
          } else if (context.invalidPass){
              document.getElementById("pPass").style.display="block"
              document.getElementById("pUser").style.display="none"
          }




    return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <form onSubmit={this.doSubmit}>
                <div id="errors"> <p style={{color:"red", display:"none"}} id="pUser" >Invalid Email</p> <p style={{color:"red", display:"none"}} id="pPass">Invalid Password</p> </div>
                <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={this.Name} ref={(input) => this.user = input} placeholder="Email Address" value={this.state.user}/></div>
                <div><input id="password" name="password" type="password" className="" onChange={this.Pass} ref={(input) => this.password = input} placeholder="Password"value={this.state.password}/></div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link to="/"><button className="button button-secondary" onClick={context.actions.resetLogin}>Cancel</button></Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/Sign-up">Click here</a> to sign up!</p>
        </div>
      </div>
          )
        }}
      </Consumer>
    )
  }
}

export default withRouter(SignIn);
