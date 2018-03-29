import express from 'express';
import bodyParser from 'body-parser';
import businessController from '../controllers/businessController';
import authWare from '../middlewares/auth';
import inputValidator from '../middlewares/validateBusiness';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .get(businessController.getAll)
  .post(authWare, inputValidator.post, businessController.post);

myRoute.route('/businesses/:businessId')
  .get(businessController.getOne)
  .put(authWare, inputValidator.update, businessController.update)
  .delete(authWare, businessController.delete);

myRoute.route('/businesses/:businessId/reviews')
  .get(businessController.getReviews)
  .post(businessController.postReview);
export default myRoute;
