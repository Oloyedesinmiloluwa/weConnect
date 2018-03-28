import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';
import userRoute from '../routes/userRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
describe('Test for Business API endpoints', () => {
  describe('/POST User', () => {
    it('It should add new user', (done) => {
      chai.request(userRoute)
        .post('/auth/signup')
        .send({
          firstName: 'Grace', lastName: 'Love', email: 'sinmi@yahoo.com', password: 'test', notify: true
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
          assert.notEqual(res.body[1].location, 'Oyo');
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
  describe('/delete Business', () => {
    it('It should delete an existing Business', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql('Business successfully deleted');
          done();
        });
    });
    it('It should NOT process a non-existing Business ID', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/900000')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.eql('Business Not Found');
          done();
        });
    });
    it('It should NOT process a negative valued Business ID', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/-900000')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql('Invalid ID');
          done();
        });
    });
  });
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
  describe('/DELETE User', () => {
    it('It should delete user\'s account', (done) => {
      chai.request(userRoute)
        .delete('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Account Deleted Successfully');
          done();
        });
    });
  });
  describe('/Unauthorized Acess', () => {
    it('It should logout user', (done) => {
      chai.request(userRoute)
        .post('/auth/logout')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(res.body.message, 'Successfully logged out');
          done();
        });
    });
    it('It should not register Business if not authenticated', (done) => {
      chai.request(businessRoute)
        .post('/businesses')
        .send({
          name: 'last business',
          description: 'We are very good at helping everyone',
          address: 'oyo, oyo state',
          location: 'Oyo',
          category: 'Education',
          email: 'sinmi@yahoo.com',
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Authentication failed');
          done();
        });
    });
    it('Should not delete Business if not authenticated', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/2')
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Authentication failed');
          done();
        });
    });
    it('Should not update Business if not authenticated', (done) => {
      chai.request(businessRoute)
        .put('/businesses/2')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(res.body.message, 'Authentication failed');
          done();
        });
    });
  });
  describe('/LOG IN User', () => {
    it('It should login another user', (done) => {
      chai.request(userRoute)
        .post('/auth/login')
        .send({
          email: 'sinmi@yahoo.com', password: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          assert.equal(res.body.message, 'Successfully logged in');
          done();
        });
    });
    it('non-author should not be able to delete business', (done) => {
      chai.request(businessRoute)
        .delete('/businesses/2')
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
    it('User should not be able to update another\'s Business', (done) => {
      chai.request(businessRoute)
        .put('/businesses/2')
        .send({
          name: 'our business',
          address: 'Ajah, lagos state',
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.be.eql('Unauthorized User');
          done();
        });
    });
    it('User should not be able to reset another\'s password', (done) => {
      chai.request(userRoute)
        .put('/users/2')
        .send({
          newPassword: 'testtest'
        })
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal(res.body.message, 'Unauthorized User');
          done();
        });
    });
  });
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
          email:'admin@weconnect.com', password: 'admin'
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
});
