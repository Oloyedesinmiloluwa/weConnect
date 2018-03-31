# weConnect
[![Build Status](https://travis-ci.org/Oloyedesinmiloluwa/weConnect.svg?branch=develop)](https://travis-ci.org/Oloyedesinmiloluwa/weConnect)
[![Coverage Status](https://coveralls.io/repos/github/Oloyedesinmiloluwa/weConnect/badge.svg?branch=develop)](https://coveralls.io/github/Oloyedesinmiloluwa/weConnect?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f986c9b2b380d5bc7e92/maintainability)](https://codeclimate.com/github/Oloyedesinmiloluwa/weConnect/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f986c9b2b380d5bc7e92/test_coverage)](https://codeclimate.com/github/Oloyedesinmiloluwa/weConnect/test_coverage)


WeConnect provides a platform that brings businesses and individuals together. This platform
creates awareness for businesses and gives the users the ability to write reviews about the
businesses they have interacted with.
## Installation
* Prerequisite
  * Git
  * Node 8.9.1
  * NPM 5.5.1
  * Progresql<br>
  Ensure you have the prerequisites install then you can clone this repository in your local machine.Then, create a <code>.env</code>file that is like <code>.env.sample</code>. Afterward run <code> npm install </code> and run <code>npm run start:dev</code> for a quick start. Or you may build first, using <code>npm run build</code> then run <code>npm start</code>.
If you only want to access the completed work, you will find the link to the hosted work at the bottom of this file. Then you don't have to clone this repository!
## How it works 
* Users can:
  * Create an account
  * Post review for a business
  * Get all the reviews for a business
  * See registered businesses
  * See businesses in a preffered location
  * See businesses in a preffered category
* Authenticated users can:
    * Login to their account
    * Register a business       
    * Update their business profile
    * Remove their business
    * Reset password
    * delete account
* More Features
    * user can reset password
    * user can receive email notification
    * admin can get all users
## Authentication:
  * This app makes use of JSON Web Token (JWT) for authenticatio
  * A token is generated when a user is signed up or signed in, after which the user can access protected endpoints
  * The token is saved as an environment variable and authentication is done behind the scene 
## Technologies
  * Nodejs(ES6)
  * Express
  * Bootstrap
  * Postgresql
  * Sequelize
  * Babel
## Test
  Mocha was used as the testing framework with chai assertion library
  * You can run test after installation using <code>npm run test</code>
  * For continuous integration; you can make use of the ones with their badges at the top of this file. e.g. TravisCI, Coveralls etc

<h3>ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Functionality</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Create an account</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Signin to the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses</td>
      <td>Create a business</td>
  </tr>  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Delete a business you created</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Update a business you created</td>
  </tr>
  
  <tr>
      <td>POST</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Review a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId/reviews</td>
      <td>Get reviews of a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses</td>
      <td>Get all businesses</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses/:businessId</td>
      <td>Get details of a business</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?category={yourcategory}</td>
      <td>Get businesses in a specific category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/businesses?location={yourlocation}</td>
      <td>Get businesses in a specific location</td>
  </tr>
</table>
<br/>

## Author
Oloyede Sinmiloluwa <br>
You can access the app here https://weconnect-com.herokuapp.com/
And you can have access to the API documentation here https://weconnect-com.herokuapp.com/api-docs
