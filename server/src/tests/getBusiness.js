import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const getBusinessTest = () => {
  describe('/GET Business', () => {
    it('It should get all Businesses', (done) => {
      chai.request(businessRoute)
        .get('/businesses')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          done();
        });
    });
    it('It should get only Businesses in a chosen location', (done) => {
      chai.request(businessRoute)
        .get('/businesses?location=Lagos')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].location, 'lagos');
          assert.notEqual(res.body[1].location, 'oyo');
          done();
        });
    });
    it('It should get only Businesses in a chosen category', (done) => {
      chai.request(businessRoute)
        .get('/businesses?category=Agriculture')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].category, 'agriculture');
          assert.notEqual(res.body[1].category, 'education');
          done();
        });
    });
    it('It should get reviews of a Business', (done) => {
      chai.request(businessRoute)
        .get('/businesses/1/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is Array');
          done();
        });
    });
    it('It should get a single Business', (done) => {
      chai.request(businessRoute)
        .get('/businesses/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.eql(1);
          assert.isObject(res.body, 'The response is object');
          done();
        });
    });
    it('It should return Not found for an invalid Id', (done) => {
      chai.request(businessRoute)
        .get('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('Business Not Found');
          done();
        });
    });
    it('It should NOT process an invalid Businesses ID', (done) => {
      chai.request(businessRoute)
        .get('/businesses/tuuy')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
};
export default getBusinessTest;
