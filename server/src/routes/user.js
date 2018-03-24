import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/user';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/auth/signup')
  .post(appController.signUp);

myRoute.route('/auth/login')
  .post(appController.login);

export default myRoute;
