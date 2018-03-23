import db from '../models/index';
import sendMail from '../middlewares/mail';

/**
 * Class representing the controller for the application.
 */
export default class appController {
  /**
   * This formats req.params.id to an integer
   * @param {Object} req - client request Object
   *  @param {Object} res - Server response Object
   * @returns {number} formatted number
   */
  static formatParamId(req, res) {
    const id = parseInt(req.params.businessId, 10);
    if (!id) return res.status(404).send({ message: 'Invalid ID' });
    return id;
  }
  /**
   * This gets all businesses which can be sorted by location or category
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} Business
   */
  static getAll(req, res) {
    if (req.query.category) {
      return db.Business
        .findAll({
          where: { category: req.query.category },
        })
        .then(businesses => res.status(200).send(businesses))
        .catch(error => res.send(400).send(error));
    }
    if (req.query.location) {
      return db.Business
        .findAll({
          where: { location: req.query.location },
        })
        .then(businesses => res.status(200).send(businesses))
        .catch(error => res.send(400).send(error));
    }
    return db.Business
      .all()
      .then(businesses => res.status(200).send(businesses))
      .catch(error => res.status(400).send(error));
  }
  /**
   * This method gets a single business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} business
   */
  static getOne(req, res) {
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        return res.status(200).send(business);
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This adds a business to the database.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} added business
   */
  static post(req, res) {
    if (req.body.name === undefined || req.body.description === undefined) {
      return res.status(400).send({ message: 'Business name and description required' });
    }
    return db.Business.create({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      address: req.body.address,
      category: req.body.category,
      image: req.body.image,
      review: [],
      userId: req.decoded.id
    })
      .then((business) => {
        res.setHeader('Location', `businesses/${business.id}`);
        res.status(201).send(business);
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This posts review to a business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} reviewed business
   */
  static postReview(req, res) {
    const mailStatus = 'Email not sent';
    if (req.body.review === '' || req.body.review === undefined) return res.status(400).send({ message: 'Review field cannot be empty' });
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        business.review.push(req.body.review);
        business
          .update({ review: business.review })
          .then(() => {
            db.User
              .findById(business.userId)
              .then((user) => {
                if (user.notify) {
                  const mailOptions = {
                    from: 'no_reply@sinmi-weconnect.com',
                    to: user.email,
                    subject: 'New Review from weconnect',
                    html: `<p> Hey, you got a new review for ${business.name} Click <a href='https://weconnect-com.herokuapp.com/api/v1/businesses/${user.id}/reviews'>here</a> to see it </p>`
                  };
                  sendMail(mailOptions);
                }
              })
              .catch(error => res.status(400).send(error));
            res.status(201).send({ business, mailReport: mailStatus });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This gets all reviews for a business
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} Reviews
   */
  static getReviews(req, res) {
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        return res.status(200).send(business.review);
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This updates an existing business
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} updated business
   */
  static update(req, res) {
    if (req.body.review) return res.status(400).send({ message: 'pls remove review from request body' });
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        if (business.userId !== req.decoded.id) return res.status(403).send({ message: 'Unauthorized User' });
        return business
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => {
            res.status(200).send(business);
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This destroys an existing business.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {null} nothing after deletion
   */
  static delete(req, res) {
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        if (business.userId !== req.decoded.id) return res.status(403).send('Unauthorized User');
        return business
          .destroy()
          .then(() => res.sendStatus(204))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}
