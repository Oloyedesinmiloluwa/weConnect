import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const postBusinessTest = () => {
  describe('/POST Business', () => {
    it('It should register Business', (done) => {
      chai.request(businessRoute)
        .post('/businesses')
        .send({
          name: 'my business',
          description: 'We are very good at helping everyone',
          address: 'lagos, lagos state',
          location: 'Lagos',
          category: 'Agriculture',
          email: 'sinmi@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.id, 2);
          done();
        });
    });
    it('It should register another Business', (done) => {
      chai.request(businessRoute)
        .post('/businesses')
        .send({
          name: 'second business',
          description: 'We are very good at helping everyone',
          address: 'oyo, oyo state',
          location: 'Oyo',
          category: 'Education',
          email: 'sinmi@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.id, 3);
          done();
        });
    });
    it('It should not register Business if missing name', (done) => {
      chai.request(businessRoute)
        .post('/businesses')
        .send({
          name: '',
          description: 'we are good',
          address: 'lagos, lagos state',
          location: 'Lagos',
          category: 'Agriculture',
          email: 'sinmi@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Business name and description required');
          done();
        });
    });
    it('It should not register Business if missing description', (done) => {
      chai.request(businessRoute)
        .post('/businesses')
        .send({
          name: 'Trump Tower',
          description: '',
          address: 'lagos, lagos state',
          location: 'Lagos',
          category: 'Agriculture',
          email: 'sinmi@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Business name and description required');
          done();
        });
    });
  });
};
export default postBusinessTest;
