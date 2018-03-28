import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/user';
import authWare from '../middlewares/auth';
import inputValidator from '../middlewares/validateUser';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/auth/signup')
  .post(inputValidator.signUp, appController.signUp);

myRoute.route('/auth/login')
  .post(appController.login);

myRoute.route('/users')
  .get(authWare, appController.getUsers);

myRoute.route('/users/:userId')
  .put(authWare, inputValidator.resetPassword, appController.resetPassword)
  .delete(authWare, appController.deleteUser);

myRoute.route('/auth/logout')
  .post((req, res) => {
    process.env.token = null;
    res.status(200).send({ message: 'Successfully logged out' });
  });
export default myRoute;
