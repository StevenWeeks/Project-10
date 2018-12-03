import {withRouter} from 'react-router-dom'
// user clicks signout on header, goes to this, which uses props.signout from app.js, pushes user back to Courses
// return null, as there's nothing to return.
const SignOut = (props) => {
  props.signOut()
  props.history.push("/")
  return null
}
export default withRouter(SignOut)
