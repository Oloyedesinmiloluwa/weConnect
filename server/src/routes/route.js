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
export default myRoute;
