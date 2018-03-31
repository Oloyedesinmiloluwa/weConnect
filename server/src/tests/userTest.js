import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const userTest = () => {
  describe('/POST User', () => {
    it('It should add new user', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'sinmi@yahoo.com', password: 'test', notify: 'true'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully created an account');
          done();
        });
    });
    it('It should not add user missing required field', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          lastName: 'Love', firstName: '', email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('All fields are required');
          done();
        });
    });
    it('It should not create user with invalid email', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'sinmiyahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid email address');
          done();
        });
    });
    it('It should sign in user', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email:'sinmiloluwasunday@yahoo.com', password: 'tester'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully logged in');
          done();
        });
    });
    it('It should not sign in user with an unexisting username ', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: '111@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Invalid username');
          done();
        });
    });
    it('It should not sign in user with a wrong password ', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'sinmi@yahoo.com', password: 'testko'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Invalid Password');
          done();
        });
    });
  });
};
export default userTest;
