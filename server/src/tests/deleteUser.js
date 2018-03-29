import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const deleteUser = () => {
  describe('/DELETE User', () => {
    it('It should delete user\'s account', (done) => {
      chai.request(userRoute)
        .delete('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Account Deleted Successfully');
          done();
        });
    });
  });
  describe('/Unauthorized Acess', () => {
    it('It should logout user', (done) => {
      chai.request(userRoute)
        .post('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Successfully logged out');
          done();
        });
    });
    it('It should not register Business if not authenticated', (done) => {
      chai.request(businessRoute)
        .post('/businesses')
        .send({
          name: 'last business',
          description: 'We are very good at helping everyone',
          address: 'oyo, oyo state',
          location: 'Oyo',
          category: 'Education',
          email: 'sinmi@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Authentication failed');
          done();
        });
    });
    it('Should not delete Business if not authenticated', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/2')
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Authentication failed');
          done();
        });
    });
    it('Should not update Business if not authenticated', (done) => {
      chai.request(businessRoute)
        .put('/businesses/2')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Authentication failed');
          done();
        });
    });
  });
};
export default deleteUser;
