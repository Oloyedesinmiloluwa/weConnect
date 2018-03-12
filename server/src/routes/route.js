import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/controller';
import authWare from '../middlewares/auth';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .get(appController.getAll)
  .post(authWare, appController.post);
myRoute.route('/businesses/:businessId')
  .get(appController.getOne)
  .put(authWare, appController.update)
  .delete(authWare, appController.delete);
myRoute.route('/businesses/:businessId/reviews')
  .get(appController.getReviews)
  .post(appController.postReview);
myRoute.route('/auth/signup')
  .post(appController.signUp);
myRoute.route('/auth/login')
  .post(appController.login);
myRoute.route('/users')
  .get(appController.getUsers); // remove later
myRoute.route('/users/:userId')
  .put(authWare, appController.resetPassword)
  .delete(authWare, appController.deleteUser);
myRoute.route('/auth/logout')
  .post((req, res) => {
    process.env.token = null;
    res.sendStatus(200);
  });
export default myRoute;
