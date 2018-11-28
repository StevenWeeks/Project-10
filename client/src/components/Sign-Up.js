import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Validation from './Validation'
//axios.post


class SignUp extends Component {
  constructor () {
    super()
    this.state = {
      firstName:"",
      lastName:"",
      user:"",
      password:"",
      confirmPass:"",
      validation: "",
      error:"",
    }
  }

onChangeFirst = e => { this.setState({ firstName: e.target.value }) }

onChangeLast = e => { this.setState({ lastName: e.target.value }) }

onChangeUser = e => { this.setState({ user: e.target.value }) }

onChangePass = e => { this.setState({ password: e.target.value }) }

onChangePassConfirm = e => { this.setState({
  confirmPass: e.target.value
})
  if (e.target.value !== this.state.password){
    e.target.style.border ='2px red solid'
    this.setState({
      validation: true,
      error: "Password Confirm"
    })
  } else {
    e.target.style.border = '2px #ccc4d8 solid'
    this.setState({
      validation: false,
      error: ""
    })
  }
}


signUp = (firstName, lastName, user, password) => {
  axios.post('http://localhost:5000/api/users', {
    firstName: firstName,
    lastName: lastName,
    emailAddress: user,
    password: password
  })
  .then(response => {
    if (response.status === 201){
      this.setState({
        validation: false,
        error:""
      })
      this.props.logIn(user, password)
    }
  })
  .then (response => {
    this.props.history.goBack()
  })
  .catch (error => {
  if (error.response.status === 400) {
    if (error.response.data.message !== "") {
    this.setState({
      error: error.response.data.message
    })
    console.log(this.state)
    }
  }
})
}

handleSubmit = e => {
  e.preventDefault()
  if (this.state.password  === this.state.confirmPass) {
    this.signUp(this.firstName.value, this.lastName.value, this.user.value, this.password.value)
  }
}



  render() {
    let thisValid
    if (this.state.error !== ""){
          thisValid = <Validation error={this.state.error} />
              }
          return (
              <div className="bounds">
              { thisValid }
              <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                    <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value={this.state.firstName} onChange={this.onChangeFirst} ref={(input) => this.firstName = input} />
                            </div>
                    <div>
                    <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value={this.state.lastName} onChange={this.onChangeLast} ref={(input) => this.lastName = input} />
                            </div>
                    <div>
                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.user} onChange={this.onChangeUser} ref={(input) => this.user = input} />
                      </div>
                    <div>
                    <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={this.onChangePass} ref={(input) => this.password = input} />
                            </div>
                    <div id="confirmPasswordDiv">
                    <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value={this.state.confirmPass} onChange={this.onChangePassConfirm} />
                             </div>

                    <div className="grid-100 pad-bottom" ><button className="button" type="submit">Sign Up</button><Link to="/"><button className="button button-secondary">Cancel</button></Link></div>
                  </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/userSignIn">Click here</Link> to sign in!</p>
              </div>
            </div>
          );
      }
}

export default withRouter(SignUp)
