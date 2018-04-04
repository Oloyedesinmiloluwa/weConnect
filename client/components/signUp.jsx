import React from 'react';

export default class Signup extends React.Component {
 render() {
  return (
    <div className="bg-light card_custom">
  <h1 className="text-center" id="homeh1"> Welcome to Weconnect!</h1>
  <h6 className="text-center">Please provide your details to create an account</h6>

  <div className="container">
    <div className="row">
    </div>
    <div className=" mx-auto" id="homerow">
      <form>
        <div className="form-group row">
          <label htmlFor="fname" className="col-md-3 col-form-label">First Name</label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="fname" placeholder="First Name" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="lname" className="col-md-3 col-form-label">Last Name</label>
          <div className="col-md-8">
            <input type="text" className="form-control" id="lname" placeholder="Last Name" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-md-3 col-form-label">Email</label>
          <div className="col-md-8">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-md-3 col-form-label">Password</label>
          <div className="col-md-8">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-md-3 col-md-8">
            <button type="submit" className="btn btn-primary">Create account</button>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-3">
            Already have an account? Sign in
            <a href="Signin.html">here</a>
          </div>
        </div>
      </form>
    </div>
    </div>
  </div>
  );
}
}