import express from 'express';
import bodyParser from 'body-parser';
import userController from '../controllers/userController';
import authWare from '../middlewares/auth';
import inputValidator from '../middlewares/validateUser';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/auth/signup')
  .post(inputValidator.signUp, userController.signUp);

myRoute.route('/auth/login')
  .post(userController.login);

myRoute.route('/users')
  .get(authWare, userController.getUsers);

myRoute.route('/users/:userId')
  .put(authWare, inputValidator.resetPassword, userController.resetPassword)
  .delete(authWare, userController.deleteUser);

myRoute.route('/auth/logout')
  .post((req, res) => {
    process.env.token = null;
    res.status(200).send({ message: 'Successfully logged out' });
  });
export default myRoute;
