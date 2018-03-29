import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const loginUser = () => {
  describe('/LOG IN User', () => {
    it('It should login another user', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully logged in');
          done();
        });
    });
    it('non-author should not be able to delete business', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/2')
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('User should not be able to update another\'s Business', (done) => {
      chai.request(businessRoute)
        .put('/businesses/2')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.be.eql('Unauthorized User');
          done();
        });
    });
    it('User should not be able to reset another\'s password', (done) => {
      chai.request(userRoute)
        .put('/users/2')
        .send({
          newPassword: 'testtest'
        })
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal(res.body.message, 'Unauthorized User');
          done();
        });
    });
  });
};
export default loginUser;
