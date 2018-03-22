import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/userController';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/auth/signup')
  .post(appController.signUp);

myRoute.route('/auth/login')
  .post(appController.login);

export default myRoute;
