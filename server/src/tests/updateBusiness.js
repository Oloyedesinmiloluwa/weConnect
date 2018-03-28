import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const updateBusinessTest = () => {
  describe('/PUT Business', () => {
    it('It should update a Business', (done) => {
      chai.request(businessRoute)
        .put('/businesses/1')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('It should NOT process an invalid Businesses ID', (done) => {
      chai.request(businessRoute)
        .put('/businesses/tuuy')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing Businesses ID', (done) => {
      chai.request(businessRoute)
        .put('/businesses/9000000')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Business Not Found');
          done();
        });
    });
    it('It should NOT update if review field is present', (done) => {
      chai.request(businessRoute)
        .put('/businesses/1')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
          review: 'This is great'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('pls remove review from request body');
          done();
        });
    });
  });
};
export default updateBusinessTest;
