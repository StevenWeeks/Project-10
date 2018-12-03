import React from 'react';

// this is where error messages are handled for signin, singup, and course components
// props are passed into this, it then checks what the error message says, and passes back
// an appropriate message for the user to see.  
const Validation = (props) => {
  console.log(props, "haha")
  let err = props.error
  console.log(err,"cama")
  let errB = Object.keys(err)
  let burrito = []
  console.log(errB, "milk")

  if (err === "InvalidEmail") {
     burrito.push(<li key={err}>Please enter a valid Email</li>)
     errB= []
   } else if (err === "Email already in use") {
     burrito.push(<li key={err}>That Email is already in use</li>)
     errB= []
   } else if (err === "Password Confirm") {
     burrito.push(<li key={err}>Please Confirm Password </li>)
     errB= []
   }
if (errB.length > 0 ){
   console.log("mellow")
   for (let i = 0; i < errB.length; i++){
     burrito.push(<li key={errB[i]}>Please check "{errB[i]}" field</li>)
   }
 } else if (errB.includes("title"||"description")) {
     for (let i = 0; i< errB.length; i++){
       burrito.push(<li key={errB[i]}>Please check "{errB[i]}" field</li>)
   }
 }





return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
            <ul>
              {burrito}
                </ul>
              </div>
            </div>
)

}

export default Validation
