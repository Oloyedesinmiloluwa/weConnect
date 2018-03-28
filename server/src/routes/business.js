import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/business';
import authWare from '../middlewares/auth';
import inputValidator from '../middlewares/validateBusiness';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .get(appController.getAll)
  .post(authWare, inputValidator.post, appController.post);

myRoute.route('/businesses/:businessId')
  .get(appController.getOne)
  .put(authWare, inputValidator.update, appController.update)
  .delete(authWare, appController.delete);

myRoute.route('/businesses/:businessId/reviews')
  .get(appController.getReviews)
  .post(appController.postReview);
export default myRoute;
