import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/userController';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/auth/signup')
  .post(userController.signUp);

myRoute.route('/auth/login')
  .post(userController.login);

export default myRoute;
