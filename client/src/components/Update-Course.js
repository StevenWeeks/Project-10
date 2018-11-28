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

  ChangeDesc = e => {
    this.setState({ description: e.target.value })
  }
  ChangeMats = e => {
    this.setState({ materialsNeeded: e.target.value })
  }
  ChangeTime = e => {
    this.setState({ estimatedTime: e.target.value })
  }
  ChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
}
courseUpdater = ( descrip, mats, time, title, id) => {
let speak = JSON.parse(window.localStorage.getItem('auth'))
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


handleSubmit = e => {
e.preventDefault();
this.courseUpdater(this.state.description, this.state.materialsNeeded,  this.state.estimatedTime, this.state.title,  this.state.id);
}

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
                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course Name" onChange={this.ChangeTitle} value={this.state.title}/>
                </div>
                <p>By {this.state.user}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.ChangeDesc} value={this.state.description}>
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
                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.ChangeTime} value={this.state.estimatedTime}/>
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.ChangeMats} value={this.state.materialsNeeded}>
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
