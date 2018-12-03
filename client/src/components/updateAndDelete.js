
import React, { Component } from 'react';
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

// have the delete function in here, as it doesn't have it's own rendered page but still needs a handle submit
// on the delete button. This deletes the courses based on the id in props.  User can only get here if when they
//click on a course from main courses screen, their id matches to the creator's id.
class UpdateAndDelete extends Component {
  courseDelete = (id) => {
    let banana = JSON.parse(window.sessionStorage.getItem('auth'))
    axios.delete(`http://localhost:5000/api/courses/${id}`,
      {
        headers: {
            'Authorization': banana
          }
        })
        .then (response => this.props.history.push('/'))
        .catch (err => this.props.history.push('/Error'))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.courseDelete(this.props.id);
     }

render() {
  return (
  <span>
  <Link className="button" to={this.props.update}>Update Course</Link>
  <a className="button" href='/'  onClick={this.handleSubmit}>Delete Course</a>
  </span>
    )
  }
}

export default withRouter(UpdateAndDelete)
