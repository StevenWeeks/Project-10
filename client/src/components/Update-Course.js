import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Validation from './Validation'
import axios from 'axios'

class UpdateCourses extends Component {
  constructor(){
    super()
      this.state = {
        description:'',
        estimatedTime:'',
        id:'',
        materialsNeeded:'',
        redirect: false,
        title:'',
        user:'',
        userId:'',
      }
  }
// after a user clicks on a course from the main directory, the app will then load a courses
// using the props match params in the route provided by app.js to grab a course from the db
// it then sets the state of course items.  and if it's not the course creator, pushes them to /Forbidden.
  componentDidMount(){
  axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
  .then (response => {
    this.setState({
      description: response.data.description,
      estimatedTime: response.data.estimatedTime,
      id: response.data._id,
      materialsNeeded: response.data.materialsNeeded,
      title: response.data.title,
      user: (`${response.data.user[0].firstName} ${response.data.user[0].lastName}`),
      userId: response.data.user[0]._id
    })
    if(response.data.user[0]._id !== this.props.user._id) {
                this.props.history.push('/Forbidden');
            }
  })
  .catch(error => {
  if (error.response.status === 400 ) {
    this.props.history.push('/Error')
  }
  if (error.response.status === 404) {
    this.props.history.push('/NotFound')
  } else {
  this.props.history.push('/Error')
    }
  })
}


// setup for a redirect used when the cancel button is clicked.  Sends user back to Courses
setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/courses' />
      }
}

// the function that actually updates the course using axios.put, it updates db entry of the course based on the id
// using headers Authorization to authorize the put command.
// then pushes the user to the course detail page.  also handles a few errors, which is picked up in validation.js
courseUpdater = ( descrip, mats, time, title, id) => {
let speak = JSON.parse(window.sessionStorage.getItem('auth'))
axios.put(`http://localhost:5000/api/courses/${id}`, {
description: descrip,
estimatedTime: time,
materialsNeeded: mats,
title: title
}, {
headers: {
    'Authorization': speak
  }
})
.then (response => {
this.props.history.push(`/courses/${this.state.id}`)
})
.catch(error => {
    if (error.response.status === 400) {
      this.setState({
        validation: true,
        error: error.response.data.message
      })

    } else {
      this.props.history.push('/Error');
    }
  })
}
// these are called when the submit button is hit, it sets the state of the
// items as seen, with the value of the text in the inputs/textareas.
  Desc = e => { this.setState({ description: e.target.value }) }
  Mats = e => { this.setState({ materialsNeeded: e.target.value }) }
  Time = e => { this.setState({ estimatedTime: e.target.value }) }
  Title = e => { this.setState({ title: e.target.value }) }

handleSubmit = e => {
e.preventDefault();
this.courseUpdater(this.state.description, this.state.materialsNeeded,  this.state.estimatedTime, this.state.title,  this.state.id);
}
// this is how validation.js is given the errors to handle, just after the render.  The html in the return statement is rendered when the page
// loads, had to use onChange here because it set a value, onBlur has no value until blurred, so nothing was being filled in when this loaded with onBlur in the html.
render(){
  let thisValid
  if (this.state.validation){
        thisValid = <Validation error={this.state.error} />
      }
  return(
<div className="bounds">
{thisValid}
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course Name" onChange={this.Title} value={this.state.title}/>
                </div>
                <p>By {this.state.user}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.Desc} value={this.state.description}>
                </textarea>
              </div>
                </div>
                </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Time" onChange={this.Time} value={this.state.estimatedTime}/>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.Mats} value={this.state.materialsNeeded}>
                    </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">{this.renderRedirect()}<button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.setRedirect}>Cancel</button></div>
            </form>
            </div>

        </div>
      </div>
    )
  }
}
  export default UpdateCourses;
