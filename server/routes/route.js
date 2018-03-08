import express from 'express';
import bodyParser from 'body-parser';
import appController from '../controllers/controller';

const myRoute = express();
myRoute.use(bodyParser.json());
myRoute.use(bodyParser.urlencoded({ extended: false }));
myRoute.route('/businesses')
  .post(appController.post);
export default myRoute;
