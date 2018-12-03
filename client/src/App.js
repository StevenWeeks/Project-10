
import  React, { Component } from 'react';
import { Provider } from './components/Context'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Header from './components/Header'
import CourseDetail from './components/Course-Detail'
import Courses from './components/Courses'
import CreateCourse from './components/Create-Course'
import SignIn from './components/Sign-In'
import SignUp from './components/Sign-Up'
import UpdateCourses from './components/Update-Course'
import NotFound from './components/Not-Found'
import Error from './components/Error'
import './css/global.css'
import SignOut from './components/Sign-Out'
import axios from 'axios'
import PrivateRoute from './components/PrivateRoute'
import PrivateRoute2 from './components/PrivateRoute2'
import Forbidden from './components/Forbidden'


 class App extends Component {
//setting up the app states
  constructor () {
    super()

    this.state = {
       courses: [],
       currentUser: false,
       invalidPass: false,
       invalidUser: false,
       user:""
   }
  }


//this will be passed as props to the usersignin page, It submits a get request to the rest api via the mongod server
// using the input the user provides, if there's a valid response it THEN sets the state, also session storage for user and auth,
// those i only use auth from  here.  Catches errors for invalid user or password. sets invalidUser or invalidPass as true.
logIn = (email, password) => {

  this.setState({
    invalidUser:false,
    invalidPass:false,
  })
  axios.get('http://localhost:5000/api/users', {
    auth: {
      username: email,
      password: password
   }
 })
    .then(response => {

      if (response.status === 304 || response.status === 200) {
        this.setState({
          user: response.data,
          currentUser: true,
          invalidUser: false,
          invalidPass: false,
          validation: false
        });
        sessionStorage.setItem("user", JSON.stringify(response.data))
        sessionStorage.setItem("auth", JSON.stringify(response.config.headers.Authorization))
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        if (error.response.data.message === 'InvalidUser') {
          this.setState({
            invalidUser: true
          });
        } else if (error.response.data.message === 'InvalidPassword') {
          this.setState({
            invalidPass: true
          });
        }
      } else {
        return window.location.href = '/error';
      }
    });
}
// sets the user to '' and current user to false, while clearing the data from the sessionStorage
//  enacted when a user clicks the sign out link while signed in.
signOut = () => {
  this.setState({
    user: '',
    currentUser: false,
  });
  window.sessionStorage.clear()
}
// I found if I had a wrong password, then went back to courses via canel then sign in again, the app would still have a
// invalid password, so  I wrote this to clear sessionStorage and reset invalid states.
resetLogin = () => {
    this.setState({
      invalidUser:false,
      invalidPass:false
    })
    window.sessionStorage.clear()
  }
// when the compnents mount, if there's a "user" in session storage, which would mean a successful match to users  db,
// it will then run the login function using the user email and password
componentDidMount() {
  if (sessionStorage.user){
    let user = JSON.parse(window.sessionStorage.getItem('user'))
    this.logIn(user.emailAddress, user.password)
  }
}
render() {
// this is the provider, it has values to are given to all the routes between the opening and closing Provider
// where a consumer is used.
// the browserRouter, where props is put in the routes so the rendered components can use them as props.
//
    return (
      <Provider value={{
        user: this.state.user,
        currentUser: this.state.currentUser,
        invalidPass: this.state.invalidPass,
        invalidUser: this.state.invalidUser,
        actions: {
          create: this.createCourse,
          logIn: this.logIn,
          resetLogin: this.resetLogin,
          update: this.courseUpdater
        }
      }}>

      <BrowserRouter>
          <div>
              <div className='main-Header'>
                <Route path='/' render={  () => <Header signOut={this.signOut} /> } />
               </div>
          <Switch>
              <Route exact path='/' render={ () => <Redirect to='/Courses'/>} />
              <Route exact path='/Courses' render={ () => <Courses />} />
              <PrivateRoute exact path='/courses/create' component={CreateCourse}   />
              <PrivateRoute2 exact path='/Courses/:id/Update'   update={this.courseUpdater} user={this.state.user} component={UpdateCourses} />} />
              <Route path='/Courses/:id' render={ ({match}) => <CourseDetail id={match.params.id} user={this.state.user} activeUser={this.state.activeUser} />} />
              <Route path='/Sign-In' render={ () => <SignIn logIn={this.logIn} resetLogin={this.resetLogin} error={this.state.error} currentUser={this.currentUser} invalidUser={this.state.invalidUser} invalidPass={this.invalidPass} />} />
              <Route path='/Sign-Up' render={ () => <SignUp logIn={this.logIn} error={this.state.error} validation={this.state.validation}/>} />
              <Route path='/Sign-Out' render={() => <SignOut signOut={this.signOut} /> } />
              <Route path='/Error' render={ () => <Error />} />
              <Route path='/Forbidden' render={() => <Forbidden />} />
              <Route component= { NotFound } />
          </Switch>

        </div>
        </BrowserRouter>
        </Provider>
      )


  }
}

export default App
