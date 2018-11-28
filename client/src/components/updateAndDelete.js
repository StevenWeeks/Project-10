
import React, { Component } from 'react';
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'

class UpdateAndDelete extends Component {
  courseDelete = (id) => {
    let banana = JSON.parse(window.localStorage.getItem('auth'))
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
  <Link className="button" href="" to={this.props.update}>Update Course</Link>
  <a className="button" href='/'  onClick={this.handleSubmit}>Delete Course</a>
  </span>
    )
  }
}

export default withRouter(UpdateAndDelete)
