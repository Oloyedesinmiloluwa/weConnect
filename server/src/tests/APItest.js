import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import businessRoute from '../routes/businessRoute';
import userRoute from '../routes/userRoute';

const should = chai.should();
chai.use(chaiHttp);
describe('Test for Business API endpoints', () => {
  describe('/POST User', () => {
    it('It should add new user', (done) => {
      chai.request(userRoute)
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
      chai.request(userRoute)
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
    it('It should not create account with invalid email', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'sinmyahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid email');
          done();
        });
    });
    it('It should sign in user', (done) => {
      chai.request(userRoute)
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
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'sinmiloluwasunday@yahoo.com', password: 'test ko test ni'
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Invalid username or password');
          done();
        });
    });
  });
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
          email: 'sinmiloluwasunday@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.id, 2);
          done();
        });
    });
    it('It should not register Business if missing required field', (done) => {
      chai.request(businessRoute)
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
      chai.request(businessRoute)
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
      chai.request(businessRoute)
        .post('/businesses/tuuy/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing Businesses ID', (done) => {
      chai.request(businessRoute)
        .post('/businesses/9000000/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
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
          assert.equal(res.body[0].location, 'Lagos');
          assert.notEqual(res.body[1].location, 'Jos');
          done();
        });
    });
    it('It should get only Businesses in a chosen category', (done) => {
      chai.request(businessRoute)
        .get('/businesses?category=Agriculture')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is type Array');
          assert.equal(res.body[0].category, 'Agriculture');
          assert.notEqual(res.body[1].category, 'Education');
          done();
        });
    });
    it('It should get reviews of a Business', (done) => {
      chai.request(businessRoute)
        .get('/businesses/0/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          assert.isArray(res.body, 'The response is Array');
          done();
        });
    });
    it('It should get a single Business', (done) => {
      chai.request(businessRoute)
        .get('/businesses/0')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.eql(0);
          assert.isObject(res.body, 'The response is object');
          done();
        });
    });
    it('It should return Not found for an invalid Id', (done) => {
      chai.request(businessRoute)
        .get('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('/PUT Business', () => {
    it('It should update a Business', (done) => {
      chai.request(businessRoute)
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
      chai.request(businessRoute)
        .put('/businesses/tuuy')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a non-existing Businesses ID', (done) => {
      chai.request(businessRoute)
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
      chai.request(businessRoute)
        .delete('/businesses/0')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
    it('It should NOT process a non-existing Businesses ID', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
    it('It should NOT process a negative valued Businesses ID', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/-900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
});
