import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import businessRoute from '../routes/businessRoute';

dotenv.config();
chai.should();
chai.use(chaiHttp);
const deleteBusinessTest = () => {
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
};
export default deleteBusinessTest;
