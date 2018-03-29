import express from 'express';
import bodyParser from 'body-parser';
import businessController from '../controllers/businessController';
import inputValidator from '../middlewares/validate';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .get(businessController.getAll)
  .post(inputValidator.post, businessController.post);

myRoute.route('/businesses/:businessId')
  .get(businessController.getOne)
  .put(inputValidator.update, businessController.update)
  .delete(businessController.delete);

myRoute.route('/businesses/:businessId/reviews')
  .get(businessController.getReviews)
  .post(businessController.postReview);

export default myRoute;
