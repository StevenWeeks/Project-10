
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
        localStorage.setItem("user", JSON.stringify(response.data))
        localStorage.setItem("auth", JSON.stringify(response.config.headers.Authorization))
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

signOut = () => {
  this.setState({
    user: '',
    currentUser: false,
  });
  window.localStorage.clear();
}

resetLogin = () => {
    this.setState({
      invalidUser:false,
      invalidPass:false
    })
    window.localStorage.clear()
  }

componentDidMount() {
  if (localStorage.user){
    let user = JSON.parse(window.localStorage.getItem('user'))
    this.logIn(user.emailAddress, user.password)
  }
}
render() {

    return (
      <Provider value={{
        user: this.state.user,
        currentUser: this.state.currentUser,
        invalidPass: this.state.invalidPass,
        invalidUser: this.state.invalidUser,
        actions: {
          logIn: this.logIn,
          update: this.courseUpdater,
          create: this.createCourse,
          resetLogin: this.resetLogin
        }
      }}>
      <BrowserRouter>
          <div>
              <div className='main-Header'>
                <Route path='/' render={  () => <Header signOut={this.signOut} user={this.state.user} /> } />
               </div>
          <Switch>
              <Route exact path='/' render={ () => <Redirect to='/Courses'/>} />
              <Route exact path='/Courses' render={ () => <Courses />} />
              <PrivateRoute exact path='/courses/create' component={CreateCourse} user={this.state.user}   />
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
