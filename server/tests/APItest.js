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
});
