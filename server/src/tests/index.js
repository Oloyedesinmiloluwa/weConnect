import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import userTest from './userTest';
import resetPassword from './resetPassword';
import deleteUserTest from './deleteUser';
import loginUserTest from './loginUser';
import getUserTest from './getUser';
import postBusinessTest from './postBusiness';
import getBusinessTest from './getBusiness';
import updateBusinessTest from './updateBusiness';
import deleteBusinessTest from './deleteBusiness';
import postReviewTest from './postReview';

dotenv.config();
chai.should();
chai.use(chaiHttp);
describe('Test for Business API endpoints', () => {
  userTest();
  postBusinessTest();
  getBusinessTest();
  postReviewTest();
  updateBusinessTest();
  deleteBusinessTest();
  resetPassword();
  deleteUserTest();
  loginUserTest();
  getUserTest();
});
