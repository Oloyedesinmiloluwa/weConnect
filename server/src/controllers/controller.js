import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
    // checks if category query exists
    if (req.query.category) {
      return db.Business
        .findAll({
          where: { category: req.query.category },
        })
        .then(businesses => res.status(200).send(businesses))
        .catch(error => res.send(400).send(error));
    }
    // checks if location query exists
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
    // tests if required fields are present
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
    // const env = process.env.NODE_ENV || 'development';
    // checks if review field has a value
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
                // checks if user requested for notification if there is new review
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
    // Prevents the user from manipulating his/her reviews
    if (req.body.review) return res.status(400).send({ message: 'pls remove review from request body' });
    return db.Business
      .findById(appController.formatParamId(req, res))
      .then((business) => {
        if (!business) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        // Allows only a business owner to update the business
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
   * This creates a new account for a user
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static signUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // Prevents uncompleted registration
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    return db.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        notify: req.body.notify || false,
        password: hashedPassword,
        profilePicture: req.body.profilePicture || '',
      })
      .then((user) => {
        const {
          id, email, firstName, lastName
        } = user;
        const token = jwt.sign({
          id, email, firstName, lastName
        }, process.env.secret_key, { expiresIn: '1h' });
        process.env.token = token;
        return res.status(201).send({ message: 'Successfully created an account' });
      })
      .catch(error => (res.status(400).send(error)));
  }
  /**
   * This validates the credentials of a user to allow or disallow login.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} Success or failure message
   */
  static login(req, res) {
    return db.User
      .find({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(401).send({ message: 'Invalid username' });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((response) => {
            if (response) {
              const {
                id, email, firstName, lastName
              } = user;
              const token = jwt.sign({
                id, email, firstName, lastName
              }, process.env.secret_key, { expiresIn: '1h' });
              process.env.token = token;
              return res.status(201).send({ message: 'Successfully logged in' });
            }
            return res.status(401).send({ message: 'Invalid Password' });
          })
          .catch(error => res.status(404).send(error.message));
      })
      .catch(error => res.status(400).send(error.message));
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
        // allows only the owner to delete a business
        if (business.userId !== req.decoded.id) return res.status(403).send('Unauthorized User');
        return business
          .destroy()
          .then(() => res.sendStatus(204))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This password of a user.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} success or failure message
   */
  static resetPassword(req, res) {
    // checks if the new password is not empty
    if (req.body.newPassword === '' || req.body.newPassword === undefined) return res.status(400).send({ message: 'Password must have a value' });
    return db.User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        // makes sure the new password is different from the old
        if (req.body.newPassword === user.password) return res.status(400).send({ message: 'Password must be new' });
        if (user.email !== req.decoded.email) return res.status(403).send({ message: 'Unauthorized User' });
        return user
          .update({ password: req.body.newPassword })
          .then(() => res.status(200).send({ message: 'Password successfully changed' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This destroys an existing user.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Object} nothing after deletion
   */
  static deleteUser(req, res) {
    return db.User
      .findById(req.params.userId) // appController.formatParamId(req, res))
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Invalid ID',
          });
        }
        // allows only an account owner to remove/delete her account
        if (user.email !== req.decoded.email) return res.status(403).send('Unauthorized User');
        return user
          .destroy()
          .then(() => res.status(200).send({ message: 'Account Deleted Successfully' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
   * This gets all users.
   * @param {Object} req - client request Object
   * @param {Object} res - Server response Object
   * @returns {Array} nothing after deletion
   */
  static getUsers(req, res) {
    // permits only the admin to see all users this is to protect their private information
    if (req.decoded.email !== 'admin@weconnect.com') return res.status(403).send({ message: 'Unauthorized User' });
    return db.User
      .all()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  }
}
