import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/business';
import inputValidator from '../middlewares/validate';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .get(appController.getAll)
  .post(inputValidator.post, appController.post);

myRoute.route('/businesses/:businessId')
  .get(appController.getOne)
  .put(inputValidator.update, appController.update)
  .delete(appController.delete);

myRoute.route('/businesses/:businessId/reviews')
  .get(appController.getReviews)
  .post(appController.postReview);

export default myRoute;
