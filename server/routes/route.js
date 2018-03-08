import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/controller';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .post(appController.post);
myRoute.route('/businesses/:businessId')
  .put(appController.update);
export default myRoute;
