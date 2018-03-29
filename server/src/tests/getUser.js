import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const getUserTest = () => {
  describe('/GET Users', () => {
    it('It should not get all users if not admin', (done) => {
      chai.request(userRoute)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal(res.body.message, 'Unauthorized User');
          done();
        });
    });
    it('It should sign in admin', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'admin@weconnect.com', password: 'admin'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully logged in');
          done();
        });
    });
    it('It should get all users if admin', (done) => {
      chai.request(userRoute)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          done();
        });
    });
  });
};
export default getUserTest;
