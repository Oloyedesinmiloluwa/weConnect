import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const resetPassword = () => {
  describe('RESET PASSWORD', () => {
    it('It should reset user\'s password', (done) => {
      chai.request(userRoute)
        .put('/users/1')
        .send({
          newPassword: 'testtest'
        })
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Password successfully changed');
          done();
        });
    });
    it('It should not reset password if empty', (done) => {
      chai.request(userRoute)
        .put('/users/1')
        .send({
          newPassword: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'Password must have a value');
          done();
        });
    });
    it('It should not reset password if undefined', (done) => {
      chai.request(userRoute)
        .put('/users/1')
        .send({
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'Password must have a value');
          done();
        });
    });
    it('It should not reset password if empty', (done) => {
      chai.request(userRoute)
        .put('/users/1')
        .send({
          newPassword: 'testtest'
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(res.body.message, 'Password must be new');
          done();
        });
    });
  });
};
export default resetPassword;
