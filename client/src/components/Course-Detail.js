import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import UpdateAndDelete from './updateAndDelete'
import {Consumer} from './Context';
class CourseDetail extends Component {
  constructor(){
    super()
      this.state = {
      }
  }
// details of a course that's gotten from a db.   loads in the id, title, user, etc
// catches errors for 404 and other, when user tries to goto ids of non-existence Courses
// or does some other error.
componentDidMount(){
  axios.get(`http://localhost:5000/api/courses/${this.props.id}`)
  .then (response => {
    console.log(response, "yellow")
    this.setState({
      id: response.data._id,
      title: response.data.title,
      user: (`${response.data.user[0].firstName} ${response.data.user[0].lastName}`),
      userId: response.data.user[0]._id,
      description: response.data.description,
      time: response.data.estimatedTime,
      materials: response.data.materialsNeeded
    })

})
.catch(error => {
  if (error.response.status === 404){
    this.props.history.push('/NotFound')
} else {
  this.props.history.push('/Error')}
})
}

// this is what renders on the page, using props and context.  Checks the current users
// id versus the state of the userId  set for the course, to show the update/delete buttons.
// items added to materials and description are markdown, so if a user types in the methods
// to list items, they will appear as items on a list. "* item "
  render(){
return (
<Consumer>
{ context => {
  let spot;
  if(context.user._id === this.state.userId){
          spot =  <UpdateAndDelete update={`/courses/${this.props.id}/Update`} courseDelete={this.props.courseDelete} user={this.props.user}  id={this.props.id} />
    }
  return (
<div>

        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>{spot}</span><Link className="button button-secondary" to="/">Return to List</Link></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.title}</h3>
              <p>By {this.state.user} </p>
            </div>
            <div className="course--description">
              <h4 className="course--description"> Description</h4>
              <ReactMarkdown>{this.state.description}</ReactMarkdown>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.time}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                    <ReactMarkdown>{this.state.materials}</ReactMarkdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     )
   }}
 </Consumer>
)
 }
}

  export default CourseDetail
