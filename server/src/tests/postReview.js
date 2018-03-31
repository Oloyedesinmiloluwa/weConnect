import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const postReviewTest = () => {
  describe('/POST Review', () => {
    it('It should post review for a Business', (done) => {
      chai.request(businessRoute)
        .post('/businesses/1/reviews')
        .send({
          review: 'this is very great',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.business.review.length, 2);
          done();
        });
    });
    it('It should NOT process an invalid Businesses ID', (done) => {
      chai.request(businessRoute)
        .post('/businesses/tuuy/reviews')
        .send({
          review: 'this is very great',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process an empty review field', (done) => {
      chai.request(businessRoute)
        .post('/businesses/1/reviews')
        .send({
          review: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Review field cannot be empty');
          done();
        });
    });
    it('It should NOT process a review field that is undefined', (done) => {
      chai.request(businessRoute)
        .post('/businesses/1/reviews')
        .send({
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Review field cannot be empty');
          done();
        });
    });
    it('It should not send email to user if not requested', (done) => {
      chai.request(businessRoute)
        .post('/businesses/1/reviews')
        .send({
          review: 'never contact me'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.mailReport.should.be.eql('Email not sent');
          done();
        });
    });
    it('It should send email to user if requested', (done) => {
      chai.request(businessRoute)
        .post('/businesses/1/reviews')
        .send({
          review: 'please contact me'
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
};
export default postReviewTest;
