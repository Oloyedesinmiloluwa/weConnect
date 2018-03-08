import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import myRoute from '../routes/route';

const should = chai.should();
chai.use(chaiHttp);
describe('Test for Business API endpoints', () => {
  describe('/POST Business', () => {
    it('It should register Business', (done) => {
      chai.request(myRoute)
        .post('/businesses')
        .send({
          name: 'my business',
          description: 'We are very good at helping everyone',
          address: 'lagos, lagos state',
          location: 'Lagos',
          category: 'Agriculture',
          email: 'sinmiloluwasunday@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.id, 2);
          done();
        });
    });
    it('It should not register Business if missing required field', (done) => {
      chai.request(myRoute)
        .post('/businesses')
        .send({
          address: 'lagos, lagos state',
          location: 'Lagos',
          category: 'Agriculture',
          email: 'sinmiloluwasunday@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Business name and description required');
          done();
        });
    });
  });
  describe('/POST Review', () => {
    it('It should post review for a Business', (done) => {
      chai.request(myRoute)
        .post('/businesses/0/reviews')
        .send({
          review: 'this is very great',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.review.length, 2);
          done();
        });
    });
    it('It should NOT process an invalid Businesses ID', (done) => {
      chai.request(myRoute)
        .put('/businesses/tuuy')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
  describe('/GET Business', () => {
    it('It should get all Businesses', (done) => {
      chai.request(myRoute)
        .get('/businesses')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          done();
        });
    });
    it('It should get reviews of a Business', (done) => {
      chai.request(myRoute)
        .get('/businesses/0/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is Array');
          done();
        });
    });
  });
  describe('/PUT Business', () => {
    it('It should update a Business', (done) => {
      chai.request(myRoute)
        .put('/businesses/0')
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
      chai.request(myRoute)
        .put('/businesses/tuuy')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing Businesses ID', (done) => {
      chai.request(myRoute)
        .put('/businesses/9000000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
  describe('/delete Business', () => {
    it('It should delete an existing Business', (done) => {
      chai.request(myRoute)
        .delete('/businesses/0')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
    it('It should NOT process a non-existing Businesses ID', (done) => {
      chai.request(myRoute)
        .delete('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a negative valued Businesses ID', (done) => {
      chai.request(myRoute)
        .delete('/businesses/-900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
});
