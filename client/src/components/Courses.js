import React, {Component} from 'react';
import CourseLister from './CourseLister'
import axios from 'axios'
import {NavLink, withRouter} from 'react-router-dom';


class Courses extends Component {
  constructor() {
        super();
        this.state = {
          courses: []
        }
      }

componentDidMount(){
axios.get('http://localhost:5000/api/courses')
.then (response => {
  this.setState({
    courses: response.data
  })
})
.catch(error => {
  return this.props.history.push("/Error")
})
}

render(){
let courses = this.state.courses
  let coursee;
  if (courses.length > 0){
    coursee = courses.map(course => <CourseLister title={course.title}  key={course._id} id={course._id}/>)
  }
  return (
<div className="bounds">
        { coursee }
        <div className="grid-33"><NavLink className="course--module course--add--module" to="/Courses/Create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
              </NavLink>
          </div>
      </div>

      )
    }
  }

  export default withRouter(Courses);
