import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import myRoute from '../routes/route';

dotenv.config();
const should = chai.should();
chai.use(chaiHttp);
describe('Test for Business API endpoints', () => {
  describe('/POST User', () => {
    it('It should add new user', (done) => {
      chai.request(myRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'sinmiloluwasunday@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully created an account');
          done();
        });
    });
    it('It should not add user missing required field', (done) => {
      chai.request(myRoute)
        .post('/auth/signup')
        .send({
          lastName: 'Love', email: 'sinmiloluwasunday@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('All fields are required');
          done();
        });
    });
    it('It should sign in user', (done) => {
      chai.request(myRoute)
        .post('/auth/login')
        .send({
          email: 'sinmiloluwasunday@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully logged in');
          done();
        });
    });
    it('It should not sign in user with wrong credentials', (done) => {
      chai.request(myRoute)
        .post('/auth/login')
        .send({
          email: 'sinmiloluwasunday@yahoo.com', password: 'testko'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Invalid Password');
          done();
        });
    });
  });
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
          assert.equal(res.body.id, 1);
          done();
        });
    });
    it('It should register another Business', (done) => {
      chai.request(myRoute)
        .post('/businesses')
        .send({
          name: 'second business',
          description: 'We are very good at helping everyone',
          address: 'oyo, oyo state',
          location: 'Oyo',
          category: 'Education',
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
        .post('/businesses/1/reviews')
        .send({
          review: 'this is very great',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.review.length, 1);
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
    it('It should get only Businesses in a chosen location', (done) => {
      chai.request(myRoute)
        .get('/businesses?location=Lagos')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].location, 'Lagos');
          // assert.notEqual(res.body[2].location, 'Oyo');
          done();
        });
    });
    it('It should get only Businesses in a chosen category', (done) => {
      chai.request(myRoute)
        .get('/businesses?category=Agriculture')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].category, 'Agriculture');
          // assert.notEqual(res.body[2].category, 'Education');
          done();
        });
    });
    it('It should get reviews of a Business', (done) => {
      chai.request(myRoute)
        .get('/businesses/1/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is Array');
          done();
        });
    });
    it('It should get a single Business', (done) => {
      chai.request(myRoute)
        .get('/businesses/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.eql(1);
          assert.isObject(res.body, 'The response is object');
          done();
        });
    });
    it('It should return Not found for an invalid Id', (done) => {
      chai.request(myRoute)
        .get('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('/PUT Business', () => {
    it('It should update a Business', (done) => {
      chai.request(myRoute)
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
        .delete('/businesses/1')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
    it('It should NOT process a non-existing Business ID', (done) => {
      chai.request(myRoute)
        .delete('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a negative valued Business ID', (done) => {
      chai.request(myRoute)
        .delete('/businesses/-900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
  describe('/PUT User', () => {
    it('It should reset user\'s password', (done) => {
      chai.request(myRoute)
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
  });
  describe('/DELETE User', () => {
    it('It should delete user\'s account', (done) => {
      chai.request(myRoute)
        .delete('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Account Deleted Successfully');
          done();
        });
    });
  });
});
