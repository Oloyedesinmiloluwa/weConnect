import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/controller';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .get(appController.getAll)
  .post(appController.post);
myRoute.route('/businesses/:businessId')
  .get(appController.getOne)
  .put(appController.update)
  .delete(appController.delete);
myRoute.route('/businesses/:businessId/reviews')
  .get(appController.getReviews)
  .post(appController.postReview);
myRoute.route('/auth/signup')
  .post(appController.signUp);
myRoute.route('/auth/login')
  .post(appController.login);
export default myRoute;
